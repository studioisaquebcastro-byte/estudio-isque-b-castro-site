// "Start a project" form: composes a mailto: link and a wa.me link with the message prefilled.
// No backend, nothing stored. Channels that are not configured in /config.js are hidden.
const isSet = (v) => typeof v === 'string' && v.trim() !== '' && !/YOUR-|example\./i.test(v) && !/^[0\s+-]+$/.test(v);

export function buildMessage(d) {
  return [
    'Hi Isaac,', '',
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.brand ? `Brand / website: ${d.brand}` : null,
    d.interest ? `Interested in: ${d.interest}` : null,
    '', d.message, '',
    'Sent from the Estúdio Isaac B. Castro website',
  ].filter((l) => l !== null).join('\n');
}
export function buildLinks(site, d) {
  const text = buildMessage(d);
  const email = isSet(site.email) ? site.email.trim() : '';
  const wa = isSet(site.whatsapp) ? site.whatsapp.replace(/\D/g, '') : '';
  const subject = `${site.emailSubject || 'New project enquiry'}: ${d.brand || d.name}`;
  return {
    text,
    mailto: email ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` : '',
    whatsapp: wa ? `https://wa.me/${wa}?text=${encodeURIComponent(text)}` : '',
  };
}

export function initForms(site) {
  const form = document.getElementById('project-form');
  if (!form) return;
  const note = document.getElementById('form-note');
  const bEmail = document.getElementById('send-email'), bWa = document.getElementById('send-whatsapp'), bCopy = document.getElementById('copy-message');
  const interestEl = document.getElementById('form-interest');
  const hasEmail = isSet(site.email), hasWa = isSet(site.whatsapp);
  let interest = '';

  bEmail.hidden = !hasEmail; bWa.hidden = !hasWa;
  if (!hasEmail && !hasWa) {
    bCopy.hidden = false;
    note.textContent = 'Direct sending is not set up on this site yet. Write your message, copy it, and send it through the channel where you found us.';
  }

  // contact links (only the ones that are configured)
  const links = document.getElementById('contact-links');
  const add = (labelText, text, href) => {
    const li = document.createElement('li'), s = document.createElement('span'), a = document.createElement('a');
    s.textContent = labelText; a.textContent = text; a.href = href;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    li.append(s, a); links.append(li);
  };
  if (hasEmail) add('Email', site.email.trim(), `mailto:${site.email.trim()}`);
  if (hasWa) add('WhatsApp', 'Message us on WhatsApp', `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`);
  if (isSet(site.instagram)) {
    const ig = site.instagram.trim(), handle = ig.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/.*$/, '');
    add('Instagram', '@' + handle, `https://www.instagram.com/${encodeURIComponent(handle)}/`);
  }
  links.hidden = !links.children.length;

  // "Request a quote" buttons on service cards carry the service into the form
  document.querySelectorAll('[data-prefill]').forEach((b) => b.addEventListener('click', () => {
    interest = b.dataset.prefill; interestEl.textContent = 'Quote for: ' + interest; interestEl.hidden = false;
  }));

  const fields = { name: form.elements.name, email: form.elements.email, message: form.elements.message };
  const valid = {
    name: (v) => v.trim().length > 1,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    message: (v) => v.trim().length > 5,
  };
  const check = (k) => {
    const ok = valid[k](fields[k].value), err = document.getElementById('e-' + k);
    fields[k].setAttribute('aria-invalid', ok ? 'false' : 'true');
    ok ? fields[k].removeAttribute('aria-describedby') : fields[k].setAttribute('aria-describedby', 'e-' + k);
    err.hidden = ok; return ok;
  };
  Object.keys(fields).forEach((k) => fields[k].addEventListener('input', () => { if (fields[k].getAttribute('aria-invalid') === 'true') check(k); }));

  const collect = () => {
    const bad = Object.keys(fields).filter((k) => !check(k));
    if (bad.length) { fields[bad[0]].focus(); note.textContent = 'Check the highlighted fields, then send again.'; return null; }
    return buildLinks(site, { name: fields.name.value.trim(), email: fields.email.value.trim(), brand: form.elements.brand.value.trim(), message: fields.message.value.trim(), interest });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const links = collect(); if (!links) return;
    const channel = (e.submitter && e.submitter.dataset.channel) || (hasEmail ? 'email' : 'whatsapp');
    const href = channel === 'whatsapp' ? links.whatsapp : links.mailto;
    if (!href) return;
    form.dataset.lastHref = href; // handy for QA
    if (channel === 'whatsapp') { window.open(href, '_blank', 'noopener'); note.textContent = 'WhatsApp opened in a new tab with your message ready. Press send there.'; }
    else { window.location.href = href; note.textContent = 'Your email app should open with the message ready. Press send there.'; }
  });

  bCopy.addEventListener('click', async () => {
    const links = collect(); if (!links) return;
    try { await navigator.clipboard.writeText(links.text); note.textContent = 'Message copied.'; }
    catch (err) { note.textContent = 'Copy failed. Select the text in the form and copy it by hand.'; }
  });
}
