import pkg from '../../package.json';
import testing from '../scenes/testing.js';

const GAME_CONFIG = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
        }
    },
    parent: "gameport",
    width: '100%',
    height: '100%',
    scene: testing, // Replace with start screen eventually
    canvasStyle: '',
    title: 'Cheat to Win',
    version: pkg.version,
    autoFocus: true,
    disableContextMenu: true,
    banner: {
        hidePhaser: false,
        text: '#000000',
        background: ['#f26a8d', '#f49cbb', '#cbeef3']
    },
    fps: {
        min: 24,
        target: 60,
        forceSetTimeOut: false,
        deltaHistory: 10,
        panicMax: 120,
        smoothStep: true,
    },
    render: {
        pixelArt: true,
    }
};

export default GAME_CONFIG;
