import { existsSync, readFileSync } from 'fs'
import path from 'path'


export interface ItemInfoData {
  icon: string
  title: string
  medicion: string
  unidad: string
  info: string
}

export const ItemsInfoStore = () => {
  let urlDataJson = path.join('/root/frontend/data', 'items-info.json')
  const urlDataJsonDefault = path.join(__dirname, '../../resources/data/items-info.json')
  if (!existsSync(urlDataJson)) urlDataJson = urlDataJsonDefault
  return {
    all: async () => JSON.parse(await readFileSync(urlDataJson).toString()) as ItemInfoData[]
  }
}