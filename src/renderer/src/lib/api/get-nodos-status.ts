
import { API_URL } from '../const'
import { IRes } from '../../interfaces'
import { INodoStatus } from '../../interfaces/nodo-status'

export async function getNodosStatus (): Promise<IRes<{nodos: INodoStatus[]}>> {

  try {
    const res = await fetch(`${API_URL}/estadoGeneralNodos`)

    if (!res.ok) {
      return {
        error: {
          message: await res.text(),
          code: res.status
        }
      }
    }

    const nodes = await res.json() as {nodos: INodoStatus[]}

    return { res: nodes }

  } catch (error) {
    return {
      error: {
        code: 0,
        message: 'No se pudo conectar con el servidor'
      }
    }
  }

}