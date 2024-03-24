class Person extends GameObject
{
 constructor(config){
    super(config) //config of GameObject
    this.movingProgressRemaining = 48 //using that so people can't be in between grid 

    this.directionUpdate = {
        "up" : ["y", -1],
        "down" : ["y", 1],
        "left" : ["x", -1],
        "right" : ["x", 1],
    }
 }

 update(state){
    this.updatePosition()
    if (this.movingProgressRemaining === 0 && state.arrow){
        this.direction = state.arrow
        this.movingProgressRemaining = 48
    }
 }

 updatePosition() {
    if (this.movingProgressRemaining > 0)
    {
        const [property,change] = this.directionUpdate[this.direction]  // can work because it exists in GameObjects
        this[property] += change
        this.movingProgressRemaining -= 1
    }
 }
}