// Hero: scroll writes one custom property (--p, 0→1); all the choreography is CSS calc() in critical.css.
// That keeps it resize-proof and means a single style write per frame.
export function initHero({ motion, lenis }) {
  const hero = document.getElementById('hero');
  const stage = hero.querySelector('.hero__stage');
  const frame = document.getElementById('hero-frame');
  const video = document.getElementById('hero-video');
  const { gsap, ScrollTrigger } = window;

  if (motion && gsap && ScrollTrigger) {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const st = ScrollTrigger.create({
        trigger: hero, start: 'top top', end: 'bottom bottom',
        onUpdate: (self) => stage.style.setProperty('--p', self.progress.toFixed(4)),
      });
      // subtle distortion: the frame leans with scroll velocity
      let skew = 0;
      const onScroll = ({ velocity }) => {
        const v = Math.max(-2.2, Math.min(2.2, velocity * 0.06));
        if (Math.abs(v - skew) > 0.02) { skew = v; frame.style.setProperty('--skew', v.toFixed(2) + 'deg'); }
      };
      lenis && lenis.on('scroll', onScroll);
      return () => { st.kill(); lenis && lenis.off('scroll', onScroll); stage.style.removeProperty('--p'); frame.style.removeProperty('--skew'); };
    });
  }

  // Showreel: never competes with first paint. Source is attached after load, small file on small screens.
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!motion || saveData || !video) return;
  const start = () => {
    video.src = innerWidth < 900 ? video.dataset.srcSm : video.dataset.src;
    video.addEventListener('playing', () => video.classList.add('is-on'), { once: true });
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) video.play().catch(() => {}); else video.pause();
    }, { threshold: 0.05 }).observe(frame);
  };
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 300));
  if (document.readyState === 'complete') idle(); else addEventListener('load', idle, { once: true });
}
