import { ModalProps } from '../../../../ui/components/modal/Modal'
import { useModal } from '../../../../ui/components/modal/hooks/UseModal'
import { DataSelect } from '../../interfaces/data-select.interface'
import { InputText } from '@renderer/ui/components/input-text/InputText'
import { Button } from '@renderer/ui/components/Button'
import { useState } from 'react'
import { useLang } from '@renderer/app/configuracion-general/hooks/useLang'

interface Props extends ModalProps<undefined> {
  added: (data: DataSelect) => void
}

interface IAplicacion {
  name: string
  tipoCultivo: string
  recetaAgronomica: string
}

export default function AgregarAplicacion({ added, close }: Props): JSX.Element {
  const { dataLang } = useLang() // Obtener las traducciones
  const { toggleOpenedState } = useModal()
  const [value, setValue] = useState<IAplicacion>({
    name: '',
    tipoCultivo: '',
    recetaAgronomica: ''
  })

  const submit = async ($event): Promise<void> => {
    $event.preventDefault()
    const nuevo: DataSelect = await window.api.invoke.addTipoAplicacionAsync(value)

    if (nuevo) {
      toggleOpenedState('agregartipoAplicacion')
      added(nuevo)
    }
  }

  const esFormularioValido = (obj: IAplicacion): boolean => {
    return (
      Object.keys(obj).length > 0 &&
      obj.name !== '' &&
      obj.tipoCultivo !== '' &&
      obj.recetaAgronomica !== ''
    )
  }

  return (
    <form
      className="flex flex-col justify-between w-auto h-auto bg-light dark:bg-dark boder border-white p-[28px]"
      onSubmit={submit}
    >
      <div className="flex items-center">
        <h3 className="text-3xl not-italic font-bold text-dark dark:text-light">
          {dataLang?.nuevaAplicacion ?? "Nueva Aplicación"}
        </h3>
      </div>
      <div className="flex flex-col justify-around">
        <div className="flex justify-around gap-4">
          <InputText
            label={dataLang?.tipoDeAplicacion ?? "Tipo de aplicación"}
            required={true}
            onChange={(v) => setValue({ ...value, name: v })}
          />
          <InputText
            label={dataLang?.tipoDeCultivo ?? "Tipo de cultivo"}
            unidad=""
            required={true}
            onChange={(v) => setValue({ ...value, tipoCultivo: v })}
          />
        </div>
        <div className="flex">
          <InputText
            label={dataLang?.recetaAgronomica ?? "Receta agronómica"}
            width="[800px]"
            required={true}
            onChange={(v) => setValue({ ...value, recetaAgronomica: v })}
          />
        </div>
      </div>
      <div className="w-full flex flex-row mt-8 gap-4 justify-end">
        <Button type="error" onClick={close} maxWith={false}>
          {dataLang?.cancelar ?? "Cancelar"}
        </Button>
        <Button
          type="success"
          onClick={submit}
          maxWith={false}
          disabled={!esFormularioValido(value)}
        >
          {dataLang?.agregar ?? "Agregar"}
        </Button>
      </div>
    </form>
  )
}