import { IS_DEVELOPMENT } from './env'

export const API_URL: string = IS_DEVELOPMENT
  ? 'http://192.168.1.187:8080'
  : `http://${window.location.hostname}:8080`

console.log('API_URL', API_URL)