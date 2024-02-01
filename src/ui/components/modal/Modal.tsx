// import { CrossIcon } from '@ui/icons'
import { MouseEvent, ReactNode, FC, useEffect } from 'react'
import { useModal } from './hooks/UseModal'

export interface ModalProps<T = undefined> {
  props: T
  close: () => void
}

interface Props<T> {
  idModal: string,
  children: ReactNode
  ModalContent: FC<T>
  modalContentProps: T
  crossClose?: boolean
  outsideClose?: boolean
}

export function Modal<T> ({
  idModal,
  ModalContent,
  modalContentProps,
  outsideClose,
  crossClose
}: Props<T>) {
  const { toggleOpenedState, getStateModal } = useModal()

  const onClickOutside = () => {
    if (outsideClose !== true) return
    toggleOpenedState(idModal)
  }

  const onClickCross = () => {
    if (crossClose !== true) return
    toggleOpenedState(idModal)
  }

  const onEventClose = () => {
    toggleOpenedState(idModal)
  }

  useEffect(() => {}, [])

  return (
    <>
      {getStateModal(idModal) && (
        <ModalContainer
          onClickOutside={onClickOutside}
          onClickCross={onClickCross}
        >
          <ModalContent close={onEventClose} {...modalContentProps} />
        </ModalContainer>
      )}
    </>
  )
}

interface PropsModalContainer {
  onClickOutside?: (event: MouseEvent<HTMLDivElement>) => void
  onClickCross?: (event: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

export function ModalContainer ({
  children,
  onClickOutside
}: PropsModalContainer) {
  const handleOnClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.preventDefault()
      event.stopPropagation()

      if (onClickOutside == null) return

      onClickOutside(event)
    }
  }

  return (
    <div
      onClick={handleOnClickOutside}
      tabIndex={-1}
      aria-hidden='true'
      className='fixed top-0 left-0 right-0 bottom-0 z-40 w-full p-4 grid place-content-center bg-gray-950/90'
    >
      <div className='relative border-white/30 border-[0.3px] bg-[#1C2E3D]  rounded-md shadow-zinc-950 shadow-lg'>
        {children}
      </div>
    </div>
  )
}
