import { Scene } from "phaser"

const sceneConfig = {
    key: "Testing",
    pack: {
        prefix: "TEST1.",
        path: "assets/testing",
        defaultType: "image",
        "files": [
            { key: "candy_pallette", extension: "png" }
        ]
    }
}

const scene = new Scene(sceneConfig)

scene.create = () => {
    scene.add.image(400, 400, "TEST1.candy_pallette")
}

export default scene
