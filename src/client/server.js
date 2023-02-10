import express from "express"
import { fileURLToPath } from "url";
import path from "path"
import routes from "./route/routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__dirname = __dirname

const app = express()
app.use("/", express.static(path.join(__dirname, 'dist')))
app.use("/assets", express.static(path.join(__dirname, 'assets')))
routes(app)

const port = 3000
app.listen(port, () => {
  console.log(`Cheat to Win: app listening on port ${port}`)
})