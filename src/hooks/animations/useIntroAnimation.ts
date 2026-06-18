import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

interface IntroRefs {
  overlay: React.RefObject<HTMLDivElement | null>;
  lines: React.MutableRefObject<HTMLDivElement[]>;
  logoChars: React.MutableRefObject<HTMLSpanElement[]>;
  subtitle: React.RefObject<HTMLParagraphElement | null>;
  flare: React.RefObject<HTMLDivElement | null>;
}

export function useIntroAnimation(refs: IntroRefs, onComplete: () => void) {
  useGSAP(() => {
    const overlay = refs.overlay.current;
    const lines = refs.lines.current;
    const logoChars = refs.logoChars.current;
    const subtitle = refs.subtitle.current;
    const flare = refs.flare.current;

    if (!overlay) return;

    const tl = gsap.timeline({ onComplete });

    if (lines.length > 0) {
      tl.fromTo(lines,
        { scaleX: 0, opacity: 0, transformOrigin: 'center center' },
        { scaleX: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
        0.6
      );
    }

    if (logoChars.length > 0) {
      tl.fromTo(logoChars,
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.07, ease: 'power3.out' },
        1.2
      );
    }

    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, letterSpacing: '0.5em' },
        { opacity: 1, letterSpacing: '0.2em', duration: 1.0, ease: 'power2.out' },
        2.0
      );
    }

    if (flare) {
      tl.fromTo(flare,
        { scale: 0, opacity: 0 },
        { scale: 3, opacity: 0.12, duration: 0.6, ease: 'power2.out' },
        2.8
      );
      tl.to(flare, { opacity: 0, duration: 0.4 }, 3.2);
    }

    tl.to(overlay,
      { opacity: 0, duration: 0.9, ease: 'power2.inOut', pointerEvents: 'none' },
      3.5
    );
  }, []); // Run once on mount
}
