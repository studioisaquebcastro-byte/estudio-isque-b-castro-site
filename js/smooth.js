// Lenis smooth scroll driven by gsap.ticker, kept in sync with ScrollTrigger.
// With reduced motion (or if a vendor script failed to load) nothing is hijacked: native scrolling is used.
export function initSmooth(motion) {
  const { gsap, ScrollTrigger, Lenis } = window;
  let lenis = null;
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if (motion && gsap && ScrollTrigger && Lenis) {
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const headerOffset = () => (innerWidth < 900 ? 70 : 0);

  function scrollToTarget(target, focus = true) {
    const land = () => {
      // Sections using content-visibility:auto only get their real height once rendered,
      // so the first measurement can be off. Check where we landed and correct once.
      const off = target.getBoundingClientRect().top - (target.id === 'top' ? 0 : headerOffset());
      if (Math.abs(off) > 6) {
        if (lenis) lenis.scrollTo(window.scrollY + off, { immediate: true, force: true });
        else window.scrollTo(0, window.scrollY + off);
      }
      if (focus && target.id !== 'top') {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    };
    if (lenis) {
      lenis.scrollTo(target.id === 'top' ? 0 : target, { offset: -headerOffset(), duration: 1.3, force: true, onComplete: land });
    } else {
      const y = target.id === 'top' ? 0 : target.getBoundingClientRect().top + window.scrollY - headerOffset();
      window.scrollTo(0, y);
      requestAnimationFrame(land);
    }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    const id = a.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('eibc:navigate'));
    scrollToTarget(target);
    history.replaceState(null, '', id === 'top' ? location.pathname : '#' + id);
  });

  return { lenis, scrollToTarget };
}
