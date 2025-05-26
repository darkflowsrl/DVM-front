import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { APP_DATA_PATH } from '../../utils/urls'
import { LangStore } from '../lang/lang.store'

export interface ItemInfoData {
  icon: string
  title: string
  medicion: string
  unidad: string
  info: string
}

export const ItemsInfoStore = () => {
  return {
    all: async () => {
      const langStore = LangStore()
      const lang = await langStore.getTypeLangSelectedAsync()

      let urlDataJson = path.join(APP_DATA_PATH(), 'data', `items-info.${lang}.json`)
      const urlDataJsonDefault = path.join(
        __dirname,
        '../../resources/data',
        `items-info.${lang}.json`
      )
      if (!existsSync(urlDataJson)) urlDataJson = urlDataJsonDefault

      return JSON.parse(await readFileSync(urlDataJson).toString()) as ItemInfoData[]
    }
  }
}
