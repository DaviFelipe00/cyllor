/**
 * Cyllor — Core Animation Script
 * Uses gsap.fromTo() everywhere so end-state is always explicitly opacity:1
 * This prevents elements staying invisible if scroll triggers fail.
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
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.8,
  });

  // Sync Lenis with GSAP ticker
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

// ─────────────────────────────────────────────
// 2. CUSTOM CURSOR
// ─────────────────────────────────────────────
export function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power3.out' });
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(ring, { scale: 2.5, borderColor: '#00f0ff', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(192,200,216,0.6)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    });
  });
}

// ─────────────────────────────────────────────
// 3. MAGNETIC HOVER
// ─────────────────────────────────────────────
export function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magneticStrength || '0.4');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) * strength;
      const dy = (e.clientY - (rect.top  + rect.height / 2)) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// ─────────────────────────────────────────────
// 4. NAV ENTRANCE
// ─────────────────────────────────────────────
export function initNav() {
  gsap.fromTo('#site-nav',
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
  );
}

// ─────────────────────────────────────────────
// 5. HERO ANIMATIONS
// ─────────────────────────────────────────────
export function initHero() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.fromTo('#hero-eyebrow',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
  )
  .fromTo('#hero-title',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
    '-=0.4'
  )
  .fromTo('#hero-subtitle',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.6'
  )
  .fromTo('#hero-cta',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  )
  .fromTo('#hero-scroll-hint',
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: 'power2.out' },
    '-=0.2'
  );
}

// ─────────────────────────────────────────────
// 6. EXPERTISE SECTION — stagger reveal
// ─────────────────────────────────────────────
export function initExpertise() {
  const heading = document.getElementById('expertise-heading');
  const cards   = document.querySelectorAll('.expertise-card');

  if (heading) {
    gsap.fromTo(heading,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  if (cards.length) {
    gsap.fromTo(cards,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#expertise',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }
}

// ─────────────────────────────────────────────
// 7. ARCHITECTURE — horizontal scroll
// ─────────────────────────────────────────────
export function initArchitecture() {
  const container = document.getElementById('arch-track');
  if (!container) return;

  // Wait one frame for layout to settle
  requestAnimationFrame(() => {
    const totalWidth = container.scrollWidth - window.innerWidth;
    if (totalWidth <= 0) return;

    gsap.to(container, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '#architecture-desktop',
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });
  });
}

// ─────────────────────────────────────────────
// 8. CASES — number count-up
// ─────────────────────────────────────────────
export function initCases() {
  // Section header + cards
  const caseCards = document.querySelectorAll('.case-card');
  if (caseCards.length) {
    gsap.fromTo(caseCards,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#cases',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }

  // Count-up numbers
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Number.isInteger(target)
              ? Math.round(this.targets()[0].val) + suffix
              : this.targets()[0].val.toFixed(1) + suffix;
          },
        });
      },
    });
  });
}

// ─────────────────────────────────────────────
// 9. FOOTER
// ─────────────────────────────────────────────
export function initFooter() {
  const cta = document.getElementById('footer-cta');
  if (!cta) return;

  gsap.fromTo(cta,
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 85%',
        once: true,
      },
    }
  );
}

// ─────────────────────────────────────────────
// INIT ALL
// ─────────────────────────────────────────────
function scrambleText() {
  const target = document.getElementById('hero-title');
  if (!target) return;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const originalText = target.getAttribute('data-text') || 'CYLLOR';
  let frame = 0;
  const queue = [];

  for (let i = 0; i < originalText.length; i++) {
    queue.push({
      from: chars[Math.floor(Math.random() * chars.length)],
      to: originalText[i],
      start: Math.floor(Math.random() * 30),
      end: Math.floor(Math.random() * 30) + Math.floor(Math.random() * 30) + 20,
      char: ''
    });
  }

  const update = () => {
    let output = '';
    let complete = 0;
    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end, char } = queue[i];
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.8) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }
    target.textContent = output;
    target.setAttribute('data-text', output);
    
    if (complete !== queue.length) {
      setTimeout(() => requestAnimationFrame(update), 15);
      frame++;
    } else {
      // Done, restore original text just in case
      target.textContent = originalText;
      target.setAttribute('data-text', originalText);
    }
  };

  // Give a small delay before scrambling
  setTimeout(() => requestAnimationFrame(update), 100);
}

export function initAll() {
  initLenis();
  initCursor();
  initMagnetic();
  initNav();
  initHero();
  initExpertise();
  initArchitecture();
  initCases();
  initFooter();
  scrambleText();
}
