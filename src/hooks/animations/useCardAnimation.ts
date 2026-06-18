import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export function useCardAnimation(cardRef: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const borderTop = card.querySelector('.card-border-top');
    const distLabel = card.querySelector('.card-district-label');
    const enterBtn = card.querySelector('.card-enter-btn');
    const bgLayer = card.querySelector('.card-bg');

    const tl = gsap.timeline({ paused: true });
    
    tl.to(card, { y: -8, duration: 0.35, ease: 'power2.out' })
      .to(bgLayer, { scale: 1.04, duration: 0.4, ease: 'power2.out' }, 0);
      
    if (borderTop) {
      tl.to(borderTop, { scaleX: 1, transformOrigin: 'left', duration: 0.4, ease: 'power2.inOut' }, 0);
    }
    
    if (distLabel) {
      tl.to(distLabel, { letterSpacing: '0.35em', duration: 0.3, ease: 'power2.out' }, 0.05);
    }
    
    if (enterBtn) {
      // Set initial state for button just to be safe
      gsap.set(enterBtn, { opacity: 0, y: 10 });
      tl.to(enterBtn, { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }, 0.1);
    }

    const play = () => tl.play();
    const reverse = () => tl.reverse();
    const touchReverse = () => setTimeout(() => tl.reverse(), 800);

    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', reverse);
    card.addEventListener('touchstart', play, { passive: true });
    card.addEventListener('touchend', touchReverse, { passive: true });

    return () => {
      card.removeEventListener('mouseenter', play);
      card.removeEventListener('mouseleave', reverse);
      card.removeEventListener('touchstart', play);
      card.removeEventListener('touchend', touchReverse);
    };
  }, []);
}
