import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  isLogin: boolean; //If false user selected registration
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  isLogin: true,
  toggleMode: (state: AuthModalStore) => set({ isLogin: state.isLogin }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
