export enum AspersorStatus {
    Ninguno = -1, // ''
    OK = 0, // 'OK'
    Cortocircuito = 1, // 'Cortocircuito' Grave
    MotorBloqueado = 2, // 'Motor bloqueado' Grave
    MotorNoConectado = 3, // 'Motor no conectado'
    Sobrecorriente = 4, // 'Sobrecorriente'
    Subcorriente = 5, // 'Subcorriente'
    BajaTension = 6, // 'Baja tension'
    ErrorSensor = 7, // 'Error de sensor'
    RpmNoAlcanzada = 8, // 'RPM no alcanzada'
    ErrorCaudalimetro = 9 // 'Error de caudalimetro'
}

export interface INodoStatus {
  command: string
  nodo: number
  state1: AspersorStatus
  state2: AspersorStatus
  state3: AspersorStatus
  state4: AspersorStatus
  corr1: number
  corr2: number
  corr3: number
  corr4: number
  rpm1: number
  rpm2: number
  rpm3: number
  rpm4: number
  voltaje: number
}