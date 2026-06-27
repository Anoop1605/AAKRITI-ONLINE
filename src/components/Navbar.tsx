import React, { useState, useRef } from 'react';
import { useNavbarAnimation } from '../hooks/animations/useNavbarAnimation';
import { Menu, X } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import { useRegistrationStore } from '../store/registrationStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { openModal } = useRegistrationStore();
  const navbarRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomepage = location.pathname === '/';

  useNavbarAnimation(navbarRef);

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
            onClick={openModal} 
            className="group relative px-6 py-2 bg-[#050407] border border-crimson/40 hover:border-gold rounded-[2px] transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(192,57,43,0.15)] hover:shadow-[0_0_25px_rgba(212,160,84,0.25)]"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-crimson/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10 text-premium-fire font-heading font-semibold tracking-wider text-sm">
              ENTER THE GATE
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
               openModal();
             }}
             className="group relative mt-4 py-4 bg-[#050407] border border-crimson/50 hover:border-gold rounded-[2px] opacity-0 overflow-hidden shadow-[0_0_20px_rgba(192,57,43,0.2)]"
          >
            {/* Inner glow on the mobile button */}
            <div className="absolute inset-0 bg-gradient-to-r from-crimson/15 to-gold/15 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10 text-premium-fire font-heading font-bold tracking-[0.25em] text-xl">
              ENTER THE GATE
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
