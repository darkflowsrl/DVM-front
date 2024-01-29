import { create } from 'zustand'

interface UseFormInitial {
  isValid: boolean
  setEsValid: (newState: boolean) => void
}

export const useFormInitial = create<UseFormInitial>((set) => ({
  isValid: false,
  setEsValid: (newState: boolean) => set({ isValid: newState })
}))
