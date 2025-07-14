
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './ui/global.css'
import './ui/keyboard.css'
import { NodosStatusProvider } from './hooks/use-nodos-status'
ReactDOM.createRoot(document.getElementById('root')!).render(  
  <NodosStatusProvider>
    <App />
  </NodosStatusProvider>
)

// Remove Preload scripts loading
//postMessage({ payload: 'removeLoading' }, '*') // INFO: Esto no se si es necesario!
