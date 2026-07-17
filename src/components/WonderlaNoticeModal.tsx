import { useState, useEffect } from 'react';

export const WonderlaNoticeModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the intro has already played
    const introAlreadyPlayed = sessionStorage.getItem('introPlayed');
    
    // Wait for the full intro animation (6.2s) + buffer if playing, otherwise brief delay
    const delay = introAlreadyPlayed ? 1500 : 8200;

    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, []);

  const closeNotice = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-md transition-opacity duration-500">
      {/* Outer Glowing Border */}
      <div className="relative w-full max-w-lg p-[1px] bg-gradient-to-b from-amber-500/50 to-red-600/50 rounded-lg shadow-[0_0_50px_rgba(245,158,11,0.2)] transform scale-100 transition-transform duration-300">
        
        {/* Inner Modal Content */}
        <div className="relative bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-lg text-center overflow-hidden">
          
          {/* Subtle Background Glow inside the modal */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/10 blur-[50px] pointer-events-none"></div>

          {/* Close Button */}
          <button
            onClick={closeNotice}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-xl font-light focus:outline-none"
            aria-label="Close notice"
          >
            ✕
          </button>
          
          <h3 className="font-display text-2xl sm:text-3xl text-amber-500 mb-1 tracking-wider uppercase">
            Special Bounty
          </h3>
          <p className="text-gray-400 mb-8 uppercase tracking-[0.2em] text-xs font-semibold">
            The Ultimate Reward Awaits
          </p>
          
          <div className="space-y-4 text-left font-body">
            {/* Sports Tickets */}
            <div className="p-4 border border-amber-500/20 bg-amber-500/5 rounded-md flex items-center gap-4 transition-all duration-300 hover:bg-amber-500/10 hover:border-amber-500/40">
              <div className="text-4xl drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] select-none">🎫</div>
              <div>
                <h4 className="text-white font-bold tracking-wide uppercase text-sm sm:text-base">5 Wonderla Tickets</h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Reserved for the Champions of the <span className="text-amber-500">Sports Realm</span>
                </p>
              </div>
            </div>
            
            {/* Culturals & Management Tickets */}
            <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-md flex items-center gap-4 transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/40">
              <div className="text-4xl drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] select-none">🎢</div>
              <div>
                <h4 className="text-white font-bold tracking-wide uppercase text-sm sm:text-base">5 Wonderla Tickets</h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Reserved for the Victors of <span className="text-red-400">Culturals & Management</span>
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={closeNotice}
            className="mt-8 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-amber-500 transition-all duration-300 w-full rounded-sm shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)]"
          >
            Accept The Challenge
          </button>
        </div>
      </div>
    </div>
  );
};
