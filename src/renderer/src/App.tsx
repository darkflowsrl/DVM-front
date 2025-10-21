import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './ui/layout/Layout'
import Home from './app/home/Home'
import { Testing } from './app/testing/Testing'
import { useCallback, useEffect, useState } from 'react'
import { useCarga } from './ui/layout/hooks/useCarga'
import { Trabajo } from './app/trabajo/Trabajo'
import { Reportes } from './app/reportes/Reportes'
import ConfiguracionGeneral from './app/configuracion-general/ConfiguracionGeneral'
import ConfiguracionAvanzada from './app/configuracion-avanzada/ConfiguracionAvanzada'

import {
  ConfiguracionesAvanzadasData
} from './app/configuracion-avanzada/interfaces/configuraciones-avanzadas-data'

import { useNodosStatus } from './hooks/use-nodos-status'
import { postConfig } from './lib/api/post-config'

export function App(): JSX.Element {
  const { cargando, setCargando } = useCarga()
  const [isConfigSend, setIsConfigSend] = useState<boolean>(false)
  const { nodosConfig } = useNodosStatus()

  useEffect(() => {
    setCargando(true)    
  }, [])
  
  useEffect(() => {
    if(!cargando) {
      return
    }

    if(isConfigSend !== true) {
      setConfiguracionInicial()
    }

    if(isConfigSend === true) {
      setCargando(false)
    }

  }, [cargando, nodosConfig, isConfigSend])

 

  const setConfiguracionInicial = useCallback(async (): Promise<void> => {

    if(nodosConfig == null || nodosConfig.length === 0) {
      return
    }

    const configuracionesAvanzadasData: ConfiguracionesAvanzadasData = await window.api.invoke.getConfiguracionesAvanzadasAsync()

    const data = {
      configuraciones: (nodosConfig).map((nodo) => ({
        nodo: nodo.id,
        variacionRPM: configuracionesAvanzadasData.variacionRPM,
        subcorriente: configuracionesAvanzadasData.corriente.minimo,
        sobrecorriente: configuracionesAvanzadasData.corriente.maximo,
        cortocicuito: configuracionesAvanzadasData.corriente.limite,
        sensor: configuracionesAvanzadasData.sensorRPM,
        electrovalvula: configuracionesAvanzadasData.electroValvula
      }))
    }

    console.log('***** Enviando configuración:', data)

    const { error } = await postConfig(data)

    console.log('***** Configuración enviada - error:', error)

    if(error == null) {
      setIsConfigSend(true)
    }
    
  }, [nodosConfig])

  return (
    <Router>
      <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/trabajo" element={<Trabajo />} />
            <Route path="/configuracion-general" element={<ConfiguracionGeneral />} />
            <Route path="/configuracion-avanzada" element={<ConfiguracionAvanzada />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
      </Layout>
    </Router>
  )
}
