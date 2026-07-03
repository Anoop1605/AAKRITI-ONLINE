import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export function useCategoryAnimation(
  pinSectionRef: React.RefObject<HTMLElement | null>,
  panelsRef: React.RefObject<(HTMLDivElement | null)[]>
) {
  useGSAP(() => {
    if (!pinSectionRef.current || !panelsRef.current || panelsRef.current.length === 0) return;

    // Create a master timeline locked to the scrollbar
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSectionRef.current,
        start: 'top top',
        // +=200% because we have 3 cards, but we only need to animate 2 of them away (the last one stays)
        end: '+=200%', 
        pin: true,
        scrub: 1, 
      }
    });

    const p0 = panelsRef.current[0];
    const p1 = panelsRef.current[1];

    // 1. Animate Panel 0 (Breathing Districts) away
    if (p0) {
      tl.to(p0, {
        yPercent: -100,      // Slide it straight up off the screen
        rotationX: 15,       // Tilt the top away from the user
        scale: 0.85,         // Shrink it slightly so it feels like it's falling backward
        opacity: 0,
        ease: 'power1.inOut'
      }, 0); // The '0' means start exactly at the beginning of the scroll
    }

    // 2. Animate Panel 1 (Council Grounds) away
    if (p1) {
      tl.to(p1, {
        yPercent: -100,
        rotationX: 15,
        scale: 0.85,
        opacity: 0,
        ease: 'power1.inOut'
      }, 1); // The '1' means wait until Panel 0 is fully done before starting this one
    }

  }, []);
}
