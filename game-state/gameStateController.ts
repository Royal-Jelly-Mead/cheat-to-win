import { GameStateValues, buildGameState } from './buildGameState'
import { MAP_CONFIG } from '../game-client/gameplay/util/config'
import fetch from 'node-fetch'
import { Player } from '../game-client/gameplay/components/player'
import { Item, EquipmentSlot, Weapon, Bodygear, Handgear, Footwear, Consumable } from '../game-client/gameplay/components/item'

const MATCHES: GameStateValues[] = []
const PLAYER_GROUPS: Player[][] = []
const ACTIVE_STATUS: boolean[] = []
const MAP_SIZE = MAP_CONFIG.defaultMapSize
const API = 'https://localhost:3000'

const STANDARD_ITEM_SET: Item[] = (() => {
  const result: Item[] = []
  for ( const weapon in Weapon ) {
    const type: Weapon = typeof weapon === 'string' ? Weapon[weapon] : Weapon[Weapon[weapon]]
    result.push(new Item(EquipmentSlot.weapon, type))
  }
  for ( const bodygear in Bodygear ) {
    const type: Bodygear = typeof bodygear === 'string' ? Bodygear[bodygear] : Bodygear[Bodygear[bodygear]]
    result.push(new Item(EquipmentSlot.bodygear, type))
  }
  for ( const handgear in Handgear ) {
    const type: Handgear = typeof handgear === 'string' ? Handgear[handgear] : Handgear[Handgear[handgear]]
    result.push(new Item(EquipmentSlot.handgear, type))
  }
  for ( const footwear in Footwear ) {
    const type: Footwear = typeof footwear === 'string' ? Footwear[footwear] : Footwear[Footwear[footwear]]
    result.push(new Item(EquipmentSlot.footwear, type))
  }
  for ( const consumable in Consumable ) {
    const type: Consumable = typeof consumable === 'string' ? Consumable[consumable] : Consumable[Consumable[consumable]]
    result.push(new Item(EquipmentSlot.consumable, type))
  }
  return result
})()

async function initMatch(players: Player[]) {
  const seed = Math.floor(Math.random() * 10000)
  const getMapDataUrl = `${API}/map/${seed}/${MAP_SIZE}`
  const mapData = await fetch(getMapDataUrl).then(r => r.json().then(d => d))
  try {
    const gameStateValues: GameStateValues = buildGameState(mapData, players, STANDARD_ITEM_SET)
    let gameID = -1
    for (let i = 0; i < MATCHES.length; i++) {
      if (ACTIVE_STATUS[i] === false) {
        MATCHES[i] = gameStateValues
        PLAYER_GROUPS[i] = players
        ACTIVE_STATUS[i] = true
        gameID = i
        break
      }
    }
    if (gameID === -1) {
      gameID = MATCHES.length
      MATCHES.push(gameStateValues)
      PLAYER_GROUPS.push(players) // probably useful to re-connect players to dropped game
    }
    // TODO: broadcast gamestart to players
  } catch (e) {
    // TODO: broadcast error to players
  }
}
