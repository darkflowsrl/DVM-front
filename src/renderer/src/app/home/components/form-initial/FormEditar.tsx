import { useEffect, useState } from 'react'
import { DataSelect } from '../../interfaces/data-select.interface'
import { useFormInitial } from './hooks/UseFormInitial'
import { ModalProps } from '../../../../ui/components/modal/Modal'
import { useForm } from 'react-hook-form'
import { Button } from '../../../../ui/components/Button'
import InputDropdown from '@renderer/ui/components/input-dropdown/InputDropdown'
import { InputNumber } from '@renderer/ui/components/input-number/InputNumber'

interface Props extends ModalProps<undefined> {}
interface ILote {
  id?: number
  name: string
  superficie: string
  ubicacion: string
  geoposicionamiento: {
    lat: number
    long: number
  }
}

export function FormEditar({ close, acept }: Props): JSX.Element {
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const [operarios, setOperarios] = useState<DataSelect[]>([])
  const [lotes, setLotes] = useState<ILote[]>([])
  const [tiposAplicaciones, setTiposAplicaciones] = useState<DataSelect[]>([])

  const fetchOperarios = async (): Promise<void> => {
    const result = await window.api.invoke.getOperariosAsync()
    setOperarios(result)
  }

  const fetchLotes = async (): Promise<void> => {
    const result = await window.api.invoke.getLotesAsync()
    setLotes(result)
  }

  const fetchTiposAplicaciones = async (): Promise<void> => {
    const result = await window.api.invoke.getTiposAplicacionesAsync()
    setTiposAplicaciones(result)
  }

  useEffect(() => {
    fetchOperarios()
    fetchLotes()
    fetchTiposAplicaciones()
  }, [])

  const { setFormInitial } = useFormInitial()

  const handleChange = (): void => {
    const dataForm = getValues()
    setFormInitial({
      isValid: dataForm.operario && dataForm.tipoAplicacion && dataForm.lote,
      operario: {
        id: dataForm.operario,
        name: operarios.find((i) => i.id === dataForm.operario)?.name ?? ''
      },
      lote: {
        ...(lotes.find((i) => i.id === dataForm.lote) ?? {
          name: '',
          ubicacion: '',
          superficie: '',
          geoposicionamiento: { lat: 0, long: 0 }
        }),
        id: dataForm.lote
      },
      tipoAplicacion: {
        id: dataForm.tipoAplicacion,
        name: tiposAplicaciones.find((i) => i.id === dataForm.tipoAplicacion)?.name ?? ''
      },
      hectareas: dataForm.hectareas
    })
  }

  return (
    <form
      className="flex flex-col justify-between w-auto boder border-white p-[28px] bg-light dark:bg-dark"
      onChange={handleChange}
    >
      <div className="flex items-center">
        <h3 className=" text-3xl not-italic font-bold text-dark dark:text-light">Editar campos</h3>
      </div>

      <div className="flex flex-col gap-8">
        <InputDropdown
          label="Identificación Operario"
          data={operarios}
          name="operario"
          register={register}
          withAdd
          errors={errors}
          options={{ required: true }}
        />
        <div className="flex flex-row gap-4">
          <InputDropdown
            label="Identificación Lote"
            data={lotes}
            name="lote"
            register={register}
            withAdd
            errors={errors}
            options={{ required: true }}
          />
          <InputNumber
            label="Hectáreas"
            labelSuccess={true}
            valueInitial={0}
            unidad=""
            register={register}
            errors={errors}
            options={{ required: true }}
            onChange={() => {}}
          />
        </div>
        <InputDropdown
          label="Tipo de Aplicación"
          data={tiposAplicaciones}
          name="tipoAplicacion"
          register={register}
          withAdd
          errors={errors}
          options={{ required: true }}
        />
      </div>

      <div className="w-full flex flex-row mt-8 gap-4 justify-end">
        <Button type="error" maxWith={false} onClick={close}>
          Cancelar
        </Button>
        <Button type="success" maxWith={false} onClick={acept}>
          Agregar
        </Button>
      </div>
    </form>
  )
}
