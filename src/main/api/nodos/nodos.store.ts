import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { APP_DATA_PATH } from '../../utils/urls'



export type UbicacionAspersorType =
  | {
      id: 1
      name: 'Ruedas'
    }
  | {
      id: 2
      name: 'No conectado'
    }
  | {
      id: 3
      name: 'Izquierda'
    }
  | {
      id: 4
      name: 'Derecha'
    }
  | {
      id: 5
      name: 'Centro'
    }
  | {
      id: 6
      name: 'Sin asignar'
    }

export interface IAspersorConfig {
  id: 1 | 2 | 3 | 4
  ubicacion?: UbicacionAspersorType
  deshabilitado: boolean
}

export type NodoNameType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'

export interface INodoConfig {
  id: number
  nombre: NodoNameType
  deshabilitado: boolean
  aspersores: IAspersorConfig[]
}

export const NodosStore = () => {
  let urlDataJson = path.join(APP_DATA_PATH(), 'data', 'nodos.json')
  const urlDataJsonDefault = path.join(__dirname, '../../resources/data/nodos.json')
  if (!existsSync(urlDataJson)) urlDataJson = urlDataJsonDefault
  return {
    all: async (): Promise<INodoConfig[]> =>
      JSON.parse(await readFileSync(urlDataJson).toString()) as INodoConfig[],
    cambiarIdsNodosAsync: async (nodos: INodoConfig[]): Promise<INodoConfig[]> => {
      let data = JSON.parse(readFileSync(urlDataJson).toString()) as INodoConfig[]

      data = data.map((n) => {
        const nodoACambiar = nodos.find((nodo) => nodo.nombre === n.nombre)

        if (nodoACambiar) {
          n.id = nodoACambiar.id
        }

        return n
      })

      await writeFileSync(urlDataJson, JSON.stringify(data))

      return data
    },
    cambiarHabilitacionNodo: async (id: number): Promise<INodoConfig[]> => {
      let data = JSON.parse(readFileSync(urlDataJson).toString()) as INodoConfig[]

      data = data.map((n) => {
        if (n.id === id) {
          n.deshabilitado = !n.deshabilitado
          n.aspersores = n.aspersores.map((a) => ({
            ...a,
            deshabilitado: n.deshabilitado
          }))
        }
        return n
      })

      await writeFileSync(urlDataJson, JSON.stringify(data))

      return data
    },
    cambiarHabilitacionAspersor: async (
      idNodo: number,
      idAspersor: number
    ): Promise<INodoConfig[]> => {
      let data = JSON.parse(readFileSync(urlDataJson).toString()) as INodoConfig[]
      data = data.map((n) => {
        if (n.id == idNodo)
          n = {
            ...n,
            aspersores: n.aspersores.map((a) => {
              if (a.id == idAspersor) {
                a.deshabilitado = !a.deshabilitado
              }
              return a
            })
          }
        return n
      })
      await writeFileSync(urlDataJson, JSON.stringify(data))

      return data
    },
    cambiarUbicacionAspersor: async (
      idNodo: number,
      idAspersor: number,
      ubicacion: UbicacionAspersorType
    ): Promise<INodoConfig[]> => {
      let data = JSON.parse(readFileSync(urlDataJson).toString()) as INodoConfig[]
      data = data.map((n) => {
        if (n.id == idNodo)
          n = {
            ...n,
            aspersores: n.aspersores.map((a) => {
              if (a.id == idAspersor) a.ubicacion = ubicacion
              return a
            })
          }
        return n
      })
      await writeFileSync(urlDataJson, JSON.stringify(data))

      return data
    }
  }
}
