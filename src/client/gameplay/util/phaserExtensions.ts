import { Scene as PhaserScene } from 'phaser'

export class Scene extends PhaserScene {
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    }
    create: any
    update: any
}

