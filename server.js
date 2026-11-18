import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN CONFIGURATION
// Set the ADMIN_EMAIL environment variable / server secret to restrict /admin
// and all /api/admin/* routes to a single verified Google account.
// Default fallback matches the configured studio owner account.
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'studioisaquebcastro@gmail.com')
  .trim()
  .toLowerCase();

const firebaseConfigPath = path.join(__dirname, 'firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));

// Only projectId is needed for verifyIdToken(idToken) — works on Starter Tier without IAM.
const adminApp = getApps().length
  ? getApp()
  : initializeApp({ projectId: firebaseConfig.projectId });
const adminAuth = getAuth(adminApp);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.disable('x-powered-by');
app.use((req, res, next) => {
  if (req.path === '/api/admin/send-reply') {
    return express.json({ limit: '30mb' })(req, res, next);
  }
  return express.json({ limit: '64kb' })(req, res, next);
});

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Block direct static access to server, config, rules, and source files.
const BLOCKED_EXACT = new Set([
  '/server.js',
  '/package.json',
  '/package-lock.json',
  '/firestore.rules',
  '/firebase-blueprint.json',
  '/firebase-applet-config.json',
  '/security_spec.md',
  '/eslint.config.js',
  '/Dockerfile',
  '/nginx.conf',
  '/admin.html',
]);
app.use((req, res, next) => {
  const p = req.path;
  if (
    BLOCKED_EXACT.has(p) ||
    p.startsWith('/src/') ||
    p.startsWith('/tools/') ||
    path.basename(p).startsWith('.env')
  ) {
    return res.status(404).end();
  }
  return next();
});

// Verify Firebase ID token + ADMIN_EMAIL for every /api/admin/* request.
async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const decoded = await adminAuth.verifyIdToken(match[1]);
    const email = (decoded.email || '').trim().toLowerCase();
    if (!decoded.email_verified || !email || email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Access denied' });
    }

    req.admin = {
      uid: decoded.uid,
      email: decoded.email,
    };
    return next();
  } catch (err) {
    console.warn('Admin token verification failed:', err instanceof Error ? err.message : err);
    return res.status(401).json({ error: 'Invalid or expired session. Please sign in again.' });
  }
}

app.use('/api/admin', requireAdmin);

app.get('/api/admin/session', (req, res) => {
  res.json({ ok: true, email: req.admin.email });
});

const ALLOWED_ATTACHMENT_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);
const INLINE_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_ATTACHMENTS = 10;
const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

function encodeMimeHeader(value) {
  const str = String(value || '').replace(/[\r\n]+/g, ' ').trim();
  if (!str) return '';
  const chunks = [];
  let current = '';
  let currentBytes = 0;
  for (const ch of str) {
    const chBytes = Buffer.byteLength(ch, 'utf8');
    if (current && currentBytes + chBytes > 42) {
      chunks.push(`=?UTF-8?B?${Buffer.from(current, 'utf8').toString('base64')}?=`);
      current = ch;
      currentBytes = chBytes;
    } else {
      current += ch;
      currentBytes += chBytes;
    }
  }
  if (current) {
    chunks.push(`=?UTF-8?B?${Buffer.from(current, 'utf8').toString('base64')}?=`);
  }
  return chunks.join('\r\n ');
}

function encodeMimeFilename(filename) {
  const clean =
    String(filename || 'attachment')
      .replace(/[\r\n\\/]+/g, '_')
      .replace(/"/g, "'")
      .trim()
      .slice(0, 160) || 'attachment';
  return `=?UTF-8?B?${Buffer.from(clean, 'utf8').toString('base64')}?=`;
}

function wrapBase64(b64) {
  return String(b64).replace(/\s+/g, '').replace(/(.{76})/g, '$1\r\n');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatTextSegmentHtml(segment) {
  const escaped = escapeHtml(segment);
  return escaped.replace(
    /https?:\/\/[^\s<>"']+/g,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#2340FF;">${url}</a>`,
  );
}

function buildHtmlBody(plainText, inlineEntries) {
  const paragraphs = String(plainText || '')
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map((p) => {
      const lines = p.split('\n').map(formatTextSegmentHtml).join('<br>');
      return `<p style="margin:0 0 14px 0;">${lines}</p>`;
    })
    .join('');

  const inlineBlock = inlineEntries.length
    ? `<div style="margin-top:20px;">${inlineEntries
        .map(
          (img) =>
            `<p style="margin:0 0 14px 0;"><img src="cid:${img.cid}" alt="${escapeHtml(
              img.filename,
            )}" style="display:block;max-width:600px;width:100%;height:auto;border:0;"></p>`,
        )
        .join('')}</div>`
    : '';

  return [
    '<!doctype html>',
    '<html><body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#15110E;">',
    `<div style="max-width:620px;">${paragraphs}${inlineBlock}</div>`,
    '</body></html>',
  ].join('');
}

function makeBoundary(prefix) {
  const rand = Math.random().toString(36).slice(2, 10);
  return `----=${prefix}_${Date.now().toString(36)}_${rand}`;
}

function buildMimeEmail({ from, to, subject, body, attachments = [], inlineImages = true }) {
  const cleanFrom = String(from).replace(/[\r\n]+/g, '');
  const cleanTo = String(to).replace(/[\r\n]+/g, '');
  const cleanSubject = String(subject).replace(/[\r\n]+/g, ' ').trim();
  const normalizedPlain = String(body || '').replace(/\r\n?/g, '\n');

  const inlineEntries = [];
  const attachedEntries = [];
  attachments.forEach((att, idx) => {
    if (inlineImages && INLINE_IMAGE_TYPES.has(att.mimeType)) {
      inlineEntries.push({ ...att, cid: `ref-${idx}-${Date.now().toString(36)}@castrocreative` });
    } else {
      attachedEntries.push(att);
    }
  });

  const htmlBody = buildHtmlBody(normalizedPlain, inlineEntries);
  const altBoundary = makeBoundary('alt');
  const altPart = [
    `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
    '',
    `--${altBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    wrapBase64(Buffer.from(normalizedPlain, 'utf8').toString('base64')),
    `--${altBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    wrapBase64(Buffer.from(htmlBody, 'utf8').toString('base64')),
    `--${altBoundary}--`,
  ].join('\r\n');

  let bodySection = altPart;
  if (inlineEntries.length) {
    const relBoundary = makeBoundary('rel');
    const relChunks = [
      `Content-Type: multipart/related; boundary="${relBoundary}"`,
      '',
      `--${relBoundary}`,
      altPart,
    ];
    for (const img of inlineEntries) {
      const encodedName = encodeMimeFilename(img.filename);
      relChunks.push(
        `--${relBoundary}`,
        `Content-Type: ${img.mimeType}; name="${encodedName}"`,
        `Content-Disposition: inline; filename="${encodedName}"`,
        `Content-ID: <${img.cid}>`,
        `X-Attachment-Id: ${img.cid}`,
        'Content-Transfer-Encoding: base64',
        '',
        wrapBase64(img.base64),
      );
    }
    relChunks.push(`--${relBoundary}--`);
    bodySection = relChunks.join('\r\n');
  }

  const mixBoundary = makeBoundary('mix');
  const lines = [
    `From: ${cleanFrom}`,
    `To: ${cleanTo}`,
    `Subject: ${encodeMimeHeader(cleanSubject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${mixBoundary}"`,
    '',
    `--${mixBoundary}`,
    bodySection,
  ];

  for (const file of attachedEntries) {
    const encodedName = encodeMimeFilename(file.filename);
    lines.push(
      `--${mixBoundary}`,
      `Content-Type: ${file.mimeType}; name="${encodedName}"`,
      `Content-Disposition: attachment; filename="${encodedName}"`,
      'Content-Transfer-Encoding: base64',
      '',
      wrapBase64(file.base64),
    );
  }

  lines.push(`--${mixBoundary}--`, '');
  return lines.join('\r\n');
}

app.post('/api/admin/send-reply', async (req, res) => {
  const gmailToken = String(req.headers['x-gmail-access-token'] || '').trim();
  if (!gmailToken) {
    return res.status(401).json({
      error: 'Gmail send permission expired. Click "Sign in with Google" to reconnect Gmail.',
      code: 'GMAIL_TOKEN_MISSING',
    });
  }

  const to = String(req.body?.to || '').trim();
  const subject = String(req.body?.subject || '').trim();
  const body = String(req.body?.body || '').trim();
  const inlineImages = req.body?.inlineImages !== false;
  const rawAttachments = Array.isArray(req.body?.attachments) ? req.body.attachments : [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(to) || to.length > 254) {
    return res.status(400).json({ error: 'Invalid recipient email address.' });
  }
  if (!subject || subject.length > 200) {
    return res.status(400).json({ error: 'Subject is required (max 200 characters).' });
  }
  if (!body || body.length > 10000) {
    return res.status(400).json({ error: 'Reply body is required (max 10,000 characters).' });
  }
  if (rawAttachments.length > MAX_ATTACHMENTS) {
    return res.status(400).json({ error: `Up to ${MAX_ATTACHMENTS} attachments allowed.` });
  }

  const parsedAttachments = [];
  let totalBytes = 0;
  for (const item of rawAttachments) {
    const filename = String(item?.filename || 'attachment').trim().slice(0, 160) || 'attachment';
    const mimeType = String(item?.mimeType || '').trim().toLowerCase();
    const rawB64 = String(item?.dataBase64 || '').replace(/^data:[^;]+;base64,/i, '').replace(/\s+/g, '');

    if (!ALLOWED_ATTACHMENT_TYPES.has(mimeType)) {
      return res.status(400).json({
        error: `Unsupported file type for "${filename}". Allowed: JPG, PNG, WebP, GIF, and PDF.`,
      });
    }
    if (!rawB64 || !/^[A-Za-z0-9+/=]+$/.test(rawB64)) {
      return res.status(400).json({ error: `Invalid file encoding for "${filename}".` });
    }
    const decoded = Buffer.from(rawB64, 'base64');
    totalBytes += decoded.length;
    if (totalBytes > MAX_ATTACHMENT_BYTES) {
      return res.status(400).json({ error: 'Total attachments exceed the 20 MB limit.' });
    }
    parsedAttachments.push({
      filename,
      mimeType,
      base64: decoded.toString('base64'),
    });
  }

  try {
    const mimeMessage = buildMimeEmail({
      from: req.admin.email,
      to,
      subject,
      body,
      attachments: parsedAttachments,
      inlineImages,
    });

    const useMediaUpload = Buffer.byteLength(mimeMessage, 'utf8') > 4 * 1024 * 1024;
    const gmailRes = useMediaUpload
      ? await fetch('https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send?uploadType=media', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${gmailToken}`,
            'Content-Type': 'message/rfc822',
          },
          body: mimeMessage,
        })
      : await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${gmailToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ raw: Buffer.from(mimeMessage, 'utf8').toString('base64url') }),
        });

    const gmailData = await gmailRes.json().catch(() => ({}));
    if (!gmailRes.ok) {
      const status = gmailRes.status === 401 || gmailRes.status === 403 ? 401 : 502;
      const msg =
        gmailData?.error?.message ||
        'Gmail rejected the send request. Reconnect Google Sign-In and try again.';
      return res.status(status).json({
        error: msg,
        code: status === 401 ? 'GMAIL_TOKEN_INVALID' : 'GMAIL_SEND_FAILED',
      });
    }

    return res.json({ ok: true, id: gmailData.id || null });
  } catch (err) {
    console.error('Gmail send failed:', err);
    return res.status(502).json({ error: 'Failed to reach Gmail API.' });
  }
});

app.get(['/admin', '/admin/'], (_req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.use(
  express.static(__dirname, {
    index: 'index.html',
    setHeaders(res, filePath) {
      if (filePath.endsWith('.webmanifest')) {
        res.setHeader('Content-Type', 'application/manifest+json');
      } else if (filePath.endsWith('.html') || filePath.endsWith(`${path.sep}config.js`)) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  return res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
