import { create } from 'zustand'

export type ModeAppType = 'light' | 'full'

interface AppState {
  modeApp: ModeAppType
  changeMode: (modeApp: ModeAppType) => void
}

export const useApp = create<AppState>((set) => ({
  // initial state
  modeApp: 'light',
  changeMode: (modeApp: ModeAppType): void => {
    set(() => ({
      modeApp
    }))
  }
}))
