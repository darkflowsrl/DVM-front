import * as net from 'net'

const client = new net.Socket()
client.connect({ port: import.meta.env.VITE_PORT_WEBSOCKET_API, host: import.meta.env.VITE_HOST_WEBSOCKET_API ?? 'localhost' })

export interface DatosMeteorologicos {
  command: 'datosMeteorologicos'
  humedad: number | null
  velViento: number | null
  dirViento: number | null
  temperatura: number | null
  puntoDeRocio: number | null
}

export const asyncEmit = (command: 'datosMeteorologicos'): DatosMeteorologicos => {
  return new Promise<DatosMeteorologicos>((resolve, reject) => {
    client.on('data', (data) => {
      const infoData = data?.toString('utf-8')
      const infoDataJson = JSON.parse(infoData)
      if (infoDataJson && infoDataJson.command === command) {
        const datosMeteorologicos: DatosMeteorologicos = infoDataJson as DatosMeteorologicos
        console.log(datosMeteorologicos)
        resolve(datosMeteorologicos)
      }
    })
    setTimeout(reject, 1000)
  })
}
