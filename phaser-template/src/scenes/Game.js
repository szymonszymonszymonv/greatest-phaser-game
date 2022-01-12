import Phaser from "phaser"

export default class Game extends Phaser.Game {
    constructor() {
        super('game')
    }

    preload(){

    }

    create(){
        const map = this.make.tilemap({ key: 'dungeon'})
        const tileset = map.addTilesetImage('dungeon-map', 'tiles')
        map.createStaticLayer('Ground', tileset)
        const walls = map.createStaticLayer('Walls', tileset)
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        walls.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(200, 100, 100, 255),
            faceColor: new Phaser.Display.Color(200, 100, 100, 255)
        })
    }
}

