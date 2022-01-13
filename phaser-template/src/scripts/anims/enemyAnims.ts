import Phaser from "phaser"


const createCrabAnims = (anims: Phaser.Animations.AnimationManager) => {

    anims.create({
        key: 'crab-idle',
        // frames: [{key: 'crab', frame: 'Idle/Crab1.png'}]
        frames: anims.generateFrameNames('crab', { start: 1, end: 5, prefix: 'Idle/Crab', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
      })
  
      anims.create({
        key: 'crab-moving',
        frames: anims.generateFrameNames('crab', { start: 1, end: 4, prefix: 'Moving/CrabMoving', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
  
      })
  
      anims.create({
        key: 'crab-attack',
        frames: anims.generateFrameNames('crab', { start: 1, end: 4, prefix: 'Attack/Crab_Attack', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
  
      })
  
      anims.create({
        key: 'crab-attack-down',
        frames: anims.generateFrameNames('crab', { start: 1, end: 4, prefix: 'Attack/AttackDown/Crab_AttackDown', suffix: '.png' }),
        repeat: -1,
        frameRate: 8
  
      })
}

export {
    createCrabAnims
}