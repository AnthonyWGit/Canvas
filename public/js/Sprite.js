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
            "idle-down": [
                [0, 0]
            ],
        }
        this.currentAnimation = config.currentAnimation || "idle-down"
        this.currentAnimationFrame = 0

        //references the gameObject
        this.gameObject = config.gameObject
    }

    draw(ctx) {
        const x = this.gameObject.x
        const y = this.gameObject.y

        this.isLoaded && ctx.drawImage(this.image,
            48, 0,
            48, 48,
            x, y,
            48, 48
        )
    }
}