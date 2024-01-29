
import { Request, Response } from 'express';
import { TiposAplicacionesStore } from './tipos-aplicaciones.store';
import dotenv from 'dotenv'

dotenv.config()

const tiposAplicacionesStoresStore = TiposAplicacionesStore({ urlDataJson: process.env.URL_DATA_TIPOS_APLICACIONES ?? '' })

export const allTiposAplicaciones = async (req: Request, res: Response) => {
  res.send(await tiposAplicacionesStoresStore.all())
}

export const getTipoAplicacion = async (req: Request, res: Response) => {
  const _id = Number.parseInt(req.params.id)
  res.send(await tiposAplicacionesStoresStore.get(_id))
}

export const removeTipoAplicacion = async (req: Request, res: Response) => {
  const _id = Number.parseInt(req.params.id)
  res.send(await tiposAplicacionesStoresStore.remove(_id))
}

export const addTipoAplicacion = async (req: Request, res: Response) => {
  const nuevoOperario = req.body
  res.send(
    await tiposAplicacionesStoresStore.add({
      name: nuevoOperario.name
    })
  )
}