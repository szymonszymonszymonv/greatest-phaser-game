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

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
      this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    createCrabAnims(this.anims)
    const map = this.make.tilemap({ key: 'dungeon' })
    const map1 = this.make.tilemap({ key: 'dungeon1' })
    
    let tileset = map.addTilesetImage('dungeon-map1', 'tiles')
    let tileset1 = map1.addTilesetImage('dungeon-map2', 'tiles1')

    
    map.createLayer('Ground', tileset, -100, -400);
    
    const walls = map.createLayer('Walls', tileset1, -100, -400)

    walls.setCollisionByProperty({ collides: true })


      const knives = this.physics.add.group({
          classType: Phaser.Physics.Arcade.Image
      })

      this.hero = this.add.hero(850, 500, 'hero', 'hero-walk-down')
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
      this.physics.add.collider(this.hero, walls)
      this.physics.add.collider(knives, walls, this.handleKnifeWallCollision)
      this.physics.add.collider(knives, crabs, this.handleKnifeCrabCollision)

      crabs.get(850, 500, 'crab')
      crabs.get(600, 500, 'crab')
      crabs.get(850, 300, 'crab')
    
  }

  private handleKnifeWallCollision(obj: Phaser.GameObjects.GameObject, other: Phaser.GameObjects.GameObject) {
    obj.destroy()
  }

  private handleKnifeCrabCollision(obj: Phaser.GameObjects.GameObject, other: Phaser.GameObjects.GameObject) {
    other.destroy()
    obj.destroy()
  }

  update(time, delta) {
      if(this.hero) {
          this.hero.update(this.cursors)
      }

  }
}
