class Person extends GameObject
{
 constructor(config){
    super(config) //config of game Object 
    this.movingProgressRemaining = 0 //0 so npc don't move on spawn
    this.speed = 4 // speed controller must be multiple of 2 
    this.isPlayerControlled = config.isPlayerControlled || false 
    this.directionUpdate = {
        "up" : ["y", -1],
        "down" : ["y", 1],
        "left" : ["x", -1],
        "right" : ["x", 1],
    }
    this.target = config.target || null //when using clicks
    this.idleAnimation = config.idleAnimation || "idle-down"; // Add this line
 }
 update(state){
    if (this.movingProgressRemaining > 0) {
        this.updatePosition()      
    }
    else{

        //More cases to walk here 

        //we're keyboard ready and have pressed an arrow
        if (this.isPlayerControlled  && state.arrow){
            this.startBehaviour(state, {
                type : "walk",
                direction : state.arrow,
            })
        }
        this.updateSprite(state)  
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
            if (dx > 48) this.direction = 'right'
            else if (dx < 0) this.direction = 'left'
            else if (dy > 48) this.direction = 'down'
            else if (dy < 0) this.direction = 'up'          
            this.movingProgressRemaining = 48
        }
    }
 }
 startBehaviour(state, behaviour)
 {//set char direction to w/e behaviour it has 
     this.direction = behaviour.direction
     if (behaviour.type == "walk"){
         if (state.map.isSpaceTaken(this.x, this.y, this.direction)){
             return //don't go further if space is taken 
         }
         this.movingProgressRemaining = 48 //So objects end up snapped IN grid            
     }
 }
 
 updatePosition() {
    const [property,change] = this.directionUpdate[this.direction]
    this[property] += change * this.speed
    this.movingProgressRemaining -= this.speed //speed modifier used here 
 }
 updateSprite()
 {
    if(this.movingProgressRemaining > 0){
        this.sprite.setAnimation('walk-'+ this.direction)
        return
    }
    if (this. movingProgressRemaining === 0 && this.isPlayerControlled) this.sprite.setAnimation('idle-'+ this.direction) // remove if in case you wan't npcs to stand when idle
    if (this.movingProgressRemaining === 0 && !this.isPlayerControlled) this.sprite.setAnimation(this.idleAnimation) // Add this line
    // remove if in case you wan't npcs to stand when idle  
 }
}