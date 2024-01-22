import { ReactNode } from 'react'
import { Header } from './Header'
import { Aside } from './Aside'

interface Props {
  children: ReactNode;
}

export function Layout ({ children }: Props) {
  return (
    <>
      <Header />
      <Aside />
      <main className='w-screen h-screen relative bg-[#172530] pt-[46px]'>
        {children}
      </main>
    </>
  )
}
