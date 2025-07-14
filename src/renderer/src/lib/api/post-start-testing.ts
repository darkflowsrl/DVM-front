
import { API_URL } from '../const'
import { IRes } from '../../interfaces'

interface PostStartTestingProps {
  nodes: number[]
}

export async function postStartTesting ({nodes}: PostStartTestingProps): Promise<IRes> {

  try {
    const res = await fetch(`${API_URL}/testing`, {
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