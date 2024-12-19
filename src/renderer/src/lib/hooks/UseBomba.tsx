import { create } from 'zustand'

interface UseBomba {
  encendido: boolean
  encender: () => void
  apagar: () => void
}

export const useBomba = create<UseBomba>((set) => ({
  encendido: false,
  encender: (): void => set({ encendido: true }),
  apagar: (): void => set({ encendido: false })
}))
