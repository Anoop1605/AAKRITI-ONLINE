import { create } from 'zustand';

interface RegistrationState {
  isOpen: boolean;
  step: number; // 1: User Details, 2: Team Roster, 3: Payment
  selectedEventId: string | null; // Changed from array to single string
  userDetails: {
    name: string;
    email: string;
    phone: string;
    college: string;
    year: string;
  };
  isAboutOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openAbout: () => void;
  closeAbout: () => void;
  setStep: (step: number) => void;
  setEvent: (eventId: string) => void; // Replaced toggleEvent
  setUserDetails: (details: Partial<RegistrationState['userDetails']>) => void;
  reset: () => void;
}

const initialUserDetails = {
  name: '',
  email: '',
  phone: '',
  college: '',
  year: '1st' as const,
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  isOpen: false,
  step: 1,
  selectedEventId: null, // Default to null
  userDetails: initialUserDetails,
  isAboutOpen: false,

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  openAbout: () => set({ isAboutOpen: true }),
  closeAbout: () => set({ isAboutOpen: false }),
  setStep: (step) => set({ step }),
  setEvent: (eventId) => set({ selectedEventId: eventId }),
  
  setUserDetails: (details) => set((state) => ({
    userDetails: { ...state.userDetails, ...details }
  })),
  reset: () => set({
    isOpen: false,
    step: 1,
    selectedEventId: null,
    userDetails: initialUserDetails,
    isAboutOpen: false,
  })
}));
