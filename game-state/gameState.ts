import { Item } from '../game-client/gameplay/components/item'
import { Player, Directions } from '../game-client/gameplay/components/player'
import { TileType } from '../game-client/gameplay/components/tile'

const ALLOC = {
  ITEM: 2, // x, y
  TILE: 4, // type, itemIndex, health, isTrap
  PLAYER: 4 // player.movement.x, player.movement.y, player.movement.direction, player.health
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
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
      gameState[index + 3] = 0

      possibleItemIndices.push(index + 1)
      index += ALLOC.TILE
    }
  }

  for (let i = 0; i < players.length; i++) {
    const player: Player = players[i]
    gameState[index] = player.movement.x
    gameState[index + 1] = player.movement.y
    gameState[index + 2] = Directions[player.movement.direction]
    gameState[index + 3] = player.health
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
