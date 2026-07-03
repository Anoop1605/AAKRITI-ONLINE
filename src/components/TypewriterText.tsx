import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null); // Anchor element reference
  const isProgrammaticScrollRef = useRef(false);
  const userScrolledUpRef = useRef(false);

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

  // Handle scroll listener to detect manual scroll up vs bottom scroll
  useEffect(() => {
    const scrollContainer = bottomRef.current?.closest('.overflow-y-auto');
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) {
        return; // Programmatically scrolled, ignore this scroll event
      }

      // Check if user is near the bottom
      const isAtBottom =
        scrollContainer.scrollHeight -
        scrollContainer.scrollTop -
        scrollContainer.clientHeight <= 120; // 120px threshold

      if (isAtBottom) {
        userScrolledUpRef.current = false;
      } else {
        userScrolledUpRef.current = true;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect handles auto-scrolling to the active typed area
  useEffect(() => {
    if (bottomRef.current && !userScrolledUpRef.current) {
      const scrollContainer = bottomRef.current.closest('.overflow-y-auto');
      if (scrollContainer) {
        isProgrammaticScrollRef.current = true;
        bottomRef.current.scrollIntoView({
          behavior: 'auto', // Omit smooth scroll to prevent layout stutter/easing fight
          block: 'nearest',
        });
        
        // Reset the programmatic scroll flag on the next tick
        const timer = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 50);
        return () => clearTimeout(timer);
      } else {
        bottomRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });
      }
    }
  }, [displayedText]); // Fires every single time a character types out

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
