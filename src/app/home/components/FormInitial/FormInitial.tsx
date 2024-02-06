import { useEffect, useState, ChangeEvent } from 'react'
import { InputSelect } from '../../../../ui/components/input-select/InputSelect'
import { InputText } from '../../../../ui/components/input-text/InputText'
import { DataSelect } from '../../interfaces/data-select.interface'
import { useFormInitial } from './hooks/UseFormInitial'
import { useModal } from '../../../../ui/components/modal/hooks/UseModal'
import { Modal } from '../../../../ui/components/modal/Modal'
import AgregarOperario from '../agregar-operario/AgregarOperario'
import { useForm } from 'react-hook-form'

export function FormInitial () {
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
    <form className='flex flex-col' onChange={handleChange}>
      <InputSelect
        label='Identificación Operario'
        data={operarios}
        name='operario'
        register={register}
        withAdd
        errors={errors}
        options={{ required: true }}
      />
      <Modal<undefined>
        idModal='agregar-operario'
        ModalContent={AgregarOperario}
        modalContentProps={undefined}
        crossClose
        outsideClose
      />
      <InputText initialValue={lote} label='Identificación Lote' name='lote' register={register} errors={errors} options={{ required: true }} />
      <InputSelect label='Tipo de Aplicación' data={tiposAplicaciones} name='tipoAplicacion' register={register} errors={errors} options={{ required: true }} />
    </form>
  )
}
