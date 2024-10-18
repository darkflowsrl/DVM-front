import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { APP_DATA_PATH } from '../../utils/urls'

export type LangType = 'es' | 'en'

export interface ILangConfig {
  selected: LangType
}

export interface ILang {
  [key: string]: string
}

export const LangStore = (): {
  all: (lang?: LangType) => Promise<ILang | undefined>
  cambiarLangAsync: (lang: LangType) => Promise<LangType | undefined>
} => {
  return {
    cambiarLangAsync: async (lang: LangType): Promise<LangType | undefined> => {

      let urlDataJson = path.join(APP_DATA_PATH(), 'data/languages', 'default.json')
      const urlDataJsonDefault = path.join(
        __dirname,
        '../../resources/data/languages',
        'default.json'
      )
      if (!existsSync(urlDataJson)) urlDataJson = urlDataJsonDefault

      const langType = {
        selected : lang
      }

      await writeFileSync(urlDataJson, JSON.stringify(langType))

      return langType.selected
    },
    all: async (lang?: LangType): Promise<ILang | undefined> => {
      let urlConfigJson = path.join(APP_DATA_PATH(), 'data/languages', 'default.json')
      const urlConfigJsonDefault = path.join(
        __dirname,
        '../../resources/data/languages',
        'default.json'
      )
      if (!existsSync(urlConfigJson)) urlConfigJson = urlConfigJsonDefault

      const lengConfig = await (JSON.parse(readFileSync(urlConfigJson).toString()) as ILangConfig)

      let urlDataJson = path.join(APP_DATA_PATH(), 'data/languages', (lang ?? lengConfig.selected) + '.json')
      const urlDataJsonDefault = path.join(
        __dirname,
        '../../resources/data/languages',
        (lang ?? lengConfig.selected) + '.json'
      )
      if (!existsSync(urlDataJson)) urlDataJson = urlDataJsonDefault
      return await (JSON.parse(readFileSync(urlDataJson).toString()) as ILang)
    }
  }
}
