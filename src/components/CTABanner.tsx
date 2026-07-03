import React, { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';

export const CTABanner: React.FC = () => {
  const bannerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // We could dispatch an event to double petal density when this is in view, 
    // but a simpler GSAP ScrollTrigger approach works here.
    if (!bannerRef.current) return;
    
    gsap.fromTo(bannerRef.current.querySelector('.cta-glow'),
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 0.15, 
        scale: 1, 
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={bannerRef} className="relative w-full h-[100svh] flex flex-col items-center justify-center bg-void overflow-hidden">
      {/* Crimson radial glow */}
      <div className="cta-glow absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.crimson),transparent_70%)] opacity-0 pointer-events-none mix-blend-screen" />
      
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 opacity=%220.6%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-gold/50 mb-10" />
        
        <h2 className="font-display font-black text-text-primary text-[clamp(40px,8vw,90px)] leading-[1.1] tracking-wider mb-12 drop-shadow-[0_0_30px_rgba(192,57,43,0.3)]">
          THE CASTLE<br />AWAITS YOUR NAME
        </h2>

        <button 
          onClick={() => {
            const target = document.getElementById('sports');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group relative bg-crimson hover:bg-crimson-hi text-text-primary font-heading font-semibold tracking-[0.2em] text-[clamp(16px,4vw,20px)] py-5 px-12 rounded-[2px] transition-all duration-300 shadow-[0_0_20px_rgba(192,57,43,0.4)] hover:shadow-[0_0_40px_rgba(192,57,43,0.6)]"
        >
          <span className="relative z-10">OPEN THE GATES</span>
          <div className="absolute inset-0 border border-gold/50 scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-[2px]" />
        </button>
      </div>
    </section>
  );
};
