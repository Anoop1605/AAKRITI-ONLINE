import React, { useRef } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { events } from '../data/events';
import { useRegistrationStore } from '../store/registrationStore';
import { useDistrictEntranceAnimation } from '../hooks/animations/useDistrictEntranceAnimation';
import { useDistrictExitAnimation } from '../hooks/animations/useDistrictExitAnimation';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const event = events.find((e) => e.id === eventId);
  const { openModal } = useRegistrationStore();

  // Run the entrance animation
  useDistrictEntranceAnimation(containerRef, event?.districtTheme || '');

  // Setup exit animation
  const playExitAnimation = useDistrictExitAnimation(containerRef, () => {
    const hasHistory = (window.history.state && window.history.state.idx > 0) || location.state?.fromHome;
    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(`/#${event?.category}`);
    }
  });

  if (!event) {
    return (
      <div className="min-h-screen bg-void flex flex-col items-center justify-center p-6 text-center text-text-primary">
        <h1 className="font-display text-4xl text-crimson mb-4 uppercase tracking-wider">District Lost</h1>
        <p className="font-body text-text-body mb-8 max-w-md">This realm does not exist in the castle archives.</p>
        <Link to="/" className="font-heading border border-gold/30 hover:border-gold px-6 py-2 text-gold tracking-widest text-sm transition-all duration-300">
          RETURN TO SAFETY
        </Link>
      </div>
    );
  }

  const handleRegister = () => {
    // Set the specific event and start at step 1
    useRegistrationStore.setState({ 
      selectedEventId: event.id,
      step: 1 
    });
    openModal();
  };

  const getCategoryColor = () => {
    switch (event.category) {
      case 'sports': return '#D4A054';
      case 'cultural': return '#C0392B';
      case 'management': return '#8B5E1A';
      default: return '#EDE8E0';
    }
  };

  const getSubLabel = () => {
    switch (event.category) {
      case 'sports': return 'of the Sports Arena';
      case 'cultural': return 'of the Festival Realms';
      case 'management': return 'of the Council Grounds';
      default: return '';
    }
  };

  const renderAmbientElements = (theme: string) => {
    switch (theme) {
      case 'card-stone':
      case 'card-tug':
        return (
          <>
            <div className="detail-torch-glow absolute w-[100px] h-[100px] rounded-full pointer-events-none z-10" style={{ left: '15%', top: '60%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(212,160,84,0.18) 0%, transparent 70%)' }} />
            <div className="detail-torch-glow absolute w-[100px] h-[100px] rounded-full pointer-events-none z-10" style={{ left: '50%', top: '55%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(212,160,84,0.18) 0%, transparent 70%)' }} />
            <div className="detail-torch-glow absolute w-[100px] h-[100px] rounded-full pointer-events-none z-10" style={{ left: '85%', top: '60%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(212,160,84,0.18) 0%, transparent 70%)' }} />
            <div className="detail-dust-overlay absolute inset-0 pointer-events-none z-[2] opacity-0" style={{ background: 'radial-gradient(circle at center, rgba(212,160,84,0.03) 0%, transparent 80%)' }} />
          </>
        );
      case 'card-wind':
        return (
          <>
            <div className="detail-wind-lantern absolute w-[24px] h-[36px] bg-[#D4A054]/10 border border-[#D4A054]/30 rounded-t-[4px] pointer-events-none z-10" style={{ left: '50%', bottom: '25%', transform: 'translateX(-50%)', boxShadow: '0 0 15px rgba(212,160,84,0.15)' }} />
            <div className="detail-wind-streak absolute h-[1px] bg-[#EDE8E0]/15 pointer-events-none z-10" style={{ left: '-40%', width: '40%', top: '25%' }} />
            <div className="detail-wind-streak absolute h-[1px] bg-[#EDE8E0]/15 pointer-events-none z-10" style={{ left: '-40%', width: '40%', top: '45%' }} />
            <div className="detail-wind-streak absolute h-[1px] bg-[#EDE8E0]/15 pointer-events-none z-10" style={{ left: '-40%', width: '40%', top: '65%' }} />
            <div className="detail-wind-streak absolute h-[1px] bg-[#EDE8E0]/15 pointer-events-none z-10" style={{ left: '-40%', width: '40%', top: '85%' }} />
          </>
        );
      case 'card-shadow':
        return (
          <>
            <div className="detail-candle-glow absolute w-[250px] h-[250px] rounded-full pointer-events-none z-10" style={{ bottom: '20%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(139,94,26,0.22) 0%, transparent 70%)' }} />
            <div className="detail-candle-flame absolute w-[8px] h-[22px] rounded-t-full pointer-events-none z-10 origin-bottom" style={{ bottom: 'calc(20% + 110px)', left: 'calc(50% - 4px)', background: 'linear-gradient(180deg, #F0C070, #C0392B)' }} />
          </>
        );
      case 'card-thunder':
        return (
          <>
            <div className="detail-thunder-flash fixed inset-0 bg-[#F0C070] pointer-events-none z-[1000] opacity-0" />
            <svg className="detail-lightning-crack absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 80,0 L 60,35 L 75,30 L 45,65 L 58,60 L 25,100" stroke="#F0C070" strokeWidth="0.5" fill="none" />
            </svg>
          </>
        );
      case 'card-iron':
      case 'card-cricket':
        return (
          <>
            <div className="detail-forge-heat absolute w-[500px] h-[400px] rounded-full pointer-events-none z-10" style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse, rgba(139,30,10,0.16) 0%, transparent 75%)' }} />
            {[...Array(8)].map((_, i) => (
              <div key={i} className="detail-spark absolute w-[3px] h-[3px] rounded-full bg-[#F0C070] pointer-events-none z-10" style={{ bottom: '30%', left: `${45 + (i * 1.5)}%` }} />
            ))}
          </>
        );
      case 'card-earth':
        return (
          <>
            <div className="detail-pillar-left absolute w-[14px] h-[70%] bottom-0 pointer-events-none z-10" style={{ left: '14%', background: 'linear-gradient(180deg, rgba(20,16,10,0) 0%, rgba(30,22,14,0.6) 100%)' }} />
            <div className="detail-pillar-right absolute w-[14px] h-[70%] bottom-0 pointer-events-none z-10" style={{ right: '14%', background: 'linear-gradient(180deg, rgba(20,16,10,0) 0%, rgba(30,22,14,0.6) 100%)' }} />
            <div className="detail-dust-overlay absolute inset-0 pointer-events-none z-[2] opacity-0" style={{ background: 'radial-gradient(circle at center, rgba(139,94,26,0.03) 0%, transparent 80%)' }} />
          </>
        );
      case 'card-elegance':
        return (
          <>
            <div className="detail-runway-line absolute w-px h-[80%] top-[10%] pointer-events-none z-10 origin-top" style={{ left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(180deg, transparent, rgba(212,160,84,0.25), transparent)' }} />
            {[...Array(6)].map((_, i) => {
              const colors = ['#E8C4C4', '#C4687A', '#8B3A50'];
              return (
                <div 
                  key={i} 
                  className="detail-elegance-petal absolute w-[20px] h-[12px] pointer-events-none z-10 opacity-0" 
                  style={{ 
                    borderRadius: '50% 50% 50% 0', 
                    top: `${20 + i * 12}%`, 
                    left: i < 3 ? `${10 + i * 6}%` : `${75 + (i - 3) * 6}%`,
                    backgroundColor: colors[i % 3]
                  }} 
                />
              );
            })}
          </>
        );
      case 'card-moonlight':
        return (
          <>
            <div className="detail-moon absolute w-[60px] h-[60px] rounded-full pointer-events-none z-10" style={{ top: '8%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(220,210,255,0.9) 0%, rgba(180,170,230,0.3) 60%, transparent 100%)' }} />
            <div className="detail-moon-glow absolute w-[200px] h-[200px] rounded-full pointer-events-none z-10" style={{ top: '8%', left: '50%', transform: 'translate(-50%, -35%)', background: 'radial-gradient(circle, rgba(200,190,255,0.12) 0%, transparent 70%)' }} />
            <div className="detail-spot-left absolute w-[120px] h-[120px] rounded-full pointer-events-none z-10 opacity-0" style={{ bottom: '15%', left: '30%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(200,190,255,0.1) 0%, transparent 70%)' }} />
            <div className="detail-spot-right absolute w-[120px] h-[120px] rounded-full pointer-events-none z-10 opacity-0" style={{ bottom: '15%', right: '30%', transform: 'translateX(50%)', background: 'radial-gradient(circle, rgba(200,190,255,0.1) 0%, transparent 70%)' }} />
          </>
        );
      case 'card-plaza':
        return (
          <>
            <div className="detail-stage-light absolute w-[80%] h-[70%] top-0 pointer-events-none z-10 origin-top" style={{ left: '10%', clipPath: 'polygon(40% 0%, 60% 0%, 90% 100%, 10% 100%)', background: 'radial-gradient(ellipse at 50% 0%, rgba(212,160,84,0.06) 0%, transparent 70%)' }} />
            <div className="detail-curtain-left absolute top-0 left-0 w-1/2 h-full bg-[#080406]/95 pointer-events-none z-20" />
            <div className="detail-curtain-right absolute top-0 right-0 w-1/2 h-full bg-[#080406]/95 pointer-events-none z-20" />
            <div className="detail-crowd-silhouette absolute bottom-0 left-0 w-full h-[18%] bg-[#050407]/90 pointer-events-none z-20 flex justify-around items-end px-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-void opacity-70 transform translate-y-3" />
              ))}
            </div>
          </>
        );
      case 'card-path':
        return (
          <>
            <div className="detail-fog absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(20,30,15,0.4) 0%, transparent 75%)' }} />
            <div className="detail-path-lantern absolute w-[24px] h-[24px] rounded-full pointer-events-none z-10 opacity-0" style={{ bottom: '30%', left: '20%', background: 'radial-gradient(circle, rgba(212,160,84,0.6) 0%, transparent 70%)' }} />
            <div className="detail-path-lantern absolute w-[24px] h-[24px] rounded-full pointer-events-none z-10 opacity-0" style={{ bottom: '45%', left: '48%', background: 'radial-gradient(circle, rgba(212,160,84,0.6) 0%, transparent 70%)' }} />
            <div className="detail-path-lantern absolute w-[24px] h-[24px] rounded-full pointer-events-none z-10 opacity-0" style={{ bottom: '60%', left: '75%', background: 'radial-gradient(circle, rgba(212,160,84,0.6) 0%, transparent 70%)' }} />
            <div className="detail-map-fragment absolute w-[120px] h-[80px] bg-[#8B5E1A]/10 border border-[#8B5E1A]/20 pointer-events-none z-10 opacity-0 rounded-[2px]" style={{ bottom: '15%', left: '15%', transform: 'rotate(-8deg)' }} />
          </>
        );
      case 'card-studio':
        return (
          <>
            <div className="detail-studio-spot absolute w-[35%] h-[75%] top-0 pointer-events-none z-10 origin-top" style={{ left: '20%', clipPath: 'polygon(35% 0%, 65% 0%, 90% 100%, 10% 100%)', background: 'radial-gradient(ellipse at 50% 0%, rgba(212,160,84,0.07) 0%, transparent 80%)' }} />
            <div className="detail-film-strip absolute top-0 left-[20px] w-[12px] h-[200%] pointer-events-none z-10 opacity-0" style={{ background: 'repeating-linear-gradient(180deg, rgba(212,160,84,0.04) 0px, rgba(212,160,84,0.04) 3px, transparent 3px, transparent 22px)' }} />
            <div className="detail-film-strip absolute top-0 right-[20px] w-[12px] h-[200%] pointer-events-none z-10 opacity-0" style={{ background: 'repeating-linear-gradient(180deg, rgba(212,160,84,0.04) 0px, rgba(212,160,84,0.04) 3px, transparent 3px, transparent 22px)' }} />
            <div className="detail-clap-flash fixed inset-0 bg-white pointer-events-none z-[1000] opacity-0" />
          </>
        );
      case 'card-gaming':
        return (
          <>
            <div className="detail-scan-bar absolute left-0 w-full h-[2px] pointer-events-none z-20 opacity-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(100,150,255,0.6), transparent)', boxShadow: '0 0 8px rgba(100,150,255,0.4)' }} />
            <div className="detail-gaming-grid absolute inset-0 pointer-events-none z-10 opacity-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(100,150,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,150,255,0.015) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="detail-zone-ring absolute w-[200px] h-[200px] rounded-full border border-blue-500/25 pointer-events-none z-10 opacity-0" style={{ left: 'calc(50% - 100px)', top: 'calc(55% - 100px)' }} />
            <div className="detail-squad-marker absolute w-[8px] h-[8px] rounded-full bg-green-500/85 pointer-events-none z-20 opacity-0 shadow-[0_0_6px_rgba(100,200,100,0.6)]" style={{ left: '50%', top: '55%' }} />
          </>
        );
      case 'card-council':
        return (
          <>
            <div className="detail-table-glow absolute w-[300px] h-[100px] rounded-full pointer-events-none z-10" style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse, rgba(212,160,84,0.08) 0%, transparent 70%)' }} />
            <div className="detail-council-candle absolute w-[6px] h-[20px] rounded-[1px] bg-stone-mid border border-gold/10 pointer-events-none z-10 origin-bottom opacity-0" style={{ bottom: '15%', left: '42%' }} />
            <div className="detail-council-candle absolute w-[6px] h-[20px] rounded-[1px] bg-stone-mid border border-gold/10 pointer-events-none z-10 origin-bottom opacity-0" style={{ bottom: '17%', left: '50%' }} />
            <div className="detail-council-candle absolute w-[6px] h-[20px] rounded-[1px] bg-stone-mid border border-gold/10 pointer-events-none z-10 origin-bottom opacity-0" style={{ bottom: '15%', left: '58%' }} />
            <div className="detail-scroll-line absolute h-px bg-gold/35 pointer-events-none z-10 opacity-0 origin-left" style={{ bottom: '25%', left: '25%', right: '25%' }} />
          </>
        );
      case 'card-market':
        return (
          <>
            <div className="detail-market-banner absolute w-[80px] h-[150px] bg-stone-mid border border-gold/10 pointer-events-none z-10 origin-top opacity-0" style={{ top: '15%', right: '15%' }} />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="detail-market-lantern absolute w-[16px] h-[24px] bg-amber-500/10 border border-[#D4A054]/30 rounded-[2px] pointer-events-none z-10 origin-top" style={{ bottom: '25%', left: `${20 + i * 20}%` }} />
            ))}
          </>
        );
      case 'card-dojo':
        return (
          <>
            <div className="detail-dojo-spot absolute w-[28%] h-[80%] top-0 pointer-events-none z-10 origin-top" style={{ left: '50%', transform: 'translateX(-50%)', clipPath: 'polygon(30% 0%, 70% 0%, 80% 100%, 20% 100%)', background: 'radial-gradient(ellipse at 50% 0%, rgba(212,160,84,0.09) 0%, transparent 80%)' }} />
            <div className="detail-chair-glow absolute w-[160px] h-[60px] rounded-full pointer-events-none z-10 opacity-0" style={{ bottom: '20%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse, rgba(212,160,84,0.12) 0%, transparent 70%)' }} />
          </>
        );
      case 'card-vault':
        return (
          <>
            <div className="detail-vault-ring-outer absolute w-[180px] h-[180px] rounded-full border border-gold/12 bg-transparent pointer-events-none z-10 opacity-0" style={{ left: 'calc(50% - 90px)', top: 'calc(50% - 90px)' }} />
            <div className="detail-vault-ring-inner absolute w-[110px] h-[110px] rounded-full border border-gold/8 bg-transparent pointer-events-none z-10 opacity-0" style={{ left: 'calc(50% - 55px)', top: 'calc(50% - 55px)' }} />
            <div className="detail-vault-light absolute w-[250px] h-[250px] rounded-full pointer-events-none z-10 opacity-0" style={{ left: 'calc(50% - 125px)', top: 'calc(50% - 125px)', background: 'radial-gradient(circle, rgba(212,160,84,0.10) 0%, transparent 70%)' }} />
          </>
        );
      case 'card-innovation':
        return (
          <>
            <div className="detail-innovation-grid absolute inset-0 pointer-events-none z-10 opacity-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(212,160,84,0.012) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,160,84,0.012) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
            <div className="detail-pagoda-base absolute w-[60px] h-[30px] bg-[#050407]/60 border border-gold/5 pointer-events-none z-10 opacity-0" style={{ bottom: '15%', left: 'calc(50% - 30px)' }} />
            <div className="detail-pagoda-top absolute w-[40px] h-[20px] bg-[#050407]/60 border border-gold/5 pointer-events-none z-10 opacity-0" style={{ bottom: 'calc(15% + 30px)', left: 'calc(50% - 20px)' }} />
            <div className="detail-data-pulse absolute w-[40px] h-[40px] rounded-full border border-gold/30 pointer-events-none z-10 opacity-0" style={{ bottom: 'calc(15% + 15px)', left: 'calc(50% - 20px)', transform: 'translate(-50%, -50%)' }} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-void flex flex-col justify-between overflow-hidden text-text-primary px-6 py-24 z-10"
    >
      {/* Viewport fixed background with CSS gradient scene */}
      <div className={`detail-bg absolute inset-0 ${event.districtTheme} origin-center pointer-events-none z-0`} />

      {/* Conditionally injected ambient elements */}
      {renderAmbientElements(event.districtTheme)}

      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 border-b border-gold/5 backdrop-blur-[8px] bg-void/30">
        <button 
          onClick={playExitAnimation}
          className="font-heading font-semibold text-text-body hover:text-gold transition-colors tracking-widest text-xs flex items-center gap-2 cursor-pointer z-50"
        >
          &larr; BACK TO DISTRICTS
        </button>
        <Link to="/" className="z-50">
          <span className="font-display font-black text-xl bg-gradient-to-r from-[#D4A054] to-[#C0392B] bg-clip-text text-transparent tracking-widest drop-shadow-[0_0_8px_rgba(255,215,0,0.15)]">
            AAKRITI
          </span>
        </Link>
      </header>

      {/* 3px Category left border bar */}
      <div 
        className="detail-left-bar absolute left-0 top-0 bottom-0 w-[3px] z-10 opacity-100" 
        style={{ backgroundColor: getCategoryColor() }} 
      />

      {/* Page Content Panel */}
      <div className="relative z-10 max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center mt-12 md:mt-16">
        {/* District Label */}
        <div className="detail-district-label opacity-0 mb-4 text-center md:text-left">
          <span className="font-heading text-gold text-xs uppercase tracking-[0.3em] block">
            {event.districtName}
          </span>
          <span className="font-body italic text-text-ghost text-xs mt-1 block">
            {getSubLabel()}
          </span>
        </div>

        {/* Event Name - Removed inline clipPath to prevent it getting stuck hidden */}
        <h1 
          className="detail-event-name opacity-0 font-display font-black text-[clamp(15px,6vw,25px)] uppercase tracking-wider text-text-primary leading-none text-center md:text-left mb-4"
        >
          {event.name}
        </h1>

        {/* Tagline */}
        <p className="detail-tagline opacity-0 font-body italic text-gold text-lg md:text-xl text-center md:text-left mb-8">
          "{event.tagline}"
        </p>

        {/* Stats Grid Box */}
        <div className="detail-stats-box opacity-0 grid grid-cols-3 gap-4 border border-gold/15 bg-stone-mid/45 p-4 md:p-6 mb-8 rounded-[2px] [transform-style:preserve-3d]">
          <div className="text-center">
            <span className="font-body text-text-ghost text-xs block mb-1">TEAM SIZE</span>
            <span className="font-heading text-gold text-sm tracking-wider uppercase font-semibold">{event.teamSize}</span>
          </div>
          <div className="text-center border-x border-gold/10">
            <span className="font-body text-text-ghost text-xs block mb-1">DURATION</span>
            <span className="font-heading text-gold text-sm tracking-wider uppercase font-semibold">{event.duration}</span>
          </div>
          <div className="text-center">
            <span className="font-body text-text-ghost text-xs block mb-1">REALM</span>
            <span className="font-heading text-gold text-sm tracking-wider uppercase font-semibold">{event.category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="detail-description opacity-0 font-body text-text-body text-base md:text-lg leading-relaxed text-center md:text-left mb-8 max-w-xl">
          {event.description}
        </p>

        {/* Logistics & Rules Panel */}
        <div className="detail-logistics opacity-0 w-full max-w-xl bg-stone-mid/20 border border-gold/10 p-6 rounded-[2px] mb-12">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <span className="font-heading text-gold text-xs tracking-widest block mb-1">VENUE</span>
              <span className="font-body text-text-primary text-sm">{event.venue}</span>
            </div>
            <div>
              <span className="font-heading text-gold text-xs tracking-widest block mb-1">TIME</span>
              <span className="font-body text-text-primary text-sm">{event.time}</span>
            </div>
            <div className={event.contact ? "col-span-1" : "col-span-2"}>
              <span className="font-heading text-gold text-xs tracking-widest block mb-1">REGISTRATION FEE</span>
              <span className="font-body text-crimson text-sm font-semibold">{event.fee}</span>
            </div>
            {event.contact && (
              <div>
                <span className="font-heading text-gold text-xs tracking-widest block mb-1">CONTACT</span>
                <span className="font-body text-text-primary text-sm">{event.contact}</span>
              </div>
            )}
          </div>
          
          <div>
            <span className="font-heading text-gold text-xs tracking-widest block mb-2">DISTRICT RULES</span>
            <ul className="list-disc list-inside font-body text-text-ghost text-sm space-y-1">
              {event.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spacer line */}
        <div className="flex items-center justify-center md:justify-start gap-4 opacity-30 mb-10">
          <div className="h-px w-16 bg-gold" />
          <span className="text-gold text-xs">✦</span>
          <div className="h-px w-16 bg-gold" />
        </div>

        {/* Registration CTA button */}
        <button 
          onClick={handleRegister}
          className="detail-cta opacity-0 w-full md:w-auto self-center md:self-start bg-crimson hover:bg-crimson-hi text-text-primary font-heading font-bold tracking-[0.2em] text-sm py-4 px-10 rounded-[2px] transition-colors cursor-pointer shadow-[0_0_20px_rgba(192,57,43,0.35)] hover:shadow-[0_0_30px_rgba(229,57,53,0.5)] border border-crimson-bloom/10"
        >
          REGISTER FOR THIS DISTRICT &rarr;
        </button>
      </div>
    </div>
  );
};
