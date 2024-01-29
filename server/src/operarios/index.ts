
import { Request, Response } from 'express';
import { OperariosStore } from './operarios.store';
import dotenv from 'dotenv'

dotenv.config()

const operariosStore = OperariosStore({ urlDataJson: process.env.URL_DATA_OPERARIOS ?? '' })

export const allOperarios = async (req: Request, res: Response) => {
  res.send(await operariosStore.all())
}

export const getOperario = async (req: Request, res: Response) => {
  const _id = Number.parseInt(req.params.id)
  res.send(await operariosStore.get(_id))
}

export const removeOperario = async (req: Request, res: Response) => {
  const _id = Number.parseInt(req.params.id)
  res.send(await operariosStore.remove(_id))
}

export const addOperario = async (req: Request, res: Response) => {
  const nuevoOperario = req.body
  console.log(nuevoOperario)
  res.send(
    await operariosStore.add({
      name: nuevoOperario.name
    })
  )
}