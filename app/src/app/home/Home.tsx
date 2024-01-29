import { useEffect, useState } from 'react'
import { useTitle } from '../../lib/hooks/UseTitle'
import { ItemInfo } from './components/ItemInfo'
import { ItemInfoData } from './interfaces/item-info.interface'
import { Modal } from '../../ui/components/modal/Modal'
import { InfoInitTesting } from './components/FormInitial/InfoInitTesting'
import { FormInitial } from './components/FormInitial/FormInitial'
import clsx from 'clsx'
import { useFormInitial } from './components/FormInitial/hooks/UseFormInitial'
import { useModal } from '../../ui/components/modal/hooks/UseModal'

function Home () {
  const { setTitle } = useTitle()
  const [data, setData] = useState<ItemInfoData[]>()
  const { getStateModal, addModal, toggleOpenedState } = useModal()

  const { isValid } = useFormInitial()
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
    addModal('init-testing')
    setTitle('Inicio Aplicación')
    fetchData()
  }, [])

  const items = data?.map(function (item, i) {
    return <ItemInfo key={i} data={item} />
  })

  const handleClick = () => {
    if (getStateModal('init-testing')) return
    if (isValid) {
      toggleOpenedState('init-testing')
    }
  }

  return (
    <article
      className='w-full flex content-center items-center justify-around'
    >
      <FormInitial />
      <section className='flex flex-col content-center items-end justify-around '>
        <section className='bg-[#1C2E3D] w-[480px] h-[528px] flex flex-col justify-evenly'>
          {items}
        </section>
        <button
          onClick={handleClick}
          className={clsx('bg-success text-[24px] font-roboto text-[#1C2E3D] w-[271px] h-[82px] mt-[32px]',
            {
              'bg-success/50': !isValid
            }
          )}
        >
          Iniciar Testing
        </button>
        <Modal<undefined>
          idModal='init-testing'
          ModalContent={InfoInitTesting}
          modalContentProps={undefined}
          crossClose
          outsideClose
        />
      </section>
    </article>
  )
}

export default Home
