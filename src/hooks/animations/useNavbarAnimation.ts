import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export function useNavbarAnimation(navbarRef: React.RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (!navbarRef.current) return;

    // Apply the initial state (transparent)
    gsap.set(navbarRef.current, {
      backgroundColor: 'transparent',
      backdropFilter: 'blur(0px)',
      borderBottom: '1px solid rgba(212, 160, 84, 0)'
    });

    const logo = navbarRef.current.querySelector('.navbar-logo');
    if (logo) {
      gsap.fromTo(logo, 
        { x: -30, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out', delay: 3.5 }
      );
    }

    const scrollAnim = gsap.to(navbarRef.current, {
      backgroundColor: 'rgba(5, 4, 7, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(212, 160, 84, 0.12)',
      duration: 0.5,
      paused: true
    });

    const handleScroll = () => {
      if (window.scrollY > 60) {
        scrollAnim.play();
      } else {
        scrollAnim.reverse();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
