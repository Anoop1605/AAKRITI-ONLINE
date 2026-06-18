import React from 'react';
import { COLLEGE_NAME } from '../lib/constants';
import { Globe, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050407] border-t border-stone-mid/30 py-16 px-6 relative overflow-hidden">
      {/* Ghost Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[18vw] text-text-primary opacity-[0.015] pointer-events-none whitespace-nowrap select-none">
        AAKRITI 2026
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Left Col: Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-display text-gold text-3xl tracking-widest mb-4">AAKRITI</h3>
          <p className="font-body italic text-text-ghost text-sm mb-6 max-w-xs">
            Where Strength Meets Honour, Art Becomes Legend, and Strategy Rules All.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 border border-stone-mid rounded-full text-text-ghost hover:text-gold hover:border-gold transition-colors">
              <Globe size={18} />
            </a>
            <a href="#" className="p-2 border border-stone-mid rounded-full text-text-ghost hover:text-gold hover:border-gold transition-colors">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Center Col: Contact */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-heading text-text-body text-sm tracking-[0.2em] uppercase mb-6">Connect With The Council</h4>
          <div className="space-y-4 font-body text-text-ghost text-sm">
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
              <p>{COLLEGE_NAME}<br />Bangalore, India</p>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone size={16} className="text-gold flex-shrink-0" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail size={16} className="text-gold flex-shrink-0" />
              <p>council@aakriti.edu</p>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-heading text-text-body text-sm tracking-[0.2em] uppercase mb-6">The Realms</h4>
          <div className="flex flex-col gap-3 font-body text-text-ghost text-sm">
            <a href="#sports" className="hover:text-gold transition-colors">Sports District</a>
            <a href="#cultural" className="hover:text-gold transition-colors">Cultural Realms</a>
            <a href="#management" className="hover:text-gold transition-colors">Council Grounds</a>
            <a href="#" className="hover:text-gold transition-colors mt-2">Registration Policy</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-mid/30 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="font-body text-[11px] text-text-ghost tracking-widest uppercase">
          &copy; 2026 {COLLEGE_NAME}. All Rights Reserved.
        </p>
        <p className="font-body text-[11px] text-text-ghost tracking-widest uppercase">
          Forged by The Tech Council
        </p>
      </div>
    </footer>
  );
};
