import Phaser from "../node_modules/phaser/dist/phaser"

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: [Preloader, Game]
}

let game = new Phaser.Game(config)
export default game