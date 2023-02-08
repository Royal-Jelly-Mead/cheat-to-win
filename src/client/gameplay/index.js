
import Phaser from "phaser"
import config from "./util/config.js"


config.scene.preload = () =>
{
}

config.scene.create = () =>
{
}

config.scene.update = () =>
{    
}

const game = new Phaser.Game(config)
// const body = document.querySelector('body')

// const LOAD_ORDER = [
//     "./gameplay/util/phaser.js",
//     "./gameplay/util/config.js",
//     "./gameplay/renderTest.js",
// ]

// let game;

// async function loadElements() {
//     const script = LOAD_ORDER.shift()
//     if (script === undefined) {
//         game = new Phaser.Game(config)
//         body.removeChild(document.querySelector('#index'))
//         return;
//     }
//     const element = document.createElement('script')
//     element.src = script;
//     body.appendChild(element);
//     return new Promise(async (resolve) => {
//         element.onload = () => {
//             body.removeChild(element)
//             resolve(loadElements())
//         }
//     })
// }

// loadElements()
