// store.js
import create from 'zustand'
interface Time {
  time: number
  isRunning: boolean
  isPaused: boolean
  timer: number | null
  startTime: number
  start: () => void
  stop: () => void
  pause: () => void
  reset: () => void
  loadTime: () => void
  saveTime: () => void
  get: () => string
}

const useTime = create<Time>((set, get) => ({
  time: 0, // Tiempo en segundos
  isRunning: false, // Si el contador está en ejecución
  isPaused: false, // Si el contador está pausado
  timer: null, // El ID del setInterval
  startTime: 0, // Hora de inicio cuando se da click en "Iniciar"

  start: (): void => {
    if (!get().isRunning) {
      const startTime = Date.now() - get().time * 1000 // Ajustar tiempo de inicio según el tiempo guardado
      const timer = setInterval(() => {
        set(() => ({ time: Math.floor((Date.now() - startTime) / 1000) }))
      }, 1000) as unknown as number

      set({ isRunning: true, isPaused: false, startTime, timer })
    }
  },

  pause: (): void => {
    clearInterval(get().timer ?? 0)
    set({ isRunning: false, isPaused: true })
  },

  stop: (): void => {
    clearInterval(get().timer ?? 0)
    set({ isRunning: false, isPaused: false })
  },

  reset: (): void => {
    clearInterval(get().timer ?? 0)
    set({ time: 0, isRunning: false, isPaused: false })
  },

  saveTime: (): void => {
    const timeWorked = get().time // Obtiene el tiempo en segundos
    const data = { timeWorked }
    const jsonString = JSON.stringify(data, null, 2)
    // Puedes guardar esto en un archivo o localStorage
    // Ejemplo guardando en localStorage:
    localStorage.setItem('timeData', jsonString)
  },

  loadTime: (): void => {
    const savedData = localStorage.getItem('timeData')
    if (savedData) {
      const { timeWorked } = JSON.parse(savedData)
      set({ time: timeWorked })
    }
  },

  get: (): string => {
    const time = get().time
    if (!time) return '00:00:00'

    const hh = Math.floor(time / 3600)
    const mm = Math.floor((time % 3600) / 60)
    const ss = time % 60

    const hhs = hh < 10 ? '0' + hh : hh.toString()
    const mms = mm < 10 ? '0' + mm : mm.toString()
    const sss = ss < 10 ? '0' + ss : ss.toString()

    return `${hhs}:${mms}:${sss}`
  }
}))

export default useTime
