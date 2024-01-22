import React from 'react'
import { DataSelect } from '../interfaces/data-select.interface'

interface Props {
  label: string
  data: DataSelect[]
}

export function InputSelect ({ label, data }: Props) {
  const optiones = data.map((value, i) => {
    return <option key={i} value={value.id}>{value.name}</option>
  })

  return (
    <div className=''>
      <label className='font-roboto font-bold text-[#32cf9c] text-[20px] tracking-[0] leading-[normal] whitespace-nowrap'>{label}</label>
      <select>
        {optiones}
      </select>
    </div>
  )
}
