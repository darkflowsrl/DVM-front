import clsx from 'clsx'
import { useToggle } from '../hooks/useToggle'
import { useFormInitial } from '../../app/home/components/FormInitial/hooks/UseFormInitial'
import { Button } from '../components/Button'

export function InfoLogin () {
  const { getStateToggle } = useToggle()

  const { operario, lote, tipoAplicacion } = useFormInitial()

  return (
    <aside
      className={clsx(
        'fixed top-0 right-0 z-20 mt-[64px] w-auto h-auto transition-transform bg-success rounded-l-lg flex flex-col gap-2 py-4 px-10 justify-between items-end text-end',
        {
          'translate-x-full': !getStateToggle('info-login')
        }
      )}
    >
      <div className=''>
        <small className='text-[10px] text-dark'>Usuario</small>
        <p className='font-medium text-dark'>{operario.name}</p>
      </div>
      <div>
        <small className='text-[10px] text-dark'>Ident. Lote</small>
        <p className='font-medium text-dark'>{lote}</p>
      </div>
      <div>
        <small className='text-[10px] text-dark'>Tipo de Aplicación</small>
        <p className='font-medium text-dark'>{tipoAplicacion.name}</p>
      </div>
      <div className='w-full mt-4'>
        <Button type='success-dark' size='sm'>
          Editar
        </Button>
      </div>
    </aside>
  )
}
