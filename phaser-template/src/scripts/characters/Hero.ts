
declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            hero(x: number, y: number, texture: string, frame?: string | number): Hero
        }
    }
}

export default class Hero extends Phaser.Physics.Arcade.Sprite {

    private knives?: Phaser.Physics.Arcade.Group
    private direction: string

    private damageTime = 0

    private hit = 0




    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x ,y, texture, frame)
        this.anims.play('hero-idle-down-anim')
        this.setTint(0xffffff)
    }

    setKnives(knives: Phaser.Physics.Arcade.Group){
        this.knives = knives
    }

    private throwKnife(){
        if(!this.knives) {
            return false
        }
        const vector = new Phaser.Math.Vector2(0, 0)

        switch(this.direction){
            case 'up':
                vector.y = -1
                break

            case 'down':
                vector.y = 1
                break

            case 'left':
                vector.x = -1
                break

            case 'right':
                vector.x = 1
                break
            default:
                vector.y = 1
                break
        }

        const angle = vector.angle()
        const knife = this.knives.get(this.x, this.y, 'knife') as Phaser.Physics.Arcade.Image
        knife.body.y += 10
        knife.setRotation(angle)
        knife.setVelocity(vector.x * 500, vector.y * 500)
    }

    handleDamage(dir: Phaser.Math.Vector2){

        this.hit = 1
        this.setVelocity(dir.x, dir.y)
        this.setTint(0xff0000)

        this.damageTime = 0
        // this.setVelocity(dir.x, dir.y)
        
    }

    protected preUpdate(time: number, delta: number) {
        this.damageTime += delta

        if(this.damageTime >= 200){
            this.setTint(0xffffff)
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const speed = 200

        if(!cursors) {
            return false
        }

        if(Phaser.Input.Keyboard.JustDown(cursors.space)){
            this.throwKnife()
            return 
        }
    
        if(cursors.left?.isDown) {
            this.anims.play('hero-walk-side-anim', true)
            this.setVelocity(-speed, 0)
            this.scaleX = -1
            this.body.offset.x = 44
            this.direction = "left"
    
        }
    
        else if(cursors.right?.isDown) {
            this.anims.play('hero-walk-side-anim', true)
            this.setVelocity(speed, 0)
            this.scaleX = 1
            this.body.offset.x = 20
            this.direction = "right"
        }
        
        else if(cursors.down?.isDown) {
            this.anims.play('hero-walk-down-anim', true)
            this.setVelocity(0, speed)
            this.direction = "down"
        }
    
    
        else if(cursors.up?.isDown) {
            this.anims.play('hero-walk-up-anim', true)
            this.direction = "up"
            this.setVelocity(0, -speed)
        }
    
        else {
            this.anims.play('hero-idle-down-anim', true)
            this.setVelocity(0, 0)
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('hero', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number){
    let sprite = new Hero(this.scene, x, y, texture, frame)
    this.displayList.add(sprite)
    this.updateList.add(sprite)
    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    sprite.body.setSize(sprite.width * 0.7, sprite.height)
    sprite.body.offset.y = 30
    sprite.body.offset.x = 21

    return sprite
})