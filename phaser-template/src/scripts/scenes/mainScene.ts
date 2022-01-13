import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import createCharacterAnims from '../anims/HeroAnimation'
import '../characters/Hero'
import Hero from '../characters/Hero'
import Crab from '../enemies/crab'
import { createCrabAnims } from '../anims/enemyAnims'

export default class MainScene extends Phaser.Scene {
  fpsText

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private hero!: Hero
  private map!: Phaser.Tilemaps.Tilemap

  private chest!: Phaser.Tilemaps.TilemapLayer


  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    createCrabAnims(this.anims)
    this.map = this.make.tilemap({ key: 'dungeon' })
    const map1 = this.make.tilemap({ key: 'dungeon1' })


    let tileset = this.map.addTilesetImage('dungeon-map1', 'tiles')
    let tileset1 = map1.addTilesetImage('dungeon-map2', 'tiles1')




    console.log("elo")
    console.log(this.map)


    this.map.createLayer('Ground', tileset, -100, -400);

    this.chest = this.map.createLayer('Chest', tileset, -100, -400);
    
    const walls = this.map.createLayer('Walls', tileset1, -100, -400)

    walls.setCollisionByProperty({ collides: true })
    this.chest.setCollisionByProperty({ collides: true })


    const knives = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image
    })

    this.hero = this.add.hero(800, 500, 'hero', 'hero-walk-down')
    this.hero.setKnives(knives)
    this.cameras.main.startFollow(this.hero)
    createCharacterAnims(this.anims)

    const crabs = this.physics.add.group({
      classType: Crab,
      createCallback: (go) => {
        const crabGo = go as Crab
        crabGo.body.onCollide = true
      }

    })

    this.physics.add.collider(crabs, walls)
    this.physics.add.collider(crabs, this.chest)
    this.physics.add.collider(this.hero, walls)
    this.physics.add.collider(crabs, crabs)
    this.physics.add.collider(this.hero, this.chest, this.handleHeroChestCollision)
    this.physics.add.collider(knives, walls, this.handleKnifeWallCollision)
    this.physics.add.collider(knives, crabs, this.handleKnifeCrabCollision)
    this.physics.add.collider(crabs, this.hero, this.handleHeroCrabCollision)

    crabs.get(850, 500, 'crab')
    crabs.get(600, 500, 'crab')
    crabs.get(850, 300, 'crab')

    
    

  }

  private handleHeroChestCollision(obj: Phaser.GameObjects.GameObject, other: Phaser.GameObjects.GameObject) {
    const hero = obj as Hero
    console.log(obj)
    console.log(other)

    
    // const map = this.make.tilemap({ key: 'dungeon' })
    // let tileset = map.addTilesetImage('dungeon-map1', 'tiles')
    // // const chests = map.createLayer('Chest', tileset, -100, -400);
    // const chests = map.destroyLayer('Chest');
    
    console.log(this.map)
    console.log(this.chest)
    // other.destroy()
    // this.map.destroyLayer(this.chest)

    
    
  }

  private handleHeroCrabCollision(obj: Phaser.GameObjects.GameObject, other: Phaser.GameObjects.GameObject) {
    // createCrabAnims(this.anims.play('crab-moving'))|

    // const dx = this.hero.x - 
    const hero = obj as Hero
    const enemy = other as Crab

    console.log(obj)
    console.log(other)
    const dx = hero.x - enemy.x
    const dy = hero.y - enemy.y

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

    hero.handleDamage(dir)

    enemy.attackPlayer()
    // hero.setTint(0xff0000)


  }

  private handleKnifeWallCollision(obj: Phaser.GameObjects.GameObject, other: Phaser.GameObjects.GameObject) {
    obj.destroy()
  }

  private handleKnifeCrabCollision(obj: Phaser.GameObjects.GameObject, other: Phaser.GameObjects.GameObject) {
    other.destroy()
    obj.destroy()
  }

  update(time, delta) {
    if (this.hero) {
      this.hero.update(this.cursors)
    }

  }
}
