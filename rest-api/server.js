import Express from 'express'
import Path from 'path'
import { routes } from './route/routes.js'

const app = Express()

const directory = Path.resolve()
console.log('DIRECTORY: ' + directory)
/* eslint-disable no-undef */
global.__dirname = directory
app.use('/', Express.static(Path.join(__dirname, '../game-client/dist')))
app.use('/assets', Express.static(Path.join(__dirname, 'assets')))
/* eslint-enable no-undef */
routes(app)

const port = 3000
app.listen(port, () => {
  console.log(`Cheat to Win: app listening on port ${port}`)
})
