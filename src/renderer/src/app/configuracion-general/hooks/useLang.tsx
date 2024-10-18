import { create } from 'zustand'

export type LangType = 'es' | 'en'

interface IDataLang {
  [key: string]: string
}

type Lang = {
  langSeleccionado: LangType
  dataLang?: IDataLang
  setLang: (value: LangType) => Promise<void>
}

export const useLang = create<Lang>((set) => ({
  langSeleccionado: 'es',
  dataLang: undefined,
  setLang: async (value: LangType): Promise<void> => {
    const dataLang = await window.api.invoke.getLangAsync(value)
    set(() => ({ langSeleccionado: value, dataLang }))
  }
}))
