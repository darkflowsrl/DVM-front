import { create } from 'zustand'

interface UseContador {
  valor: number
  reset: () => void
  setEncendidoApagado: (encendidoApagado: 'encender' | 'apagar') => void
}

export const useContador = create<UseContador>((set) => ({
  valor: 0,
  reset: (): void => set({ valor: 0 }),
  setEncendidoApagado: (encendidoApagado: 'encender' | 'apagar'): void => set({ encendidoApagado })
}))
