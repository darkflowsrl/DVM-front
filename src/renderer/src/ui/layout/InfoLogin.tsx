import clsx from 'clsx'
import { useToggle } from '../hooks/useToggle'
import { useFormInitial } from '../../app/home/components/form-initial/hooks/UseFormInitial'
import { Button } from '../components/Button'
import { Modal } from '../components/modal/Modal'
import { useEffect } from 'react'
import { useModal } from '../components/modal/hooks/UseModal'
import { FormEditar } from '@renderer/app/home/components/form-initial/FormEditar'
import { useLang } from '@renderer/app/configuracion-general/hooks/useLang'

export function InfoLogin(): JSX.Element {
  const { dataLang } = useLang()
  const { getStateToggle } = useToggle()
  const { getStateModal, addModal, toggleOpenedState } = useModal()
  const { isValid, operario, lote, tipoAplicacion } = useFormInitial()

  useEffect(() => {
    addModal('edit-login')
  }, [])

  const modalClosed = (idModal: string, acept: boolean): void => {

  }

  const handleEditClick = (): void => {
    if (getStateModal('edit-login')) return
    if (isValid) {
      toggleOpenedState('edit-login')
    }
  }
  return (
    <>
      <aside
        className={clsx(
          'fixed top-0 right-0 z-20 mt-[64px] w-auto h-auto transition-transform bg-success rounded-l-lg flex flex-col gap-2 py-4 px-10 justify-between items-end text-end',
          {
            'translate-x-full': !getStateToggle('info-login')
          }
        )}
      >
        <div className="">
          <small className="text-[10px] text-dark dark:text-light">{dataLang?.usuario ?? 'Usuario'}</small>
          <p className="font-medium text-dark dark:text-light">{operario.name}</p>
        </div>
        <div>
          <small className="text-[10px] text-dark dark:text-light">{dataLang?.identificacionLote ?? 'Ident. de Lote'}</small>
          <p className="font-medium text-dark dark:text-light">{lote.name}</p>
        </div>
        <div>
          <small className="text-[10px] text-dark dark:text-light">{dataLang?.tipoDeAplicacion ?? 'Tipo de Aplicación'}</small>
          <p className="font-medium text-dark dark:text-light">{tipoAplicacion.name}</p>
        </div>
        <div className="w-full mt-4">
          <Button type="success-dark" size="sm" onClick={handleEditClick}>
            {dataLang?.editar}
          </Button>
        </div>
      </aside>
      <Modal<undefined>
        idModal="edit-login"
        ModalContent={FormEditar}
        closed={modalClosed}
        crossClose
        outsideClose
      />
    </>
  )
}
