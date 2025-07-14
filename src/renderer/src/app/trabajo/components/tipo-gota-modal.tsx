import { useLang } from '@renderer/app/configuracion-general/hooks/useLang'
import { Button } from '../../../ui/components/Button'
import { ModalProps } from '../../../ui/components/modal/Modal'
import { TipoGotaType } from '@renderer/interfaces/tipo-gota'

export interface TipoGotaModalProps extends ModalProps<undefined> {
  setTipoGotaSeleccionada: (value: TipoGotaType) => void
  tipoGotaseleccionada: TipoGotaType
}

export function TipoGotaModal ({ close, acept, setTipoGotaSeleccionada, tipoGotaseleccionada } : TipoGotaModalProps) {
  const { dataLang } = useLang()

  const handleClickTipoGotaSeleccionada = (value: TipoGotaType) => {
    setTipoGotaSeleccionada(value)
  }

  return (
    <div className='flex flex-col gap-10 p-8'>
      <div className='grid grid-cols-2 gap-8'>
        <Button size='lg' type={tipoGotaseleccionada !== 'FINA' ? 'default-light' : 'success'} onClick={() => handleClickTipoGotaSeleccionada('FINA')}>
          {dataLang?.fina ?? "Fina"}
        </Button>
        <Button size='lg' type={tipoGotaseleccionada !== 'MEDIA' ? 'default-light' : 'success'} onClick={() => handleClickTipoGotaSeleccionada('MEDIA')}>
          {dataLang?.media ?? "Media"}
        </Button>
        <Button size='lg' type={tipoGotaseleccionada !== 'GRUESA' ? 'default-light' : 'success'} onClick={() => handleClickTipoGotaSeleccionada('GRUESA')}>
          {dataLang?.gruesa ?? "Gruesa"}
        </Button>
        <Button size='lg' type={tipoGotaseleccionada !== 'CUSTOM' ? 'default-light' : 'success'} onClick={() => handleClickTipoGotaSeleccionada('CUSTOM')}>
          {dataLang?.personalizada ?? "Personalizada"}
        </Button>
      </div>
      <div className='flex flex-row gap-4 justify-end'>
        <Button type='error' onClick={close} maxWith={false}>
          { dataLang?.cancelar ?? 'Cancelar' }
        </Button>
        <Button type='success' onClick={acept} disabled={tipoGotaseleccionada == null} maxWith={false}>
          { dataLang?.confirmar ?? 'Confirmar' }
        </Button>
      </div>

    </div>
  )
}
