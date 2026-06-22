import { create } from 'zustand';

interface RegistrationState {
  isOpen: boolean;
  step: number; // 1: User Details, 2: Choose District, 3: Confirm
  selectedEvents: string[]; // Array of event IDs
  userDetails: {
    name: string;
    email: string;
    phone: string;
    college: string;
    year: string;
  };
  isDirectRegistration: boolean; // Flags direct register clicked from detail page
  openModal: () => void;
  closeModal: () => void;
  setStep: (step: number) => void;
  toggleEvent: (eventId: string) => void;
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
  selectedEvents: [],
  userDetails: initialUserDetails,
  isDirectRegistration: false,

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  
  toggleEvent: (eventId) => set((state) => {
    const isSelected = state.selectedEvents.includes(eventId);
    return {
      selectedEvents: isSelected 
        ? state.selectedEvents.filter(id => id !== eventId)
        : [...state.selectedEvents, eventId]
    };
  }),

  setUserDetails: (details) => set((state) => ({
    userDetails: { ...state.userDetails, ...details }
  })),

  reset: () => set({
    isOpen: false,
    step: 1,
    selectedEvents: [],
    userDetails: initialUserDetails,
    isDirectRegistration: false,
  })
}));
