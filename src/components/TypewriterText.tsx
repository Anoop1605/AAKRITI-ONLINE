import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterTextProps {
  text: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const userHasScrolledRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Effect handles typing mechanism
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        const charToType = text[currentIndex];
        setDisplayedText((prev) => prev + charToType);
        
        let delay = 25; // Optimized speed for full length readability
        
        if (charToType === ',') {
          delay = 400; // 400ms pause for commas
        } else if (charToType === '.' || charToType === '!' || charToType === '?') {
          delay = 800; // 800ms pause for periods
        }

        currentIndex++;
        timeoutId = setTimeout(typeNextChar, delay);
      }
    };

    typeNextChar();
    return () => clearTimeout(timeoutId);
  }, [text]);

  // Detect user-initiated scroll via wheel or touch events on the scroll container.
  // We listen for wheel/touchmove instead of the 'scroll' event because 'scroll'
  // fires for both programmatic and user scrolls and cannot reliably distinguish them.
  const handleUserScroll = useCallback(() => {
    userHasScrolledRef.current = true;

    // Clear any existing timeout to debounce
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  }, []);

  // Track scroll position to detect when user scrolls back to bottom
  const handleScrollPosition = useCallback(() => {
    const scrollContainer = bottomRef.current?.closest('.overflow-y-auto');
    if (!scrollContainer) return;

    const isAtBottom =
      scrollContainer.scrollHeight -
      scrollContainer.scrollTop -
      scrollContainer.clientHeight <= 80; // 80px threshold

    if (isAtBottom && userHasScrolledRef.current) {
      // User scrolled back to the bottom — re-enable auto-scroll
      userHasScrolledRef.current = false;
    }

    lastScrollTopRef.current = scrollContainer.scrollTop;
  }, []);

  useEffect(() => {
    const scrollContainer = bottomRef.current?.closest('.overflow-y-auto');
    if (!scrollContainer) return;

    // Listen for direct user input events
    scrollContainer.addEventListener('wheel', handleUserScroll, { passive: true });
    scrollContainer.addEventListener('touchmove', handleUserScroll, { passive: true });
    // Track position on any scroll (to detect return-to-bottom)
    scrollContainer.addEventListener('scroll', handleScrollPosition, { passive: true });

    return () => {
      scrollContainer.removeEventListener('wheel', handleUserScroll);
      scrollContainer.removeEventListener('touchmove', handleUserScroll);
      scrollContainer.removeEventListener('scroll', handleScrollPosition);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleUserScroll, handleScrollPosition]);

  // Auto-scroll to the bottom as text types — but only when the user
  // hasn't manually scrolled away.
  useEffect(() => {
    if (!bottomRef.current || userHasScrolledRef.current) return;

    const scrollContainer = bottomRef.current.closest('.overflow-y-auto');
    if (scrollContainer) {
      // Use scrollTop assignment for instant, non-interruptive scrolling
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div className="text-text-primary text-xl md:text-2xl leading-relaxed font-body whitespace-pre-wrap selection:bg-crimson selection:text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
      {displayedText}
      {/* Blinking indicator cursor */}
      <span className="animate-pulse border-r-2 border-gold ml-1 inline-block h-[1.1em] align-middle"></span>
      
      {/* The invisible scrolling anchor */}
      <div ref={bottomRef} className="h-2 w-full pointer-events-none" />
    </div>
  );
};

export default TypewriterText;
