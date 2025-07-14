import { Button } from '../Button'
import { ModalProps } from '../modal/Modal'
import clsx from 'clsx'
import { useLang } from '@renderer/app/configuracion-general/hooks/useLang'
import { INodoFull } from '@renderer/interfaces/nodo-full'
import { AspersorStatus } from '@renderer/interfaces/nodo-status'
import { useCallback } from 'react'

export interface DetailNodoProps extends ModalProps {
  data: INodoFull
  nodoDeshabilitadoChange: (value: boolean) => void
  aspersorDeshabilitadoChange: (idAspersor: number, deshabilitado: boolean) => void
}

export function DetailNodo({ data, nodoDeshabilitadoChange, aspersorDeshabilitadoChange, close }: DetailNodoProps): JSX.Element {
  const { dataLang } = useLang()

  const getDescripcionEstado = (idEstado: AspersorStatus): string => {
    switch (idEstado) {
      case -1:
        return ''
      case 0:
        return 'OK'
      case 1:
        return dataLang?.cortocircuito ?? 'Cortocircuito'
      case 2:
        return dataLang?.motorBloqueado ?? 'Motor bloqueado'
      case 3:
        return dataLang?.motorNoConectado ?? 'Motor no conectado'
      case 4:
        return dataLang?.sobrecorriente ?? 'Sobrecorriente'
      case 5:
        return dataLang?.subcorriente ?? 'Subcorriente'
      case 6:
        return dataLang?.bajaTension ?? 'Baja tension'
      case 7:
        return dataLang?.errorDeSensor ?? 'Error de sensor'
      case 8:
        return dataLang?.RPMNoAlcanzada ?? 'RPM no alcanzada'
      case 9:
        return dataLang?.errorDeCaudalimetro ?? 'Error de caudalimetro'
    }
    return ''
  }

  const handleNodoDesabilitado = (): void => {
    nodoDeshabilitadoChange(!data.deshabilitado)
  }

  const handleAspersorDesabilitado = (idAspersor: number): void => {
    const current = data.aspersores.find(a => a.id === idAspersor)
    aspersorDeshabilitadoChange(idAspersor, !current!.deshabilitado)
  }

  return (
    <div className="w-[600px] flex flex-col gap-10 p-8">
      <div className="flex justify-between">
        <h1 
          className={clsx(
            "text-[36px] font-bold",
            {
              'text-[#696767]': data.deshabilitado,
              'text-[#DC3545]': !data.deshabilitado && !data.conectado,
              'text-[#32CF9C]': !data.deshabilitado && data.conectado
            }
          )}
        >
          {dataLang?.nodo ?? 'Nodo'} {data.nombre}
        </h1>
        <Button
          size="md"
          onClick={handleNodoDesabilitado}
          type={data.deshabilitado ? 'success-light' : 'error'}
          maxWith={false}
        >
          {data.deshabilitado
            ? (dataLang?.habilitarNodo ?? 'Habilitar Nodo')
            : (dataLang?.deshabilitarNodo ?? 'Deshabilitar Nodo')}
        </Button>
      </div>
      <div
        className={clsx('flex flex-col', {
          'opacity-50': data.deshabilitado
        })}
      >
        {
          data.aspersores.map((aspersor) => (
            <div className="flex items-center justify-between p-4 bg-white dark:bg-dark">
              <div
                className={clsx('flex justify-center items-center gap-4', {
                  'opacity-50': data.deshabilitado
                })}
              >
                <p className="text-[24px] font-bold text-dark dark:text-light">
                  {data.nombre}
                  {aspersor.id}
                </p>
                <svg
                  width="41"
                  height="43"
                  viewBox="0 0 41 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx({
                    'text-[#696767]': data.deshabilitado || aspersor.deshabilitado,
                    'text-[#32CF9C]': !data.deshabilitado && !aspersor.deshabilitado && data.conectado && aspersor.estado === 0,
                    'text-[#DC3545]': !data.deshabilitado && !aspersor.deshabilitado && (!data.conectado || (aspersor.estado === 1 || aspersor.estado === 2 || aspersor.estado === 3)),
                    'text-[#FFC107]': !data.deshabilitado && !aspersor.deshabilitado && data.conectado && (aspersor.estado >= 4 && aspersor.estado <= 9),
                  })}
                >
                  <path
                    d="M2.52963 34.3571C1.70966 32.7485 0.886371 31.1432 0.0664006 29.5346C-0.112864 29.1811 0.0863189 28.7562 0.478046 28.6589L7.73827 26.8623C8.67443 26.6287 9.45788 25.8245 9.68694 24.8613C10.0056 23.5218 9.08939 22.403 8.5184 21.8549L3.03423 16.4843C3.03423 16.4843 3.01763 16.4681 3.01099 16.4616C2.47984 16.0011 1.38101 14.9017 1.13203 13.2412C0.879731 11.5645 1.62667 10.1894 2.1877 9.15487C2.46988 8.63273 2.77197 8.19491 3.04419 7.84141C3.28321 7.53331 3.74797 7.51385 4.01354 7.79925L14.3445 18.8193L14.3976 18.868C14.9022 19.3382 17.4252 21.9003 17.0069 25.6558C16.6849 28.5746 14.7097 31.114 11.8448 32.3042C11.8182 32.3139 11.7883 32.3237 11.7618 32.3334L3.26993 34.6749C2.97779 34.756 2.66574 34.623 2.53295 34.3571"
                    fill='currentColor'
                  />
                  <path
                    d="M17.3605 0C19.1963 0.129724 21.0288 0.259449 22.8646 0.38593C23.2663 0.415118 23.5418 0.797805 23.4256 1.17725L21.3077 8.19534C21.0354 9.10017 21.3442 10.1672 22.0778 10.8547C23.097 11.8049 24.5477 11.6071 25.3212 11.4028L32.8437 9.5315C32.8437 9.5315 32.8669 9.52502 32.8769 9.52177C33.5541 9.31097 35.0812 8.94774 36.6713 9.58339C38.2747 10.2255 39.108 11.5552 39.7321 12.5541C40.0475 13.0568 40.2798 13.5335 40.4525 13.9421C40.6019 14.2989 40.3828 14.701 39.9944 14.7789L25.0224 17.8468L24.9527 17.8663C24.2821 18.0512 20.74 18.8652 17.6427 16.6015C15.2359 14.8437 14.0043 11.886 14.4192 8.87315C14.4226 8.84396 14.4292 8.81802 14.4358 8.78883L16.7032 0.460522C16.7796 0.175128 17.0584 -0.0194587 17.3605 0.00324311"
                    fill='currentColor'
                  />
                  <path
                    d="M39.6424 29.7852C38.6465 31.2965 37.6473 32.8046 36.6514 34.3159C36.4323 34.6467 35.9542 34.6953 35.672 34.4164L30.3871 29.2339C29.7065 28.5658 28.5977 28.3161 27.6317 28.6177C26.2905 29.0328 25.7693 30.3722 25.5801 31.1344L23.648 38.48C23.648 38.48 23.6414 38.5027 23.6414 38.5125C23.5086 39.1935 23.1003 40.6789 21.7658 41.7329C20.4179 42.7998 18.8278 42.8744 17.6294 42.9296C17.0252 42.9588 16.4874 42.9296 16.0359 42.8809C15.6442 42.8388 15.3886 42.4561 15.5048 42.0864L19.9366 27.781L19.9532 27.7129C20.1092 27.0481 21.0786 23.6233 24.5975 22.0569C27.3329 20.8407 30.5763 21.204 33.086 23.0039C33.1092 23.0201 33.1325 23.0396 33.1557 23.059L39.5495 28.9972C39.7686 29.2015 39.8117 29.529 39.6458 29.7788"
                    fill='currentColor'
                  />
                </svg>
              </div>
              {aspersor.estado != 0 && !aspersor.deshabilitado && (
                <p className="text-error font-bold">
                  { getDescripcionEstado(aspersor.estado) }
                </p>
              )}
              <Button
                size="sm"
                type={aspersor.deshabilitado ? 'success-light' : 'error'}
                maxWith={false}
                onClick={() => handleAspersorDesabilitado(aspersor.id)}
              >
                {aspersor.deshabilitado
                  ? (dataLang?.habilitar ?? 'Habilitar')
                  : (dataLang?.deshabilitar ?? 'Deshabilitar')}
              </Button>
            </div>
          ))
        }
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <Button type="success" maxWith={false} onClick={close}>
          {dataLang?.confirmar ?? 'Confirmar'}
        </Button>
      </div>
    </div>
  )
}
