import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

interface HeroRefs {
  heroSection: React.RefObject<HTMLElement | null>;
  stoneBg: React.RefObject<HTMLDivElement | null>;
  ghostText: React.RefObject<HTMLDivElement | null>;
  heroLines: React.MutableRefObject<HTMLElement[]>;
  eyebrow: React.RefObject<HTMLParagraphElement | null>;
  tagline: React.RefObject<HTMLParagraphElement | null>;
  cta: React.RefObject<HTMLButtonElement | null>;
  countdown: React.RefObject<HTMLDivElement | null>;
}

export function useHeroAnimation(refs: HeroRefs) {
  useGSAP(() => {
    const heroSection = refs.heroSection.current;
    const stoneBg = refs.stoneBg.current;
    const ghostText = refs.ghostText.current;
    const heroLines = refs.heroLines.current;
    const eyebrow = refs.eyebrow.current;
    const tagline = refs.tagline.current;
    const cta = refs.cta.current;
    const countdown = refs.countdown.current;

    if (!heroSection) return;

    // --- Entrance Animations ---
    const fadeOutStart = 5.2; 
    const fadeDuration = 1.0;
    const fullyDisappeared = fadeOutStart + fadeDuration;

    // 1. Ghost text waits completely for intro to finish before appearing
    if (ghostText) {
      gsap.fromTo(ghostText,
        { opacity: 0 },
        { opacity: 0.4, duration: 1.5, ease: 'power2.out', delay: fullyDisappeared + 0.5 }
      );
    }

    if (eyebrow) {
      gsap.fromTo(eyebrow, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: fullyDisappeared }
      );
    }

    if (heroLines.length > 0) {
      // 2. The Outline drops in first
      gsap.fromTo(heroLines,
        { clipPath: 'inset(100% 0% 0% 0%)', y: 15 },
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          y: 0,
          duration: 1.2, 
          stagger: 0.25, 
          ease: 'power4.out',
          delay: fullyDisappeared + 0.1
        }
      );

      // 3. The Red/Gold Gradient fills in from left to right
      if (heroLines[0]) {
        gsap.to(heroLines[0], {
          backgroundSize: '100% 100%',
          duration: 1.8,
          ease: 'power2.inOut',
          delay: fullyDisappeared + 1.0 // Starts right after outline settles
        });
      }
    }

    if (tagline) {
      gsap.fromTo(tagline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: fullyDisappeared + 0.4 }
      );
    }

    if (cta) {
      gsap.fromTo(cta,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', delay: fullyDisappeared + 0.7 }
      );
    }

    if (countdown) {
      const children = countdown.children;
      gsap.fromTo(children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: fullyDisappeared + 1.0 }
      );
    }

    // --- Parallax Scroll Effects ---
    
    // Stone background layer (Layer 2) -> moves at 0.1x scroll
    if (stoneBg) {
      gsap.to(stoneBg, {
        y: '10%', // relatively slow movement
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Ghost text (Layer 3) -> moves at 0.25x scroll
    if (ghostText) {
      gsap.to(ghostText, {
        y: '-25%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }
    
    // Note: PetalCanvas parallax (Layer 4) is managed globally or omitted for performance unless explicitly requested per-layer.
    
  }, []);
}
