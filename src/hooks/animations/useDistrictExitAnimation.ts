import { gsap } from '../../lib/gsap';

export function useDistrictExitAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  onComplete: () => void
) {
  return () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -24,
        duration: 0.35,
        ease: 'power2.in',
        onComplete,
      });
    } else {
      onComplete();
    }
  };
}
