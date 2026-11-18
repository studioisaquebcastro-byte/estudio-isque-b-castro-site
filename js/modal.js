// Fullscreen film player on a native <dialog>: showModal() gives the focus trap, Esc-to-close and inert page.
import { t } from './i18n.js';

export function initPlayer({ motion, lenis }) {
  const dlg = document.getElementById('player');
  const video = document.getElementById('player-video');
  const title = document.getElementById('player-title');
  const meta = document.getElementById('player-meta');
  const closeBtn = document.getElementById('player-close');
  let trigger = null;

  function open(film, from) {
    trigger = from;
    const slug = film.dataset.slug;
    title.textContent = film.dataset.title;
    meta.textContent = film.dataset.meta + t('player.conceptSuffix');
    video.poster = `/assets/img/${slug}-poster.webp`;
    video.src = `/assets/video/${slug}.mp4`; // the full film (with sound) is requested only now
    const show = () => {
      dlg.showModal();
      document.documentElement.classList.add('is-locked');
      lenis && lenis.stop();
      video.focus({ preventScroll: true });
      video.play().catch(() => {}); // inside the click gesture → sound allowed; if blocked, native controls remain
    };
    const poster = from && from.querySelector('img');
    if (motion && document.startViewTransition && poster) {
      // shared-element morph: poster → player
      poster.style.viewTransitionName = 'film';
      const vt = document.startViewTransition(() => { poster.style.viewTransitionName = ''; show(); video.style.viewTransitionName = 'film'; });
      vt.finished.finally(() => { video.style.viewTransitionName = ''; });
    } else show();
  }

  closeBtn.addEventListener('click', () => dlg.close());
  dlg.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'k') && e.target !== video && !e.target.closest('button')) {
      e.preventDefault(); video.paused ? video.play() : video.pause();
    }
  });
  dlg.addEventListener('close', () => {
    video.pause(); video.removeAttribute('src'); video.load(); // drop the network connection
    document.documentElement.classList.remove('is-locked');
    lenis && lenis.start();
    if (trigger) trigger.focus({ preventScroll: true });
    trigger = null;
  });
  return open;
}
