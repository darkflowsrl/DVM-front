import { useEffect, useState } from 'react'
import { InputSelect } from '../../../../ui/components/input-select/InputSelect'
import { InputText } from '../../../../ui/components/input-text/InputText'
import { DataSelect } from '../../interfaces/data-select.interface'
import { useForm } from 'react-hook-form'
import { useFormInitial } from './hooks/UseFormInitial'
import { useModal } from '../../../../ui/components/modal/hooks/UseModal'
import { Modal } from '../../../../ui/components/modal/Modal'
import AgregarOperario from '../agregar-operario/AgregarOperario'

const url = `${import.meta.env.VITE_URL_HOST_DATA}:${import.meta.env.VITE_URL_PORT_DATA}`

export function FormInitial () {
  const [urlBase] = useState<string>(url)
  const [operarios, setOperarios] = useState<DataSelect[]>([])
  const [tiposAplicaciones, setTiposAplicaciones] = useState<DataSelect[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const fetchOperarios = async () => {
    const response = await fetch(`${urlBase}/operarios`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const result = await response.json()
    setOperarios(result)
  }

  const fetchTiposAplicaciones = async () => {
    const response = await fetch(`${urlBase}/tipos-aplicaciones`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const result = await response.json()
    setTiposAplicaciones(result)
  }

  useEffect(() => {
    fetchOperarios()
    fetchTiposAplicaciones()
  }, [])

  const { setEsValid } = useFormInitial()

  const onSubmit = () => {}

  useEffect(() => {
    setEsValid(isValid)
    addModal('agregar-operario')
  }, [])
  const { addModal, toggleOpenedState } = useModal()

  const onChangeForm = (e) => {
    setEsValid(isValid)
    if (e?.target?.value === '-1') toggleOpenedState('agregar-operario')
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <InputSelect
        label='Identificación Operario'
        data={operarios}
        name='operario'
        register={register}
        withAdd
        errors={errors}
        options={{ required: true, onChange: onChangeForm }}
      />
      <Modal<undefined>
        idModal='agregar-operario'
        ModalContent={AgregarOperario}
        modalContentProps={undefined}
        crossClose
        outsideClose
      />
      <InputText label='Identificación Lote' name='lote' register={register} errors={errors} options={{ required: true, onChange: onChangeForm }} />
      <InputSelect label='Tipo de Aplicación' data={tiposAplicaciones} name='tipoAplicacion' register={register} errors={errors} options={{ required: true, onChange: onChangeForm }} />
    </form>
  )
}
