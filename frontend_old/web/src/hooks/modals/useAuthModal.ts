import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  isLogin: boolean; //If false user selected registration
  onOpen: (loginModal?: boolean) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  isLogin: true,
  onOpen: (loginModal = true) => set({ isOpen: true, isLogin: loginModal }),
  onClose: () => set({ isOpen: false, isLogin: true }),
}));

export default useAuthModal;
