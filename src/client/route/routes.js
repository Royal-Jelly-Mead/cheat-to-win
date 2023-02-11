import { MapGenerator } from "../mapgen/index.js"
const mapGenerator = new MapGenerator()

export function routes(app) {
  app.get('/', (_, res) => {
    res.render('index.html')
  })

  app.get('/map/:seed/:size', (req, res) => {
    const {seed, size} = req.params
    const map = mapGenerator.generateMap(seed, size)
    res.json(map)
  })
}

export default { routes }
