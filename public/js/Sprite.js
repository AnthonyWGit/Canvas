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
            "idle-down": [[1, 0]],
            "idle-right": [[1, 2]],
            "idle-left": [[1, 1]],
            "idle-up": [[1, 3]],
            "walk-down" : [[0,0],[1,0],[2,0],[1,0]],
            "walk-right" : [[0,2],[1,2],[2,2],[1,2]],
            "walk-left" : [[0,1],[1,1],[2,1],[1,1]],
            "walk-up" : [[0,3],[1,3],[2,3],[1,3]],
        }
        this.currentAnimation = config.currentAnimation || "walk-left"
        this.currentAnimationFrame = 0

        this.animationFrameLimit = config.animationFrameLimit || 16 //Increase = animation is slower ; decrase animation is faster
        this.animationFrameProgress = this.animationFrameLimit
        //references the gameObject
        this.gameObject = config.gameObject
    }

    get frame() //getting to see what animation where are in now
    {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key)
    {
        if(this.currentAnimation !== key)
        {
            this.currentAnimation = key
            this.currentAnimationFrame = 0
            this.animationFrameProgress = this.animationFrameLimit
        }
    }

    updateAnimationProgress()
    {
        //down tick frame progress
        if (this.animationFrameProgress > 0)
        {
            this.animationFrameProgress -= 1
            return
        }

        //reset counter
        this.animationFrameProgress = this.animationFrameLimit
        this.currentAnimationFrame += 1

        if (this.frame === undefined)
        {
            this.currentAnimationFrame = 0
        }
    }

    draw(ctx) {
        const x = this.gameObject.x
        const y = this.gameObject.y

        const [frameX, frameY] = this.frame
        
        this.isLoaded && ctx.drawImage(this.image,
            frameX * 48, frameY * 48,
            48, 48,
            x, y,
            48, 48
        )

        this.updateAnimationProgress()
    }
}