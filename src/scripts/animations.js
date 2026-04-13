/**
 * Cyllor — Core Animation Script (Elyse-style redesign)
 * Lenis smooth scroll + GSAP for entrance animations
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// 1. LENIS SMOOTH SCROLL
// ─────────────────────────────────────────────
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

// ─────────────────────────────────────────────
// 2. HERO ENTRANCE
// ─────────────────────────────────────────────
export function initHero() {
  const title = document.getElementById('hero-title');
  const scrollHint = document.getElementById('hero-scroll-hint');

  if (title) {
    gsap.fromTo(title,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, delay: 0.2, ease: 'power4.out' }
    );
  }

  // Animate right panel
  gsap.fromTo('[data-reveal="right"]',
    { x: 30, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, delay: 0.7, ease: 'power3.out', stagger: 0.15 }
  );

  if (scrollHint) {
    gsap.fromTo(scrollHint,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 1.4, ease: 'power2.out' }
    );
  }
}

// ─────────────────────────────────────────────
// 3. NAV ENTRANCE
// ─────────────────────────────────────────────
export function initNav() {
  gsap.fromTo('#site-nav',
    { y: -40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
  );
}

// ─────────────────────────────────────────────
// 4. SCROLL REVEAL (data-reveal elements)
//    Handled in Layout.astro via IntersectionObserver
//    This function exists for compatibility.
// ─────────────────────────────────────────────
export function initScrollReveal() {
  // IntersectionObserver in Layout.astro handles [data-reveal]
  // Additional GSAP enhancement for stagger groups
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    const cards = section.querySelectorAll('article, .card');
    if (cards.length > 1) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('revealed'), i * 100);
          });
        },
      });
    }
  });
}

// ─────────────────────────────────────────────
// 5. PARALLAX on hero image
// ─────────────────────────────────────────────
export function initParallax() {
  const heroImg = document.querySelector('#hero img');
  if (!heroImg) return;

  gsap.to(heroImg, {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ─────────────────────────────────────────────
// 6. IMAGE HOVER ZOOM (enhanced via GSAP)
// ─────────────────────────────────────────────
export function initImageHovers() {
  document.querySelectorAll('.img-zoom img').forEach((img) => {
    const parent = img.parentElement;
    if (!parent) return;
    parent.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, duration: 0.8, ease: 'power2.out' });
    });
    parent.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' });
    });
  });
}

// ─────────────────────────────────────────────
// 7. MAIN INIT
// ─────────────────────────────────────────────
export function initAll() {
  initLenis();
  initNav();
  initHero();
  initScrollReveal();
  initParallax();
  initImageHovers();
}
