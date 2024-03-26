class Person extends GameObject
{
 constructor(config){
    super(config) //config of game Object 
    this.movingProgressRemaining = 0 //0 so npc don't move on spawn
    this.speed = 2 // speed controller must be multiple of 2 
    this.isPlayerControlled = config.isPlayerControlled || false 

    this.directionUpdate = {
        "up" : ["y", -1],
        "down" : ["y", 1],
        "left" : ["x", -1],
        "right" : ["x", 1],
    }
    this.target = config.target || null //when using clicks
 }
 update(state){
    this.updatePosition()
    this.updateSprite(state)

    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow){
        this.direction = state.arrow
        this.movingProgressRemaining = 48 //So objects end up snapped IN grid
    }
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.target){
        const dx = state.target.x - this.x; // calculate a delta and if between 1 and 47
        const dy = state.target.y - this.y; //it means we are on same cell so no movement 
        if ( (0 < dx && dx < 48) && (0 < dy && dy < 48) ) //same cell
        {
            this.movingProgressRemaining = 0
            state.directionInput.clearTarget()
        }
        else //different cell
        {
            if (dx > 48) this.direction = 'right';
            else if (dx < 0) this.direction = 'left';
            else if (dy > 48) this.direction = 'down';
            else if (dy < 0) this.direction = 'up';            
            this.movingProgressRemaining = 48
        }
    }
 }
 updatePosition() {
    if (this.movingProgressRemaining > 0)
    {
        const [property,change] = this.directionUpdate[this.direction]
        this[property] += change * this.speed
        this.movingProgressRemaining -= this.speed //speed modifier used here 
    }
 }
 updateSprite(state)
 {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow)
    {
        this.sprite.setAnimation("walk-"+this.direction)
        return
    }


    if(this.movingProgressRemaining > 0){
        this.sprite.setAnimation('walk-'+this.direction)
    }
 }
}