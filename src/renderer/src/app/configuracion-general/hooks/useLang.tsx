import { create } from 'zustand'

export type LangType = 'es' | 'en' | 'pt' | 'zh' | 'it' | 'de' | 'fr'

interface IDataLang {
  [key: string]: string
}

type Lang = {
  langSeleccionado: () => Promise<LangType>
  dataLang?: IDataLang
  setLang: (value: LangType) => Promise<void>
}

export const useLang = create<Lang>((set) => ({
  langSeleccionado: async (): Promise<LangType> => {
    const langSelect = await window.api.invoke.getTypeLangSelectedAsync()
    return langSelect
  },
  dataLang: undefined,
  setLang: async (value: LangType): Promise<void> => {
    const dataLang = await window.api.invoke.getLangAsync(value)
    await window.api.invoke.cambiarLangAsync(value)
    set(() => ({ langSeleccionado: async () => value, dataLang }))
  }
}))
