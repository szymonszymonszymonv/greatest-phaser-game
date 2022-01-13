export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

    preload() {
        this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
        this.load.image('tiles', 'assets/dungeon/0x72_16x16DungeonTileset.v4.png')
        this.load.image('tiles1', 'assets/dungeon/0x72_16x16DungeonTileset_walls.v2.png')
        this.load.spritesheet('hero-walk-side', 'assets/character/sprites/003 - Walk side - sheet.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('hero-walk-up', 'assets/character/sprites/003 - Walk back - sheet.png', {frameWidth: 64, frameHeight: 64})
        this.load.spritesheet('hero-walk-down', 'assets/character/sprites/003 - Walk front - sheet.png', {frameWidth: 64, frameHeight: 64})
       
        this.load.atlas('chest', 'assets/chest/chest.png', 'assets/chest.json')
        
        this.load.tilemapTiledJSON('dungeon', 'assets/dungeon-map1.json')
        this.load.tilemapTiledJSON('dungeon1', 'assets/dungeon-map2.json')
        this.load.image('knife', 'assets/knife.png')
        this.load.atlas('crab', 'assets/enemies/crab.png', 'assets/enemies/crab.json')
    }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
