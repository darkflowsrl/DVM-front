import { create } from 'zustand'

interface UseKeyBoard {
  openedKeyBoard: boolean
  setKeyBoard: (newState: boolean) => void
}

export const useKeyBoard = create<UseKeyBoard>((set) => ({
  openedKeyBoard: false,
  setKeyBoard: (newState: boolean) => set({ openedKeyBoard: newState })
}))
