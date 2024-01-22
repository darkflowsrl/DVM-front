import React, { ReactNode } from 'react'
import { Header } from './Header'
import { Aside } from './Aside'
import clsx from 'clsx'
import { useToggle } from './hooks/useToggle'

interface Props {
  children: ReactNode;
}

export function Layout ({ children }: Props) {
  const { isOpen } = useToggle()
  return (
    <>
      <Header />
      <Aside />
      <div className={clsx(
        'w-full h-full opacity-50  fixed top-0 left-0 z-10 bg-black',
        {
          hidden: !isOpen
        }
      )}
      />
      <main className='w-screen h-screen relative bg-[#172530] pt-[46px]'>
        {children}
      </main>
    </>
  )
}
