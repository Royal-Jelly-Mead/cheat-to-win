import { Types } from 'phaser'
import { Player } from '../components/player'
import { Math } from 'phaser'


type RemoteKey = {
  isDown: boolean
}
export type RemotePlayerController = {
  up, down, left, right: RemoteKey
}

export function setPlayerMovement(
  cursors: Types.Input.Keyboard.CursorKeys | RemotePlayerController,
  player: Player,
) {
  const up = cursors.up.isDown ? -1 : 0
  const down = cursors.down.isDown ? 1 : 0
  const left = cursors.left.isDown ? -1 : 0
  const right = cursors.right.isDown ? 1 : 0
  const horizontal = left + right
  const vertical = up + down

  player.movement.x = horizontal
  player.movement.y = vertical

  if (vertical === 0 && horizontal === 0) return

  switch (player.movement.direction) {
  case 'up':
    if (vertical === -1) return
    if (vertical === 0)
      player.movement.direction = horizontal === 1 ? 'right' : 'left'
    else player.movement.direction = 'down'
    break
  case 'down':
    if (vertical === 1) return
    if (vertical === 0)
      player.movement.direction = horizontal === 1 ? 'right' : 'left'
    else player.movement.direction = 'up'
    break
  case 'left':
    if (horizontal === -1) return
    if (horizontal === 0)
      player.movement.direction = vertical === 1 ? 'down' : 'up'
    else player.movement.direction = 'right'
    break
  case 'right':
    if (horizontal === 1) return
    if (horizontal === 0)
      player.movement.direction = vertical === 1 ? 'down' : 'up'
    else player.movement.direction = 'left'
    break
  default:
    break
  }
}

export function setPlayerAnimation(player) {
  const animType =
    player.movement.x !== 0 || player.movement.y !== 0 ? 'walk' : 'idle'
  const animation = `${animType}_${player.movement.direction}`
  if (animation !== player.sprite.anims.currentAnim.key) {
    player.sprite.anims.play(animation, true)
  }
}

export function movePlayer(player) {
  const inputVector: Math.Vector2 = new Math.Vector2(player.movement).normalize()
  player.sprite.setVelocity(inputVector.x * 100, inputVector.y * 100)
}