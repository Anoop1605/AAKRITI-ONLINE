import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export function useCategoryAnimation(
  pinSectionRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>
) {
  useGSAP(() => {
    if (!pinSectionRef.current || !trackRef.current) return;

    ScrollTrigger.create({
      trigger: pinSectionRef.current,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        
        // Track moves from 0 to -200vw (to show all 3 panels of 100vw each)
        // Wait, if it's 3 panels, moving by -200vw brings the 3rd panel into view.
        gsap.set(trackRef.current, { x: `-${p * 200}vw` });

        // Fade logic based on progress
        const panels = document.querySelectorAll('.panel-content');
        
        // Panel 1 (Sports): active around 0 - 0.2
        if (panels[0]) gsap.to(panels[0], { opacity: p < 0.2 ? 1 : 0, duration: 0.2, overwrite: 'auto' });
        
        // Panel 2 (Cultural): active around 0.4 - 0.6
        if (panels[1]) gsap.to(panels[1], { opacity: (p > 0.3 && p < 0.7) ? 1 : 0, duration: 0.2, overwrite: 'auto' });
        
        // Panel 3 (Management): active around 0.8 - 1.0
        if (panels[2]) gsap.to(panels[2], { opacity: p > 0.8 ? 1 : 0, duration: 0.2, overwrite: 'auto' });
      }
    });
  }, []);
}
