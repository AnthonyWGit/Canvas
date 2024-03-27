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
    this.path = null
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
        else if (this.isPlayerControlled && state.target)
        {
            this.path = state.map.findPath({x: this.x, y: this.y}, state.target);
            console.log(this.path)
            let startX = Math.floor(this.x / 48);
            let startY = Math.floor(this.y / 48);
            let goalX = Math.floor(state.target.x / 48);
            let goalY = Math.floor(state.target.y / 48);
            this.path = state.map.findPath({x: startX, y: startY}, {x: goalX, y: goalY});
            if (this.path === null || this.path.length === 0) {
                state.directionInput.clearTarget()
                console.log(this.path);
            }
            if (this.path !== null && this.path.length > 0) {
                let nextStep = this.path.shift();
                this.direction = this.getDirectionTo(nextStep);
                console.log(this.path)
                this.startBehaviour(state, {
                    type: "walk",
                    direction: this.direction
                });
            // }
        }
        }
    }
    this.updateSprite(state)  
    }
 

getDirectionTo(nextStep) {
    if (nextStep.x > this.x) return 'right';
    if (nextStep.x < this.x) return 'left';
    if (nextStep.y > this.y) return 'down';
    if (nextStep.y < this.y) return 'up';
}

 startBehaviour(state, behaviour)
 {//set char direction to w/e behaviour it has 
     this.direction = behaviour.direction
     if (behaviour.type == "walk"){
         if (state.map.isSpaceTaken(this.x, this.y, this.direction) && !state.target){
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