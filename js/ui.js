// Smaller interactions: menu, accordion, reveals, word scrub, marquee speed, tilt, parallax, stacked steps.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function initMenu({ lenis }) {
  const btn = document.getElementById('menu-toggle'), menu = document.getElementById('menu');
  const text = btn.querySelector('.chip--menu__text');
  const rest = [document.getElementById('main'), document.querySelector('.footer')];
  let open = false, timer = 0;
  const set = (on, focusBtn = true) => {
    if (on === open) return;
    open = on; clearTimeout(timer);
    btn.setAttribute('aria-expanded', String(on)); text.textContent = on ? 'Close' : 'Menu';
    rest.forEach((el) => { el.inert = on; });
    document.documentElement.classList.toggle('is-locked', on);
    lenis && (on ? lenis.stop() : lenis.start());
    if (on) { menu.hidden = false; void menu.offsetWidth; menu.classList.add('is-open'); }
    else { menu.classList.remove('is-open'); timer = setTimeout(() => { menu.hidden = true; }, 720); if (focusBtn) btn.focus({ preventScroll: true }); }
  };
  btn.addEventListener('click', () => set(!open));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) set(false); });
  document.addEventListener('eibc:navigate', () => set(false, false)); // an anchor link was followed
  matchMedia('(min-width: 1000px)').addEventListener('change', (e) => e.matches && set(false, false));
}

export function initAccordion() {
  document.querySelectorAll('.qa').forEach((qa) => {
    const b = qa.querySelector('button');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(on)); qa.classList.toggle('is-open', on);
    });
  });
}

/* own tiny splitter: headings by line (<br>), manifesto by word */
function splitLines(el) {
  const parts = el.innerHTML.split(/<br\s*\/?>/i);
  el.innerHTML = parts.map((h, i) => `<span class="ln" style="--i:${i}"><span>${h.trim()}</span></span>`).join(' ');
  el.classList.add('is-split');
}
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  // screen readers get the sentence once, as plain text; the animated words are decorative duplicates
  el.innerHTML = `<span class="sr-only">${words.join(' ')}</span><span aria-hidden="true">${words.map((w) => `<span class="w">${w}</span>`).join(' ')}</span>`;
  return [...el.querySelectorAll('.w')];
}

export function initReveals() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-lines]').forEach((el) => { splitLines(el); io.observe(el); });
  document.querySelectorAll('[data-reveal]').forEach((el, i) => { el.style.setProperty('--i', i % 2); el.classList.add('is-ready'); io.observe(el); });
}

export function initScrollFX({ lenis, fine }) {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;

  // manifesto: word-by-word, scrubbed
  const text = document.querySelector('[data-words]');
  if (text) {
    const words = splitWords(text), n = words.length, last = new Float32Array(n).fill(-1);
    const paint = (p) => {
      const head = p * (n + 6);
      for (let i = 0; i < n; i++) {
        const o = Math.round((0.13 + 0.87 * clamp((head - i) / 6, 0, 1)) * 100) / 100;
        if (o !== last[i]) { last[i] = o; words[i].style.setProperty('--o', o); }
      }
    };
    paint(0);
    ScrollTrigger.create({ trigger: text, start: 'top 82%', end: 'bottom 55%', onUpdate: (s) => paint(s.progress), onRefresh: (s) => paint(s.progress) });
  }

  // marquee ribbons speed up with scroll velocity
  const tracks = [...document.querySelectorAll('.ribbon__track')];
  if (lenis && tracks.length) {
    let rate = 1;
    lenis.on('scroll', ({ velocity }) => {
      const r = 1 + Math.min(5, Math.abs(velocity) * 0.18);
      if (Math.abs(r - rate) < 0.05) return;
      rate = r; tracks.forEach((t) => t.getAnimations().forEach((a) => { a.playbackRate = r; }));
    });
  }

  // process: the card underneath recedes as the next one slides over it
  const steps = [...document.querySelectorAll('.step')];
  steps.forEach((step, i) => {
    const next = steps[i + 1]; if (!next) return;
    gsap.to(step.querySelector('.step__inner'), { scale: 0.9, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } });
  });

  // character sheets: parallax depth
  document.querySelectorAll('.sheet[data-depth]').forEach((el) => {
    const depth = parseFloat(el.dataset.depth);
    ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: (s) => el.style.setProperty('--py', ((s.progress - 0.5) * depth * 10).toFixed(1) + 'px') });
  });

  // pointer tilt on cards and sheets
  if (fine) document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 7).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (((e.clientY - r.top) / r.height - 0.5) * -7).toFixed(2) + 'deg');
    }, { passive: true });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });

  // progress bar fallback where CSS scroll-driven animations are missing
  if (!CSS.supports('animation-timeline: scroll()')) {
    const bar = document.querySelector('.progress');
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => bar.style.setProperty('--sp', s.progress.toFixed(4)) });
  }
}
