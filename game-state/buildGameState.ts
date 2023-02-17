import { Item } from '../game-client/gameplay/components/item'
import { Player, Directions } from '../game-client/gameplay/components/player'
import { TileType } from '../game-client/gameplay/components/tile'
import { MAP_CONFIG } from '../game-client/gameplay/util/config'

const ALLOC = {
  ITEM: 4, // xA, xB, yA, yB
  TILE: 4, // type, itemIndex, health, isTrap
  PLAYER: 6 // player.movement.xA/B, player.movement.yA/B, player.movement.direction, player.health
}

// xA/yA denotes the tile coordinate
// xB/yB denotes the pixel coordinate within the tile
// (A * tilesize) + B === actual world coordinate by pixel
export function serializeCoordinateToBytes(n: number): number[] {
  const c = n % MAP_CONFIG.tilesize
  const d = (n - c) / MAP_CONFIG.tilesize
  return [d,c]
}

export function deSerializeCoordinateFromBytes(a: number, b: number): number {
  return (a * MAP_CONFIG.tilesize) + b
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export type GameStateValues = {
  mapAlloc: number
  itemAlloc: number
  playerAlloc: number
  gameState: Int8Array
}

export function buildGameState(
  mapData: number[][],
  players: Player[],
  items: Item[],
): GameStateValues {
  // calculate level byte allocation
  const mapAlloc: number = (mapData.length * mapData[0].length) * ALLOC.TILE
  const playerAlloc = players.length * ALLOC.PLAYER
  const itemAlloc = items.length * ALLOC.ITEM
  const gameState: Int8Array = new Int8Array(mapAlloc + playerAlloc + itemAlloc)
  let possibleItemIndices: number[] = []

  let index = 0
  for (let x = 0; x < mapData.length; x++) {
    for (let y = 0; y < mapData[0].length; y++) {
      const tileTypeIndex = mapData[x][y]
      gameState[index] = tileTypeIndex // tile type
      gameState[index + 1] = -1 // item index
      gameState[index + 2] = TileType[tileTypeIndex].indexOf('wall') !== -1 ? 20 : -1 // health
      gameState[index + 3] = 0 // isTrap

      possibleItemIndices.push(index + 1)
      index += ALLOC.TILE
    }
  }

  for (let i = 0; i < players.length; i++) {
    const player: Player = players[i]
    const x = serializeCoordinateToBytes(player.movement.x)
    gameState[index] = x[0]     // xA
    gameState[index + 1] = x[1] // xB
    const y = serializeCoordinateToBytes(player.movement.y)
    gameState[index + 2] = y[0] // yA
    gameState[index + 3] = y[1] // yB
    gameState[index + 4] = Directions[player.movement.direction]
    gameState[index + 5] = player.health
    index += ALLOC.PLAYER
  }

  possibleItemIndices = shuffle(possibleItemIndices)
  for (let i = 0; i < items.length; i++) {
    const tileIndex: number = possibleItemIndices.shift() || -1
    if (tileIndex === -1) break
    gameState[tileIndex] = i
    gameState[index] = -1
    gameState[index + 1] = -1
  }

  return { itemAlloc, mapAlloc, playerAlloc, gameState }
}
