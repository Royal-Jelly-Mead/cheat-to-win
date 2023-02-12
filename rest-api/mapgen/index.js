import FastNoise from 'fastnoise-lite';

// const TILE_TYPES = [    // enum
// 	// Normal tiles (never change)
// 	'wall_normal',      // 0
// 	'floor_normal',     // 1
// 	// Special tiles (can be changed)
// 	'wall_ice',         // 2
// 	'floor_ice',        // 3
// 	'floor_water',      // 4
// 	'floor_lava'        // 5
// ];

const FLOOR_TO_WALL_RATIO = 0.4; // make floor when > ratio
const FREQUENCY = 0.2;

export class MapGenerator {
	constructor() {
		this.noise1 = new FastNoise();
		this.noise2 = new FastNoise();
		this.noise3 = new FastNoise();
        
		this.noise1.SetNoiseType(FastNoise.NoiseType.OpenSimplex2);
		this.noise2.SetNoiseType(FastNoise.NoiseType.Cellular);
		this.noise3.SetNoiseType(FastNoise.NoiseType.ValueCubic);
        
		this.noise1.SetFrequency(FREQUENCY);
		this.noise2.SetFrequency(FREQUENCY);
		this.noise3.SetFrequency(FREQUENCY);
	}
	generateMap(seed, size) {
		this.noise1.SetSeed(seed);
		this.noise2.SetSeed(seed);
		this.noise3.SetSeed(seed);
		const noiseData = [];
		for (let x = 0; x < size; x++) {
			noiseData[x] = [];
			for (let y = 0; y < size; y++) {
				const a = (this.noise1.GetNoise(x,y) + 1) / 2;
				const b = (this.noise2.GetNoise(x,y) + 1) / 2;
				const c = (this.noise3.GetNoise(x,y) + 1) / 2;
				const ratio = (a + b + c) / 3;
				noiseData[x][y] = ratio > FLOOR_TO_WALL_RATIO ? 0 : 1;
			}
		}
		return noiseData;
	}
}