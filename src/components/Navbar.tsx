import React, { useState, useRef, useEffect } from 'react';
import { useNavbarAnimation } from '../hooks/animations/useNavbarAnimation';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRegistrationStore } from '../store/registrationStore';
import TypewriterText from './TypewriterText';

export const Navbar: React.FC = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const { isAboutOpen, openAbout, closeAbout } = useRegistrationStore();

  const aakritiText = `AAKRITI 2026 – Rise Beyond Limits

Derived from the Sanskrit word meaning creation or expression, AAKRITI is more than a name it is a celebration of ideas, talent, and transformation. It is a platform where creativity finds purpose, leadership takes shape, and every individual is empowered to leave a lasting impact.

Inspired by the spirit of Demon Slayer, AAKRITI 2026 reflects the values of courage, resilience, discipline, and unity. Just as every slayer faces challenges with unwavering determination, every participant is invited to step beyond their comfort zone, embrace competition, and discover the strength within.

From electrifying cultural performances to intellectually stimulating management events, every challenge is an opportunity to learn, lead, and grow. Every stage becomes a battlefield of talent, where passion is the greatest strength and perseverance leads to victory.

AAKRITI is not just about winning it is about inspiring minds, building connections, and nurturing individuals who will shape a better tomorrow. By bringing together students from diverse institutions, the fest fosters collaboration, innovation, and a shared vision of excellence.

Create with purpose. Compete with passion. Rise with courage.
AAKRITI 2026 where every challenge shapes a champion, and every creation tells a story.`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomepage = location.pathname === '/';

  useNavbarAnimation(navbarRef);

  useEffect(() => {
    if (isAboutOpen) {
      document.body.style.overflow = 'hidden';
      ScrollTrigger.normalizeScroll(false);
    } else {
      document.body.style.overflow = '';
      ScrollTrigger.normalizeScroll(true);
    }
    return () => {
      document.body.style.overflow = '';
      ScrollTrigger.normalizeScroll(true);
    };
  }, [isAboutOpen]);

  useGSAP(() => {
    if (!menuRef.current) return;
    
    if (isMenuOpen) {
      gsap.to(menuRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' });
      gsap.fromTo(linksRef.current, 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.4, ease: 'power2.in' });
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Sports', href: '#sports' },
    { name: 'Management', href: '#management' },
    { name: 'Cultural', href: '#cultural' },
  ];

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomepage) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else {
      e.preventDefault();
      navigate('/' + href);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav ref={navbarRef} className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between transition-colors">
        {/* Logo Container */}
        <div className="w-[160px]">
          <Link to="/" className="navbar-logo block pointer-events-auto transition-opacity hover:opacity-80">
            <svg width="160" height="36" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AAKRITI">
              <defs>
                <linearGradient id="gold-to-red-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4A054" />
                  <stop offset="100%" stopColor="#C0392B" />
                </linearGradient>
                <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4A054" />
                  <stop offset="100%" stopColor="#F0C070" />
                </linearGradient>
                <linearGradient id="crimson-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C0392B" />
                  <stop offset="100%" stopColor="#6B1A1A" />
                </linearGradient>
                <filter id="logo-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* "AAKRITI" in gold to red gradient */}
              <text
                x="7"
                y="28"
                fontFamily="'Cinzel Decorative', serif"
                fontWeight="900"
                fontSize="26"
                fill="url(#gold-to-red-grad)"
                filter="url(#logo-glow)"
              >AAKRITI</text>
            </svg>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavLink(e, link.href)}
              className="nav-link-blade font-body transition-colors duration-300 text-lg"
            >
              {link.name}
            </a>
          ))}
          
          {/* Premium Fire CTA Button */}
          <button 
            onClick={openAbout} 
            className="group relative px-6 py-2 bg-[#050407] border border-crimson/40 hover:border-gold rounded-[2px] transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(192,57,43,0.15)] hover:shadow-[0_0_25px_rgba(212,160,84,0.25)]"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-crimson/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10 text-premium-fire font-heading font-semibold tracking-wider text-sm">
              ABOUT AAKRITI
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-primary z-[110]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 z-[105] mobile-menu-fire-glow flex flex-col justify-center px-8 translate-x-full overflow-hidden border-l border-crimson/20"
      >
        {/* Return Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-gold hover:text-gold-bright transition-colors font-body text-lg uppercase tracking-wider"
          >
            <ArrowLeft size={20} />
            <span>Return Back</span>
          </button>
        </div>

        {/* Deep Crimson Radial Center (Subtle) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,57,43,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Background Ghost Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[22vw] text-text-primary opacity-[0.03] pointer-events-none whitespace-nowrap tracking-widest text-stroke-gold">
          AAKRITI
        </div>

        <div className="flex flex-col gap-8 z-10 relative">
          {navLinks.map((link, i) => (
            <React.Fragment key={link.name}>
              <a 
                ref={el => { if (el) linksRef.current[i] = el; }}
                href={link.href}
                onClick={(e) => handleNavLink(e, link.href)}
                className="mobile-nav-link font-body text-4xl font-medium tracking-wide text-center opacity-0 transition-all duration-300"
              >
                {link.name}
              </a>
              {i < navLinks.length - 1 && (
                <div className="h-px w-full max-w-[120px] mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              )}
            </React.Fragment>
          ))}
          
          <div className="h-px w-full max-w-[120px] mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-4" />
          
          <button 
             ref={el => { if (el) linksRef.current[navLinks.length] = el as unknown as HTMLAnchorElement; }}
             onClick={() => {
               setIsMenuOpen(false);
               openAbout();
             }}
             className="group relative mt-4 py-4 bg-[#050407] border border-crimson/50 hover:border-gold rounded-[2px] opacity-0 overflow-hidden shadow-[0_0_20px_rgba(192,57,43,0.2)]"
          >
            {/* Inner glow on the mobile button */}
            <div className="absolute inset-0 bg-gradient-to-r from-crimson/15 to-gold/15 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10 text-premium-fire font-heading font-bold tracking-[0.25em] text-xl">
              ABOUT AAKRITI
            </span>
          </button>
        </div>
      </div>

      {/* The About Overlay Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[200] bg-[#050407]/98 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-6 md:p-12 pt-24 md:pt-32">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 opacity=%220.6%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
          
          {/* Radial crimson glow behind the modal */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,57,43,0.08)_0%,transparent_60%)] pointer-events-none" />

          {/* Close button with premium look */}
          <button 
            onClick={closeAbout}
            className="absolute top-6 right-6 z-20 text-text-body hover:text-crimson hover:border-crimson/40 transition-all duration-300 font-heading tracking-widest text-xs md:text-sm border border-stone-mid px-4 py-2 bg-void"
          >
            [ CLOSE REALM ]
          </button>
          
          <div className="max-w-3xl w-full border border-stone-mid/60 bg-void/80 p-8 md:p-12 shadow-[0_0_50px_rgba(192,57,43,0.1)] rounded-[2px] relative z-10 mb-24">
            {/* Corner decorations for that ancient demon slayer scroll feel */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold/40"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold/40"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold/40"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold/40"></div>
            
            <TypewriterText text={aakritiText} />
          </div>
        </div>
      )}
    </>
  );
};
