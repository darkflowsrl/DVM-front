
import { API_URL } from '../const'
import { IRes } from '../../interfaces'

interface PostConfigProps {
  variacionRPM: number
  subcorriente: number
  sobrecorriente: number
  cortocicuito: number
  sensor: boolean
  electrovalvula: boolean
}

export async function postConfig (config: PostConfigProps): Promise<IRes> {

  try {
    const res = await fetch(`${API_URL}/setConfiguracion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    })

    if (!res.ok) {
      return {
        error: {
          message: await res.text(),
          code: res.status
        }
      }
    }

    return {}

  } catch (error) {
    return {
      error: {
        code: 0,
        message: 'No se pudo conectar con el servidor'
      }
    }
  }

}