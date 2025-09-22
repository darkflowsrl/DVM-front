import { useEffect, useMemo, useState } from 'react'
import { useTitle } from '../../lib/hooks/UseTitle'
import ImageMap from './images/image.png'
import { Modal } from '../../ui/components/modal/Modal'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../ui/components/modal/hooks/UseModal'
import { Nodo } from '../../ui/components/nodo/Nodo'
import { TipoGotaModal, TipoGotaModalProps } from './components/tipo-gota-modal'
import { Button } from '../../ui/components/Button'

import { Dialog, DialogType } from '@renderer/ui/components/dialog/Dialog'
import { PanelLateralDerecha } from './components/PanelLateralDerecha'
import { PanelLateralIzquierdo } from './components/PanelLateralIzquierdo'
import { ConfiguracionesAvanzadasData } from '../configuracion-avanzada/interfaces/configuraciones-avanzadas-data'
import EncenderBomba from '@renderer/ui/components/preparacion-bomba/EncenderBomba'
import log from 'electron-log/renderer'
import clsx from 'clsx'
import { useMenu } from '@renderer/lib/hooks/UseMenu'
import { DataUnidad } from '../home/interfaces/data-unidad.interface'
import { useApp } from '@renderer/ui/hooks/useApp'
import useTime from '@renderer/ui/hooks/useTime'
import ApagarBomba from '@renderer/ui/components/preparacion-bomba/ApagarBomba'
import { useLang } from '../configuracion-general/hooks/useLang'
import { useNodosStatus } from '@renderer/hooks/use-nodos-status'
import { TipoGotaType } from '@renderer/interfaces/tipo-gota'
import { set } from 'react-hook-form'
import { postStartWork } from '@renderer/lib/api/post-start-work'


export function Trabajo(): JSX.Element {
  const { dataLang } = useLang()
  const { setTitle } = useTitle()
  const navigate = useNavigate()
  const { getStateModal, addModal, toggleOpenedState } = useModal()
  const { setHabilitar, habilitar } = useMenu()

  const { modeApp, getDescripcionEstado } = useApp()
  const [configuracionesAvanzadasData, setConfiguracionesAvanzadasData] = useState<ConfiguracionesAvanzadasData>()
  const { nodosConfig, nodosFull } = useNodosStatus()

  const errors = useMemo<string[]>(() => { // TODO: translate
    return nodosFull?.map<string[]>((nodo) => {      
      if (!nodo.conectado && !nodo.deshabilitado) {
        return [`Nodo ${nodo.id} desconectado`]
      }
      let nodoErrors = [] as string[]
      nodo.aspersores.forEach((aspersor) => {
        if (aspersor.estado > 1 && !aspersor.deshabilitado) {
          nodoErrors.push(`${nodo.nombre}${aspersor.id} con error`)
        }
      })
      return nodoErrors
    }). flat() ?? []
  }, [nodosFull])

  console.log('errors', errors)

  const [isPausado, setIsPausado] = useState<boolean>(false)
  const [isTrabajando, setIsTrabajando] = useState<boolean>(false)
  const [tipoGotaseleccionada, setTipoGotaSeleccionada] = useState<TipoGotaType | undefined>(undefined) // TODO: hace falta este hook? puede ser un estado normal de React

  const [direccionViento, setDireccionViento] = useState<number>(0)
  const [velocidadViento, setVelocidadViento] = useState<number>(0)

  const [unidades, setUnidades] = useState<DataUnidad[]>([])

  const { start: startTime, pause: pauseTime, stop: stopTime, saveTime, loadTime } = useTime()  

  // Cargar el tiempo guardado cuando la aplicación se inicia // TODO: no se que mierda hace esto
  useEffect(() => {
    loadTime() 
  }, [loadTime])

  // Titulo de la pagina
  useEffect(() => setTitle(dataLang?.trabajo ?? 'Trabajo'), [dataLang])

  // Inicializo los modales
  useEffect(() => {
    addModal('tipo-gota')
    addModal('init-job')
    addModal('encender-bomba')
    addModal('apagar-bomba')
    addModal('end-job')
    setTitle('Trabajo')    
  }, [])

  // Fetch de configuraciones avanzadas y unidades al cargar el componente
  useEffect(() => {
    const fetchConfiguracionesAvanzadas = async (): Promise<void> => {
      const configuracionesAvanzadasData = await window.api.invoke.getConfiguracionesAvanzadasAsync()
      setConfiguracionesAvanzadasData(configuracionesAvanzadasData)
    }

    const fetchUnidades = async (): Promise<void> => {
      const result = await window.api.invoke.getUnidadesAsync()
      setUnidades(result)
    }

    fetchConfiguracionesAvanzadas()
    fetchUnidades()
  }, [])

  const getRPMDeseado = async (tipoGotaSeleccionada: TipoGotaType | undefined): Promise<number> => {
    let rpmDeseado: number = 3500
    if (configuracionesAvanzadasData && tipoGotaSeleccionada) {

      // leo los RPM
      rpmDeseado = configuracionesAvanzadasData.gota[tipoGotaSeleccionada.toLowerCase()]

      // guado cual es la seleccioanda en la configuracion avanzada? // TODO: esto esta mal, edita un estado sin el SET, hace falta?
      configuracionesAvanzadasData.gota.seleccionada = tipoGotaSeleccionada
      const configuracionesAvanzadasEditData = await window.api.invoke.editConfiguracionesAvanzadasAsync(configuracionesAvanzadasData)
      setConfiguracionesAvanzadasData(configuracionesAvanzadasEditData)

    }

    return rpmDeseado
  }

  const getUnidadVelocidadViento = (): {
    valor: string
    unidad: string
  } => {
    let resp = {
      valor: '',
      unidad: ''
    }

    const unidadVelocidad =
      unidades.find((u) => u.estaSeleccionada && u.tipo === 'velocidad')?.unidad ?? ''
    resp =
      velocidadViento !== undefined && velocidadViento != null
        ? {
            valor:
              (velocidadViento * 3.6 * (unidadVelocidad === 'mi/h' ? 0.621371 : 1))?.toFixed(0) ??
              '', // Constante para pasar de m/s a Km/h
            unidad: unidades.find((u) => u.estaSeleccionada && u.tipo === 'velocidad')?.unidad ?? ''
          }
        : { valor: '-- --', unidad: '' }
    return resp
  }

  const openModal = (idModal: string): void => {
    if (getStateModal(idModal)) return
    toggleOpenedState(idModal)
  }

  /////////////////////////////////////////////
  /// Llamada a la api de work
  /////////////////////////////////////////////
  const fetchStartWork = async () => { 

    var rpmDeseado = await getRPMDeseado(tipoGotaseleccionada)

    const nodosStart = nodosConfig!
      .map((nodo) => {

        if(nodo.deshabilitado) {
          return {
            nodo: nodo.id,
            rpm1: 0,
            rpm2: 0,
            rpm3: 0,
            rpm4: 0
          }
        }
        
        return {
          nodo: nodo.id,
          rpm1: nodo.aspersores.find((a) => a.id === 1)!.deshabilitado ? 0 : rpmDeseado,
          rpm2: nodo.aspersores.find((a) => a.id === 2)!.deshabilitado ? 0 : rpmDeseado,
          rpm3: nodo.aspersores.find((a) => a.id === 3)!.deshabilitado ? 0 : rpmDeseado,
          rpm4: nodo.aspersores.find((a) => a.id === 4)!.deshabilitado ? 0 : rpmDeseado,
        }
      }) 

    return postStartWork({nodes: nodosStart})
  }

  /////////////////////////////////////////////
  /// Iniciar trabajo
  /////////////////////////////////////////////

  const handleIniciarTrabajo = async () => {
    

    if (tipoGotaseleccionada == null) {
      log.warn('Debe seleccionar un tipo de gota antes de iniciar el trabajo')
      // TODO: aca mostrar el modal de debe seleccionar un tipo de gota
      return
    }

    if (isTrabajando && !isPausado) {
      log.warn('El trabajo ya esta en curso')
      return
    }

    toggleOpenedState('init-job')

  }

  const modalIniciarTrabajoClose = () => {
    setHabilitar(false)
    toggleOpenedState('encender-bomba')
  }

  const modalEncenderBombaClose = async () => {
    if(nodosConfig == null) return

    if (isPausado) {
      setIsPausado(false)
    }

    const {error} = await fetchStartWork()

    if( error) {
      log.error('Error al iniciar el trabajo') // TODO: modal?
      return
    }

    setIsTrabajando(true)
    startTime()
  }

  /////////////////////////////////////////////
  /// Finalizar trabajo
  /////////////////////////////////////////////

  const handleFinalizarTrabajo = async () => {
    if (!isTrabajando) {
      log.warn('El trabajo no se puede finalizar')
      return
    }

    setIsTrabajando(false)

    toggleOpenedState('end-job')    
  }

  const modalFinalizarTrabajoClose = () => {
    toggleOpenedState('apagar-bomba')
  }

  const modalApagarBombaClose = async () => {
    console.log('modalApagarBombaClose')
    if (nodosConfig == null) return

    const { error }  = await postStartWork({
      nodes: nodosConfig.map(nodo => ({
        nodo: nodo.id,
        rpm1: 0,
        rpm2: 0,
        rpm3: 0,
        rpm4: 0
      }))
    })

    if(error) {
      if (!isPausado) {
        setIsPausado(false)
      }
      if(!isTrabajando) {
        setIsTrabajando(true)
      }
      return
    }

    if (!isPausado || !isTrabajando) {
      setHabilitar(true) //TODO: se puede llevar a la destruccion del componente?
      navigate('/reportes')

      stopTime()
      saveTime()
    } else {
      pauseTime()
    }
  }

  /////////////////////////////////////////////
  /// Pausar trabajo
  /////////////////////////////////////////////

  const handlePausarTrabajo = () => {
    if (!isTrabajando || isPausado) {
      log.warn('El trabajo no se puede pausar')
      return
    }

    setIsPausado(true)
    toggleOpenedState('apagar-bomba')
  }

  /////////////////////////////////////////////
  /// Cambiar tipo de gota
  /////////////////////////////////////////////
  const handleCambiarTipoDeGota = async () => {
    if(nodosConfig == null) return

    if (tipoGotaseleccionada == null) {
      log.warn('Debe seleccionar un tipo de gota antes de cambiarlo')
      return
    }

    if(!isTrabajando || isPausado) {
      log.warn('El trabajo no esta en curso')
      return
    }

    const {error} = await fetchStartWork()

    if( error) {
      log.error('Error al cambiar el tipo de gota') // TODO: modal?
      return
    }
  }

  useEffect(() => {
    handleCambiarTipoDeGota()
  }, [tipoGotaseleccionada])

  /////////////////////////////////////////////
  /// Cambia la configuracion de un nodo
  /////////////////////////////////////////////
  useEffect(() => {
    if (nodosConfig == null) return

    if (tipoGotaseleccionada == null) return

    if(!isTrabajando || isPausado) return

    const call = async () => {
      const { error } = await fetchStartWork()

      if (error) {
        log.error('Error al cambiar la configuracion de los nodos')
        return
      }
    }

    call()
  }, [nodosConfig])

  return (
    <article className="w-full h-full flex flex-col justify-between gap-10 px-20 py-16">
      <section className="grid grid-cols-3 gap-4 w-full h-full">
        {
          nodosFull?.map((nodoData, i) => {
            return <Nodo key={i} posicion={i} data={nodoData} animacion={false} />
          })
        }
      </section>
      <section className="grid grid-cols-4 gap-4 w-full h-44 ">
        <div className="w-full grid grid-cols-3 gap-2">
          {/* Indicador y modal tipo de gota */}
          <div className="col-span-3">
            <Button
              className={clsx('', {
                'animate-pulse': tipoGotaseleccionada == null
              })}
              onClick={() => openModal('tipo-gota')}
              size="lg"
              type="success"
            >
              {(dataLang
                ? (dataLang[tipoGotaseleccionada ?? ''] ?? tipoGotaseleccionada)
                : tipoGotaseleccionada) ||
                (dataLang?.tipoDeGota.toUpperCase() ?? 'TIPO DE GOTA')}
            </Button>
            <Modal<TipoGotaModalProps>
              idModal="tipo-gota"
              ModalContent={TipoGotaModal}
              modalContentProps={{
                tipoGotaseleccionada,
                setTipoGotaSeleccionada
              }}
              closed={handleCambiarTipoDeGota}
              crossClose
              outsideClose
            />
          </div>
          {/* Botones tipo de gota */}
          {modeApp === 'light' && (
            <>
              <Button
                type="default"
                size="sm"
                className="flex flex-col justify-center items-center"
                onClick={() => {
                  setTipoGotaSeleccionada('FINA')
                }}
              >
                <svg
                  width="15"
                  height="30"
                  viewBox="0 0 30 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.905 0.0176193C15.051 -0.0914147 15.2511 0.337799 15.3164 0.423468C19.298 7.86028 24.1177 15.0081 28.0865 22.4276C34.3076 34.0587 24.4458 47.469 11.6567 44.6099C2.10138 42.4734 -2.86261 31.5077 1.73386 22.7867L14.905 0.0176193ZM25.6994 30.844C25.4616 30.8933 25.1567 31.1018 25.0786 31.3424C24.8991 32.1826 24.8639 32.9926 24.6295 33.832C24.0757 35.8128 22.6906 37.6127 20.8016 38.4547C19.9403 38.838 18.484 38.8216 18.6875 40.1214C18.9013 41.4843 20.969 40.5774 21.7066 40.2313C24.3127 39.0094 26.0978 36.5812 26.7127 33.7671C26.9256 32.7944 27.3936 30.4952 25.7011 30.844H25.6994Z"
                    fill="#172530"
                  />
                </svg>
              </Button>
              <Button
                type="default"
                size="sm"
                className="flex flex-col justify-center items-center"
                onClick={() => {
                  setTipoGotaSeleccionada('MEDIA')
                }}
              >
                <svg
                  width="20"
                  height="32"
                  viewBox="0 0 30 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.905 0.0176193C15.051 -0.0914147 15.2511 0.337799 15.3164 0.423468C19.298 7.86028 24.1177 15.0081 28.0865 22.4276C34.3076 34.0587 24.4458 47.469 11.6567 44.6099C2.10138 42.4734 -2.86261 31.5077 1.73386 22.7867L14.905 0.0176193ZM25.6994 30.844C25.4616 30.8933 25.1567 31.1018 25.0786 31.3424C24.8991 32.1826 24.8639 32.9926 24.6295 33.832C24.0757 35.8128 22.6906 37.6127 20.8016 38.4547C19.9403 38.838 18.484 38.8216 18.6875 40.1214C18.9013 41.4843 20.969 40.5774 21.7066 40.2313C24.3127 39.0094 26.0978 36.5812 26.7127 33.7671C26.9256 32.7944 27.3936 30.4952 25.7011 30.844H25.6994Z"
                    fill="#172530"
                  />
                </svg>
              </Button>
              <Button
                type="default"
                size="sm"
                className="flex flex-col justify-center items-center"
                onClick={() => {
                  setTipoGotaSeleccionada('GRUESA')
                }}
              >
                <svg
                  width="30"
                  height="45"
                  viewBox="0 0 30 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.905 0.0176193C15.051 -0.0914147 15.2511 0.337799 15.3164 0.423468C19.298 7.86028 24.1177 15.0081 28.0865 22.4276C34.3076 34.0587 24.4458 47.469 11.6567 44.6099C2.10138 42.4734 -2.86261 31.5077 1.73386 22.7867L14.905 0.0176193ZM25.6994 30.844C25.4616 30.8933 25.1567 31.1018 25.0786 31.3424C24.8991 32.1826 24.8639 32.9926 24.6295 33.832C24.0757 35.8128 22.6906 37.6127 20.8016 38.4547C19.9403 38.838 18.484 38.8216 18.6875 40.1214C18.9013 41.4843 20.969 40.5774 21.7066 40.2313C24.3127 39.0094 26.0978 36.5812 26.7127 33.7671C26.9256 32.7944 27.3936 30.4952 25.7011 30.844H25.6994Z"
                    fill="#172530"
                  />
                </svg>
              </Button>
            </>
          )}
        </div>
        {/* Errores */}
        {modeApp === 'light' && (
          <div
            className={clsx(
              'relative border-[1px] border-white rounded-md col-span-2 w-full h-full bg-white flex gap-1 dark:bg-dark flex flex-col',
              
            )}
          >
            <h3 className="pl-2 text-dark dark:text-light font-bold text-xl">Errores</h3>
            {
              errors != null && errors.length > 0 && (                  
                <ul className="overflow-x-hidden h-[120px] w-full flex flex-col gap-1 overflow-y-auto pl-4 pb-6">
                  {
                    errors.map((a) => (
                          <li
                        className='text-[20px] text-[#FF0000] dark:text-light font-bold'
                      >
                          - {a}
                      </li>
                    ))
                  }
                </ul>
              )
            }            
          </div>
        )}
        {/* GPS y datos metereologicos */}
        {modeApp === 'full' && (
          <div
            className="relative col-span-2 w-full h-full bg-white flex gap-10 justify-center items-center"
            style={{
              backgroundImage: `url(${ImageMap})`
            }}
          >
            <div className="p-1 absolute top-1 left-1 rounded-lg shadow-lg bg-white">
              <span className="text-xs mb-0">{dataLang?.viento ?? 'Viento'}</span>
              <p className="font-bold text-sm mt-0">
                {getUnidadVelocidadViento().valor} {getUnidadVelocidadViento().unidad}
              </p>
            </div>
            <div className="" id="contenedor-tractor">
              <svg
                style={{
                  transform: `rotate(${direccionViento}deg)`
                }}
                width="29"
                height="31"
                viewBox="0 0 29 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.00009 28.7271C2.64218 29.4014 3.48916 29.8456 4.414 29.9931C5.33885 30.1406 6.29172 29.9834 7.1297 29.5452L14.61 26.2658L21.9855 29.3458C22.8212 29.7761 23.7774 29.9248 24.7138 29.7699C25.6502 29.615 26.5173 29.1648 27.1879 28.4852L27.2102 28.463C27.9082 27.7648 28.3599 26.8594 28.4949 25.8876C28.6299 24.9158 28.4408 23.9321 27.9569 23.0895L14.8207 0.470566L1.32417 23.3989C0.833948 24.2478 0.634496 25.2298 0.756686 26.193C0.878876 27.1562 1.31589 28.0469 2.00009 28.7271ZM14.7452 9.31107L24.0575 25.3549L14.6357 21.4068L5.39504 25.4573L5.17926 25.5855L14.7452 9.31107Z"
                  fill="#32CF9C"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <svg
                width="178"
                height="79"
                viewBox="0 0 178 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M109.284 10.4717C109.017 10.7255 108.87 10.8203 108.783 10.9559C107.99 12.1985 106.893 12.4961 105.491 12.4231C103.092 12.2992 100.682 12.4129 98.2772 12.3736C97.6523 12.3633 97.4967 12.5529 97.4981 13.1917C97.5191 19.9969 97.5107 26.8021 97.5107 33.6087C97.5107 33.8974 97.5107 34.1848 97.5107 34.5421H81.0129C81.0129 34.2314 81.0129 33.9222 81.0129 33.6145C81.0143 26.8327 81.0073 20.0523 81.0339 13.2705C81.0367 12.5734 80.863 12.3633 80.1834 12.3736C77.4525 12.4129 74.7187 12.3706 71.9878 12.4071C71.353 12.4159 70.8696 12.2773 70.4759 11.742C70.1578 11.3103 69.7752 10.9282 69.4207 10.5242C69.3577 10.5607 69.2932 10.5972 69.2302 10.6322C69.2302 11.8835 69.2302 13.1349 69.2302 14.3862C69.2302 14.799 69.2302 15.2132 69.2302 15.6259C69.2302 16.4806 68.8201 17.0236 67.9999 17.255C66.4432 17.6911 64.9089 17.5904 63.3801 17.0771C62.8939 16.9152 62.7426 16.6425 62.7482 16.1247C62.7734 14.0347 62.7566 11.9448 62.7594 9.85334C62.7594 9.52811 62.6739 9.16933 63.1616 9.06578C63.2554 9.04536 63.3213 8.65304 63.3227 8.43135C63.3353 6.60828 63.3269 4.78521 63.3311 2.96214C63.3367 1.24992 64.4465 0.00585494 65.9668 2.11214e-05C67.5095 -0.0058127 68.6361 1.19741 68.6543 2.90964C68.6725 4.6102 68.6585 6.31222 68.6613 8.01423C68.6613 8.54365 68.5534 9.02494 69.2988 9.28163C69.7893 9.45081 70.1802 10.0648 70.5193 10.5505C71.0854 11.3628 71.7888 11.5802 72.736 11.5539C75.2568 11.4839 77.7789 11.5174 80.3011 11.5422C80.8336 11.5481 81.0466 11.4095 81.0297 10.813C80.9919 9.35601 81.0017 7.8961 81.0241 6.4391C81.0311 5.98406 80.9176 5.70258 80.4679 5.59174C80.1974 5.52611 79.9452 5.34818 79.6734 5.31755C79.438 5.28984 79.1325 5.32192 78.956 5.46194C78.4417 5.86739 77.9107 6.0074 77.3207 5.73904C76.7238 5.46777 76.4506 4.96023 76.466 4.2835C76.4674 4.21058 76.4548 4.13474 76.4674 4.06474C76.5529 3.62282 76.5094 2.93006 76.7561 2.78859C77.5127 2.35397 78.3843 2.42835 79.1872 2.79442C79.2978 2.84547 79.3875 3.13862 79.3595 3.29613C79.2096 4.17266 79.6636 4.51686 80.3894 4.66416C80.5477 4.69625 80.7005 4.76042 80.9681 4.84501C81.097 3.70596 81.9027 3.78617 82.7014 3.78763C87.1852 3.7993 91.6677 3.80076 96.1516 3.78763C96.855 3.78617 97.4155 3.92472 97.557 4.85668C98.0432 4.68312 98.5028 4.58103 98.8909 4.34913C99.0591 4.24996 99.1782 3.8693 99.1487 3.64033C99.0535 2.89797 99.4024 2.62816 100.033 2.57419C100.079 2.56982 100.125 2.55815 100.172 2.55086C101.84 2.3 102.551 3.20862 101.985 4.87126C101.647 5.86301 100.474 6.22617 99.6924 5.50715C98.9638 4.83626 98.4383 5.56694 97.8498 5.72592C97.6747 5.77259 97.5346 6.30346 97.5275 6.61557C97.4953 8.21404 97.5121 9.81251 97.5121 11.4737C97.8022 11.4941 98.0264 11.5247 98.252 11.5247C101.008 11.5277 103.763 11.5408 106.518 11.5087C106.843 11.5043 107.222 11.3162 107.475 11.0901C107.968 10.6482 108.39 10.1202 108.841 9.62874C108.921 9.54123 108.988 9.39831 109.083 9.37205C110.094 9.09349 109.851 8.25342 109.855 7.53148C109.864 5.97531 109.825 4.41914 109.872 2.86589C109.937 0.739458 111.74 -0.532315 113.562 0.218789C114.538 0.621323 115.174 1.58244 115.181 2.71712C115.191 4.58832 115.181 6.45952 115.187 8.33218C115.187 8.67054 115.055 9.08911 115.593 9.18245C115.668 9.19558 115.749 9.4581 115.75 9.60687C115.76 11.8675 115.768 14.1281 115.736 16.3872C115.733 16.5972 115.497 16.9152 115.299 16.9925C113.459 17.7232 111.61 17.71 109.756 17.0056C109.383 16.8641 109.271 16.6425 109.275 16.2458C109.293 14.6181 109.284 12.989 109.284 11.3599C109.284 11.1251 109.284 10.8903 109.284 10.4717ZM87.5986 7.1975H90.9096V5.60486H87.5986V7.1975Z"
                  fill="#1C2E3D"
                />
                <path
                  d="M73.2297 66.6166C73.1344 66.1236 72.9551 65.6292 72.9551 65.1362C72.9397 55.9042 72.9425 46.6736 72.9467 37.4416C72.9467 35.7921 73.8757 34.8208 75.4744 34.8193C84.3665 34.8135 93.26 34.8135 102.152 34.8193C103.723 34.8193 104.642 35.7688 104.643 37.3964C104.648 46.6766 104.634 55.9567 104.655 65.2369C104.657 66.5072 104.011 67.2393 103.06 67.8183L103.082 67.7979C102.732 67.8023 102.383 67.8096 102.033 67.8096C93.9592 67.8096 85.884 67.8169 77.8103 67.8037C76.58 67.8023 75.3497 67.7075 74.1195 67.655C73.8224 67.3093 73.5254 66.9637 73.2283 66.6195L73.2297 66.6166ZM88.7971 63.5976C91.5995 63.5976 94.4019 63.6005 97.2044 63.5976C99.3342 63.5946 100.616 62.2849 100.619 60.0739C100.629 54.2153 100.632 48.3582 100.623 42.4995C100.62 40.411 99.3524 39.0415 97.3571 39.0343C91.636 39.0124 85.9134 39.0124 80.1923 39.0372C78.2685 39.0459 76.999 40.4227 76.9962 42.415C76.9906 48.3217 76.9892 54.2284 76.9962 60.1352C76.999 62.266 78.2839 63.5961 80.3184 63.599C83.1447 63.6034 85.9695 63.599 88.7957 63.6005L88.7971 63.5976Z"
                  fill="#1C2E3D"
                />
                <path
                  d="M73.6297 66.6163C73.9267 66.9619 74.2238 67.3076 74.5208 67.6518C75.5591 67.818 76.5974 67.9843 77.703 68.1608C77.7086 68.1929 77.7422 68.33 77.7478 68.4685C77.7815 69.2279 78.1677 69.6076 78.9066 69.6076C85.816 69.6076 92.7253 69.6076 99.6347 69.6061C99.9513 69.6061 100.269 69.5755 100.617 69.558C100.631 69.2998 100.646 69.1102 100.651 68.9192C100.665 67.9945 100.665 68.0164 101.577 67.9814C102.214 67.9566 102.849 67.8589 103.487 67.7947L103.464 67.8151C104.56 67.5599 105.248 66.5725 105.252 65.2074C105.261 62.607 105.255 60.0065 105.255 57.4047C105.255 52.4707 105.266 47.5368 105.237 42.6028C105.232 41.9655 105.473 41.6869 105.993 41.4929C108.087 40.7112 110.326 42.279 110.33 44.6038C110.348 53.3297 110.344 62.0557 110.333 70.7816C110.331 72.4093 109.229 73.7569 107.742 74.0515C106.192 74.3592 104.683 73.5498 104.121 72.0023C103.914 71.4306 103.642 71.2833 103.105 71.3125C102.318 71.3548 101.528 71.3242 100.708 71.3242C100.669 71.0237 100.638 70.7918 100.602 70.5103H77.8207C77.7787 70.7583 77.7408 70.9902 77.6848 71.3256C77.071 71.3256 76.4503 71.3417 75.8296 71.3198C75.4765 71.3067 75.3041 71.4263 75.1724 71.7909C74.5475 73.5133 73.1294 74.3665 71.483 74.0573C69.9263 73.7642 68.8684 72.3728 68.867 70.5804C68.8628 62.0003 68.8614 53.4202 68.867 44.8401C68.867 42.8245 70.1981 41.3529 72.0379 41.2917C73.0202 41.2581 73.1813 41.4156 73.1813 42.4147C73.1813 49.1717 73.1813 55.9287 73.1813 62.6857C73.1813 63.5856 73.1337 64.4884 73.1995 65.3824C73.2303 65.8024 73.4798 66.2064 73.6297 66.6163Z"
                  fill="#1C2E3D"
                />
                <path
                  d="M90.9556 34.5668H87.2648C87.2508 34.3101 87.227 34.0753 87.227 33.8405C87.2256 30.1739 87.2438 26.5088 87.213 22.8423C87.2074 22.1801 87.412 21.9643 88.0131 22.0372C88.4965 22.0955 89.0023 22.0445 89.4675 22.167C90.3153 22.3901 90.9178 23.026 90.9318 23.9142C90.9879 27.4291 90.9556 30.9469 90.9556 34.5668Z"
                  fill="#1C2E3D"
                />
                <path
                  d="M90.8843 22.043V34.5492H87.2481C87.2355 34.2867 87.2159 34.049 87.2145 33.8098C87.2131 30.6785 87.2117 27.5472 87.2145 24.4173C87.2159 22.9312 88.0328 22.0736 89.4648 22.0444C89.9244 22.0357 90.384 22.0444 90.8829 22.0444L90.8843 22.043Z"
                  fill="#1C2E3D"
                />
                <path d="M87.2129 7.19786V5.60522H90.5239V7.19786H87.2129Z" fill="#1C2E3D" />
                <path
                  d="M88.8224 63.5969C85.9962 63.5969 83.1713 63.5998 80.3451 63.5969C78.3105 63.5939 77.0256 62.2638 77.0228 60.133C77.0158 54.2263 77.0158 48.3195 77.0228 42.4128C77.0256 40.4206 78.2937 39.0438 80.219 39.035C85.9401 39.0102 91.6626 39.0117 97.3838 39.0321C99.3791 39.0394 100.647 40.4089 100.65 42.4974C100.658 48.356 100.656 54.2132 100.646 60.0718C100.642 62.2828 99.3609 63.5925 97.231 63.5954C94.4286 63.5998 91.6262 63.5954 88.8238 63.5954L88.8224 63.5969ZM99.9073 51.3488C99.9073 48.3852 99.9115 45.4216 99.9059 42.458C99.9031 40.7647 98.9629 39.7788 97.3459 39.7774C91.6753 39.773 86.0032 39.773 80.3325 39.7774C78.6833 39.7774 77.7388 40.772 77.7374 42.5032C77.7346 48.3823 77.7332 54.2598 77.7374 60.1389C77.7374 61.8526 78.6889 62.8618 80.3451 62.8647C86.0158 62.8749 91.6879 62.8749 97.3585 62.8647C98.9685 62.8618 99.9045 61.8496 99.9059 60.168C99.9087 57.2292 99.9059 54.289 99.9073 51.3502V51.3488Z"
                  fill="#1C2E3D"
                />
                <path
                  d="M99.838 51.1288C99.838 54.0676 99.8394 57.0079 99.8366 59.9467C99.8352 61.6268 98.8978 62.6404 97.2892 62.6433C91.6185 62.655 85.9464 62.6535 80.2758 62.6433C78.6209 62.6404 77.6695 61.6326 77.6681 59.9175C77.6653 54.0385 77.6653 48.1609 77.6681 42.2818C77.6681 40.5507 78.6139 39.5574 80.2632 39.556C85.9338 39.5531 91.6059 39.5516 97.2766 39.556C98.8922 39.556 99.8324 40.5434 99.8366 42.2366C99.8422 45.2002 99.838 48.1638 99.8366 51.1274L99.838 51.1288Z"
                  fill="#1C2E3D"
                />
                <rect
                  x="0.548828"
                  y="74.3657"
                  width="177.127"
                  height="4.05633"
                  rx="2.02817"
                  fill="#1C2E3D"
                />
              </svg>
              {isTrabajando && (
                <svg
                  width="178"
                  height="13"
                  viewBox="0 0 178 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.85177" cy="3.26437" r="2.4338" fill="#1C2E3D" />
                  <circle cx="2.98458" cy="10.5659" r="2.4338" fill="#1C2E3D" />
                  <circle cx="12.717" cy="10.5659" r="2.4338" fill="#1C2E3D" />
                  <circle cx="40.299" cy="3.26485" r="2.4338" fill="#1C2E3D" />
                  <circle cx="35.4338" cy="10.5661" r="2.4338" fill="#1C2E3D" />
                  <circle cx="45.1662" cy="10.5661" r="2.4338" fill="#1C2E3D" />
                  <circle cx="72.7483" cy="3.2651" r="2.4338" fill="#1C2E3D" />
                  <circle cx="67.8811" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                  <circle cx="77.6135" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                  <circle cx="105.201" cy="3.2651" r="2.4338" fill="#1C2E3D" />
                  <circle cx="100.334" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                  <circle cx="110.067" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                  <circle cx="137.653" cy="3.26485" r="2.4338" fill="#1C2E3D" />
                  <circle cx="132.785" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                  <circle cx="142.52" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                  <circle cx="170.106" cy="3.2651" r="2.4338" fill="#1C2E3D" />
                  <circle cx="165.238" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                  <circle cx="174.971" cy="10.5664" r="2.4338" fill="#1C2E3D" />
                </svg>
              )}
            </div>
            <div>
              <svg
                width="109"
                height="109"
                viewBox="0 0 109 109"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2993_2768)">
                  <circle cx="54.5" cy="49.5" r="49.5" fill="white" />
                </g>
                <path
                  d="M64.1912 51.7681L64.2077 75.805L58.4296 75.8089L49.9173 60.8578L49.9276 75.8147L44.133 75.8187L44.1165 51.7819L49.9111 51.7779L58.4234 66.7291L58.4132 51.7721L64.1912 51.7681Z"
                  fill="#1C2E3D"
                />
                <path
                  d="M43.0001 45.7271C43.6422 46.4014 44.4892 46.8456 45.414 46.9931C46.3388 47.1406 47.2917 46.9834 48.1297 46.5452L55.61 43.2658L62.9855 46.3458C63.8212 46.7761 64.7774 46.9248 65.7138 46.7699C66.6502 46.615 67.5173 46.1648 68.1879 45.4852L68.2102 45.463C68.9082 44.7648 69.3599 43.8594 69.4949 42.8876C69.6299 41.9158 69.4408 40.9321 68.9569 40.0895L55.8207 17.4706L42.3242 40.3989C41.8339 41.2478 41.6345 42.2298 41.7567 43.193C41.8789 44.1562 42.3159 45.0469 43.0001 45.7271ZM55.7452 26.3111L65.0575 42.3549L55.6357 38.4068L46.395 42.4573L46.1793 42.5855L55.7452 26.3111Z"
                  fill="#DC3545"
                />
                <defs>
                  <filter
                    id="filter0_d_2993_2768"
                    x="0.341177"
                    y="0"
                    width="108.318"
                    height="108.318"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4.65882" />
                    <feGaussianBlur stdDeviation="2.32941" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2993_2768"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2993_2768"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        )}
        {/* Botones de iniciar finalizar y pausar trabajo */}
        <div className="flex flex-col justify-around gap-4">
          <Button
            onClick={handleFinalizarTrabajo}
            type="error"
            size="lg"
            disabled={!isTrabajando && !isPausado}
          >
            {dataLang?.finalizar ?? 'Finalizar'}
          </Button>

          <Modal<{
            title: string
            message: string
            type: 'success' | 'warning' | 'error' | 'default'
          }>
            idModal="end-job"
            ModalContent={Dialog}
            modalContentProps={{
              title: `${dataLang?.finalizarTrabajo ?? 'Finalizar trabajo'}`,
              message: `${dataLang?.deseaFinalizarTrabajo_ ?? '¿Desea finalizar trabajo?'}`,
              type: 'error'
            }}
            closed={modalFinalizarTrabajoClose}
            crossClose
            outsideClose
          />
          {
            (!isTrabajando || isPausado) && (
              <Button
                onClick={handleIniciarTrabajo}
                type="success"
                size="lg"
              >
                {
                  isPausado 
                    ? dataLang?.reanudarTrabajo ?? 'Reanudar Trabajo'
                    : dataLang?.iniciarTrabajo ?? 'Iniciar Trabajo'
                }
              </Button>
            )
          }
          {
            isTrabajando && !isPausado && (
              <Button
                onClick={handlePausarTrabajo}
                type="warning"
                size="lg"
              >
                {dataLang?.pausarTrabajo ?? 'Pausar'}
              </Button>
            )
          }
          <Modal<{
            title: string
            message: string
            type: 'success' | 'warning' | 'error' | 'default'
            buttons?: {
              cancelar?: {
                noShow: boolean
                text: string
                type: DialogType
              }
              aceptar?: {
                noShow: boolean
                text: string
                type: DialogType
              }
            }
          }>
            idModal="init-job"
            ModalContent={Dialog}
            modalContentProps={{
              title: dataLang?.iniciarTrabajo ?? 'Iniciar trabajo',
              message: dataLang?.seIniciaraElFuncionamiento_ ?? 'Se iniciará el funcionamiento de los<br />aspersores, ¿Desea Continuar?',
              type: 'warning'
            }}
            closed={modalIniciarTrabajoClose}
            crossClose
            outsideClose
          />
          <Modal<undefined>
            idModal="encender-bomba"
            ModalContent={EncenderBomba}
            closed={modalEncenderBombaClose}
            crossClose
            outsideClose
          />
          <Modal<undefined>
            idModal="apagar-bomba"
            ModalContent={ApagarBomba}
            closed={modalApagarBombaClose}
            crossClose
            outsideClose
          />
        </div>
      </section>
      {/* Paneles laterales */}
      {modeApp === 'full' && (
        <>
          <PanelLateralIzquierdo />
          <PanelLateralDerecha />
        </>
      )}
    </article>
  )
}
