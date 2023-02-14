import { Scene } from '../util/phaserExtensions'
import { Player } from '../components/player'
import { Level } from '../components/level'
import { movePlayer, setPlayerAnimation, setPlayerMovement } from '../systems/playerController'

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

export function loadScene(tilesize: number) {
  const characterFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig = {
    frameWidth: 16,
    frameHeight: 16,
  }

  const tileMapFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig = {
    frameWidth: tilesize,
    frameHeight: tilesize
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
  let level: Level
  let player: Player
  let cursors: Phaser.Types.Input.Keyboard.CursorKeys

  scene.create = () => {
    scene.physics.world.setBounds(0, 0, testMap.length * tilesize, testMap.length * tilesize)
    cursors = scene.input.keyboard.createCursorKeys()
    level = new Level(scene, testMap, 'TEST1.tileset')
    player = new Player(tilesize * 6, tilesize, 0, scene, 'TEST1.healer_f')
    scene.physics.add.collider(player.sprite, level.layer)
  }
  
  scene.update = () => {
    setPlayerMovement(cursors, player)
    setPlayerAnimation(player)
    movePlayer(player)
  }

  return scene;
}
