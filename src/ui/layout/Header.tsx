import { useEffect, useState } from 'react'
import { useTitle } from '../../lib/hooks/UseTitle'
import { ButtonMenu } from './ButtonMenu'

export function Header () {
  const { title } = useTitle()
  const [dayCurrent, setDayCurrent] = useState('')

  useEffect(() => {
    setDayCurrent(getCurrentDate())
  }, [dayCurrent])

  function getCurrentDate () {
    // Days array
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ]

    const newDate = new Date()
    const date = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    const hours = newDate.getHours()
    const mins = newDate.getMinutes()
    const dayCurrent = newDate.getDay()

    return `${days[dayCurrent]} ${date}/${
      month < 10 ? `0${month}` : `${month}`
    }/${year} - ${hours}:${mins} hs.`
  }

  return (
    <>
      <ButtonMenu />
      <header className='w-full fixed h-[46px] bg-[#1C2E3D] z-10 pl-[112px] pr-[96px] flex items-center justify-between'>
        <h1 className='text-white font-roboto text-base not-italic'>{title}</h1>
        <div className='flex text-white'>
          <span className='mr-[21px] font-roboto text-sm text-white not-italic font-normal'>
            {dayCurrent}
          </span>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
            >
              <path
                d='M8.63967 4.31982C8.06682 4.31982 7.51743 4.54739 7.11236 4.95245C6.7073 5.35752 6.47974 5.90691 6.47974 6.47975V15.1195C6.47974 15.6923 6.7073 16.2417 7.11236 16.6468C7.51743 17.0518 8.06682 17.2794 8.63967 17.2794C9.21252 17.2794 9.7619 17.0518 10.167 16.6468C10.572 16.2417 10.7996 15.6923 10.7996 15.1195V6.47975C10.7996 5.90691 10.572 5.35752 10.167 4.95245C9.7619 4.54739 9.21252 4.31982 8.63967 4.31982Z'
                fill='#32CF9C'
              />
              <path
                d='M15.1194 0C14.5466 0 13.9972 0.227563 13.5921 0.632629C13.187 1.03769 12.9595 1.58708 12.9595 2.15993V15.1195C12.9595 15.6924 13.187 16.2417 13.5921 16.6468C13.9972 17.0519 14.5466 17.2794 15.1194 17.2794C15.6923 17.2794 16.2416 17.0519 16.6467 16.6468C17.0518 16.2417 17.2793 15.6924 17.2793 15.1195V2.15993C17.2793 1.58708 17.0518 1.03769 16.6467 0.632629C16.2416 0.227563 15.6923 0 15.1194 0ZM15.8394 15.1195C15.8394 15.3105 15.7635 15.4936 15.6285 15.6286C15.4935 15.7636 15.3104 15.8395 15.1194 15.8395C14.9285 15.8395 14.7453 15.7636 14.6103 15.6286C14.4753 15.4936 14.3994 15.3105 14.3994 15.1195V2.15993C14.3994 1.96898 14.4753 1.78585 14.6103 1.65083C14.7453 1.51581 14.9285 1.43995 15.1194 1.43995C15.3104 1.43995 15.4935 1.51581 15.6285 1.65083C15.7635 1.78585 15.8394 1.96898 15.8394 2.15993V15.1195Z'
                fill='#32CF9C'
              />
              <path
                d='M2.15993 8.63965C1.58708 8.63965 1.03769 8.86721 0.632629 9.27228C0.227563 9.67734 0 10.2267 0 10.7996L0 15.1194C0 15.6923 0.227563 16.2417 0.632629 16.6467C1.03769 17.0518 1.58708 17.2794 2.15993 17.2794C2.73278 17.2794 3.28217 17.0518 3.68723 16.6467C4.0923 16.2417 4.31986 15.6923 4.31986 15.1194V10.7996C4.31986 10.2267 4.0923 9.67734 3.68723 9.27228C3.28217 8.86721 2.73278 8.63965 2.15993 8.63965Z'
                fill='#32CF9C'
              />
            </svg>
          </div>
        </div>
      </header>
    </>
  )
}
