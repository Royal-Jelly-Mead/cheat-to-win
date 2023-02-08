import Phaser from "phaser"
import config from "./util/config.js"
import css from "../style.css"

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
const canvas = document.querySelector("#gameport canvas")
