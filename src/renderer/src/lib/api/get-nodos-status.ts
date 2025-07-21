
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

    const nodos = await res.json() as INodoStatus[]

    console.log('### Nodos status response:', nodos)

    return { res: {nodos} }

  } catch (error) {
    return {
      error: {
        code: 0,
        message: 'No se pudo conectar con el servidor'
      }
    }
  }

}