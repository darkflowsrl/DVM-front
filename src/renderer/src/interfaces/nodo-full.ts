import { AspersorStatus } from "./nodo-status"

import { INodoConfig, IAspersorConfig } from "@main/api/nodos/nodos.store"

export interface IAspersorFull extends IAspersorConfig {
  estado: AspersorStatus
  rpm?: number
}

export type NodoNameType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'

export interface INodoFull extends Omit<INodoConfig, 'aspersores'> {
  conectado: boolean
  aspersores: IAspersorFull[]
}