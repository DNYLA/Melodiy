import { UserKey } from '@melodiy/types';
import { create } from 'zustand';

interface UserKeysStore {
  items: UserKey[];
  setKeys: (keys: UserKey[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useKeys = create<UserKeysStore>((set: any) => ({
  items: [],
  setKeys: (keys: UserKey[]) => {
    set({ items: keys });
  },
}));

export { useKeys };
