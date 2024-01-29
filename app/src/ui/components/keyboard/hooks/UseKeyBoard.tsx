import { create } from 'zustand'

interface UseChangeValueKeyBoard {
  changeValue: string
  setChangeValue: (newChangeValue: string) => void
}

export const useChangeValueKeyBoard = create<UseChangeValueKeyBoard>((set) => ({
  changeValue: '',
  setChangeValue: (newChangeValue: string) => set({ changeValue: newChangeValue })
}))
