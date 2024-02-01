import { create } from 'zustand'

type Toggle = {
  isOpen: boolean;
  handleToggleSidebar: () => void;
};

export const useToggle = create<Toggle>((set) => ({
  isOpen: false,
  handleToggleSidebar: () => set((state) => ({ isOpen: !state.isOpen }))
}))
