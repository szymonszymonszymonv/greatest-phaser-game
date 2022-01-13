import Phaser from "phaser";


enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}



export default class Crab extends Phaser.Physics.Arcade.Sprite {

    private direction = Direction.UP

    private moveEvent: Phaser.Time.TimerEvent

    private attackEvent: Phaser.Time.TimerEvent

    private hit = 0


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this.anims.play('crab-moving')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)

        this.moveEvent = scene.time.addEvent(
        {
            delay: 2000,
            callback: () => {
                const newDirection = Phaser.Math.Between(0, 3)
                this.direction = newDirection
                
                
            },
            loop: true
        })

        this.attackEvent = scene.time.addEvent(
            {
                delay: 500,
                callback: () => {
                    if(this.hit === 1){
                        if(this.anims){
                            this.anims.play('crab-attack')
                        }
                        this.hit = 0
                    }
                    else{
                        if(this.anims){
                            this.anims.play('crab-moving')
                        }
                    }
                    
                },
                loop: true
            })
        

    }

    destroy(fromScene?: boolean){
        this.moveEvent.destroy()
        this.attackEvent.destroy()

        super.destroy(fromScene)
    }

    private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {
        if (go !== this) {
            return
        }
        const newDirection = Phaser.Math.Between(0, 3)
        this.direction = newDirection

        

    }

    attackPlayer(){
        
        this.hit = 1
    }

    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        const speed = 50
        
        

        switch (this.direction) {

            case Direction.UP:
                this.setVelocity(0, -speed)
                break

            case Direction.DOWN:
                this.setVelocity(0, speed)
                break

            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                break

            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                break


        }
    }
}