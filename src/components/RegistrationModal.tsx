import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle, ChevronRight } from 'lucide-react';
import { useRegistrationStore } from '../store/registrationStore';
import { events } from '../data/events';
import { gsap, ScrollTrigger } from '../lib/gsap';

// Filter out only Cultural and Management events for the 12-Event Combo Pass
const COMBO_EVENTS_LIST = events.filter(e => e.category === 'cultural' || e.category === 'management');

// Helper to parse event team details dynamically
const getTeamDetails = (eventId: string | null) => {
  if (!eventId) return { isSolo: true, min: 1, max: 1 };
  const targetEvent = events.find(e => e.id === eventId);
  if (!targetEvent) return { isSolo: true, min: 1, max: 1 };
  
  const size = targetEvent.teamSize.toLowerCase();
  
  // 1. Check for Solo / Singles / Doubles
  if (size.includes('singles / doubles') || size.includes('singles/doubles')) return { isSolo: false, min: 1, max: 2 };
  if (size.includes('solo') || size === '1v1' || size === 'singles') return { isSolo: true, min: 1, max: 1 };
  if (size.includes('doubles')) return { isSolo: false, min: 2, max: 2 };

  // 2. Check for ranges first (to avoid substring matching on word match)
  const rangeToMatch = size.match(/(\d+)\s*to\s*(\d+)/);
  if (rangeToMatch) return { isSolo: false, min: parseInt(rangeToMatch[1]), max: parseInt(rangeToMatch[2]) };

  const rangeMatch = size.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) return { isSolo: false, min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };

  const plusMatch = size.match(/(\d+)\s*\+\s*(\d+)/);
  if (plusMatch) return { isSolo: false, min: parseInt(plusMatch[1]), max: parseInt(plusMatch[1]) + parseInt(plusMatch[2]) };

  // 3. Check for specific formats
  if (size.includes('7v7')) return { isSolo: false, min: 7, max: 10 };
  if (size.includes('6v6')) return { isSolo: false, min: 6, max: 10 };

  // 4. Fixed word matching
  const wordMatch = size.match(/(\d+)\s*(members|players|pullers)/);
  if (wordMatch) return { isSolo: false, min: parseInt(wordMatch[1]), max: parseInt(wordMatch[1]) };

  return { isSolo: false, min: 2, max: 15 };
};

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
  college: z.string().min(3, 'College name required'),
  year: z.enum(['1st', '2nd', 'Final', 'Other']),
  selectedEventId: z.string().min(1, 'Event ID is missing'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface ComboEventState {
  eventId: string;
  eventName: string;
  teamName: string;
  leaderName: string;
  leaderPhone: string;
  leaderEmail: string;
  teamSize: number;
  memberNames: string;
}

export const RegistrationModal: React.FC = () => {
  const { isOpen, step, setStep, closeModal, selectedEventId } = useRegistrationStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isComboPass = selectedEventId === 'cm-pass';

  // --- Combo Pass States ---
  const [currentComboIndex, setCurrentComboIndex] = useState<number>(0);
  const [comboRosters, setComboRosters] = useState<ComboEventState[]>([]);
  
  // Current active combo event states
  const [currentComboTeamSize, setCurrentComboTeamSize] = useState<number>(1);
  const [currentEventTeamName, setCurrentEventTeamName] = useState('');
  const [currentEventLeaderName, setCurrentEventLeaderName] = useState('');
  const [currentEventLeaderPhone, setCurrentEventLeaderPhone] = useState('');
  const [currentEventLeaderEmail, setCurrentEventLeaderEmail] = useState('');
  const [currentEventMembers, setCurrentEventMembers] = useState<string[]>([]);

  // --- Single Event States ---
  const [singleTeamSize, setSingleTeamSize] = useState<number>(1);
  const [singleTeamName, setSingleTeamName] = useState('');
  const [singleEventMembers, setSingleEventMembers] = useState<string[]>([]);

  // --- General Common States ---
  const [localError, setLocalError] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { year: '1st', selectedEventId: '' }
  });

  const activeEvent = isComboPass ? COMBO_EVENTS_LIST[currentComboIndex] : events.find(e => e.id === selectedEventId);
  const { isSolo, min, max } = getTeamDetails(activeEvent ? activeEvent.id : null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Restore combo rosters from sessionStorage on mount when modal opens
  useEffect(() => {
    if (isOpen && isComboPass) {
      const savedCombo = sessionStorage.getItem('aakriti_combo_rosters');
      const savedIndex = sessionStorage.getItem('aakriti_combo_index');
      if (savedCombo) setComboRosters(JSON.parse(savedCombo));
      if (savedIndex) setCurrentComboIndex(parseInt(savedIndex, 10));
    }
  }, [isOpen, isComboPass]);

  // Sync active event rules for SINGLE event flow
  useEffect(() => {
    if (isOpen && !isComboPass && activeEvent) {
      const { min: activeMin } = getTeamDetails(activeEvent.id);
      setSingleTeamSize(activeMin);
      setSingleEventMembers(Array(activeMin > 1 ? activeMin - 1 : 0).fill(''));
      setSingleTeamName('');
      setLocalError(null);
    }
  }, [selectedEventId, isOpen, isComboPass, activeEvent]);

  // Sync active event rules for COMBO flow
  useEffect(() => {
    if (isOpen && isComboPass && activeEvent) {
      const { min: activeMin } = getTeamDetails(activeEvent.id);
      
      let initialSize = activeMin;
      let initialMembers = Array(activeMin > 1 ? activeMin - 1 : 0).fill('');
      let initialTeamName = '';
      let initialLeaderName = '';
      let initialLeaderPhone = '';
      let initialLeaderEmail = '';

      const existing = comboRosters.find(r => r.eventId === activeEvent.id);
      if (existing) {
        initialSize = existing.teamSize || activeMin;
        initialTeamName = existing.teamName;
        initialLeaderName = existing.leaderName;
        initialLeaderPhone = existing.leaderPhone;
        initialLeaderEmail = existing.leaderEmail || '';
        initialMembers = existing.memberNames ? existing.memberNames.split(', ') : [];
        
        const targetLen = initialSize > 1 ? initialSize - 1 : 0;
        if (initialMembers.length < targetLen) {
          initialMembers = [...initialMembers, ...Array(targetLen - initialMembers.length).fill('')];
        } else if (initialMembers.length > targetLen) {
          initialMembers = initialMembers.slice(0, targetLen);
        }
      }

      setCurrentComboTeamSize(initialSize);
      setCurrentEventMembers(initialMembers);
      setCurrentEventTeamName(initialTeamName);
      setCurrentEventLeaderName(initialLeaderName);
      setCurrentEventLeaderPhone(initialLeaderPhone);
      setCurrentEventLeaderEmail(initialLeaderEmail);
      setLocalError(null);
    }
  }, [currentComboIndex, selectedEventId, isOpen, isComboPass, activeEvent]);

  useEffect(() => {
    if (selectedEventId && isOpen) setValue('selectedEventId', selectedEventId);
  }, [selectedEventId, setValue, isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      ScrollTrigger.normalizeScroll(false);
    }
    return () => { if (isOpen) ScrollTrigger.normalizeScroll(true); };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSingleTeamSizeChangeInput = (valueStr: string) => {
    if (!valueStr) {
      setSingleTeamSize(0);
      setSingleEventMembers([]);
      return;
    }
    const val = parseInt(valueStr, 10);
    if (isNaN(val)) return;

    setSingleTeamSize(val);

    if (val >= min && val <= max) {
      const targetLength = val > 1 ? val - 1 : 0;
      setSingleEventMembers((prev) => {
        if (prev.length < targetLength) {
          return [...prev, ...Array(targetLength - prev.length).fill('')];
        } else {
          return prev.slice(0, targetLength);
        }
      });
      setLocalError(null);
    } else {
      setSingleEventMembers([]);
    }
  };

  const handleComboTeamSizeChangeInput = (valueStr: string) => {
    if (!valueStr) {
      setCurrentComboTeamSize(0);
      setCurrentEventMembers([]);
      return;
    }
    const val = parseInt(valueStr, 10);
    if (isNaN(val)) return;

    setCurrentComboTeamSize(val);

    if (val >= min && val <= max) {
      const targetLength = val > 1 ? val - 1 : 0;
      setCurrentEventMembers((prev) => {
        if (prev.length < targetLength) {
          return [...prev, ...Array(targetLength - prev.length).fill('')];
        } else {
          return prev.slice(0, targetLength);
        }
      });
      setLocalError(null);
    } else {
      setCurrentEventMembers([]);
    }
  };

  const handleMemberNameChange = (idx: number, val: string) => {
    const updated = [...currentEventMembers];
    updated[idx] = val;
    setCurrentEventMembers(updated);
  };

  const handleSingleMemberNameChange = (idx: number, val: string) => {
    const updated = [...singleEventMembers];
    updated[idx] = val;
    setSingleEventMembers(updated);
  };

  const handleNext = async (currentStep: number) => {
    setLocalError(null);
    if (currentStep === 1) {
      const isIdentityValid = await trigger(['name', 'email', 'phone', 'college', 'year']);
      if (isIdentityValid) {
        if (!isComboPass && !isSolo) {
          if (singleTeamSize < min || singleTeamSize > max) {
            setLocalError(`Team size must be between ${min} and ${max} members.`);
            return;
          }
        }
        proceedToStep(2);
      }
    } else if (currentStep === 2) {
      if (!activeEvent) return;

      if (isComboPass) {
        // Validate Combo Active Roster
        if (min > 1) {
          if (currentComboTeamSize < min || currentComboTeamSize > max) {
            setLocalError(`Team size must be between ${min} and ${max} members.`);
            return;
          }
          if (!currentEventTeamName.trim()) {
            setLocalError('Team name is mandatory for this event.');
            return;
          }
        }
        if (!currentEventLeaderName.trim() || !currentEventLeaderPhone.match(/^[6-9]\d{9}$/)) {
          setLocalError('Please provide a valid 10-digit Leader Mobile number and Name.');
          return;
        }
        if (!currentEventLeaderEmail.trim() || !currentEventLeaderEmail.includes('@') || !currentEventLeaderEmail.includes('.')) {
          setLocalError('Please provide a valid Leader Email address.');
          return;
        }
        if (currentEventMembers.some(m => !m.trim())) {
          setLocalError('Please fill out all missing team member fields.');
          return;
        }

        // Save active event to combo pass array cache
        const updatedRosters = [...comboRosters].filter(r => r.eventId !== activeEvent.id);
        updatedRosters.push({
          eventId: activeEvent.id,
          eventName: activeEvent.name,
          teamName: isSolo ? 'Solo' : currentEventTeamName,
          leaderName: currentEventLeaderName,
          leaderPhone: currentEventLeaderPhone,
          leaderEmail: currentEventLeaderEmail,
          teamSize: isSolo ? 1 : currentComboTeamSize,
          memberNames: currentEventMembers.join(', ')
        });

        setComboRosters(updatedRosters);
        sessionStorage.setItem('aakriti_combo_rosters', JSON.stringify(updatedRosters));

        if (currentComboIndex < COMBO_EVENTS_LIST.length - 1) {
          const nextIdx = currentComboIndex + 1;
          setCurrentComboIndex(nextIdx);
          sessionStorage.setItem('aakriti_combo_index', nextIdx.toString());
          if (containerRef.current) {
            gsap.fromTo(containerRef.current, { opacity: 0.4, x: 10 }, { opacity: 1, x: 0, duration: 0.3 });
          }
        } else {
          proceedToStep(3);
        }
      } else {
        // Validate Single Event Roster
        if (!isSolo) {
          if (singleTeamSize < min || singleTeamSize > max) {
            setLocalError(`Team size must be between ${min} and ${max} members.`);
            return;
          }
          if (!singleTeamName.trim()) {
            setLocalError('Team name is mandatory for team events.');
            return;
          }
          if (singleEventMembers.some(m => !m.trim())) {
            setLocalError('Please fill out all member names.');
            return;
          }
        }
        proceedToStep(3);
      }
    }
  };

  const handleBack = (currentStep: number) => {
    if (currentStep === 2 && isComboPass && currentComboIndex > 0) {
      const prevIdx = currentComboIndex - 1;
      setCurrentComboIndex(prevIdx);
      sessionStorage.setItem('aakriti_combo_index', prevIdx.toString());
    } else {
      proceedToStep(currentStep - 1);
    }
  };

  const proceedToStep = (nextStep: number) => {
    if (containerRef.current) {
      gsap.to(containerRef.current, { opacity: 0, x: '-10px', duration: 0.15, onComplete: () => {
        setStep(nextStep);
        gsap.fromTo(containerRef.current, { opacity: 0, x: '10px' }, { opacity: 1, x: '0px', duration: 0.25 });
      }});
    } else {
      setStep(nextStep);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!screenshot) {
      setSubmitError('Please upload your payment screenshot.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append('collegeName', data.college);
      payload.append('yearOfStudy', data.year === '2nd' ? '2' : data.year === 'Final' ? '3' : data.year === 'Other' ? '4' : '1');
      payload.append('screenshot', screenshot);

      if (isComboPass) {
        payload.append('category', 'COMBO');
        payload.append('eventName', 'Overall Contingent Pass (12 Events)');
        payload.append('leaderName', data.name);
        payload.append('leaderEmail', data.email);
        payload.append('leaderPhone', data.phone);
        payload.append('comboData', JSON.stringify(comboRosters));
      } else {
        let categoryVal = 'SPORTS';
        if (activeEvent?.category === 'cultural') {
          categoryVal = 'CULTURALS';
        } else if (activeEvent?.category === 'management') {
          categoryVal = 'MANAGEMENT';
        }
        payload.append('category', categoryVal);
        payload.append('eventName', activeEvent?.name || '');
        payload.append('teamName', isSolo ? 'Solo' : singleTeamName);
        payload.append('leaderName', data.name);
        payload.append('leaderEmail', data.email);
        payload.append('leaderPhone', data.phone);
        payload.append('memberNames', singleEventMembers.join(', '));
      }

      const baseApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
      const response = await fetch(`${baseApiUrl}/api/v1/registrations`, { method: 'POST', body: payload });

      if (response.status === 201) {
        sessionStorage.removeItem('aakriti_combo_rosters');
        sessionStorage.removeItem('aakriti_combo_index');
        setStep(4);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitError(errorData.error || 'Submission failed. Please check backend.');
      }
    } catch (err) {
      setSubmitError('Network error. Check if your Spring Boot service is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getNumericFee = (feeStr: string | undefined): string => {
    if (!feeStr) return '0';
    const cleanFee = feeStr.replace(/,/g, '').match(/\d+/);
    return cleanFee ? cleanFee[0] : '0';
  };

  const feeAmount = isComboPass ? '3540' : getNumericFee(activeEvent?.fee);
  const upiLink = `upi://pay?pa=sfgc10701@iob&pn=AAKRITI%20SIMS&am=${feeAmount}&cu=INR&tn=AAKRITI%20Registration`;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-void/90 backdrop-blur-sm" onClick={closeModal} />

      <div ref={modalRef} className="relative w-full md:max-w-[580px] max-h-[90vh] md:max-h-[85vh] bg-stone-mid border-t md:border border-gold/20 rounded-t-xl md:rounded-[3px] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative z-10 border-b border-gold/10 px-6 py-4 flex items-center justify-between bg-stone shrink-0">
          <div>
            <h2 className="font-display font-semibold text-gold tracking-widest uppercase text-sm md:text-base">Enter the Registry</h2>
            {isComboPass && step === 2 && (
              <p className="text-[10px] text-crimson font-mono tracking-wider mt-0.5">CONTI-PASS BUNDLE UNLOCKED</p>
            )}
          </div>
          <button onClick={closeModal} className="text-text-ghost hover:text-crimson transition-colors"><X size={24} /></button>
        </div>

        {/* Progress System Bar */}
        <div className="relative z-10 h-1 bg-void w-full shrink-0">
          <div 
            className="absolute top-0 left-0 h-full bg-gold transition-all duration-300" 
            style={{ 
              width: step === 2 && isComboPass 
                ? `${33.3 + ((currentComboIndex / COMBO_EVENTS_LIST.length) * 33.3)}%` 
                : `${(Math.min(step, 3) / 3) * 100}%` 
            }} 
          />
        </div>

        {/* Body Container */}
        <div className="overflow-y-auto px-6 py-6 min-h-0 flex-1" ref={containerRef}>
          <form id="regForm" onSubmit={handleSubmit(onSubmit)}>
            
            {/* STEP 1: IDENTITY */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-heading text-xl text-text-primary mb-4">
                  {isComboPass ? '1. Master Submitter Identity' : '1. Your Identity'}
                </h3>
                <div>
                  <label className="block text-text-ghost text-sm mb-1">Full Name</label>
                  <input {...register('name')} className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary outline-none" placeholder={isComboPass ? "Master Contingent Leader Name" : "Leader / Solo Name"} />
                  {errors.name && <p className="text-crimson text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-text-ghost text-sm mb-1">Email</label>
                  <input type="email" {...register('email')} className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary outline-none" placeholder="Communication Email" />
                  {errors.email && <p className="text-crimson text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-text-ghost text-sm mb-1">Primary Phone Number</label>
                  <input { ...register('phone') } className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary outline-none" placeholder="WhatsApp Number" />
                  {errors.phone && <p className="text-crimson text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-ghost text-sm mb-1">College</label>
                    <input {...register('college')} className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary outline-none" placeholder="Institution Title" />
                    {errors.college && <p className="text-crimson text-xs mt-1">{errors.college.message}</p>}
                  </div>
                  <div>
                    <label className="block text-text-ghost text-sm mb-1">Year</label>
                    <select {...register('year')} className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary outline-none">
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="Final">Final Year</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Team Size Selection for Team Events (Single Flow) */}
                {!isComboPass && !isSolo && (
                  <div className="border-t border-gold/10 pt-4 mt-2">
                    {min === max ? (
                      <div>
                        <label className="block text-text-ghost text-xs mb-1">Team Size</label>
                        <div className="w-full bg-void/50 border border-stone-mid/50 px-4 py-3 rounded text-gold font-semibold text-xs">
                          Fixed at {min} members (including you)
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-text-ghost text-xs mb-1">Total Team Size (including you) *</label>
                        <input 
                          type="number"
                          min={min}
                          max={max}
                          value={singleTeamSize || ''}
                          onChange={(e) => handleSingleTeamSizeChangeInput(e.target.value)}
                          className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary text-sm outline-none"
                          placeholder={`Enter number between ${min} and ${max}`}
                        />
                        <p className="text-[10px] text-text-ghost mt-1">Required range: {min} to {max} members</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: ROSTER PIPELINE (COMBO OR SINGLE) */}
            {step === 2 && activeEvent && (
              <div className="space-y-4">
                {isComboPass ? (
                  // Combo sequential list view
                  <>
                    <div className="bg-void/40 border border-gold/10 p-4 rounded mb-2">
                      <div className="flex justify-between items-center text-xs font-mono mb-1">
                        <span className="text-gold tracking-widest uppercase">{activeEvent.category}</span>
                        <span className="text-text-ghost">EVENT {currentComboIndex + 1} OF 12</span>
                      </div>
                      <h4 className="font-heading text-lg text-text-primary">{activeEvent.name}</h4>
                      <p className="text-text-ghost text-xs mt-1 italic">Roster Type Requirement: {activeEvent.teamSize}</p>
                    </div>

                    {localError && <p className="text-crimson text-xs bg-crimson/10 border border-crimson/20 p-2 rounded">{localError}</p>}

                    {!isSolo && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-text-ghost text-xs mb-1">Team Name *</label>
                          <input 
                            value={currentEventTeamName}
                            onChange={(e) => setCurrentEventTeamName(e.target.value)}
                            className="w-full bg-void border border-stone-mid px-4 py-2.5 rounded text-sm text-text-primary outline-none"
                            placeholder="e.g., Team Alpha" 
                          />
                        </div>

                        {min !== max && (
                          <div>
                            <label className="block text-text-ghost text-xs mb-1">Total Team Size (including leader) *</label>
                            <input 
                              type="number"
                              min={min}
                              max={max}
                              value={currentComboTeamSize || ''}
                              onChange={(e) => handleComboTeamSizeChangeInput(e.target.value)}
                              className="w-full bg-void border border-stone-mid px-4 py-2.5 rounded text-sm text-text-primary outline-none"
                              placeholder={`Enter number between ${min} and ${max}`}
                            />
                            <p className="text-[10px] text-text-ghost mt-1 font-mono">Required range: {min} to {max} members</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-text-ghost text-xs mb-1">Event Leader Name *</label>
                        <input 
                          value={currentEventLeaderName}
                          onChange={(e) => setCurrentEventLeaderName(e.target.value)}
                          className="w-full bg-void border border-stone-mid px-4 py-2.5 rounded text-sm text-text-primary outline-none"
                          placeholder="Full Name" 
                        />
                      </div>
                      <div>
                        <label className="block text-text-ghost text-xs mb-1">Leader Mobile Number *</label>
                        <input 
                          value={currentEventLeaderPhone}
                          onChange={(e) => setCurrentEventLeaderPhone(e.target.value)}
                          className="w-full bg-void border border-stone-mid px-4 py-2.5 rounded text-sm text-text-primary outline-none"
                          placeholder="10-digit number" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-text-ghost text-xs mb-1">Leader Email Address *</label>
                      <input 
                        type="email"
                        value={currentEventLeaderEmail}
                        onChange={(e) => setCurrentEventLeaderEmail(e.target.value)}
                        className="w-full bg-void border border-stone-mid px-4 py-2.5 rounded text-sm text-text-primary outline-none"
                        placeholder="leader.email@example.com" 
                      />
                    </div>

                    {currentEventMembers.length > 0 && (
                      <div className="border-t border-gold/5 pt-3 space-y-2.5">
                        <span className="block font-heading text-gold text-xs tracking-wider uppercase">Additional Members Roster</span>
                        {currentEventMembers.map((member, index) => (
                          <div key={index}>
                            <label className="block text-text-ghost text-[11px] mb-0.5">Member {index + 2} Name *</label>
                            <input 
                              value={member}
                              onChange={(e) => handleMemberNameChange(index, e.target.value)}
                              className="w-full bg-void border border-stone-mid px-4 py-2 rounded text-xs text-text-primary outline-none"
                              placeholder={`Enter name for player ${index + 2}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Single event custom roster view
                  <>
                    <div className="mb-4">
                      <span className="text-[10px] uppercase text-gold tracking-widest block mb-1">{activeEvent.category}</span>
                      <h3 className="font-heading text-xl text-text-primary">2. Team Roster ({activeEvent.name})</h3>
                      <p className="font-body text-xs text-text-ghost mt-1">
                        {isSolo 
                          ? 'This is a Solo/Singles event. No additional team members are required.' 
                          : `Total team size chosen: ${singleTeamSize} members (including you).`
                        }
                      </p>
                    </div>

                    {localError && <p className="text-crimson text-xs bg-crimson/10 border border-crimson/20 p-2 rounded mb-2">{localError}</p>}

                    {isSolo ? (
                      <div className="border border-stone-mid/30 bg-void/50 p-6 rounded-[2px] text-center">
                        <p className="font-body text-text-body text-sm mb-2">You are registering as a Solo warrior.</p>
                        <span className="font-heading text-gold text-xs tracking-widest uppercase">Click CONTINUE to proceed</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-text-ghost text-sm mb-1">Team Name *</label>
                          <input 
                            value={singleTeamName}
                            onChange={(e) => setSingleTeamName(e.target.value)}
                            className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary outline-none" 
                            placeholder="Enter your team name" 
                          />
                        </div>

                        {singleEventMembers.length > 0 && (
                          <div className="border-t border-gold/10 pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-heading text-gold text-xs tracking-widest uppercase">Team Members (Excluding you)</span>
                              <span className="text-text-ghost text-xs font-body">Roster: {singleEventMembers.length + 1} / {singleTeamSize}</span>
                            </div>
                            
                            <div className="space-y-3">
                              {singleEventMembers.map((member, index) => (
                                <div key={index} className="p-4 border border-stone-mid/30 bg-void/50 rounded-[2px]">
                                  <label className="block text-text-ghost text-xs mb-1">Member {index + 2} Name *</label>
                                  <input 
                                    value={member}
                                    onChange={(e) => handleSingleMemberNameChange(index, e.target.value)}
                                    className="w-full bg-void border border-stone-mid px-4 py-3 rounded text-text-primary text-sm outline-none" 
                                    placeholder={`Enter member ${index + 2} name`} 
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <div className="text-center py-4">
                <h3 className="font-display text-2xl text-gold mb-2">Seal Your Entry</h3>
                <p className="font-body text-text-body mb-4 text-sm">Scan the official merchant QR to complete payment.</p>
                
                <div className="mb-4 bg-void/50 border border-crimson/20 px-6 py-3 rounded inline-block">
                  <span className="font-body text-text-ghost text-xs block mb-0.5">
                    {isComboPass ? 'FLAT COMBO BUNDLE CHARGE (10% OFF APPLIED)' : 'TOTAL REGISTRATION FEE'}
                  </span>
                  <span className="font-heading text-gold text-2xl font-bold">
                    {isComboPass ? '₹3,540' : activeEvent?.fee}
                  </span>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <div className="w-48 h-48 border border-gold/20 rounded p-2 bg-stone-mid/20 flex items-center justify-center">
                    <img src="/qr-code.png" alt="Payment QR Code" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-mono text-gold mt-2 text-xs">Merchant: sfgc10701@iob</span>

                  {isMobile && (
                    <a href={upiLink} className="mt-4 px-6 py-2.5 bg-gold text-void font-heading font-semibold text-xs tracking-widest uppercase rounded">
                      Open Payment App
                    </a>
                  )}
                </div>

                <div className="w-full text-left">
                  <label className="block text-text-ghost text-sm mb-1">Upload Receipt Screenshot *</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    required
                    onChange={(e) => { if (e.target.files && e.target.files.length > 0) setScreenshot(e.target.files[0]); }}
                    className="w-full bg-void border border-stone-mid text-text-primary file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-gold file:text-void cursor-pointer rounded text-sm p-2" 
                  />
                  {submitError && <p className="text-crimson text-xs mt-2">{submitError}</p>}
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <div className="flex flex-col items-center text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-stone shadow-xl border border-gold/50 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-gold w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-text-primary tracking-wider">
                    {isComboPass ? 'CONTINGENT DOMINATION FORGED' : 'REGISTRATION FORGED'}
                  </h2>
                  <p className="text-text-ghost text-sm mt-3 max-w-sm mx-auto">
                    {isComboPass 
                      ? 'All 12 rosters have been deployed into their respective departments. The core festival heads are verifying your payment pass.'
                      : `Your registration for ${activeEvent?.name} has been submitted successfully. The team is currently verifying the transaction.`
                    }
                  </p>
                </div>
                
                {!isComboPass && activeEvent?.whatsappLink && (
                  <a 
                    href={activeEvent.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2.5 bg-crimson hover:bg-crimson-hi text-text-primary font-heading font-semibold text-xs tracking-widest uppercase rounded inline-flex items-center gap-2"
                  >
                    Join Event WhatsApp Group
                  </a>
                )}

                <button type="button" onClick={closeModal} className="text-text-ghost hover:text-gold text-xs uppercase tracking-widest font-semibold transition-colors mt-2">
                  Return to Citadel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions Toolbar */}
        {step < 4 && (
          <div className="relative z-10 border-t border-gold/10 p-4 bg-stone flex gap-4 shrink-0">
            {((step === 2 && isComboPass && currentComboIndex > 0) || step > 1) && (
              <button type="button" onClick={() => handleBack(step)} className="px-6 py-3 border border-stone-mid text-text-body font-heading text-sm rounded w-1/3 hover:text-text-primary transition-all">
                BACK
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={() => handleNext(step)} className="flex-1 bg-gold hover:bg-gold-bright text-void font-heading font-semibold tracking-widest text-sm py-3 rounded transition-all flex items-center justify-center gap-2">
                {step === 2 && isComboPass ? `SAVE & CONTINUE EVENT (${currentComboIndex + 1}/12)` : 'CONTINUE'}
                <ChevronRight size={16} />
              </button>
            ) : (
              <button form="regForm" type="submit" disabled={isSubmitting} className={`flex-1 font-heading font-semibold tracking-widest text-sm py-3 rounded transition-all ${isSubmitting ? 'bg-stone-mid text-text-ghost cursor-not-allowed' : 'bg-crimson text-text-primary shadow-lg'}`}>
                {isSubmitting ? 'FORGING SHEETS...' : 'IGNITE THE ENTRY'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
