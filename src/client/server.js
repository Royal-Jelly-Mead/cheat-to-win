import express from "express";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)


const app = express()
app.use(express.static(path.join(__dirname, 'dist')));
const port = 3000
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port, () => {
  console.log(`Cheat to Win: app listening on port ${port}`)
})