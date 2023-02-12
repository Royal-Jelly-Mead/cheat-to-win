import { Scene } from '../util/phaserExtensions'
import { Math } from 'phaser'

const frameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig = { frameWidth: 16, frameHeight: 16 }

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
        frameConfig: frameConfig,
      },
    ],
  },
}

const scene = new Scene(sceneConfig)
let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
const playerMovement = { x: 0, y: 0, direction: 'down' }
let cursors: Phaser.Types.Input.Keyboard.CursorKeys

const Directions = [ "up", "right", "down", "left" ]
const WALK_LOOKUP: number[][] = [
  [0, 1, 2, 1],     // 0: up
  [3, 4, 5, 4],     // 1: right
  [6, 7, 8, 7],     // 2: down
  [9, 10, 11, 10],  // 3: left
]

function setPlayerMovement() {
  const up = cursors.up.isDown ? -1 : 0
  const down = cursors.down.isDown ? 1 : 0
  const left = cursors.left.isDown ? -1 : 0
  const right = cursors.right.isDown ? 1 : 0
  const horizontal = left + right
  const vertical = up + down

  playerMovement.x = horizontal
  playerMovement.y = vertical

  if (vertical === 0 && horizontal === 0) return;

  switch(playerMovement.direction) {
    case 'up':
      if (vertical === -1) return;
      if (vertical === 0) playerMovement.direction = horizontal === 1 ? 'right' : 'left'
      else playerMovement.direction = 'down'
      break;
    case 'down':
      if (vertical === 1) return;
      if (vertical === 0) playerMovement.direction = horizontal === 1 ? 'right' : 'left'
      else playerMovement.direction = 'up'
      break;
    case 'left':
      if (horizontal === -1) return;
      if (horizontal === 0) playerMovement.direction = vertical === 1 ? 'down' : 'up'
      else playerMovement.direction = 'right'
      break;
    case 'right':
      if (horizontal === 1) return;
      if (horizontal === 0) playerMovement.direction = vertical === 1 ? 'down' : 'up'
      else playerMovement.direction = 'left'
      break;
    default:
      break;
  }
}

scene.create = () => {
  player = scene.physics.add.sprite(400, 400, 'TEST1.healer_f', 4)
  cursors = scene.input.keyboard.createCursorKeys()

  for ( const num in WALK_LOOKUP ) {
    const key: String = Directions[num];
    player.anims.create({
      key: `walk_${key}`,
      frames: player.anims.generateFrameNumbers('TEST1.healer_f', {
        frames: WALK_LOOKUP[num],
      }),
      frameRate: 3,
      repeat: -1,
    })
    player.anims.create({
      key: `idle_${key}`,
      frames: player.anims.generateFrameNumbers('TEST1.healer_f', {
        frames: [WALK_LOOKUP[num][1]],
      }),
      frameRate: 3,
      repeat: -1,
    })
  }
  player.anims.play('idle_down', true)
}

scene.update = () => {
  const previousDirection = `${playerMovement.direction}`
  setPlayerMovement()
  const animType = playerMovement.x !== 0 || playerMovement.y !== 0 ? 'walk' : 'idle'
  const animation = `${animType}_${playerMovement.direction}`
  if (animation !== player.anims.currentAnim.key) {
    player.anims.play(animation, true)
  }

  const inputVector: Math.Vector2 = new Math.Vector2(playerMovement).normalize()
  player.setVelocity(inputVector.x * 100, inputVector.y * 100)
}

export default scene
