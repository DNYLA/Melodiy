import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  isLogin: boolean;
  onOpen: (loginModal?: boolean) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set: any) => ({
  isOpen: false,
  isLogin: true,
  onOpen: (loginModal = true) => {
    set({ isOpen: true, isLogin: loginModal });
  },
  onClose: () => set({ isOpen: false, isLogin: true }),
}));

export { useAuthModal };
