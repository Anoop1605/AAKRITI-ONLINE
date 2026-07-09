import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react'; 

export default function GlobalCommsWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  if (location.pathname.includes('/event')) {
    return null; 
  }

  const handleMobileRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Halt instant redirect
    e.stopPropagation();

    // If already animating, prevent double triggers
    if (isExpanded) return;

    // Step 1: Fire expansion animation
    setIsExpanded(true);

    // Step 2: Wait for animation timeline to resolve completely (500ms)
    setTimeout(() => {
      window.open("https://chat.whatsapp.com/JDAaWAtqcKW9sUP89ZHDmh", "_blank", "noopener,noreferrer");
      
      // Step 3: Collapse back to clean circle instantly after redirect
      setIsExpanded(false);
    }, 500);
  };

  return (
    <a
      href="https://chat.whatsapp.com/JDAaWAtqcKW9sUP89ZHDmh"
      onClick={handleMobileRedirect}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      // Base styles + Glow + Expanding layout
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center bg-stone/90 border border-stone-mid/80 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(212,160,84,0.15)] transition-all duration-500 overflow-hidden hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,160,84,0.4)] hover:scale-105 group"
    >
      {/* Icon Container */}
      <div className="p-4 text-gold transition-transform duration-300 group-hover:animate-pulse">
        <MessageCircle size={24} className="drop-shadow-[0_0_8px_rgba(212,160,84,0.8)]" />
      </div>
      
      {/* Expanding Text with Smooth Width & Opacity Transition */}
      <div 
        className={`whitespace-nowrap font-demon-slayer tracking-widest text-sm text-text-primary transition-all duration-500 ease-in-out flex items-center ${
          isExpanded ? 'max-w-[200px] opacity-100 pr-6 translate-x-0' : 'max-w-0 opacity-0 pr-0 translate-x-4'
        }`}
      >
        KASUGAI DISPATCH
      </div>
    </a>
  );
}
