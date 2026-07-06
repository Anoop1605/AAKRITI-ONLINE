import React, { useRef, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useRegistrationStore } from '../store/registrationStore';
import { events } from '../data/events';
import { gsap, ScrollTrigger } from '../lib/gsap';

// Helper to parse event team details
const getTeamDetails = (eventId: string | null) => {
  if (!eventId) return { isSolo: true, min: 1, max: 1 };
  const event = events.find(e => e.id === eventId);
  if (!event) return { isSolo: true, min: 1, max: 1 };
  
  const size = event.teamSize.toLowerCase();
  
  if (size.includes('singles / doubles') || size.includes('singles/doubles')) {
    return { isSolo: false, min: 1, max: 2 };
  }
  
  if (size.includes('solo') || size === '1v1' || size === 'singles') {
    return { isSolo: true, min: 1, max: 1 };
  }
  
  if (size.includes('7v7')) return { isSolo: false, min: 7, max: 10 };
  if (size.includes('6v6')) return { isSolo: false, min: 6, max: 10 };
  if (size.includes('doubles')) return { isSolo: false, min: 2, max: 2 };
  if (size.includes('8 pullers')) return { isSolo: false, min: 8, max: 8 };
  if (size.includes('11 players')) return { isSolo: false, min: 11, max: 11 };
  
  const rangeMatch = size.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    return { isSolo: false, min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
  }
  
  const exactMatch = size.match(/^(\d+)$/);
  if (exactMatch) {
    return { isSolo: false, min: parseInt(exactMatch[1]), max: parseInt(exactMatch[1]) };
  }
  
  return { isSolo: false, min: 2, max: 15 };
};

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
  college: z.string().min(3, 'College name required'),
  year: z.enum(['1st', '2nd', 'Final', 'Other']),
  selectedEventId: z.string().min(1, 'Event ID is missing'),
  teamName: z.string().optional(),
  teamMembers: z.array(
    z.object({
      name: z.string().min(2, 'Name required')
    })
  ).optional(),
}).refine((data) => {
  // If teamMembers array is not empty, teamName must be provided
  if (data.teamMembers && data.teamMembers.length > 0) {
    return !!data.teamName && data.teamName.trim().length > 0;
  }
  return true;
}, {
  message: "Team Name is required for team events",
  path: ["teamName"]
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationModal: React.FC = () => {
  const { isOpen, step, setStep, closeModal, reset, selectedEventId } = useRegistrationStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { register, control, handleSubmit, formState: { errors }, trigger, setValue } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      year: '1st',
      selectedEventId: '',
      teamName: '',
      teamMembers: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers'
  });

  const event = events.find(e => e.id === selectedEventId);
  const { isSolo, min, max } = getTeamDetails(selectedEventId);
  const [teamSize, setTeamSize] = useState<number>(1);
  const [teamSizeInput, setTeamSizeInput] = useState<string>('1');
  const [teamSizeError, setTeamSizeError] = useState<string | null>(null);

  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleTeamSizeChange = (newSize: number) => {
    setTeamSize(newSize);
    
    const currentLength = fields.length;
    const targetLength = newSize - 1; // excluding leader
    
    if (currentLength < targetLength) {
      const diff = targetLength - currentLength;
      for (let i = 0; i < diff; i++) {
        append({ name: '' });
      }
    } else if (currentLength > targetLength) {
      const indicesToRemove = [];
      for (let i = targetLength; i < currentLength; i++) {
        indicesToRemove.push(i);
      }
      remove(indicesToRemove);
    }
  };

  const handleTeamSizeInputChange = (val: string) => {
    setTeamSizeInput(val);
    
    if (val === '') {
      setTeamSizeError(`Team size is required (Min: ${min}, Max: ${max})`);
      return;
    }
    
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {
      setTeamSizeError('Please enter a valid number');
      return;
    }
    
    if (parsed < min || parsed > max) {
      setTeamSizeError(`Team size must be between ${min} and ${max}`);
      return;
    }
    
    setTeamSizeError(null);
    handleTeamSizeChange(parsed);
  };

  // Sync selected event ID and initialize team members
  useEffect(() => {
    if (selectedEventId && isOpen) {
      setValue('selectedEventId', selectedEventId);
      
      const { isSolo: soloCheck, min: minSize } = getTeamDetails(selectedEventId);
      if (!soloCheck) {
        // Initialize with (minSize - 1) empty team members (registrant is the leader / member 1)
        const initialMembers = Array.from({ length: minSize - 1 }, () => ({
          name: ''
        }));
        setValue('teamMembers', initialMembers);
        setTeamSize(minSize);
        setTeamSizeInput(minSize.toString());
        setTeamSizeError(null);
      } else {
        setValue('teamMembers', []);
        setValue('teamName', '');
        setTeamSize(1);
        setTeamSizeInput('1');
        setTeamSizeError(null);
      }
    }
  }, [selectedEventId, setValue, isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  // Disable ScrollTrigger.normalizeScroll while modal is open so native
  // overflow-y scrolling works inside the modal body container.
  useEffect(() => {
    if (isOpen) {
      ScrollTrigger.normalizeScroll(false);
    }
    return () => {
      if (isOpen) {
        ScrollTrigger.normalizeScroll(true);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = async (currentStep: number) => {
    let isValid = false;
    if (currentStep === 1) {
      const isIdentityValid = await trigger(['name', 'email', 'phone', 'college', 'year']);
      
      let isTeamSizeValid = true;
      if (!isSolo) {
        const parsed = parseInt(teamSizeInput, 10);
        if (isNaN(parsed) || parsed < min || parsed > max) {
          setTeamSizeError(`Team size must be between ${min} and ${max}`);
          isTeamSizeValid = false;
        }
      }
      
      isValid = isIdentityValid && isTeamSizeValid;
    } else if (currentStep === 2) {
      isValid = await trigger(['teamName', 'teamMembers']); // Validate roster
    }

    if (isValid) {
      const container = containerRef.current;
      const nextStep = currentStep + 1; // Simple linear progression
      
      if (container) {
        gsap.to(container, { x: '-20px', opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => {
          setStep(nextStep);
          gsap.fromTo(container, { x: '20px', opacity: 0 }, { x: '0px', opacity: 1, duration: 0.3, ease: 'power3.out' });
        }});
      } else {
        setStep(nextStep);
      }
    }
  };

  const handleBack = (currentStep: number) => {
    const container = containerRef.current;
    const prevStep = currentStep - 1; // Simple linear regression

    if (container) {
      gsap.to(container, { x: '20px', opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => {
        setStep(prevStep);
        gsap.fromTo(container, { x: '-20px', opacity: 0 }, { x: '0px', opacity: 1, duration: 0.3, ease: 'power3.out' });
      }});
    } else {
      setStep(prevStep);
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
      payload.append('teamName', data.teamName || '');
      
      // Map category
      let categoryVal = 'SPORTS';
      if (event?.category === 'cultural') {
        categoryVal = 'CULTURALS';
      } else if (event?.category === 'management') {
        categoryVal = 'MANAGEMENT';
      }
      payload.append('category', categoryVal);
      payload.append('eventName', event?.name || '');
      payload.append('leaderName', data.name);
      payload.append('leaderEmail', data.email);
      payload.append('leaderPhone', data.phone);
      payload.append('collegeName', data.college);

      // Map year
      let yearVal = '1';
      if (data.year === '2nd') yearVal = '2';
      else if (data.year === 'Final') yearVal = '3';
      else if (data.year === 'Other') yearVal = '4';
      payload.append('yearOfStudy', yearVal);

      // Join team members
      const memberNames = data.teamMembers
        ? data.teamMembers.map(m => m.name).filter(Boolean).join(', ')
        : '';
      payload.append('memberNames', memberNames);
      payload.append('screenshot', screenshot);

      const baseApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
      const response = await fetch(`${baseApiUrl}/api/v1/registrations`, {
        method: 'POST',
        body: payload
      });

      if (response.status === 201) {
        reset();
        setScreenshot(null);
        alert("Registration successful! The Castle awaits your arrival.");
        closeModal();
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitError(errorData.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err: any) {
      setSubmitError('Network error or backend is not running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/90 backdrop-blur-sm" onClick={closeModal} />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full md:max-w-[560px] max-h-[90vh] md:max-h-[85vh] bg-stone-mid border-t md:border border-gold/20 rounded-t-xl md:rounded-[3px] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="relative z-10 border-b border-gold/10 px-6 py-4 flex items-center justify-between bg-stone shrink-0">
          <h2 className="font-display font-semibold text-gold tracking-widest uppercase">Enter the Registry</h2>
          <button onClick={closeModal} className="text-text-ghost hover:text-crimson transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 h-1 bg-void w-full shrink-0">
          <div 
            className="absolute top-0 left-0 h-full bg-gold transition-all duration-500 ease-out" 
            style={{ width: `${(step / 3) * 100}%` }} 
          />
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-6 min-h-0 flex-1" ref={containerRef}>
          <form id="regForm" onSubmit={handleSubmit(onSubmit)}>
            
            {/* STEP 1: IDENTITY */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-heading text-xl text-text-primary mb-4">1. Your Identity</h3>
                
                <div>
                  <label className="block font-body text-text-ghost text-sm mb-1">Full Name</label>
                  <input {...register('name')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="Enter your full name" />
                  {errors.name && <p className="text-crimson text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block font-body text-text-ghost text-sm mb-1">Email</label>
                  <input type="email" {...register('email')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="Enter your email address" />
                  {errors.email && <p className="text-crimson text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block font-body text-text-ghost text-sm mb-1">Phone Number</label>
                  <input {...register('phone')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="Enter 10-digit mobile number" />
                  {errors.phone && <p className="text-crimson text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-text-ghost text-sm mb-1">College</label>
                    <input {...register('college')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="Enter your college or institution" />
                    {errors.college && <p className="text-crimson text-xs mt-1">{errors.college.message}</p>}
                  </div>
                  <div>
                    <label className="block font-body text-text-ghost text-sm mb-1">Year</label>
                    <select {...register('year')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors">
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="Final">Final Year</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Team Size Selection for Team Events */}
                {!isSolo && (
                  <div className="border-t border-gold/10 pt-4 mt-2">
                    {min === max ? (
                      <div>
                        <label className="block font-body text-text-ghost text-sm mb-1">Team Size</label>
                        <div className="w-full bg-void/50 border border-stone-mid/50 px-4 py-3 rounded-[2px] text-gold font-semibold text-sm">
                          Fixed at {min} members (including you)
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block font-body text-text-ghost text-sm mb-1">Total Team Size (including you) *</label>
                        <input 
                          type="number"
                          min={min}
                          max={max}
                          value={teamSizeInput}
                          onChange={(e) => handleTeamSizeInputChange(e.target.value)}
                          className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors"
                          placeholder={`Enter size (${min}-${max})`}
                        />
                        {teamSizeError ? (
                          <p className="text-crimson text-xs mt-1">{teamSizeError}</p>
                        ) : (
                          <p className="font-body text-xs text-text-ghost mt-1">
                            Please enter how many members will be in your team (between {min} and {max}).
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: TEAM ROSTER */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="mb-4">
                  <span className="text-[10px] uppercase text-gold tracking-widest block mb-1">{event?.category}</span>
                  <h3 className="font-heading text-xl text-text-primary">2. Team Roster ({event?.name})</h3>
                  <p className="font-body text-xs text-text-ghost mt-1">
                    {isSolo 
                      ? 'This is a Solo/Singles event. No additional team members are required.' 
                      : `Minimum team size: ${min}, maximum: ${max} members (including you).`
                    }
                  </p>
                </div>

                {isSolo ? (
                  <div className="border border-stone-mid/30 bg-void/50 p-6 rounded-[2px] text-center">
                    <p className="font-body text-text-body text-sm mb-2">You are registered as a Solo warrior.</p>
                    <span className="font-heading text-gold text-xs tracking-widest uppercase">Click CONTINUE to proceed</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {teamSize > 1 && (
                      <div>
                        <label className="block font-body text-text-ghost text-sm mb-1">Team Name *</label>
                        <input 
                          {...register('teamName')} 
                          className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" 
                          placeholder="Enter your team name" 
                        />
                        {errors.teamName && <p className="text-crimson text-xs mt-1">{errors.teamName.message}</p>}
                      </div>
                    )}

                    {teamSize === 1 ? (
                      <div className="border border-stone-mid/30 bg-void/50 p-6 rounded-[2px] text-center">
                        <p className="font-body text-text-body text-sm mb-2">You are registered as a Singles entry.</p>
                        <span className="font-heading text-gold text-xs tracking-widest uppercase">Click CONTINUE to proceed</span>
                      </div>
                    ) : (
                      <div className="border-t border-gold/10 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-heading text-gold text-xs tracking-widest uppercase">Team Members (Excluding you)</span>
                          <span className="text-text-ghost text-xs font-body">Roster: {fields.length + 1} / {teamSize}</span>
                        </div>
                        
                        <div className="space-y-3">
                          {fields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-stone-mid/30 bg-void/50 rounded-[2px] space-y-3 relative">
                              <div>
                                <label className="block font-body text-text-ghost text-xs mb-1">Member {index + 2} Name</label>
                                <input 
                                  {...register(`teamMembers.${index}.name` as const)} 
                                  className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary text-sm transition-colors" 
                                  placeholder={`Enter member ${index + 2} name`} 
                                />
                                {errors.teamMembers?.[index]?.name && (
                                  <p className="text-crimson text-[10px] mt-1">{errors.teamMembers[index]?.name?.message}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: CONFIRMATION & PAYMENT */}
            {step === 3 && (
              <div className="text-center py-4">
                <h3 className="font-display text-2xl text-gold mb-2">Seal Your Entry</h3>
                <p className="font-body text-text-body mb-4 text-sm">Scan the sigil below to pay the registration fee.</p>
                
                <div className="mb-4 bg-void/30 border border-gold/10 p-3 rounded-[2px] inline-block">
                  <span className="font-body text-text-ghost text-xs block mb-1">TOTAL AMOUNT DUE</span>
                  <span className="font-heading text-crimson text-xl font-bold">{event?.fee}</span>
                </div>

                <div className="flex flex-col items-center mb-6">
                  {/* --- QR CODE PLACEHOLDER --- */}
                  <div className="w-48 h-48 border-2 border-dashed border-gold/40 rounded-[2px] p-2 flex items-center justify-center bg-stone-mid/20">
                    <span className="font-body text-text-ghost text-xs text-center tracking-widest">
                      QR CODE<br/>PLACEHOLDER
                    </span>
                  </div>
                  <span className="font-mono text-gold mt-2 text-xs">UPI: aakriti2026@bank</span>
                </div>

                <div className="w-full text-left mb-6">
                  <label className="block font-body text-text-ghost text-sm mb-1">Payment Screenshot *</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    required
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setScreenshot(e.target.files[0]);
                      }
                    }}
                    className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-void hover:file:bg-gold-bright file:cursor-pointer" 
                  />
                  {submitError && <p className="text-crimson text-xs mt-1">{submitError}</p>}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 border-t border-gold/10 p-4 bg-stone flex gap-4 shrink-0">
          {step > 1 && (
            <button 
              type="button" 
              onClick={() => handleBack(step)}
              className="px-6 py-3 border border-stone-mid text-text-body font-heading text-sm hover:text-text-primary transition-colors rounded-[2px] w-1/3"
            >
              BACK
            </button>
          )}
          {step < 3 ? (
            <button 
              type="button" 
              onClick={() => handleNext(step)}
              className="flex-1 bg-gold hover:bg-gold-bright text-void font-heading font-semibold tracking-widest text-sm py-3 rounded-[2px] transition-colors"
            >
              CONTINUE
            </button>
          ) : (
            <button 
              form="regForm"
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 font-heading font-semibold tracking-widest text-sm py-3 rounded-[2px] transition-colors ${
                isSubmitting ? 'bg-stone-mid text-text-ghost cursor-not-allowed' : 'bg-crimson hover:bg-crimson-hi text-text-primary shadow-[0_0_20px_rgba(192,57,43,0.3)]'
              }`}
            >
              {isSubmitting ? 'SEALING...' : 'IGNITE YOUR ENTRY'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
