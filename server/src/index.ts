import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { addOperario, allOperarios, getOperario, removeOperario } from './operarios'
import { addTipoAplicacion, allTiposAplicaciones, getTipoAplicacion, removeTipoAplicacion } from './tipos-aplicaciones'
import cors from 'cors'

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 3000

// Operarios
app.get('/operarios', allOperarios)
app.get('/operarios/:id', getOperario)
app.delete('/operarios/:id', removeOperario)
app.post('/operarios', addOperario)

// Tipos de Aplicaciones
app.get('/tipos-aplicaciones', allTiposAplicaciones)
app.get('/tipos-aplicaciones/:id', getTipoAplicacion)
app.delete('/tipos-aplicaciones/:id', removeTipoAplicacion)
app.post('/tipos-aplicaciones', addTipoAplicacion)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
