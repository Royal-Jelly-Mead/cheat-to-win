export enum TileType {
  'wall-stone',
  'floor-stone',
  'wall-ice',
  'floor-ice',
  'floor-lava',
  'floor-water',
}

export class Tile {
  type: number
  health: number
  item: number
  constructor(type: TileType, itemIndex: number) {
    this.type = type
    this.item = itemIndex
    this.health = TileType[type].indexOf('wall') !== -1 ? 20 : -1
  }
}
