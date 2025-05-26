import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { APP_DATA_PATH } from '../../utils/urls'
import { LangStore } from '../lang/lang.store'

export type ModeAppType = 'light' | 'full'

export interface ItemMenu {
  icon: string
  title: string
  link: string
  modeApp: ModeAppType[]
}

export const ItemsMenuStore = () => {
  return {
    all: async () => {
      const langStore = LangStore()
      const lang = await langStore.getTypeLangSelectedAsync()

      let urlDataJson = path.join(APP_DATA_PATH(), 'data', `items-menu.${lang}.json`)
      const urlDataJsonDefault = path.join(
        __dirname,
        '../../resources/data',
        `items-menu.${lang}.json`
      )
      if (!existsSync(urlDataJson)) urlDataJson = urlDataJsonDefault

      return JSON.parse(await readFileSync(urlDataJson).toString()) as ItemMenu[]
    }
  }
}
