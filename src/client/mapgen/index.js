import FastNoise from "fastnoise-lite"

export class MapGenerator {
    constructor() {
        this.noise = new FastNoise()
        this.noise.SetNoiseType(FastNoise.NoiseType.OpenSimplex2)
    }
    generateMap(seed, size) {
        console.log('generating map')
        this.noise.SetSeed(seed)
        const noiseData = []
        for (let x = 0; x < size; x++) {
            noiseData[x] = []
            for (let y = 0; y < size; y++) {
                noiseData[x][y] = this.noise.GetNoise(x,y)
            }
        }
        console.log(noiseData)
        return noiseData
    }
}