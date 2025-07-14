
import { API_URL } from '../const'
import { IRes } from '../../interfaces'

interface PostStartWorkProps {
  nodes: {
    nodo: number,
    rpm1: number,
    rpm2: number,
    rpm3: number,
    rpm4: number,
  }[]
}

export async function postStartWork ({nodes}: PostStartWorkProps): Promise<IRes> {

  try {
    const res = await fetch(`${API_URL}/normal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nodos: nodes})
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