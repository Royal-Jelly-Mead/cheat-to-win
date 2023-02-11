import { Scene, Math } from 'phaser'
const { Vector2 } = Math

const sceneConfig = {
  key: 'Testing',
  pack: {
    prefix: 'TEST1.',
    path: 'assets/testing',
    defaultType: 'image',
    files: [
      { key: 'candy_pallette', extension: 'png' },
      {
        key: 'healer_f',
        extension: 'png',
        type: 'spritesheet',
        frameConfig: { frameWidth: 16, frameHeight: 16 },
      },
    ],
  },
}

const scene = new Scene(sceneConfig)
let player
const playerMovement = { x: 0, y: 0, direction: 'down' }
let cursors

const WALK_LOOKUP = {
  up: [0, 1, 2, 1],
  right: [3, 4, 5, 4],
  down: [6, 7, 8, 7],
  left: [9, 10, 11, 10],
}

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
  // if (vertical !== 0 && playerMovement.y !== vertical) playerMovement.y = vertical
  // if (horizontal !== 0 && playerMovement.x !== horizontal) playerMovement.x = horizontal
  // if (vertical === 0 && horizontal === 0) return

  // const x = playerMovement.x
  // const y = playerMovement.y
  // let direction = playerMovement.direction

  // if (
  //   vertical !== 0 &&
  //   horizontal !== 0 &&
  //   ((direction === 'up' && y === 1) ||
  //     (direction === 'down' && y === -1) ||
  //     (direction === 'left' && x === -1) ||
  //     (direction === 'right' && y === 1))
  // ) return

  // if (vertical !== 0) direction = vertical === -1 ? 'up' : 'down'
  // else direction = horizontal === 1 ? 'right' : 'left'
  
  // playerMovement.normal = new Vector2(horizontal, vertical).normalize()
  // playerMovement.velocity = horizontal !== 0 && vertical !== 0 ? 1 : 0
}

scene.create = () => {
  player = scene.physics.add.sprite(400, 400, 'TEST1.healer_f', 4)
  cursors = scene.input.keyboard.createCursorKeys()

  Object.keys(WALK_LOOKUP).forEach((key) => {
    player.anims.create({
      key: `walk_${key}`,
      frames: player.anims.generateFrameNumbers('TEST1.healer_f', {
        frames: WALK_LOOKUP[key],
      }),
      frameRate: 3,
      repeat: -1,
    })
    player.anims.create({
      key: `idle_${key}`,
      frames: player.anims.generateFrameNumbers('TEST1.healer_f', {
        frames: [WALK_LOOKUP[key][1]],
      }),
      frameRate: 3,
      repeat: -1,
    })
  })
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
  player.setVelocityX(playerMovement.x * 100)
  player.setVelocityY(playerMovement.y * 100)
}

export default scene
