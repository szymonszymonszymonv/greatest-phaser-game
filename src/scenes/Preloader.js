import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor(){
        super('preloader')
    }

    preload(){
        this.load.image('tiles', '/assets/dungeon/0x72_16x16DungeonTileset.v4.png')
        this.load.tilemapTiledJSON('dungeon', '/assets/dungeon-map.json')
    }

    create(){
        this.scene.start('game')
    }
}