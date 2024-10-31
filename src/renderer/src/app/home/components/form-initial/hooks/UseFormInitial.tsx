import { create } from 'zustand'

interface Operario {
  id?: number
  name: string
}

interface Lote {
  id?: number
  name: string
  superficie: string
  ubicacion: string
  geoposicionamiento: {
    lat: number
    long: number
  }
}

interface TipoAplicacion {
  id?: number
  name: string
  tipoCultivo?: string
  recetaAgronomica?: string
}

interface UseFormInitial {
  isValid: boolean
  operario: Operario
  lote: Lote
  tipoAplicacion: TipoAplicacion
  hectareas?: number
  setFormInitial: (newState: {
    isValid: boolean
    operario: Operario
    lote: Lote
    tipoAplicacion: TipoAplicacion
    hectareas?: number
  }) => void
}

export const useFormInitial = create<UseFormInitial>((set) => ({
  isValid: false,
  operario: {
    id: -1,
    name: ''
  },
  lote: {
    id: -1,
    name: '',
    ubicacion: '',
    superficie: '',
    geoposicionamiento: {
      lat: 0,
      long: 0
    }
  },
  tipoAplicacion: {
    id: -1,
    name: '',
    tipoCultivo: '',
    recetaAgronomica: ''
  },
  hectareas: 0,
  setFormInitial: (newState: {
    isValid: boolean
    operario: Operario
    lote: Lote
    tipoAplicacion: TipoAplicacion
    hectareas?: number
  }): void =>
    set({
      isValid: newState.isValid,
      operario: newState.operario,
      lote: newState.lote,
      tipoAplicacion: newState.tipoAplicacion,
      hectareas: newState?.hectareas ?? 0
    })
}))
