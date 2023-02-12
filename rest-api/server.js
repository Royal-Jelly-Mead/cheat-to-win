import Express from "express"
import Path from "path"
import { routes } from "./route/routes.js"

const directory = Path.resolve()
console.log("DIRECTORY: " + directory)
global.__dirname = directory
const app = Express()
app.use("/", Express.static(Path.join(__dirname, '../game-client/dist')))
app.use("/assets", Express.static(Path.join(__dirname, 'assets')))
routes(app)

const port = 3000
app.listen(port, () => {
  console.log(`Cheat to Win: app listening on port ${port}`)
})
