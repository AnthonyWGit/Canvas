class Sprite {
    constructor(config) {
        //set up the image 
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }

        //config animations & initial state
        this.animations = config.animations || {
            idleDown: [
                [0, 0]
            ],
        }
        this.currentAnimation = config.currentAnimation || "idleDown"
        this.currentAnimationFrame = 0

        //references the gameObject
        this.gameObject = config.gameObject
    }

    draw(ctx) {
        const x = this.gameObject.x
        const y = this.gameObject.y

        this.isLoaded && ctx.drawImage(this.image,
            0, 0,
            48, 48,
            x, y,
            48, 48
        )
    }
}