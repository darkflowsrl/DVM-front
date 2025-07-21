import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"

import { INodoConfig } from "@main/api/nodos/nodos.store"

import { INodoStatus } from "@renderer/interfaces/nodo-status"
import { getNodosStatus } from "@renderer/lib/api/get-nodos-status";
import { IAspersorFull, INodoFull } from "@renderer/interfaces/nodo-full";

interface StatusContextProps {
  nodosStatus?: INodoStatus[]
  nodosConfig?: INodoConfig[]
  updateNodosConfig: () => Promise<void>
  nodosFull?: INodoFull[]
}

const NodosStatusContext = createContext<StatusContextProps | undefined>(undefined)

interface NodosStatusProviderProps {
  children: ReactNode;
}

export function NodosStatusProvider ({ children }: NodosStatusProviderProps) {

    const [nodosConfig, setNodosConfig] = useState<INodoConfig[]>([])

    const [nodosStatus, setNodosStatus] = useState<INodoStatus[]>();

    const nodosFull = useMemo<INodoFull[] | undefined>(() => {
      return nodosConfig?.map((nodo) => {
        const nodoStatus = nodosStatus?.find((status) => status.nodo === nodo.id)

        if (nodoStatus == null) {
          return {
            ...nodo,
            conectado: false,
            aspersores: nodo.aspersores.map((aspersor) => ({
              ...aspersor,
              estado: -1,
              rpm: 0
            })),
          } as INodoFull
        }

        return ({
          ...nodo,
          conectado: true,
          aspersores: nodo.aspersores.map((aspersor) => {
            let estado = -1;
            let rpm = 0;

            if(aspersor.id === 1) {
              rpm = nodoStatus.rpm1
              estado = nodoStatus.state1
            }

            if(aspersor.id === 2) {
              rpm = nodoStatus.rpm2
              estado = nodoStatus.state2
            }

            if(aspersor.id === 3) {
              rpm = nodoStatus.rpm3
              estado = nodoStatus.state3
            }

            if(aspersor.id === 4) {
              rpm = nodoStatus.rpm4
              estado = nodoStatus.state4
            }

            return ({
              ...aspersor,
              estado,
              rpm
            }) as IAspersorFull
          })
        }) as INodoFull
      })
    }, [nodosConfig, nodosStatus])

    const getNodosConfig = async () => {
      const res = await window.api.invoke.getNodosAsync()

      setNodosConfig(res)
    }

    // fetch nodos config 
    useEffect(() => {
        getNodosConfig()     
    }, [])

    // suscribe status updates
    useEffect(() => {

      const fetchNodosStatus = async () => {
        const { res, error } = await getNodosStatus()
        if (error) {
          console.error('### Error fetching nodos status:', error)
          return
        }

      if (res == null) {
          console.warn('### No nodos status received')
          return
        }

        console.log('### Nodos status fetched:', res.nodos)

        setNodosStatus(res.nodos as INodoStatus[])
      }

      fetchNodosStatus()

      const interval = setInterval(() => {
        fetchNodosStatus()
      }, 1000)

      return () => {
        clearInterval(interval)
      }

    }, []);

    return (
      <NodosStatusContext.Provider value={{ nodosStatus, nodosConfig, updateNodosConfig: getNodosConfig, nodosFull }}>
        {children}
      </NodosStatusContext.Provider>
    )
}

export const useNodosStatus = (): StatusContextProps => {
  const context = useContext(NodosStatusContext)
  if (!context) {
    throw new Error('useNodosStatus must be used within a NodosStatusProvider')
  }
  return context
}