export type IdsEstadoAspersorType = 
  | -1 // '' 
  | 0 // 'OK'
  | 1 // 'Cortocircuito' Grave
  | 2 // 'Motor bloqueado' Grave
  | 3 // 'Motor no conectado'
  | 4 // 'Sobrecorriente'
  | 5 // 'Subcorriente'
  | 6 // 'Baja tension'
  | 7 // 'Error de sensor'
  | 8 // 'RPM no alcanzada'
  | 9 // 'Error de caudalimetro'

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

export interface AspersorData {
  id: 1 | 2 | 3 | 4
  deshabilitado?: boolean
  estado?: EstadoAspersor
  ubicacion?: UbicacionAspersorType
  rpm?: number
  rpmDeseado?: number
}

interface EstadoAspersor {
  id: IdsEstadoAspersorType
}

export type NodoType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'
export interface NodoData {
  id: number
  nombre: NodoType
  deshabilitado?: boolean
  aspersores: AspersorData[]
}
