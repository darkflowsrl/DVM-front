import React from 'react'
import { ItemMenu } from './interfaces/item-menu.interface'

interface PropsItemMenu
{
  itemMenu: ItemMenu
}

export function ItemMenuAside ({ itemMenu }: PropsItemMenu) {
  return (
    <div className='flex h-[48px] mb-[24px]'>
      <div className='pl-[18px]'>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(itemMenu.icon)}`} />
      </div>
      <p className='text-[#1C2E3D] text-center font-roboto text-[16px] not-italic leading-[normal] pl-[18px]'>
        {itemMenu.title}
      </p>
    </div>
  )
}
