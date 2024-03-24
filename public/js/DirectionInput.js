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
    }

    get direction(){
        return this.heldDirections[0]
    }

    init()
    {
        document.addEventListener('keydown', e => {
            // console.log(this.heldDirections)
            const dir = this.map[e.code]
            if (dir && this.heldDirections.indexOf(dir) === -1)
            {
                this.heldDirections.unshift(dir)
            }
        })

        //allows for responsiveness i.e when player presses two keys at the same time 
        document.addEventListener('keyup', e => {
            // console.log(this.heldDirections)
            const dir = this.map[e.code]
            const index = this.heldDirections.indexOf(dir)
            if (index > -1)
            {
                this.heldDirections.splice(index,1)
            }
        })

        document.addEventListener('click', e => {
            console.log(e)
        })
    }
}