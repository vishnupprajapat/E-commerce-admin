import { create } from "zustand";

interface UseStoreModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const UseStoreModel = create<UseStoreModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
