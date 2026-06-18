import React, { useRef } from 'react';
import type { Event } from '../data/events';
import { useCardAnimation } from '../hooks/animations/useCardAnimation';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const cardRef = useRef<any>(null);
  useCardAnimation(cardRef);

  // Determine left bar color based on category and placeholder status
  const getBarColor = () => {
    if (event.isPlaceholder) return 'bg-text-ghost';
    switch (event.category) {
      case 'sports': return 'bg-gold';
      case 'cultural': return 'bg-crimson';
      case 'management': return 'bg-ember';
      default: return 'bg-stone-mid';
    }
  };

  const getSubLabel = () => {
    if (event.isPlaceholder) return 'of [Category TBD]';
    switch (event.category) {
      case 'sports': return 'of the Sports Arena';
      case 'cultural': return 'of the Festival Realms';
      case 'management': return 'of the Council Grounds';
      default: return '';
    }
  };

  const content = (
    <>
      {/* Background Layer with pure CSS scene class */}
      <div className={`card-bg absolute inset-0 ${event.districtTheme} origin-center transition-transform duration-500 ease-out z-0`} />

      {/* Hover Top Border line */}
      <div className="card-border-top absolute top-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 z-10" />

      {/* Left Category Indicator Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${getBarColor()} z-10`} />

      {/* "COMING SOON" Overlay for Placeholders */}
      {event.isPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <span className="font-display text-crimson opacity-40 tracking-[0.4em] text-xl border border-crimson/20 px-4 py-2">COMING SOON</span>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        {/* District Label */}
        <div className="mb-4 flex flex-col items-center w-full">
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] flex-grow bg-gold/30" />
            <span className="card-district-label font-heading text-gold text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
              {event.districtName}
            </span>
            <div className="h-[1px] flex-grow bg-gold/30" />
          </div>
          <span className="font-body italic text-text-ghost text-[11px] mt-1">
            {getSubLabel()}
          </span>
        </div>

        {/* Event Name & Meta */}
        <div className="mb-4 flex flex-col items-center">
          <h3 className="font-display font-bold text-text-primary text-[clamp(16px,4.5vw,22px)] uppercase tracking-wider mb-1">
            {event.name}
          </h3>
          <p className="font-body text-text-ghost text-[12px]">
            {event.teamSize} &middot; {event.duration}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 w-full mb-4 opacity-40">
          <div className="h-[1px] w-12 bg-gold" />
          <span className="text-gold text-[10px]">✦</span>
          <div className="h-[1px] w-12 bg-gold" />
        </div>

        {/* Tagline */}
        <p className="font-body italic text-text-body text-[13px] mb-4">
          "{event.tagline}"
        </p>

        {/* Enter Button (Reveals on Hover) */}
        {!event.isPlaceholder && (
          <div className="card-enter-btn font-heading font-medium text-crimson text-sm tracking-widest mt-2">
            ENTER DISTRICT &rarr;
          </div>
        )}
      </div>
    </>
  );

  if (event.isPlaceholder) {
    return (
      <div 
        ref={cardRef}
        className="event-card relative w-full h-[400px] flex flex-col justify-end p-6 overflow-hidden rounded-[2px] border border-stone-mid/30 bg-stone group opacity-60 cursor-default"
      >
        {content}
      </div>
    );
  }

  return (
    <Link 
      to={`/events/${event.id}`}
      ref={cardRef}
      className="event-card relative w-full h-[400px] flex flex-col justify-end p-6 overflow-hidden rounded-[2px] border border-stone-mid/30 bg-stone group opacity-100 cursor-pointer block no-underline text-current"
      onClick={onClick}
    >
      {content}
    </Link>
  );
};
