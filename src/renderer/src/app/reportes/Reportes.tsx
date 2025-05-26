import { Dialog, DialogType } from '@renderer/ui/components/dialog/Dialog'
import { Modal } from '@renderer/ui/components/modal/Modal'
import { useModal } from '@renderer/ui/components/modal/hooks/UseModal'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../configuracion-general/hooks/useLang'

export function Reportes(): JSX.Element {
  const { dataLang } = useLang()
  const navigate = useNavigate()

  const { addModal, toggleOpenedState, getStateModal } = useModal()

  useEffect(() => {
    addModal('end-report')
    if (!getStateModal('end-report')) toggleOpenedState('end-report')
  }, [])

  const modalClosed = (idModal: string, acept: boolean): void => {
    if (acept) {
      navigate('/')
    } else {
      window.api.invoke.apagarDispositivo()
    }
  }

  return (
    <article className="w-full grid grid-cols-1 gap-10 h-[100%] px-20 py-16">
      <section className="grid grid-cols-3 gap-4 w-full text-dark dark:text-light">
        {dataLang?.reportes ?? 'Reportes'}
      </section>
      <Modal<{
        title: string
        message: string
        type: DialogType
        buttons?: {
          cancelar?: {
            text: string
            type: DialogType
          }
          aceptar?: {
            text: string
            type: DialogType
          }
        }
      }>
        idModal="end-report"
        ModalContent={Dialog}
        modalContentProps={{
          title: `${dataLang?.reporteCreadoConExito ?? 'Reporte creado con éxito'}`,
          message: `${dataLang?.elReporteDelTrabajo_ ?? ''} <br /> <br />${dataLang?.comoDeseaContinuar ?? '¿Cómo desea continuar?'}`,
          type: 'success',
          buttons: {
            cancelar: {
              text: `${dataLang?.apagarDispositivo ?? 'Apagar dispositivo'}`,
              type: 'default'
            },
            aceptar: {
              text: `${dataLang?.nuevoTrabajo ?? 'Nuevo trabajo'}`,
              type: 'success'
            }
          }
        }}
        closed={modalClosed}
        crossClose
        outsideClose
      />
    </article>
  )
}
