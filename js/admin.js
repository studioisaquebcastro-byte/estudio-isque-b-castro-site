import {
  onAuthChange,
  signInWithGoogleAdmin,
  signOutAdmin,
  getAdminIdToken,
  getGmailAccessToken,
  subscribeLeads,
  updateLead,
  deleteLead,
} from './firebase-client.js';

const authView = document.getElementById('auth-view');
const dashboardView = document.getElementById('dashboard-view');
const topbarActions = document.getElementById('topbar-actions');
const adminEmailEl = document.getElementById('admin-email');
const newCountEl = document.getElementById('new-count');
const reconnectGmailBtn = document.getElementById('reconnect-gmail');

const signInBtn = document.getElementById('sign-in-btn');
const signOutBtn = document.getElementById('sign-out-btn');
const deniedSignOutBtn = document.getElementById('denied-signout-btn');
const deniedBox = document.getElementById('access-denied');
const deniedDetail = document.getElementById('denied-detail');
const authMsg = document.getElementById('auth-message');

const filterSearch = document.getElementById('filter-search');
const filterStatus = document.getElementById('filter-status');
const filterTheme = document.getElementById('filter-theme');
const leadListEl = document.getElementById('lead-list');
const leadCountEl = document.getElementById('lead-count');

const detailEmpty = document.getElementById('detail-empty');
const detailContent = document.getElementById('detail-content');
const detailName = document.getElementById('detail-name');
const detailDates = document.getElementById('detail-dates');
const detailEmail = document.getElementById('detail-email');
const detailWaRow = document.getElementById('detail-wa-row');
const detailWa = document.getElementById('detail-wa');
const detailBrandRow = document.getElementById('detail-brand-row');
const detailBrand = document.getElementById('detail-brand');
const detailThemeRow = document.getElementById('detail-theme-row');
const detailTheme = document.getElementById('detail-theme');
const detailLastReplyRow = document.getElementById('detail-last-reply-row');
const detailLastReply = document.getElementById('detail-last-reply');
const detailMessage = document.getElementById('detail-message');
const detailStatus = document.getElementById('detail-status');
const detailNotes = document.getElementById('detail-notes');
const adminMetaForm = document.getElementById('admin-meta-form');
const saveMetaBtn = document.getElementById('save-meta-btn');
const metaSaveMsg = document.getElementById('meta-save-msg');
const deleteLeadBtn = document.getElementById('delete-lead-btn');

const replyFromEl = document.getElementById('reply-from');
const replyToEl = document.getElementById('reply-to');
const replySubject = document.getElementById('reply-subject');
const replyBody = document.getElementById('reply-body');
const useProposalBtn = document.getElementById('use-proposal-btn');
const replyDropzone = document.getElementById('reply-dropzone');
const chooseFilesBtn = document.getElementById('choose-files-btn');
const replyFilesInput = document.getElementById('reply-files-input');
const replyInlineImages = document.getElementById('reply-inline-images');
const attachmentSummary = document.getElementById('attachment-summary');
const attachmentError = document.getElementById('attachment-error');
const attachmentList = document.getElementById('attachment-list');
const sendGmailBtn = document.getElementById('send-gmail-btn');
const gmailStatusMsg = document.getElementById('gmail-status-msg');

const waReplyBox = document.getElementById('wa-reply-box');
const waBody = document.getElementById('wa-body');
const waOpenLink = document.getElementById('wa-open-link');

const confirmDialog = document.getElementById('confirm-dialog');
const confirmTitle = document.getElementById('confirm-title');
const confirmDesc = document.getElementById('confirm-desc');
const confirmList = document.getElementById('confirm-list');
const confirmCancel = document.getElementById('confirm-cancel');
const confirmOk = document.getElementById('confirm-ok');

const MAX_ATTACHMENTS = 10;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);
const EXT_TO_MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  pdf: 'application/pdf',
};

let allLeads = [];
let selectedLeadId = null;
let renderedLeadId = null;
let unsubLeads = null;
let verifiedAdminEmail = '';
let selectedFiles = [];
let nextAttachmentId = 1;

function formatDate(ts) {
  if (!ts) return 'Just now';
  const d = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

function showStatus(el, msg, isError = false) {
  el.textContent = msg;
  el.classList.toggle('is-error', isError);
  el.hidden = false;
}

function openConfirm({ title, description, confirmLabel = 'Confirm', danger = false, items = [] }) {
  return new Promise((resolve) => {
    confirmTitle.textContent = title;
    confirmDesc.textContent = description;
    confirmList.innerHTML = '';
    if (items.length) {
      for (const item of items) {
        const li = document.createElement('li');
        li.textContent = item;
        confirmList.append(li);
      }
      confirmList.hidden = false;
    } else {
      confirmList.hidden = true;
    }
    confirmOk.textContent = confirmLabel;
    confirmOk.className = danger ? 'btn btn--danger' : 'btn btn--lime';

    const cleanup = (result) => {
      confirmCancel.removeEventListener('click', onCancel);
      confirmOk.removeEventListener('click', onOk);
      confirmDialog.removeEventListener('cancel', onCancel);
      if (confirmDialog.open) confirmDialog.close();
      confirmList.innerHTML = '';
      confirmList.hidden = true;
      resolve(result);
    };
    const onCancel = () => cleanup(false);
    const onOk = () => cleanup(true);

    confirmCancel.addEventListener('click', onCancel);
    confirmOk.addEventListener('click', onOk);
    confirmDialog.addEventListener('cancel', onCancel);
    confirmDialog.showModal();
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resolveMimeType(file) {
  const direct = (file.type || '').toLowerCase();
  if (direct === 'image/jpg') return 'image/jpeg';
  if (ALLOWED_MIME_TYPES.has(direct)) return direct;
  const ext = (file.name || '').split('.').pop()?.toLowerCase() || '';
  return EXT_TO_MIME[ext] || '';
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const commaIdx = result.indexOf(',');
      resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
    };
    reader.onerror = () => reject(reader.error || new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function showAttachmentError(msg) {
  if (!msg) {
    attachmentError.hidden = true;
    attachmentError.textContent = '';
    return;
  }
  attachmentError.textContent = msg;
  attachmentError.hidden = false;
}

function renderAttachments() {
  const totalBytes = selectedFiles.reduce((sum, item) => sum + item.size, 0);
  const mbText = totalBytes === 0 ? '0' : (totalBytes / (1024 * 1024)).toFixed(1);
  attachmentSummary.textContent = `${selectedFiles.length} / ${MAX_ATTACHMENTS} files · ${mbText} MB / 20 MB`;

  attachmentList.innerHTML = '';
  if (!selectedFiles.length) {
    attachmentList.hidden = true;
    return;
  }

  attachmentList.hidden = false;
  for (const item of selectedFiles) {
    const card = document.createElement('div');
    card.className = 'attachment-card';

    const thumb = document.createElement('div');
    thumb.className = 'attachment-card__thumb';
    if (item.mimeType.startsWith('image/') && item.previewUrl) {
      const img = document.createElement('img');
      img.src = item.previewUrl;
      img.alt = item.filename;
      thumb.append(img);
    } else {
      const pdfBadge = document.createElement('span');
      pdfBadge.className = 'attachment-card__pdf';
      pdfBadge.textContent = 'PDF';
      thumb.append(pdfBadge);
    }

    const info = document.createElement('div');
    info.className = 'attachment-card__info';
    const nameEl = document.createElement('span');
    nameEl.className = 'attachment-card__name';
    nameEl.textContent = item.filename;
    nameEl.title = item.filename;
    const sizeEl = document.createElement('span');
    sizeEl.className = 'attachment-card__size';
    sizeEl.textContent = formatBytes(item.size);
    info.append(nameEl, sizeEl);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'attachment-card__remove';
    removeBtn.setAttribute('aria-label', `Remove ${item.filename}`);
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      selectedFiles = selectedFiles.filter((f) => f.id !== item.id);
      showAttachmentError('');
      renderAttachments();
    });

    card.append(thumb, info, removeBtn);
    attachmentList.append(card);
  }
}

function clearAttachments() {
  for (const item of selectedFiles) {
    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
  }
  selectedFiles = [];
  if (replyFilesInput) replyFilesInput.value = '';
  showAttachmentError('');
  renderAttachments();
}

function addFiles(fileList) {
  const incoming = Array.from(fileList || []);
  if (!incoming.length) return;

  const errors = [];
  let currentBytes = selectedFiles.reduce((sum, item) => sum + item.size, 0);

  for (const file of incoming) {
    if (selectedFiles.length >= MAX_ATTACHMENTS) {
      errors.push(`Limit reached: maximum ${MAX_ATTACHMENTS} files per email.`);
      break;
    }
    const mimeType = resolveMimeType(file);
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      errors.push(`"${file.name}" skipped: only JPEG, PNG, WebP, GIF, and PDF are allowed.`);
      continue;
    }
    if (file.size <= 0) {
      errors.push(`"${file.name}" skipped: file is empty.`);
      continue;
    }
    if (currentBytes + file.size > MAX_TOTAL_BYTES) {
      errors.push(`"${file.name}" exceeds the 20 MB total attachment limit.`);
      continue;
    }

    currentBytes += file.size;
    selectedFiles.push({
      id: nextAttachmentId++,
      file,
      filename: file.name || `attachment-${nextAttachmentId}`,
      mimeType,
      size: file.size,
      previewUrl: mimeType.startsWith('image/') ? URL.createObjectURL(file) : '',
    });
  }

  renderAttachments();
  showAttachmentError(errors.join(' '));
}

function updateGmailReconnectBanner() {
  reconnectGmailBtn.hidden = Boolean(getGmailAccessToken());
}

function showSignedOutView() {
  if (unsubLeads) {
    unsubLeads();
    unsubLeads = null;
  }
  clearAttachments();
  allLeads = [];
  selectedLeadId = null;
  renderedLeadId = null;
  verifiedAdminEmail = '';
  authView.hidden = false;
  dashboardView.hidden = true;
  topbarActions.hidden = true;
  deniedBox.hidden = true;
  deniedSignOutBtn.hidden = true;
  signInBtn.hidden = false;
  authMsg.hidden = false;
}

function showAccessDenied(email) {
  if (unsubLeads) {
    unsubLeads();
    unsubLeads = null;
  }
  clearAttachments();
  allLeads = [];
  selectedLeadId = null;
  renderedLeadId = null;
  verifiedAdminEmail = '';
  authView.hidden = false;
  dashboardView.hidden = true;
  topbarActions.hidden = true;
  deniedBox.hidden = false;
  deniedDetail.textContent = email
    ? `Signed in as ${email}. Only the configured studio admin email can access this panel.`
    : 'This Google account is not authorized to access this panel.';
  signInBtn.hidden = true;
  deniedSignOutBtn.hidden = false;
}

async function verifyAdminSession() {
  const idToken = await getAdminIdToken();
  if (!idToken) return { ok: false, status: 401 };
  const res = await fetch('/api/admin/session', {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

const DEFAULT_THEMES = [
  'AI video ads',
  'AI product and brand photos',
  'Website or landing page',
  'Social posts and Meta Ads',
];

function syncThemeFilterOptions() {
  const current = filterTheme.value;
  const themes = [
    ...new Set([...DEFAULT_THEMES, ...allLeads.map((l) => l.theme).filter(Boolean)]),
  ].sort((a, b) => a.localeCompare(b));
  filterTheme.innerHTML = '<option value="all">All themes</option>';
  for (const t of themes) {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    filterTheme.append(opt);
  }
  if (themes.includes(current)) filterTheme.value = current;
}

function getFilteredLeads() {
  const statusVal = filterStatus.value;
  const themeVal = filterTheme.value;
  const q = filterSearch.value.trim().toLowerCase();

  return allLeads
    .filter((lead) => {
      if (statusVal !== 'all' && lead.status !== statusVal) return false;
      if (themeVal !== 'all' && lead.theme !== themeVal) return false;
      if (q) {
        const hay = [
          lead.name,
          lead.email,
          lead.whatsapp,
          lead.brand,
          lead.theme,
          lead.message,
          lead.notes,
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const ta = a.created_at?.toMillis ? a.created_at.toMillis() : 0;
      const tb = b.created_at?.toMillis ? b.created_at.toMillis() : 0;
      return tb - ta;
    });
}

function renderLeadList() {
  const newTotal = allLeads.filter((l) => l.status === 'new').length;
  newCountEl.textContent = `${newTotal} new`;

  const visible = getFilteredLeads();
  leadCountEl.textContent = `${visible.length} of ${allLeads.length}`;
  leadListEl.innerHTML = '';

  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'muted';
    empty.textContent = allLeads.length
      ? 'No leads match the current filters.'
      : 'No leads submitted yet.';
    leadListEl.append(empty);
    return;
  }

  for (const lead of visible) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lead-card' + (lead.id === selectedLeadId ? ' is-active' : '');

    const top = document.createElement('div');
    top.className = 'lead-card__row';
    const nameEl = document.createElement('span');
    nameEl.className = 'lead-card__name';
    nameEl.textContent = lead.name;
    const badge = document.createElement('span');
    badge.className = `badge badge--${lead.status}`;
    badge.textContent = lead.status;
    top.append(nameEl, badge);

    const meta = document.createElement('div');
    meta.className = 'lead-card__meta';
    const dateSpan = document.createElement('span');
    dateSpan.textContent = formatDate(lead.created_at);
    const contactSpan = document.createElement('span');
    contactSpan.textContent = lead.whatsapp ? `${lead.email} · ${lead.whatsapp}` : lead.email;
    meta.append(dateSpan, contactSpan);
    if (lead.brand) {
      const brandSpan = document.createElement('span');
      brandSpan.textContent = lead.brand;
      meta.append(brandSpan);
    }

    btn.append(top, meta);
    if (lead.theme) {
      const pill = document.createElement('span');
      pill.className = 'theme-pill';
      pill.textContent = lead.theme;
      btn.append(pill);
    }

    btn.addEventListener('click', () => {
      selectedLeadId = lead.id;
      renderLeadList();
      renderDetail(lead);
    });
    leadListEl.append(btn);
  }
}

function updateWhatsAppHref(digits) {
  if (!digits) return;
  const text = waBody.value.trim();
  waOpenLink.href = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function formatLastReplyText(lead) {
  if (lead.last_reply && lead.last_reply.subject) {
    const when = formatDate(lead.last_reply.sent_at || lead.last_reply_at);
    const count = Number(lead.last_reply.attachment_count) || 0;
    const countText =
      count === 0 ? 'no attachments' : count === 1 ? '1 attachment' : `${count} attachments`;
    return `${when} — "${lead.last_reply.subject}" (${countText})`;
  }
  if (lead.last_reply_at) {
    return formatDate(lead.last_reply_at);
  }
  return '';
}

function renderDetail(lead, { preserveCompose = false } = {}) {
  if (!lead) {
    renderedLeadId = null;
    clearAttachments();
    detailEmpty.hidden = false;
    detailContent.hidden = true;
    return;
  }

  const isSameLead = preserveCompose && renderedLeadId === lead.id;
  renderedLeadId = lead.id;

  detailEmpty.hidden = true;
  detailContent.hidden = false;

  detailName.textContent = lead.name;
  detailDates.textContent = lead.last_reply_at
    ? `Received ${formatDate(lead.created_at)} · Last reply ${formatDate(lead.last_reply_at)}`
    : `Received ${formatDate(lead.created_at)}`;
  detailEmail.textContent = lead.email;

  const waDigits = (lead.whatsapp || '').replace(/\D/g, '');
  detailWaRow.hidden = !lead.whatsapp;
  detailWa.textContent = lead.whatsapp;

  detailBrandRow.hidden = !lead.brand;
  detailBrand.textContent = lead.brand;

  detailThemeRow.hidden = !lead.theme;
  detailTheme.textContent = lead.theme;

  const lastReplyText = formatLastReplyText(lead);
  detailLastReplyRow.hidden = !lastReplyText;
  detailLastReply.textContent = lastReplyText;

  detailMessage.textContent = lead.message;
  replyFromEl.textContent = verifiedAdminEmail;
  replyToEl.textContent = lead.email;

  if (!isSameLead) {
    detailStatus.value = lead.status || 'new';
    detailNotes.value = lead.notes || '';
    metaSaveMsg.hidden = true;
    gmailStatusMsg.hidden = true;
    replySubject.value = 'Re: your video ad request';
    replyBody.value = `Hi ${lead.name},\n\nThanks for reaching out to Castro Creative!\n\nBest,\nIsaque B. Castro`;
    replyInlineImages.checked = true;
    clearAttachments();

    if (waDigits) {
      waReplyBox.hidden = false;
      waBody.value = `Hi ${lead.name}, thanks for reaching out to Castro Creative!`;
      updateWhatsAppHref(waDigits);
    } else {
      waReplyBox.hidden = true;
    }
  } else {
    detailStatus.value = lead.status || 'new';
    if (document.activeElement !== detailNotes) {
      detailNotes.value = lead.notes || '';
    }
    waReplyBox.hidden = !waDigits;
  }
}

function startDashboard(email) {
  verifiedAdminEmail = email;
  adminEmailEl.textContent = email;
  authView.hidden = true;
  dashboardView.hidden = false;
  topbarActions.hidden = false;
  updateGmailReconnectBanner();

  if (unsubLeads) unsubLeads();
  unsubLeads = subscribeLeads(
    (leads) => {
      allLeads = leads;
      syncThemeFilterOptions();
      renderLeadList();
      if (selectedLeadId) {
        const active = allLeads.find((l) => l.id === selectedLeadId) || null;
        if (!active) selectedLeadId = null;
        renderDetail(active, { preserveCompose: Boolean(active && active.id === renderedLeadId) });
      }
    },
    (err) => {
      console.error('Lead subscription error:', err);
    },
  );
}

async function handleSignIn() {
  signInBtn.disabled = true;
  deniedSignOutBtn.disabled = true;
  deniedBox.hidden = true;
  try {
    const { user } = await signInWithGoogleAdmin();
    const check = await verifyAdminSession();
    if (!check.ok) {
      showAccessDenied(user.email || '');
      return;
    }
    startDashboard(check.data.email || user.email || '');
  } catch (err) {
    console.error('Sign-in failed:', err);
    showAccessDenied('');
  } finally {
    signInBtn.disabled = false;
    deniedSignOutBtn.disabled = false;
  }
}

signInBtn.addEventListener('click', handleSignIn);
reconnectGmailBtn.addEventListener('click', handleSignIn);

const handleSignOut = async () => {
  await signOutAdmin();
  showSignedOutView();
};
signOutBtn.addEventListener('click', handleSignOut);
deniedSignOutBtn.addEventListener('click', handleSignOut);

onAuthChange(async (user) => {
  if (!user) {
    showSignedOutView();
    return;
  }
  const check = await verifyAdminSession();
  if (!check.ok) {
    showAccessDenied(user.email || '');
    return;
  }
  startDashboard(check.data.email || user.email || '');
});

filterSearch.addEventListener('input', renderLeadList);
filterStatus.addEventListener('change', renderLeadList);
filterTheme.addEventListener('change', renderLeadList);

waBody.addEventListener('input', () => {
  const lead = allLeads.find((l) => l.id === selectedLeadId);
  if (!lead) return;
  updateWhatsAppHref((lead.whatsapp || '').replace(/\D/g, ''));
});

adminMetaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!selectedLeadId) return;
  saveMetaBtn.disabled = true;
  metaSaveMsg.hidden = true;
  try {
    await updateLead(selectedLeadId, {
      status: detailStatus.value,
      notes: detailNotes.value,
    });
    showStatus(metaSaveMsg, 'Saved status and notes.');
  } catch (err) {
    console.error('Save failed:', err);
    showStatus(metaSaveMsg, 'Could not save changes. Please try again.', true);
  } finally {
    saveMetaBtn.disabled = false;
  }
});

deleteLeadBtn.addEventListener('click', async () => {
  const lead = allLeads.find((l) => l.id === selectedLeadId);
  if (!lead) return;
  const ok = await openConfirm({
    title: 'Delete lead?',
    description: `Permanently delete the lead from ${lead.name} (${lead.email})? This cannot be undone.`,
    confirmLabel: 'Delete lead',
    danger: true,
  });
  if (!ok) return;

  try {
    await deleteLead(lead.id);
    selectedLeadId = null;
    renderDetail(null);
  } catch (err) {
    console.error('Delete failed:', err);
    showStatus(metaSaveMsg, 'Could not delete lead.', true);
  }
});

useProposalBtn.addEventListener('click', () => {
  const lead = allLeads.find((l) => l.id === selectedLeadId);
  if (!lead) return;
  const name = lead.name || 'there';
  const theme = lead.theme || 'your project';
  replySubject.value = 'Your proposal from Castro Creative';
  replyBody.value = [
    `Hi ${name},`,
    '',
    `Thank you for your request about "${theme}".`,
    '',
    'Here is what I propose:',
    '- What we will create: [describe the deliverables]',
    '- Delivery: [timeline]',
    '- Investment: [price]',
    '- Revisions: 1 round included',
    '',
    'I have attached a few references to show the direction. If you are happy with it, just reply to this email and we will start.',
    '',
    'Best regards,',
    'Isaque B. Castro',
    'Castro Creative',
    'https://castro-creative.ai.studio',
  ].join('\n');
  replyBody.focus();
});

chooseFilesBtn.addEventListener('click', () => {
  replyFilesInput.click();
});

replyFilesInput.addEventListener('change', () => {
  addFiles(replyFilesInput.files);
  replyFilesInput.value = '';
});

replyDropzone.addEventListener('keydown', (e) => {
  if (e.target === replyDropzone && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    replyFilesInput.click();
  }
});

replyDropzone.addEventListener('dragenter', (e) => {
  e.preventDefault();
  replyDropzone.classList.add('is-dragover');
});

replyDropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  replyDropzone.classList.add('is-dragover');
});

replyDropzone.addEventListener('dragleave', (e) => {
  if (!replyDropzone.contains(e.relatedTarget)) {
    replyDropzone.classList.remove('is-dragover');
  }
});

replyDropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  replyDropzone.classList.remove('is-dragover');
  addFiles(e.dataTransfer?.files);
});

sendGmailBtn.addEventListener('click', async () => {
  const lead = allLeads.find((l) => l.id === selectedLeadId);
  if (!lead) return;

  const subject = replySubject.value.trim();
  const body = replyBody.value.trim();
  if (!subject || !body) {
    showStatus(gmailStatusMsg, 'Enter both a subject and a message before sending.', true);
    return;
  }

  let gmailToken = getGmailAccessToken();
  if (!gmailToken) {
    const reconnectOk = await openConfirm({
      title: 'Reconnect Gmail permission',
      description:
        'Your Gmail send session is not active in memory after reloading. Sign in with Google again to authorize sending this email.',
      confirmLabel: 'Sign in & continue',
    });
    if (!reconnectOk) return;
    try {
      const res = await signInWithGoogleAdmin();
      gmailToken = res.accessToken;
      updateGmailReconnectBanner();
    } catch {
      showStatus(gmailStatusMsg, 'Google sign-in was cancelled.', true);
      return;
    }
  }

  if (!gmailToken) {
    showStatus(gmailStatusMsg, 'Gmail send permission was not granted. Please reconnect Google.', true);
    return;
  }

  const fileLabels = selectedFiles.map((item) => `${item.filename} (${formatBytes(item.size)})`);
  const confirmDescText = fileLabels.length
    ? `Send "${subject}" from ${verifiedAdminEmail} to ${lead.email} with ${fileLabels.length} attachment${fileLabels.length === 1 ? '' : 's'}?`
    : `Send "${subject}" from ${verifiedAdminEmail} to ${lead.email}?`;

  const confirmed = await openConfirm({
    title: 'Send email via Gmail?',
    description: confirmDescText,
    items: fileLabels,
    confirmLabel: 'Confirm & Send',
  });
  if (!confirmed) return;

  sendGmailBtn.disabled = true;
  sendGmailBtn.textContent = 'Sending...';
  gmailStatusMsg.hidden = true;

  try {
    const encodedAttachments = await Promise.all(
      selectedFiles.map(async (item) => ({
        filename: item.filename,
        mimeType: item.mimeType,
        dataBase64: await fileToBase64(item.file),
      })),
    );

    const idToken = await getAdminIdToken();
    const res = await fetch('/api/admin/send-reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        'X-Gmail-Access-Token': gmailToken,
      },
      body: JSON.stringify({
        to: lead.email,
        subject,
        body,
        inlineImages: replyInlineImages.checked,
        attachments: encodedAttachments,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showStatus(gmailStatusMsg, data.error || 'Failed to send email via Gmail.', true);
      return;
    }

    const sentCount = encodedAttachments.length;
    clearAttachments();
    await updateLead(lead.id, {
      markReplied: true,
      replyLog: {
        subject,
        attachmentCount: sentCount,
      },
    });
    const suffix =
      sentCount > 0 ? ` (${sentCount} attachment${sentCount === 1 ? '' : 's'})` : '';
    showStatus(
      gmailStatusMsg,
      `Email sent to ${lead.email}${suffix} and lead marked as replied.`,
    );
  } catch (err) {
    console.error('Send reply failed:', err);
    showStatus(gmailStatusMsg, 'Failed to send email. Please try again.', true);
  } finally {
    sendGmailBtn.disabled = false;
    sendGmailBtn.textContent = 'Send via Gmail';
  }
});
