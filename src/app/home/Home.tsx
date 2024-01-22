import React, { useEffect, useState } from 'react'
import { useTitle } from '../../lib/hooks/UseTitle'
import { InputSelect } from './components/InputSelect'
import { DataSelect } from './interfaces/data-select.interface'

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

  return (
    <>
      <InputSelect label='Identificación Operario' data={operarios} />
      <div className="top-[305px] absolute left-[142px] [font-family:'Roboto_Flex',Helvetica] font-bold text-[#32cf9c] text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
        Identificación Lote
      </div>

      <InputSelect label='Tipo de Aplicación' data={tiposAplicaciones} />
      <div className='absolute w-[64px] h-[63px] top-[196px] left-[444px]'>
        <div className='relative h-[63px]'>
          <svg
            className='!absolute !w-[16px] !h-[8px] !top-[27px] !left-[24px]'
            fill='none'
            height='9'
            viewBox='0 0 16 9'
            width='16'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.4225 7.67263L15.6677 2.29759C15.8805 2.07819 16 1.78139 16 1.47202C16 1.16265 15.8805 0.865846 15.6677 0.646438C15.5615 0.536679 15.4351 0.449561 15.2958 0.39011C15.1566 0.330658 15.0072 0.300049 14.8563 0.300049C14.7055 0.300049 14.5561 0.330658 14.4169 0.39011C14.2776 0.449561 14.1512 0.536679 14.045 0.646438L8.81122 6.03319C8.70498 6.14295 8.5786 6.23006 8.43934 6.28952C8.30009 6.34897 8.15072 6.37958 7.99987 6.37958C7.84901 6.37958 7.69965 6.34897 7.56039 6.28952C7.42114 6.23006 7.29475 6.14295 7.18852 6.03319L1.95474 0.646438C1.74107 0.425928 1.45067 0.30143 1.14743 0.300332C0.844186 0.299234 0.552936 0.421626 0.337752 0.640583C0.122569 0.85954 0.00107761 1.15713 5.671e-06 1.46788C-0.00106627 1.77862 0.118372 2.07708 0.33204 2.29759L5.57725 7.67263C6.22004 8.33052 7.09138 8.70005 7.99987 8.70005C8.90835 8.70005 9.77969 8.33052 10.4225 7.67263Z'
              fill='white'
            />
          </svg>
          <div className='w-[64px] h-[63px] !absolute !left-0 !top-0' />
        </div>
      </div>
      <div className='absolute w-[64px] h-[63px] top-[340px] left-[444px]'>
        <div className='relative h-[63px]'>
          <svg
            className='!absolute !w-[16px] !h-[8px] !top-[27px] !left-[24px]'
            fill='none'
            height='9'
            viewBox='0 0 16 9'
            width='16'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.4225 7.67263L15.6677 2.29759C15.8805 2.07819 16 1.78139 16 1.47202C16 1.16265 15.8805 0.865846 15.6677 0.646438C15.5615 0.536679 15.4351 0.449561 15.2958 0.39011C15.1566 0.330658 15.0072 0.300049 14.8563 0.300049C14.7055 0.300049 14.5561 0.330658 14.4169 0.39011C14.2776 0.449561 14.1512 0.536679 14.045 0.646438L8.81122 6.03319C8.70498 6.14295 8.5786 6.23006 8.43934 6.28952C8.30009 6.34897 8.15072 6.37958 7.99987 6.37958C7.84901 6.37958 7.69965 6.34897 7.56039 6.28952C7.42114 6.23006 7.29475 6.14295 7.18852 6.03319L1.95474 0.646438C1.74107 0.425928 1.45067 0.30143 1.14743 0.300332C0.844186 0.299234 0.552936 0.421626 0.337752 0.640583C0.122569 0.85954 0.00107761 1.15713 5.671e-06 1.46788C-0.00106627 1.77862 0.118372 2.07708 0.33204 2.29759L5.57725 7.67263C6.22004 8.33052 7.09138 8.70005 7.99987 8.70005C8.90835 8.70005 9.77969 8.33052 10.4225 7.67263Z'
              fill='white'
            />
          </svg>
          <div className='w-[64px] h-[63px] !absolute !left-0 !top-0' />
        </div>
      </div>
      <div className='absolute w-[64px] h-[63px] top-[486px] left-[444px]'>
        <div className='relative h-[63px]'>
          <svg
            className='!absolute !w-[16px] !h-[8px] !top-[27px] !left-[24px]'
            fill='none'
            height='9'
            viewBox='0 0 16 9'
            width='16'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.4225 7.67263L15.6677 2.29759C15.8805 2.07819 16 1.78139 16 1.47202C16 1.16265 15.8805 0.865846 15.6677 0.646438C15.5615 0.536679 15.4351 0.449561 15.2958 0.39011C15.1566 0.330658 15.0072 0.300049 14.8563 0.300049C14.7055 0.300049 14.5561 0.330658 14.4169 0.39011C14.2776 0.449561 14.1512 0.536679 14.045 0.646438L8.81122 6.03319C8.70498 6.14295 8.5786 6.23006 8.43934 6.28952C8.30009 6.34897 8.15072 6.37958 7.99987 6.37958C7.84901 6.37958 7.69965 6.34897 7.56039 6.28952C7.42114 6.23006 7.29475 6.14295 7.18852 6.03319L1.95474 0.646438C1.74107 0.425928 1.45067 0.30143 1.14743 0.300332C0.844186 0.299234 0.552936 0.421626 0.337752 0.640583C0.122569 0.85954 0.00107761 1.15713 5.671e-06 1.46788C-0.00106627 1.77862 0.118372 2.07708 0.33204 2.29759L5.57725 7.67263C6.22004 8.33052 7.09138 8.70005 7.99987 8.70005C8.90835 8.70005 9.77969 8.33052 10.4225 7.67263Z'
              fill='white'
            />
          </svg>
          <div className='w-[64px] h-[63px] !absolute !left-0 !top-0' />
        </div>
      </div>
      <div className='absolute w-[504px] h-[528px] top-[96px] left-[690px]'>
        <div className='relative w-[480px] h-[528px] bg-[#1c2e3d] rounded-[5px] shadow-[10px_10px_10px_#00000040]'>
          <div className='absolute w-[334px] h-[69px] top-[160px] left-[109px]'>
            <div className="absolute w-[125px] top-[4px] left-0 [font-family:'Roboto_Flex',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
              Viento
            </div>
            <div className='absolute w-[334px] h-[69px] top-0 left-0'>
              <div className="absolute w-[153px] top-0 left-[180px] [font-family:'Roboto',Helvetica] font-bold text-white text-[58.5px] tracking-[0] leading-[normal]">
                10k/h
              </div>
              <div className="absolute w-[247px] top-[42px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                Valor de referencia:
              </div>
            </div>
          </div>
          <div className='absolute w-[334px] h-[69px] top-[32px] left-[109px]'>
            <div className="absolute w-[141px] top-[4px] left-0 [font-family:'Roboto_Flex',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
              Humedad
            </div>
            <div className='absolute w-[334px] h-[69px] top-0 left-0'>
              <div className="absolute w-[111px] top-0 left-[223px] [font-family:'Roboto',Helvetica] font-bold text-white text-[58.5px] tracking-[0] leading-[normal]">
                20%
              </div>
              <p className="absolute w-[247px] top-[42px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                Baja 00% - Media 00% - Alta 00%
              </p>
            </div>
          </div>
          <div className='absolute w-[334px] h-[69px] top-[288px] left-[109px]'>
            <div className="absolute w-[186px] top-[4px] left-0 [font-family:'Roboto_Flex',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
              Temperatura
            </div>
            <div className='absolute w-[334px] h-[69px] top-0 left-0'>
              <div className="absolute w-[91px] top-0 left-[243px] [font-family:'Roboto',Helvetica] font-bold text-white text-[58.5px] tracking-[0] leading-[normal]">
                15°
              </div>
              <p className="absolute w-[247px] top-[42px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                  Baja 00
                </span>
                <span className='font-bold'>°</span>
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                  {' '}
                  - Media 00
                </span>
                <span className='font-bold'>°</span>
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                  {' '}
                  - Alta 00
                </span>
                <span className='font-bold'>°</span>
              </p>
            </div>
          </div>
          <div className='absolute w-[334px] h-[69px] top-[416px] left-[109px]'>
            <div className="absolute w-[83px] top-[4px] left-0 [font-family:'Roboto_Flex',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
              Rocío
            </div>
            <div className='absolute w-[334px] h-[69px] top-0 left-0'>
              <div className="absolute w-[91px] top-0 left-[243px] [font-family:'Roboto',Helvetica] font-bold text-white text-[58.5px] tracking-[0] leading-[normal]">
                10°
              </div>
              <p className="absolute w-[247px] top-[42px] left-0 [font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                  Baja 00
                </span>
                <span className='font-bold'>°</span>
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                  {' '}
                  - Media 00
                </span>
                <span className='font-bold'>°</span>
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#32cf9c] text-[12.8px] tracking-[0] leading-[14.8px]">
                  {' '}
                  - Alta 00
                </span>
                <span className='font-bold'>°</span>
              </p>
            </div>
          </div>
          <div className='absolute w-[48px] h-[48px] top-[39px] left-[30px] bg-[#32cf9c] rounded-[24.14px/24.24px]'>
            <img
              className='absolute w-[30px] h-[22px] top-[12px] left-[9px]'
              alt='Group'
              src='/img/group-128.png'
            />
          </div>
          <div className='absolute w-[48px] h-[48px] top-[167px] left-[30px] bg-[#32cf9c] rounded-[24.14px/24.24px]'>
            <img
              className='absolute w-[18px] h-[18px] top-[16px] left-[15px]'
              alt='Group'
              src='/img/group-125.png'
            />
          </div>
          <div className='absolute w-[48px] h-[48px] top-[295px] left-[30px] bg-[#32cf9c] rounded-[24.14px/24.24px]'>
            <img
              className='absolute w-[18px] h-[22px] top-[14px] left-[16px]'
              alt='Vector'
              src='/img/vector-5.svg'
            />
          </div>
          <div className='absolute w-[48px] h-[48px] top-[423px] left-[30px] bg-[#32cf9c] rounded-[24.14px/24.24px]'>
            <img
              className='absolute w-[23px] h-[23px] top-[13px] left-[13px]'
              alt='Group'
              src='/img/group-129.png'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
