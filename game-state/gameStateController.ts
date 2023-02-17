import { GameStateValues, buildGameState, ALLOC, deSerializeCoordinateFromBytes, serializeCoordinateToBytes } from './buildGameState'
import { MAP_CONFIG } from '../game-client/gameplay/util/config'
import fetch from 'node-fetch'
import { Directions, Player } from '../game-client/gameplay/components/player'
import {
  Item,
  EquipmentSlot,
  Weapon,
  Bodygear,
  Handgear,
  Footwear,
  Consumable,
} from '../game-client/gameplay/components/item'
import { ControlSchema } from '../game-client/gameplay/components/controlSchema'
import { Math } from 'phaser'

const MAP_SIZE = MAP_CONFIG.defaultMapSize
const API = 'https://localhost:3000'

const MATCHES: GameStateValues[] = []
const PLAYER_GROUPS: Player[][] = []
const ACTIVE_STATUS: boolean[] = []
const INPUT_QUEUES: ControlSchema[][] = []
const LAST_UPDATE_TIMESTAMPS: number[] = []

const STANDARD_ITEM_SET: Item[] = (() => {
  const result: Item[] = []
  for (const weapon in Weapon) {
    const type: Weapon =
      typeof weapon === 'string' ? Weapon[weapon] : Weapon[Weapon[weapon]]
    result.push(new Item(EquipmentSlot.weapon, type))
  }
  for (const bodygear in Bodygear) {
    const type: Bodygear =
      typeof bodygear === 'string'
        ? Bodygear[bodygear]
        : Bodygear[Bodygear[bodygear]]
    result.push(new Item(EquipmentSlot.bodygear, type))
  }
  for (const handgear in Handgear) {
    const type: Handgear =
      typeof handgear === 'string'
        ? Handgear[handgear]
        : Handgear[Handgear[handgear]]
    result.push(new Item(EquipmentSlot.handgear, type))
  }
  for (const footwear in Footwear) {
    const type: Footwear =
      typeof footwear === 'string'
        ? Footwear[footwear]
        : Footwear[Footwear[footwear]]
    result.push(new Item(EquipmentSlot.footwear, type))
  }
  for (const consumable in Consumable) {
    const type: Consumable =
      typeof consumable === 'string'
        ? Consumable[consumable]
        : Consumable[Consumable[consumable]]
    result.push(new Item(EquipmentSlot.consumable, type))
  }
  return result
})()

async function initMatch(players: Player[]) {
  const seed = Math.floor(Math.random() * 10000)
  const getMapDataUrl = `${API}/map/${seed}/${MAP_SIZE}`
  const mapData = await fetch(getMapDataUrl).then((r) =>
    r.json().then((d) => d),
  )
  try {
    const gameStateValues: GameStateValues = buildGameState(
      mapData,
      players,
      STANDARD_ITEM_SET,
    )
    let gameID = -1
    for (let i = 0; i < MATCHES.length; i++) {
      if (ACTIVE_STATUS[i] === false) {
        MATCHES[i] = gameStateValues
        PLAYER_GROUPS[i] = players
        ACTIVE_STATUS[i] = true
        // INPUT_QUEUES[i] = []
        LAST_UPDATE_TIMESTAMPS[i] = Date.now()
        gameID = i
        break
      }
    }
    if (gameID === -1) {
      gameID = MATCHES.length
      MATCHES.push(gameStateValues)
      PLAYER_GROUPS.push(players) // probably useful to re-connect players to dropped game
      ACTIVE_STATUS.push(true)
      INPUT_QUEUES.push([])
      LAST_UPDATE_TIMESTAMPS.push(Date.now())
    }

    // TODO: broadcast gamestart to all players in match and establish ws room for the player group (if not already handled)
  } catch (e) {
    // TODO: broadcast error to players
  }
}

function addInput(input: ControlSchema) {
  if (!INPUT_QUEUES[input.matchID]) INPUT_QUEUES[input.matchID] = []
  const recievedTimestamp = Date.now()
  if (input.timestamp > recievedTimestamp) input.timestamp = recievedTimestamp
  // if (input.timestamp < LAST_UPDATE_TIMESTAMPS[input.matchID]) input.timestamp = LAST_UPDATE_TIMESTAMPS[input.matchID]
  INPUT_QUEUES[input.matchID].push(input)
}

function getPlayerIndices(input: ControlSchema) {
  const playerStartIndex = MATCHES[input.matchID].mapAlloc + (ALLOC.PLAYER * input.playerID)
  return { x: playerStartIndex, y: playerStartIndex + 2, direction: playerStartIndex + 4, health: playerStartIndex + 5}
}

function processInput(input: ControlSchema) {
  // const player: Player = PLAYER_GROUPS[input.matchID][input.playerID]

  const up = input.key.up.isPressed || input.key.w.isPressed ? -1 : 0
  const down = input.key.down.isPressed || input.key.s.isPressed ? -1 : 0
  const left = input.key.left.isPressed || input.key.a.isPressed ? -1 : 0
  const right = input.key.right.isPressed || input.key.d.isPressed ? -1 : 0

  const horizontal = left + right
  const vertical = up + down

  const playerIndices = getPlayerIndices(input);

  const previousDirection: string = Directions[MATCHES[input.matchID].gameState[playerIndices.direction]]
  let direction = 'down'

  // process movement
  if (vertical === 0 && horizontal === 0) { /**do nothing*/ }
  else {
    switch (previousDirection) {
    case 'up':
      if (vertical === -1) return
      if (vertical === 0) direction = horizontal === 1 ? 'right' : 'left'
      else direction = 'down'
      break
    case 'down':
      if (vertical === 1) return
      if (vertical === 0) direction = horizontal === 1 ? 'right' : 'left'
      else direction = 'up'
      break
    case 'left':
      if (horizontal === -1) return
      if (horizontal === 0) direction = vertical === 1 ? 'down' : 'up'
      else direction = 'right'
      break
    case 'right':
      if (horizontal === 1) return
      if (horizontal === 0) direction = vertical === 1 ? 'down' : 'up'
      else direction = 'left'
      break
    default:
      break
    }
    MATCHES[input.matchID].gameState[playerIndices.direction] = Directions[direction]
  }

  const xPos = deSerializeCoordinateFromBytes(
    MATCHES[input.matchID].gameState[playerIndices.x], 
    MATCHES[input.matchID].gameState[playerIndices.x + 1]
  )
  const yPos = deSerializeCoordinateFromBytes(
    MATCHES[input.matchID].gameState[playerIndices.y], 
    MATCHES[input.matchID].gameState[playerIndices.y + 1]
  )

  const inputVector: Math.Vector2 = new Math.Vector2(horizontal, vertical).normalize()
  const x: number[] = serializeCoordinateToBytes((inputVector.x * 100) + xPos)
  const y: number[] = serializeCoordinateToBytes((inputVector.y * 100) + yPos)
  MATCHES[input.matchID].gameState[playerIndices.x] = x[0]
  MATCHES[input.matchID].gameState[playerIndices.x + 1] = x[1]
  MATCHES[input.matchID].gameState[playerIndices.y] = y[0]
  MATCHES[input.matchID].gameState[playerIndices.y + 1] = y[1]
}

function processInputs(gameIndex: number) {
  INPUT_QUEUES[gameIndex].sort((a, b) => a.timestamp - b.timestamp)
  while (INPUT_QUEUES[gameIndex].length) {
    const input: ControlSchema | undefined = INPUT_QUEUES[gameIndex].shift()
    if (input !== undefined) processInput(input)
  }
}

function update(gameIndex: number) {
  processInputs(gameIndex)
  // broadcastGameState(gameIndex)

  LAST_UPDATE_TIMESTAMPS[gameIndex] = Date.now()
}
