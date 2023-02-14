import { Scene, Types } from 'phaser'

const WALK_LOOKUP: number[][] = [
  [0, 1, 2, 1], // 0: up
  [3, 4, 5, 4], // 1: right
  [6, 7, 8, 7], // 2: down
  [9, 10, 11, 10], // 3: left
]
const Directions = ['up', 'right', 'down', 'left']


export class Player {
  sprite: Types.Physics.Arcade.SpriteWithDynamicBody
  id: number
  //   inventory: Item[]
  // equippedItem: Item
  // footgear: Footgear
  // bodygear: Bodygear
  // effects: Effect[]
  constructor(xPos: number, yPos: number, id: number, scene: Scene, imageAssetKey: string, frame = 4) {
    this.sprite = scene.physics.add.sprite(xPos, yPos, imageAssetKey, frame)
    this.id = id
    for (const num in WALK_LOOKUP) {
      const key: string = Directions[num]
      this.sprite.anims.create({
        key: `walk_${key}`,
        frames: this.sprite.anims.generateFrameNumbers('TEST1.healer_f', {
          frames: WALK_LOOKUP[num],
        }),
        frameRate: 3,
        repeat: -1,
      })
      this.sprite.anims.create({
        key: `idle_${key}`,
        frames: this.sprite.anims.generateFrameNumbers('TEST1.healer_f', {
          frames: [WALK_LOOKUP[num][1]],
        }),
        frameRate: 3,
        repeat: -1,
      })
    }
    this.sprite.setCollideWorldBounds(true)
    this.sprite.anims.play('idle_down', true)
  }
}
