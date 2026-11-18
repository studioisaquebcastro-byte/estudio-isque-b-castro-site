// "Start a project" form: saves leads to Firestore and keeps email / WhatsApp / copy as secondary options.
import { createLead } from './firebase-client.js';
import { t } from './i18n.js';

const isSet = (v) =>
  typeof v === 'string' && v.trim() !== '' && !/YOUR-|example\./i.test(v) && !/^[0\s+-]+$/.test(v);

const RATE_LIMIT_KEY = 'eibc-lead-rl';
const COOLDOWN_MS = 45 * 1000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function getRecentSubmissions() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return [];
    const now = Date.now();
    return JSON.parse(raw).filter((ts) => typeof ts === 'number' && now - ts < WINDOW_MS);
  } catch {
    return [];
  }
}

function recordSubmission() {
  try {
    const recent = getRecentSubmissions();
    recent.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  } catch {
    // ignore storage failures
  }
}

function checkCooldown() {
  const recent = getRecentSubmissions();
  if (!recent.length) return null;
  const now = Date.now();
  const last = recent[recent.length - 1];
  if (now - last < COOLDOWN_MS) {
    const secs = Math.ceil((COOLDOWN_MS - (now - last)) / 1000);
    return t('contact.cooldownWait', { secs });
  }
  if (recent.length >= MAX_PER_WINDOW) {
    return t('contact.cooldownLimit');
  }
  return null;
}

export function buildMessage(d) {
  return [
    t('msg.greeting'),
    '',
    `${t('msg.name')}: ${d.name}`,
    `${t('msg.email')}: ${d.email}`,
    d.whatsapp ? `${t('msg.whatsapp')}: ${d.whatsapp}` : null,
    d.brand ? `${t('msg.brand')}: ${d.brand}` : null,
    d.interest ? `${t('msg.interest')}: ${d.interest}` : null,
    '',
    d.message,
    '',
    t('msg.footer'),
  ]
    .filter((l) => l !== null)
    .join('\n');
}

export function buildLinks(site, d) {
  const text = buildMessage(d);
  const email = isSet(site.email) ? site.email.trim() : '';
  const wa = isSet(site.whatsapp) ? site.whatsapp.replace(/\D/g, '') : '';
  const subject = `${t('msg.subject') || site.emailSubject}: ${d.brand || d.name}`;
  return {
    text,
    mailto: email ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` : '',
    whatsapp: wa ? `https://wa.me/${wa}?text=${encodeURIComponent(text)}` : '',
  };
}

function openExternalLink(href) {
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.append(a);
  a.click();
  a.remove();
}

export function initForms(site) {
  const form = document.getElementById('project-form');
  if (!form) return;

  const note = document.getElementById('form-note');
  const confirmEl = document.getElementById('form-confirm');
  const bSubmit = document.getElementById('send-request');
  const bEmail = document.getElementById('send-email');
  const bWa = document.getElementById('send-whatsapp');
  const bCopy = document.getElementById('copy-message');
  const interestEl = document.getElementById('form-interest');
  const links = document.getElementById('contact-links');

  const hasEmail = isSet(site.email);
  const hasWa = isSet(site.whatsapp);
  let interest = '';
  let activePrefillEl = null;
  let lastSubmitted = null;
  let noteKey = 'contact.noteInitial';
  let isSubmitting = false;

  bEmail.hidden = !hasEmail;
  bWa.hidden = !hasWa;
  bCopy.hidden = false;

  const setNote = (key, explicitText) => {
    noteKey = key || '';
    note.textContent = explicitText ?? t(key);
  };

  const renderLinks = () => {
    links.replaceChildren();
    const add = (labelText, text, href) => {
      const li = document.createElement('li');
      const s = document.createElement('span');
      const a = document.createElement('a');
      s.textContent = labelText;
      a.textContent = text;
      a.href = href;
      if (/^https?:/.test(href)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      li.append(s, a);
      links.append(li);
    };
    if (hasEmail) add(t('contact.linkEmail'), site.email.trim(), `mailto:${site.email.trim()}`);
    if (hasWa) add(t('contact.linkWa'), t('contact.linkWaText'), `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`);
    if (isSet(site.instagram)) {
      const ig = site.instagram.trim();
      const handle = ig
        .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
        .replace(/^@/, '')
        .replace(/\/.*$/, '');
      add(t('contact.linkIg'), '@' + handle, `https://www.instagram.com/${encodeURIComponent(handle)}/`);
    }
    links.hidden = !links.children.length;
  };
  renderLinks();

  const renderInterest = () => {
    if (activePrefillEl) {
      interest = (activePrefillEl.dataset.prefill || '').trim().slice(0, 200);
    }
    interestEl.textContent = interest ? t('contact.quotePrefix') + interest : '';
    interestEl.hidden = !interest;
  };

  // "Request a quote" / theme chips carry the selection into the form
  document.querySelectorAll('[data-prefill]').forEach((b) =>
    b.addEventListener('click', () => {
      activePrefillEl = b;
      renderInterest();
    }),
  );

  document.addEventListener('cc:langchange', () => {
    renderLinks();
    if (interest) renderInterest();
    if (isSubmitting) bSubmit.textContent = t('contact.sending');
    else bSubmit.textContent = t('contact.submit');
    if (!confirmEl.hidden) confirmEl.textContent = t('contact.confirmSuccess');
    if (noteKey) note.textContent = t(noteKey);
  });

  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    whatsapp: form.elements.whatsapp,
    message: form.elements.message,
  };

  const valid = {
    name: (v) => v.trim().length >= 2 && v.trim().length <= 120,
    email: (v) => v.trim().length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    whatsapp: (v) => {
      const val = v.trim();
      if (!val) return true;
      const digits = val.replace(/\D/g, '');
      return val.length <= 32 && digits.length >= 7 && digits.length <= 15;
    },
    message: (v) => v.trim().length >= 6 && v.trim().length <= 4000,
  };

  const check = (k) => {
    const ok = valid[k](fields[k].value);
    const err = document.getElementById('e-' + k);
    fields[k].setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (ok) fields[k].removeAttribute('aria-describedby');
    else fields[k].setAttribute('aria-describedby', 'e-' + k);
    if (err) err.hidden = ok;
    return ok;
  };

  Object.keys(fields).forEach((k) =>
    fields[k].addEventListener('input', () => {
      if (fields[k].getAttribute('aria-invalid') === 'true') check(k);
    }),
  );

  const readValues = () => ({
    name: fields.name.value.trim().slice(0, 120),
    email: fields.email.value.trim().slice(0, 254),
    whatsapp: fields.whatsapp.value.trim().slice(0, 32),
    brand: form.elements.brand.value.trim().slice(0, 160),
    message: fields.message.value.trim().slice(0, 4000),
    interest: interest.slice(0, 200),
  });

  const collect = (allowLast = false) => {
    const hasAnyInput =
      fields.name.value.trim() ||
      fields.email.value.trim() ||
      fields.whatsapp.value.trim() ||
      fields.message.value.trim();
    if (!hasAnyInput && allowLast && lastSubmitted) {
      return lastSubmitted;
    }
    const bad = Object.keys(fields).filter((k) => !check(k));
    if (bad.length) {
      fields[bad[0]].focus();
      setNote('contact.noteInvalid');
      return null;
    }
    return readValues();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    confirmEl.hidden = true;

    const hp = form.elements.website_hp ? form.elements.website_hp.value.trim() : '';
    if (hp) {
      // Honeypot triggered: pretend success without writing to Firestore.
      confirmEl.textContent = t('contact.confirmSuccess');
      confirmEl.hidden = false;
      form.reset();
      return;
    }

    const data = collect(false);
    if (!data) return;

    const cooldownMsg = checkCooldown();
    if (cooldownMsg) {
      setNote('', cooldownMsg);
      return;
    }

    isSubmitting = true;
    bSubmit.disabled = true;
    bSubmit.textContent = t('contact.sending');

    try {
      await createLead({
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        brand: data.brand,
        theme: data.interest,
        message: data.message,
      });

      recordSubmission();
      lastSubmitted = data;

      confirmEl.textContent = t('contact.confirmSuccess');
      confirmEl.hidden = false;
      setNote('contact.noteAfterSuccess');

      form.reset();
      Object.keys(fields).forEach((k) => {
        fields[k].setAttribute('aria-invalid', 'false');
        fields[k].removeAttribute('aria-describedby');
        const err = document.getElementById('e-' + k);
        if (err) err.hidden = true;
      });
    } catch (err) {
      console.error('Failed to submit lead:', err);
      setNote('contact.noteSubmitErr');
    } finally {
      isSubmitting = false;
      bSubmit.disabled = false;
      bSubmit.textContent = t('contact.submit');
    }
  });

  bEmail.addEventListener('click', () => {
    const data = collect(true);
    if (!data) return;
    const built = buildLinks(site, data);
    if (!built.mailto) return;
    form.dataset.lastHref = built.mailto;
    window.location.href = built.mailto;
    setNote('contact.noteEmailOpened');
  });

  bWa.addEventListener('click', () => {
    const data = collect(true);
    if (!data) return;
    const built = buildLinks(site, data);
    if (!built.whatsapp) return;
    form.dataset.lastHref = built.whatsapp;
    openExternalLink(built.whatsapp);
    setNote('contact.noteWaOpened');
  });

  bCopy.addEventListener('click', async () => {
    const data = collect(true);
    if (!data) return;
    const built = buildLinks(site, data);
    try {
      await navigator.clipboard.writeText(built.text);
      setNote('contact.noteCopied');
    } catch {
      setNote('contact.noteCopyErr');
    }
  });
}
