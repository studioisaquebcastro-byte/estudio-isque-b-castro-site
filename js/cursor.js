// Custom "Play" cursor + magnetic buttons. Fine pointers with motion only; touch and keyboard users never see it.
import { t } from './i18n.js';

export function initCursor() {
  const { gsap } = window;
  const cursor = document.getElementById('cursor');
  if (!gsap || !cursor) return;
  document.documentElement.classList.add('has-cursor');
  const label = cursor.querySelector('.cursor__label');
  const x = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const y = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => { x(e.clientX); y(e.clientY); }, { passive: true });

  document.querySelectorAll('.film__play').forEach((el) => {
    el.addEventListener('pointerenter', () => { label.textContent = t('cursor.play'); cursor.classList.add('is-on'); });
    el.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
    el.addEventListener('click', () => cursor.classList.remove('is-on'));
  });

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - (r.left + r.width / 2)) * 0.28); my((e.clientY - (r.top + r.height / 2)) * 0.4);
    }, { passive: true });
    el.addEventListener('pointerleave', () => { mx(0); my(0); });
  });
}
