import { readFileSync, writeFileSync } from 'fs'
import { DataSelect } from '../../../interfaces/data-select.interface'

interface Props {
  urlDataJson: string
}

export const DataSelectService = ({ urlDataJson }: Props) => {
  const get = () => fetch(urlDataJson).then(res => JSON.parse(res))

  return {
    all: get(),
    get: (id: string) => get().find(m => m.id === id) ?? null,
    add: (value: DataSelect) => {
      const index = get().findIndex(m => m.id === value.id)
      const data = get()
      if (index) { data[index] = value } else { data.push(value) }

      writeFileSync(urlDataJson, JSON.stringify(data))
      return {
        data
      }
    },
    remove: (id: string) => {
      let data = get()
      data = data.filter((value) => value.id !== id)
      writeFileSync(urlDataJson, JSON.stringify(data))
      return { data }
    }
  }
}
