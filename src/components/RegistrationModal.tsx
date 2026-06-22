import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Check } from 'lucide-react';
import { useRegistrationStore } from '../store/registrationStore';
import { events } from '../data/events';
import { gsap } from '../lib/gsap';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
  college: z.string().min(3, 'College name required'),
  year: z.enum(['1st', '2nd', 'Final', 'Other']),
  selectedEvents: z.array(z.string()).min(1, 'Choose at least one event'),
  transactionId: z.string().min(6, 'Enter a valid Transaction ID / UTR number (at least 6 characters)'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationModal: React.FC = () => {
  const { isOpen, step, setStep, closeModal, reset, selectedEvents, toggleEvent, isDirectRegistration } = useRegistrationStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      year: '1st',
      selectedEvents: [],
      transactionId: ''
    }
  });

  // Sync selected events with react-hook-form
  useEffect(() => {
    setValue('selectedEvents', selectedEvents);
  }, [selectedEvents, setValue]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = async (currentStep: number) => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['name', 'email', 'phone', 'college', 'year']);
    } else if (currentStep === 2) {
      isValid = await trigger(['selectedEvents']);
    }

    if (isValid) {
      const container = containerRef.current;
      
      // LOGIC UPDATE: Skip Step 2 if direct registration
      let nextStep = currentStep + 1;
      if (currentStep === 1 && isDirectRegistration) {
        nextStep = 3;
      }

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
    
    // LOGIC UPDATE: Skip Step 2 going backward if direct registration
    let prevStep = currentStep - 1;
    if (currentStep === 3 && isDirectRegistration) {
      prevStep = 1;
    }

    if (container) {
      gsap.to(container, { x: '20px', opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => {
        setStep(prevStep);
        gsap.fromTo(container, { x: '-20px', opacity: 0 }, { x: '0px', opacity: 1, duration: 0.3, ease: 'power3.out' });
      }});
    } else {
      setStep(prevStep);
    }
  };

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Registration Submitted:', data);
    reset();
    alert("Registration successful! The Castle awaits your arrival.");
  };

  const nonPlaceholderEvents = events.filter(e => !e.isPlaceholder);

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
        <div className="flex-shrink-0 border-b border-gold/10 px-6 py-4 flex items-center justify-between bg-stone">
          <h2 className="font-display font-semibold text-gold tracking-widest uppercase">Enter the Registry</h2>
          <button onClick={closeModal} className="text-text-ghost hover:text-crimson transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-shrink-0 h-1 bg-void w-full relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gold transition-all duration-500 ease-out" 
            style={{ width: `${(step / 3) * 100}%` }} 
          />
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto px-6 py-6" ref={containerRef}>
          <form id="regForm" onSubmit={handleSubmit(onSubmit)}>
            
            {/* STEP 1: IDENTITY */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-heading text-xl text-text-primary mb-4">1. Your Identity</h3>
                
                <div>
                  <label className="block font-body text-text-ghost text-sm mb-1">Full Name</label>
                  <input {...register('name')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="John Doe" />
                  {errors.name && <p className="text-crimson text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block font-body text-text-ghost text-sm mb-1">Email</label>
                  <input type="email" {...register('email')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="john@example.com" />
                  {errors.email && <p className="text-crimson text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block font-body text-text-ghost text-sm mb-1">Phone Number</label>
                  <input {...register('phone')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="9876543210" />
                  {errors.phone && <p className="text-crimson text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-text-ghost text-sm mb-1">College</label>
                    <input {...register('college')} className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors" placeholder="SIMS" />
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
              </div>
            )}

            {/* STEP 2: EVENTS */}
            {step === 2 && (
              <div>
                <h3 className="font-heading text-xl text-text-primary mb-4">2. Choose Your District</h3>
                {errors.selectedEvents && <p className="text-crimson text-sm mb-4 bg-crimson/10 p-2 rounded">{errors.selectedEvents.message}</p>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  {nonPlaceholderEvents.map(event => {
                    const isSelected = selectedEvents.includes(event.id);
                    return (
                      <div 
                        key={event.id}
                        onClick={() => toggleEvent(event.id)}
                        className={`relative p-3 border rounded-[2px] cursor-pointer transition-all ${
                          isSelected ? 'border-crimson bg-crimson/10' : 'border-stone-mid bg-void hover:border-gold/30'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 text-crimson">
                            <Check size={16} />
                          </div>
                        )}
                        <span className="text-[10px] uppercase text-gold tracking-widest block mb-1">{event.category}</span>
                        <h4 className="font-heading text-text-primary text-sm mb-1">{event.name}</h4>
                        <p className="font-body text-[11px] text-text-ghost">{event.teamSize} &middot; {event.duration}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRMATION & PAYMENT */}
            {step === 3 && (
              <div className="text-center py-4">
                <h3 className="font-display text-2xl text-gold mb-2">Seal Your Entry</h3>
                <p className="font-body text-text-body mb-6 text-sm">Scan the sigil below to pay the registration fee.</p>
                
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
                  <label className="block font-body text-text-ghost text-sm mb-1">Transaction ID / UTR Number *</label>
                  <input 
                    type="text" 
                    {...register('transactionId')}
                    className="w-full bg-void border border-stone-mid focus:border-crimson outline-none px-4 py-3 rounded-[2px] text-text-primary transition-colors uppercase" 
                    placeholder="e.g. 312345678901" 
                  />
                  {errors.transactionId && <p className="text-crimson text-xs mt-1">{errors.transactionId.message}</p>}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 border-t border-gold/10 p-4 bg-stone flex gap-4">
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
              className="flex-1 bg-crimson hover:bg-crimson-hi text-text-primary font-heading font-semibold tracking-widest text-sm py-3 rounded-[2px] transition-colors shadow-[0_0_20px_rgba(192,57,43,0.3)]"
            >
              IGNITE YOUR ENTRY
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
