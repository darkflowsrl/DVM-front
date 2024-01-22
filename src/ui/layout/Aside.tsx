import clsx from 'clsx'
import { useToggle } from './hooks/useToggle'
import { ItemMenu } from './interfaces/item-menu.interface'
import { ItemMenuAside } from './ItemMenuAside'
import React, { useEffect, useState } from 'react'

export function Aside () {
  const { isOpen } = useToggle()

  const [data, setData] = useState<ItemMenu[]>()

  const fetchData = async () => {
    const response = await fetch('/data/items-menu.json', {
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
      <li key={i}>
        <ItemMenuAside itemMenu={item} />
      </li>
    )
  })

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 z-20 mt-[80px] w-[277px] h-screen transition-transform  bg-[#32CF9C] rounded-r-lg dark:bg-[#32CF9C] flex flex-col justify-between',
        {
          '-translate-x-full': !isOpen
        }
      )}
    >
      <ul className='mt-[50px] ml-[15px] mr-[21px] '>
        {items}
      </ul>
    </aside>
  )
}
