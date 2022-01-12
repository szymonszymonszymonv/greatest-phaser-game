import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // new PhaserLogo(this, this.cameras.main.width / 2, 0)
    // this.fpsText = new FpsText(this)

    // // display the Phaser.VERSION
    // this.add
    //   .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //     color: '#000000',
    //     fontSize: '24px'
    //   })
    //   .setOrigin(1, 0)
      
        const map = this.make.tilemap({ key: 'dungeon'})
        const tileset = map.addTilesetImage('dungeon-map', 'tiles')
        this.add.tilemap('dungeon')
        map.createLayer('Ground', tileset, -100, -200)
        const walls = map.createLayer('Walls', tileset, -100, -200)
  }

}
