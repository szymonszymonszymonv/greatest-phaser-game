
// export default 

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'hero-walk-side-anim',
        frames: anims.generateFrameNumbers('hero-walk-side', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
        frameRate: 16,
        repeat: -1
      })
  
      anims.create({
        key: 'hero-walk-up-anim',
        frames: anims.generateFrameNumbers('hero-walk-up', { frames: [0, 1, 2, 3, 4, 5] }),
        frameRate: 12,
        repeat: -1
      })
  
      anims.create({
        key: 'hero-walk-down-anim',
        frames: anims.generateFrameNumbers('hero-walk-down', { frames: [0, 1, 2, 3, 4, 5] }),
        frameRate: 12,
        repeat: -1
      })
  
      anims.create({
          key: 'hero-idle-down-anim',
          frames: [{ key: 'hero-walk-down', frame: 'hero-walk-down0'}]
      })
}

export default createCharacterAnims