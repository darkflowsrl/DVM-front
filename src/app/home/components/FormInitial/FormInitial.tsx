import { useEffect, useState, ChangeEvent } from 'react'
import { InputSelect } from '../../../../ui/components/input-select/InputSelect'
import { InputText } from '../../../../ui/components/input-text/InputText'
import { DataSelect } from '../../interfaces/data-select.interface'
import { useFormInitial } from './hooks/UseFormInitial'
import { useModal } from '../../../../ui/components/modal/hooks/UseModal'
import { ModalProps } from '../../../../ui/components/modal/Modal'
import { useForm } from 'react-hook-form'
import { Button } from '../../../../ui/components/Button'
import clsx from 'clsx'

interface Props extends ModalProps {
  openedModal: boolean
}
export function FormInitial ({ close, acept, openedModal = false }: Props) {
  const {
    register,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const [operarios, setOperarios] = useState<DataSelect[]>([])
  const [tiposAplicaciones, setTiposAplicaciones] = useState<DataSelect[]>([])

  const fetchOperarios = async () => {
    const result = (await window.api.invoke.getOperariosAsync()).map<DataSelect>(v => ({ name: v.name, id: v.id.toString() }))
    setOperarios(result)
  }

  const fetchTiposAplicaciones = async () => {
    const result = (await window.api.invoke.getTiposAplicacionesAsync()).map<DataSelect>(v => ({ name: v.name, id: v.id.toString() }))
    setTiposAplicaciones(result)
  }

  useEffect(() => {
    fetchOperarios()
    fetchTiposAplicaciones()
  }, [])

  const { setFormInitial, lote } = useFormInitial()

  useEffect(() => {
    addModal('agregar-operario')
  }, [])
  const { addModal, toggleOpenedState } = useModal()

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    if (event?.target?.value === '-1') toggleOpenedState('agregar-operario')
    console.log(event.target.value)
    const dataForm = getValues()
    setFormInitial({
      isValid: dataForm.operario && dataForm.tipoAplicacion && dataForm.lote,
      operario: {
        id: dataForm.operario,
        name: operarios.find(i => i.id === dataForm.operario)?.name ?? ''
      },
      lote: dataForm.lote,
      tipoAplicacion: {
        id: dataForm.tipoAplicacion,
        name: tiposAplicaciones.find(i => i.id === dataForm.tipoAplicacion)?.name ?? ''
      }
    })
    console.log(dataForm)
    console.log(tiposAplicaciones.find(i => i.id === dataForm.tipoAplicacion)?.name ?? '')
  }

  return (
    <form
      className={clsx('flex flex-col justify-between w-auto h-auto boder border-white p-[28px]', {
        'bg-[#1C2E3D]': openedModal
      }
      )} onChange={handleChange}
    >
      {openedModal && <div className='flex items-center'>
        <h3 className=' text-3xl not-italic font-bold text-white'>Agregar Operario</h3>
      </div>}
      <div>
        <InputSelect
          label='Identificación Operario'
          data={operarios}
          name='operario'
          register={register}
          withAdd
          errors={errors}
          options={{ required: true }}
        />
        <InputText initialValue={lote} label='Identificación Lote' name='lote' register={register} errors={errors} options={{ required: true }} />
        <InputSelect label='Tipo de Aplicación' data={tiposAplicaciones} name='tipoAplicacion' register={register} errors={errors} options={{ required: true }} />
      </div>
      {openedModal && <div className='w-full flex flex-row mt-8 gap-4 justify-end'>
        <Button type='error' onClick={close}>
          Cancelar
        </Button>
        <Button type='success' onClick={acept}>
          Agregar
        </Button>
      </div>}
    </form>
  )
}
