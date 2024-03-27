class Overworld {
    constructor(config)
    {
        this.element = config.element
        this.canvas = this.element.querySelector("#game")
        this.ctx = this.canvas.getContext("2d")
        this.map = null

        // Create an off-screen canvas for the grid
        this.gridCanvas = document.createElement('canvas')
        this.gridCanvas.width = this.canvas.width
        this.gridCanvas.height = this.canvas.height
        this.gridCtx = this.gridCanvas.getContext('2d')
    }

    startGameLoop(){
        const step = () => {
            //clear off canvas on each frame
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            //draw terrain
            this.map.drawLowerImage(this.ctx)

            //camera
            // this.camera.update(this.map.gameObjects.hero, this.canvas);

            //draw GameObjects with properties to manipulate their position
            Object.values(this.map.gameObjects).forEach(object =>
                {
                    object.update({
                        arrow : this.directionInput.direction,
                        target : this.directionInput.target,
                        directionInput : this.directionInput, //access to clear target method 
                        map : this.map,
                    })
                    object.sprite.draw(this.ctx)
                })

            //draw stuff on top
            this.map.drawUpperImage(this.ctx)
            //draw the grid from the off-screen canvas
            this.ctx.drawImage(this.gridCanvas, 0, 0)

            requestAnimationFrame(() => { //to keep calling the function when a new fram beggings 
                step()
            })
        }
        step()
    }

    init()
    {
        this.map = new OverworldMap(window.OverworldMaps.WorldMap)
        this.camera = new Camera({
            x: this.map.gameObjects.hero.x,
            y: this.map.gameObjects.hero.y,
            once: true
        });

        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.directionInput.direction

        this.map.drawGrid(this.gridCtx, this.gridCanvas)
        this.camera.init(this.map.gameObjects.hero)
        this.startGameLoop()
    }
}