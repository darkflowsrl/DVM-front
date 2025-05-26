import { create } from 'zustand'
import { IdsEstadoAspersorType } from '../components/nodo/interfaces/nodo-data'
import { useLang } from '@renderer/app/configuracion-general/hooks/useLang'

export type ModeAppType = 'light' | 'full'

interface AppState {
  modeApp: ModeAppType
  changeMode: (modeApp: ModeAppType) => void
  getDescripcionEstado: (idEstado: IdsEstadoAspersorType) => string
}

export const useApp = create<AppState>((set) => ({
  // initial state
  modeApp: 'light',
  changeMode: (modeApp: ModeAppType): void => {
    set(() => ({
      modeApp
    }))
  },
  getDescripcionEstado: (idEstado: IdsEstadoAspersorType): string => {
      const { dataLang } = useLang()
      let value: string = ''
      switch (idEstado) {
        case -1:
          value = ''
          break
        case 0:
          value = 'OK'
          break
        case 1:
          value = dataLang?.cortocircuito ?? 'Cortocircuito'
          break
        case 2:
          value = dataLang?.motorBloqueado ?? 'Motor bloqueado'
          break
        case 3:
          value = dataLang?.motorNoConectado ?? 'Motor no conectado'
          break
        case 4:
          value = dataLang?.sobrecorriente ?? 'Sobrecorriente'
          break
        case 5:
          value = dataLang?.subcorriente ?? 'Subcorriente'
          break
        case 6:
          value = dataLang?.bajaTension ?? 'Baja tension'
          break
        case 7:
          value = dataLang?.errorDeSensor ?? 'Error de sensor'
          break
        case 8:
          value = dataLang?.RPMNoAlcanzada ?? 'RPM no alcanzada'
          break
        case 9:
          value = dataLang?.errorDeCaudalimetro ?? 'Error de caudalimetro'
          break
      }
      return value
    }
  
}))
