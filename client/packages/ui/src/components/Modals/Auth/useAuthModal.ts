import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  isLogin: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (loginModal?: boolean) => void;
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAuthModal = create<AuthModalStore>((set: any) => ({
  isOpen: false,
  isLogin: true,
  onOpen: (loginModal = true) => {
    set({ isOpen: true, isLogin: loginModal });
  },
  onClose: () => set({ isOpen: false, isLogin: true }),
}));

export { useAuthModal };
