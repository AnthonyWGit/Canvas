class Overworld {
    constructor(config)
    {
        this.element = config.element
        this.canvas = this.element.querySelector("#game")
        this.ctx = this.canvas.getContext("2d")
        this.map = null;
    }

    startGameLoop(){
        const step = () => {
            //clear off canvas on each frame
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            //draw terrain
            this.map.drawLowerImage(this.ctx)

            //draw GameObjects 
            Object.values(this.map.gameObjects).forEach(object =>
                {
                    object.sprite.draw(this.ctx)
                })

            //draw stuff on top
            this.map.drawUpperImage(this.ctx)

            requestAnimationFrame(() => { //to keep calling the function when a new fram beggings 
                step()
            })
        }
        step()
    }

    init()
    {
        this.map = new OverworldMap(window.OverworldMaps.WorldMap)
        this.startGameLoop()
        const drawGrid = () => {
            const size = 48;// size of a tile
            const width = this.canvas.width
            const height = this.canvas.height
    
            for (let x = 0; x <= width; x += size) {
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, height);
            }
    
            for (let y = 0; y <= height; y += size) {
                this.ctx.moveTo(0, y)
                this.ctx.lineTo(width, y)
            }
    
            this.ctx.strokeStyle = 'black'
            this.ctx.stroke()
        }
    }
}