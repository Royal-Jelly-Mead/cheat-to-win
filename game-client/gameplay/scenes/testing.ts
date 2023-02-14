import { Scene } from '../util/phaserExtensions'
import { Math, Tilemaps } from 'phaser'
import { Player } from '../objects/player'

const testMap = [
  [1, 0, 0, 1, 0, 3, 3, 0, 0, 2, 2, 1, 0, 5, 5, 1, 3, 1, 1, 1],
  [0, 0, 0, 0, 1, 3, 3, 0, 0, 1, 2, 1, 1, 1, 0, 3, 0, 1, 1, 1],
  [0, 0, 4, 0, 1, 2, 2, 1, 0, 1, 1, 5, 5, 1, 2, 0, 1, 1, 1, 1],
  [1, 0, 5, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 3],
  [1, 0, 0, 3, 3, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 3],
  [1, 0, 0, 0, 0, 4, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 4, 0, 0, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 2, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 1, 0, 1, 1, 0, 0],
  [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 4, 4, 4, 1, 0, 0, 1, 5, 0, 0],
  [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 2, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 2, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 2, 4, 4, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 4, 4, 4, 3, 1, 0, 2, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 4, 2, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [3, 0, 1, 1, 4, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 4, 1, 1, 1, 0, 0],
]

const characterFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig = {
  frameWidth: 16,
  frameHeight: 16,
}

const tileMapFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig = {
  frameWidth: 32,
  frameHeight: 32
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  key: 'Testing',
  pack: {
    prefix: 'TEST1.',
    path: 'assets/testing',
    defaultType: 'image',
    files: [
      {
        key: 'healer_f',
        extension: 'png',
        type: 'spritesheet',
        frameConfig: characterFrameConfig,
      },
      {
        key:'tileset',
        extension: 'png',
        type: 'image',
        frameConfig: tileMapFrameConfig 
      },
    ],
  },
}

const scene = new Scene(sceneConfig)

let tileMap: Tilemaps.Tilemap

let player: Player
const playerMovement = { x: 0, y: 0, direction: 'down' }
let cursors: Phaser.Types.Input.Keyboard.CursorKeys



function setPlayerMovement() {
  const up = cursors.up.isDown ? -1 : 0
  const down = cursors.down.isDown ? 1 : 0
  const left = cursors.left.isDown ? -1 : 0
  const right = cursors.right.isDown ? 1 : 0
  const horizontal = left + right
  const vertical = up + down

  playerMovement.x = horizontal
  playerMovement.y = vertical

  if (vertical === 0 && horizontal === 0) return

  switch (playerMovement.direction) {
  case 'up':
    if (vertical === -1) return
    if (vertical === 0)
      playerMovement.direction = horizontal === 1 ? 'right' : 'left'
    else playerMovement.direction = 'down'
    break
  case 'down':
    if (vertical === 1) return
    if (vertical === 0)
      playerMovement.direction = horizontal === 1 ? 'right' : 'left'
    else playerMovement.direction = 'up'
    break
  case 'left':
    if (horizontal === -1) return
    if (horizontal === 0)
      playerMovement.direction = vertical === 1 ? 'down' : 'up'
    else playerMovement.direction = 'right'
    break
  case 'right':
    if (horizontal === 1) return
    if (horizontal === 0)
      playerMovement.direction = vertical === 1 ? 'down' : 'up'
    else playerMovement.direction = 'left'
    break
  default:
    break
  }
}

scene.create = () => {
  scene.physics.world.setBounds(0, 0, testMap.length * 32, testMap.length * 32)
  cursors = scene.input.keyboard.createCursorKeys()
  // tilemap
  tileMap = scene.make.tilemap({data: testMap, tileWidth: 32, tileHeight: 32})
  const tiles = tileMap.addTilesetImage('TEST1.tileset');
  const tileMapLayer = tileMap.createLayer(0, tiles, 0, 0)
  tileMapLayer.setCollision(0)
  tileMapLayer.setCollision(2)
  player = new Player(32 * 6, 32, 0, scene, 'TEST1.healer_f')
  // collisions
  tileMap.setCollisionByProperty({collision: true}, true, true, tileMapLayer)
  scene.physics.add.collider(player.sprite, tileMapLayer)
}

scene.update = () => {
  setPlayerMovement()
  const animType =
    playerMovement.x !== 0 || playerMovement.y !== 0 ? 'walk' : 'idle'
  const animation = `${animType}_${playerMovement.direction}`
  if (animation !== player.sprite.anims.currentAnim.key) {
    player.sprite.anims.play(animation, true)
  }

  const inputVector: Math.Vector2 = new Math.Vector2(playerMovement).normalize()
  player.sprite.setVelocity(inputVector.x * 100, inputVector.y * 100)
}

export default scene
