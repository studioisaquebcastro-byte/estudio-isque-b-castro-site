// Selected work: pinned horizontal scroll (desktop + motion), preview loops, WebGL hover, parallax numerals.
import { PosterFX } from './gl.js';

export function initWork({ motion, fine, lenis, openPlayer }) {
  const work = document.getElementById('work');
  const track = document.getElementById('work-track');
  const films = [...work.querySelectorAll('.film')];
  const { gsap, ScrollTrigger } = window;

  /* ── horizontal scroll: CSS sticky stage + a scrubbed translate (no GSAP pin-spacer needed) ── */
  if (motion && gsap && ScrollTrigger) {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      let max = 0, vw = innerWidth;
      const layers = films.map((f) => ({ f, secs: f.querySelector('.film__secs'), title: f.querySelector('.film__title'), left: 0 }));
      const measure = () => {
        vw = innerWidth;
        max = Math.max(0, track.scrollWidth - vw);
        work.style.height = max + innerHeight + 'px';
        layers.forEach((l) => { l.left = l.f.offsetLeft; });
      };
      const render = (p) => {
        const x = p * max;
        track.style.transform = `translate3d(${-x}px,0,0)`;
        for (const l of layers) {
          const d = (l.left - x) / vw; // -1 … 1 : panel offset from the viewport, in screens
          if (d > -1.2 && d < 1.2) {
            l.secs.style.transform = `translate3d(${d * 16}vw,0,0)`;
            l.title.style.transform = `translate3d(${d * -5}vw,0,0)`;
          }
        }
      };
      measure();
      ScrollTrigger.addEventListener('refreshInit', measure);
      const st = ScrollTrigger.create({ trigger: work, start: 'top top', end: () => '+=' + max, onUpdate: (s) => render(s.progress), onRefresh: (s) => render(s.progress) });

      // Keyboard: when focus lands in a panel that is off-screen, scroll the page to bring it in.
      const onFocus = (e) => {
        const film = e.target.closest('.film');
        if (!film || !e.target.matches(':focus-visible')) return;
        const y = st.start + Math.min(max, film.offsetLeft);
        if (Math.abs(window.scrollY - y) > 40) lenis ? lenis.scrollTo(y, { duration: 0.8, force: true }) : window.scrollTo(0, y);
      };
      track.addEventListener('focusin', onFocus);

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', measure);
        track.removeEventListener('focusin', onFocus);
        st.kill(); work.style.height = ''; track.style.transform = '';
        layers.forEach((l) => { l.secs.style.transform = ''; l.title.style.transform = ''; });
      };
    });
  }

  /* ── per-film: preview loop + WebGL + open player ── */
  const coarseIO = !fine && motion ? new IntersectionObserver((entries) => {
    for (const e of entries) e.target._preview(e.isIntersecting);
  }, { threshold: 0.65 }) : null;

  films.forEach((film) => {
    const btn = film.querySelector('.film__play');
    const img = btn.querySelector('img'), video = btn.querySelector('video'), canvas = btn.querySelector('canvas');
    let fx = null, fxFailed = false, wanted = false;

    video.addEventListener('playing', () => { if (wanted) btn.classList.add('is-previewing'); });
    const preview = (on) => {
      wanted = on;
      if (on) {
        if (!video.src) video.src = video.dataset.src; // fetched only on first need
        video.play().catch(() => {});
      } else { video.pause(); btn.classList.remove('is-previewing'); }
    };
    btn._preview = preview;

    if (motion && fine) {
      btn.addEventListener('pointerenter', (e) => {
        preview(true);
        if (!fx && !fxFailed) { try { fx = new PosterFX(btn, canvas, img, video); } catch (err) { fxFailed = true; } }
        fx && fx.enter(e);
      });
      btn.addEventListener('pointermove', (e) => fx && fx.move(e), { passive: true });
      btn.addEventListener('pointerleave', () => { preview(false); fx && fx.leave(); });
      btn.addEventListener('focus', () => btn.matches(':focus-visible') && preview(true));
      btn.addEventListener('blur', () => preview(false));
    } else if (coarseIO) {
      coarseIO.observe(btn);
    }

    btn.addEventListener('click', () => { preview(false); fx && fx.leave(); openPlayer(film, btn); });
  });
}
