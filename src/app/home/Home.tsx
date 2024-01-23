import React, { useEffect, useState } from 'react'
import { useTitle } from '../../lib/hooks/UseTitle'
import { InputSelect } from './components/InputSelect'
import { DataSelect } from './interfaces/data-select.interface'
import { InputText } from './components/InputText'
import { ItemInfo } from './components/ItemInfo'
import { ItemInfoData } from './interfaces/item-info.interface'

function Home () {
  const { setTitle } = useTitle()
  const [operarios, setOperarios] = useState<DataSelect[]>([])
  const [tiposAplicaciones, setTiposAplicaciones] = useState<DataSelect[]>([])

  useEffect(() => {
    const fetchOperarios = async () => {
      const response = await fetch('/data/operarios.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const result = await response.json()
      setOperarios(result)
    }

    const fetchTiposAplicaciones = async () => {
      const response = await fetch('/data/tipos-aplicaciones.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const result = await response.json()
      setTiposAplicaciones(result)
    }

    setTitle('Inicio Aplicación')
    fetchOperarios()
    fetchTiposAplicaciones()
  }, [])

  const [data, setData] = useState<ItemInfoData[]>()

  const fetchData = async () => {
    const response = await fetch('/data/items-info.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const result = await response.json()
    setData(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const items = data?.map(function (item, i) {
    return (
      <ItemInfo key={i} data={item} />
    )
  })

  return (
    <article className='w-full h-full flex content-center items-center justify-around '>

      <section className='flex flex-col'>
        <InputSelect label='Identificación Operario' data={operarios} />
        <InputText label='Identificación Lote' />
        <InputSelect label='Tipo de Aplicación' data={tiposAplicaciones} />
      </section>
      <section className='flex flex-col content-center items-end justify-around '>
        <section className='bg-[#1C2E3D] w-[480px] h-[528px] flex flex-col justify-evenly'>
          {items}
        </section>
        <button className='bg-[#32CF9C] text-[24px] font-roboto text-[#1C2E3D] w-[271px] h-[82px] mt-[32px]'>Iniciar Testing</button>
      </section>
    </article>
  )
}

export default Home
