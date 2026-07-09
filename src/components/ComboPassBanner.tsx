import React from 'react';
import { useRegistrationStore } from '../store/registrationStore';
import { Sparkles, Trophy } from 'lucide-react';

export const ComboPassBanner: React.FC = () => {
  const { openModal } = useRegistrationStore();

  const handleRegisterCombo = () => {
    useRegistrationStore.setState({ 
      selectedEventId: 'cm-pass',
      step: 1 
    });
    openModal();
  };

  return (
    <section className="w-full py-12 px-4 bg-void relative z-10 flex justify-center">
      <div className="max-w-4xl w-full bg-gradient-to-r from-stone-mid via-stone to-stone-mid border border-gold/30 rounded-[3px] p-8 md:p-12 shadow-[0_0_50px_rgba(212,160,84,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        {/* Cinematic Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,84,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Left Content */}
        <div className="flex-1 space-y-4 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-2 text-gold font-mono text-xs tracking-[0.25em] uppercase">
            <Trophy size={14} />
            <span>UNIFIED CITADEL PASS</span>
          </div>
          
          <h3 className="font-display font-bold text-text-primary text-2xl md:text-3xl tracking-wide uppercase">
            12-Event Contingent Pass
          </h3>
          
          <p className="font-body text-text-ghost text-sm md:text-base leading-relaxed max-w-xl">
            Register your entire college contingent for all 6 Cultural and 6 Management events sequentially. Lock in your entry for the ultimate championship at a 10% flat discount.
          </p>

          <div className="inline-flex items-center gap-3 bg-void/50 border border-gold/10 px-4 py-2 rounded text-xs font-mono text-gold">
            <Sparkles size={12} />
            <span>SEQUENTIAL ROSTER AUTO-SAVE ENABLED</span>
          </div>
        </div>

        {/* Right Action */}
        <div className="flex flex-col items-center justify-center shrink-0 z-10 gap-3">
          <div className="text-center">
            <span className="block font-body text-text-ghost text-xs tracking-wider uppercase mb-1">BUNDLE VALUE</span>
            <span className="font-heading text-gold text-4xl font-bold">₹3,540</span>
          </div>

          <button
            onClick={handleRegisterCombo}
            className="mt-2 bg-gold hover:bg-gold-bright text-void font-heading font-bold tracking-widest text-sm py-4 px-8 rounded-[2px] transition-all shadow-[0_0_15px_rgba(212,160,84,0.3)] hover:shadow-[0_0_25px_rgba(212,160,84,0.5)] hover:scale-[1.02] border border-gold/50 cursor-pointer"
          >
            CLAIM THE PASS &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
