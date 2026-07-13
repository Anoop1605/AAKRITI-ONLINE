import React from 'react';
import { COLLEGE_NAME } from '../lib/constants';
import { Globe, MapPin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050407] border-t border-stone-mid/30 py-16 px-6 relative overflow-hidden">
      {/* Ghost Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[18vw] text-text-primary opacity-[0.015] pointer-events-none whitespace-nowrap select-none">
        AAKRITI 2026
      </div>

      {/* Main Footer Layout Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Brand, Contacts, Realms, and Dignitaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-display text-gold text-3xl tracking-widest mb-4">AAKRITI</h3>
            <p className="font-body italic text-text-ghost text-sm mb-6 max-w-xs">
              Where Strength Meets Honour, Art Becomes Legend, and Strategy Rules All.
            </p>
            <div className="flex gap-4">
              <a href="https://www.simsblr.ac.in/" className="p-2 border border-stone-mid rounded-full text-text-ghost hover:text-gold hover:border-gold transition-colors">
                <Globe size={18} />
              </a>
             {/* <a href="" className="p-2 border border-stone-mid rounded-full text-text-ghost hover:text-gold hover:border-gold transition-colors">
                <MessageCircle size={18} />
              </a>*/}
            </div>
          </div>

          {/* Col 2: Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-text-body text-sm tracking-[0.2em] uppercase mb-6">Connect With The Council</h4>
            <div className="space-y-4 font-body text-text-ghost text-sm">
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <p>School of Management Studies, SFGC<br />Bangalore, India</p>
              </div>
              {/*<div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <p>+91 98765 43210</p>
              </div>*/}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <p>aakriti.ylhk.blr@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Col 3: The Realms */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-text-body text-sm tracking-[0.2em] uppercase mb-6">The Realms</h4>
            <div className="flex flex-col gap-3 font-body text-text-ghost text-sm">
              <a href="#sports" className="hover:text-gold transition-colors">Sports District</a>
              <a href="#cultural" className="hover:text-gold transition-colors">Cultural Realms</a>
              <a href="#management" className="hover:text-gold transition-colors">Council Grounds</a>
              <a href="#" className="hover:text-gold transition-colors mt-2">Registration Policy</a>
            </div>
          </div>

          {/* Col 4: Dignitaries (New) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-text-body text-sm tracking-[0.2em] uppercase mb-6">The High Order</h4>
            <div className="space-y-3 font-body text-text-ghost text-xs tracking-wider">
              <div>
                <span className="text-gold block uppercase font-heading text-[10px] tracking-widest">President</span>
                <p className="text-sm">N R Pandith Aradhya</p>
              </div>
              <div>
                <span className="text-gold block uppercase font-heading text-[10px] tracking-widest">Secretary</span>
                <p className="text-sm">Dr. Wooday P Krishna</p>
              </div>
              <div>
                <span className="text-gold block uppercase font-heading text-[10px] tracking-widest">Principal</span>
                <p className="text-sm">Dr. S N Venkatesh</p>
              </div>
              <div>
                <span className="text-gold block uppercase font-heading text-[10px] tracking-widest">Director</span>
                <p className="text-sm"> Dr. Vinay S </p>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Section: Fest Leadership & Coordinators Credits (New) */}
        <div className="border-t border-stone-mid/20 pt-8 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
          <div>
            <h4 className="font-heading text-gold text-xs tracking-[0.2em] uppercase mb-3">Faculty Coordinators</h4>
            <p className="font-body text-text-ghost text-sm tracking-wide leading-relaxed">
              &bull; Dr. Sujatha A M <br></br>  &bull; Ms. Nageshwari U <br></br> &bull; Rakesh Hosamani <br></br>&bull; Sridhara G 
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end text-center sm:text-left">
            <div className="text-left">
              <h4 className="font-heading text-gold text-xs tracking-[0.2em] uppercase mb-3">Student Coordinators</h4>
              <p className="font-body text-text-ghost text-sm tracking-wide leading-relaxed">
                &bull; Jeevitha S <br></br> &bull; Mehdee Khanum <br></br> &bull; Abhishek R <br></br> &bull; Hariharan R <br></br> &bull; Manoj Gowda D M <br></br> &bull; Sushanth J
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Development Copyrights */}
        <div className="mt-8 pt-8 border-t border-stone-mid/30 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-body text-[11px] text-text-ghost tracking-widest uppercase">
            &copy; 2026 {COLLEGE_NAME}. All Rights Reserved.
          </p>
          <p className="font-body text-[15px] text-text-ghost tracking-widest uppercase">
            Forged by The Tech Council <span className="text-gold mx-2">|</span> Developed by <span className="text-gold font-bold tracking-widest drop-shadow-[0_0_12px_rgba(212,160,84,0.75)]">ANOOP S S (MSRIT)</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
