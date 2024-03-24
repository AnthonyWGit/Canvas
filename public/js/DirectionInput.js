class DirectionInput{
    constructor(){
        this.heldDirections = []
        this.map = {
            "ArrowUp" : "up",
            "KeyW" : "up",
            "ArrowDown" : "down",
            "KeyS" : "down",
            "ArrowLeft" : "left",
            "KeyA" : "left",
            "ArrowRight" : "right",
            "KeyD" : "right",
        }
        this.target = null //This is used for clicking controls
        this.tempCanvas = document.querySelector('#game')
        this.gameWrapper= document.querySelector('.game-wrapper')
    }
    get direction(){
        return this.heldDirections[0] //getter to return the last input held 
    }
    init()
    {
        document.addEventListener('keydown', e => {
            const dir = this.map[e.code]
            if (dir && this.heldDirections.indexOf(dir) === -1)
            {
                this.heldDirections.unshift(dir)
            }
        })
        document.addEventListener('keyup', e => {
            const dir = this.map[e.code]
            const index = this.heldDirections.indexOf(dir)
            if (index > -1)
            {
                this.heldDirections.splice(index,1)
            }
        })
        this.tempCanvas.addEventListener('click', e => {
            const rect = this.tempCanvas.getBoundingClientRect();
            const scaleX = rect.width / this.tempCanvas.offsetWidth
            const scaleY = rect.height / this.tempCanvas.offsetHeight
            // Calculate the click position in the canvas, adjusted for scale and translation
            const x = (e.clientX - rect.left) / scaleY;
            const y = (e.clientY - rect.top) / scaleX;
            console.log(x,y)
            this.target = { x: x, y: y };
        });
        
    }

    clearTarget()
    {
        this.target = null
    }
}