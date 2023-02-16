import { Scene, Tilemaps } from 'phaser'
import { MAP_CONFIG } from '../util/config'

export class Level {
  data: number[][]
  map: Tilemaps.Tilemap
  tiles: Tilemaps.Tileset
  layer: Tilemaps.TilemapLayer

  constructor(scene: Scene, data: number[][], tilesetId: string) {
    this.data = data
    this.map = scene.make.tilemap({
      data: data,
      tileWidth: MAP_CONFIG.tilesize,
      tileHeight: MAP_CONFIG.tilesize,
    })
    this.tiles = this.map.addTilesetImage(tilesetId)
    this.layer = this.map.createLayer(0, this.tiles, 0, 0)
    MAP_CONFIG.wallCollisionIndices.forEach((index) =>
      this.layer.setCollision(index),
    )
    this.map.setCollisionByProperty({ collision: true }, true, true, this.layer)
  }
}
