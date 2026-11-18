// Entry point. Everything is progressive: the page is complete and usable before (or without) this file.
import { SITE } from '../config.js';
import { initSmooth } from './smooth.js';
import { initHero } from './hero.js';
import { initWork } from './work.js';
import { initPlayer } from './modal.js';
import { initCursor } from './cursor.js';
import { initForms } from './forms.js';
import { initMenu, initAccordion, initReveals, initScrollFX } from './ui.js';

const root = document.documentElement;
const motion = root.classList.contains('motion');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

// preloader is CSS-timed; JS only remembers the visit and removes the node afterwards
const pre = document.getElementById('preloader');
if (root.classList.contains('preload')) {
  try { sessionStorage.setItem('eibc-seen', '1'); } catch (e) {}
  pre.addEventListener('animationend', (e) => { if (e.animationName === 'pl-out') { pre.remove(); root.classList.remove('preload'); } });
} else pre.remove();

const { lenis } = initSmooth(motion);
const ctx = { motion, fine, lenis };

initMenu(ctx);
initAccordion();
initForms(SITE);
const openPlayer = initPlayer(ctx);
initHero(ctx);
initWork({ ...ctx, openPlayer });
if (motion) { initReveals(); initScrollFX(ctx); if (fine) initCursor(); }

// fonts and lazy images change layout: re-measure scroll positions once they settle
const refresh = () => window.ScrollTrigger && window.ScrollTrigger.refresh();
document.fonts && document.fonts.ready.then(refresh);
addEventListener('load', refresh, { once: true });

// Screening room: only one full film plays at a time
document.querySelectorAll('.screen video').forEach((v, _, all) => {
  v.addEventListener('play', () => all.forEach(o => { if (o !== v) o.pause(); }));
});
