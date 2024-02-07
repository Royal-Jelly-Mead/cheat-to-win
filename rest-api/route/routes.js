import { MapGenerator } from '../mapgen/index.js'
const mapGenerator = new MapGenerator()

export function routes(app) {
  app.get('/', (_, res) => {
    res.render('index.html')
  })

  app.get('/map/:seed/:size', (req, res) => {
    const { seed, size } = req.params
    console.log(`generating map size ${size} with seed "${seed}"`)
    const map = mapGenerator.generateMapFull(seed, size)
    res.json(map)
  })
}

export default { routes }
