class Person extends GameObject
{
 constructor(config){
    super(config) //config of game Object 
    this.movingProgressRemaining = 0 //0 so npc don't move on spawn
    this.speed = 2  // speed controller must be multiple of 2 
    this.isPlayerControlled = config.isPlayerControlled || false 
    this.directionUpdate = {
        "up" : ["y", -1],
        "down" : ["y", 1],
        "left" : ["x", -1],
        "right" : ["x", 1],
        "static" : ["x", "y"]
    }
    this.target = config.target || null //when using clicks
    this.idleAnimation = config.idleAnimation || "idle-down"; // Add this line
    this.path = null
    this.previousDirection = null
    this.recalculatedGoal = null
 }
 
 update(state) {
    if (this.movingProgressRemaining > 0) {
        this.updatePosition();
    } else {
        if (this.isPlayerControlled && state.arrow) {
          //null everything related to mouse movement
          this.direction = null
          state.target = null
          this.target = null
          this.path = null
          state.directionInput.target = null //most import line, remove it and see what happens 
            this.startBehaviour(state, {
                type: "walk",
                direction: state.arrow,
            });
        } else if (this.isPlayerControlled && state.target !== null && !state.arrow) {
            let start = { x: Math.floor(this.x / 48), y: Math.floor(this.y / 48) };
            let goal
            //when not clicked on a wall
            if(this.recalculatedGoal === null) {
              goal = { x: Math.floor(state.target.x / 48), y: Math.floor(state.target.y / 48) }; 
            }
            //when clicking on a wall so there is a recalculation to the nearest free cell
            else {
             goal = this.recalculatedGoal
             console.log(goal, 'RECALCULATED GOAL')
            } 
            let calculatedDirection = this.targetDirection(state, goal)
            console.log("CALCULATED DIRECTION", calculatedDirection)
            console.log(this.x, this.y)
            if (calculatedDirection /*&& !state.map.isWall(state.target)*/)
            {
              console.log('CALCULATED DIRETION TRUE')
                this.path = this.aStar(start,goal,state)
                if (this.path.length > 1)
                {
                  console.log(this.path)
                  this.startBehaviour(state, {
                      type: "walk",
                      direction : this.followThePath(this.path),
                  });                  
                }
            }
            else
            {
                state.target = null
                this.target = null
                this.path = null
                state.directionInput.target = null
                this.recalculatedGoal = null
            }
        }
        this.updateSprite(state);
    }
}
targetDirection(state, goal)
{
  //detects if player clicks on self or somewhere else on map 
    let absCurrent = {
        x : Math.floor(this.x / 48),
        y : Math.floor(this.y / 48)
    }
    console.log(absCurrent, goal, absCurrent.x, goal.x, absCurrent.y, goal.y)
    if (absCurrent.x !== goal.x || absCurrent.y !== goal.y) return true
    if (absCurrent === goal) return null
    return null 
}

followThePath(path){
    let absCurrent = {x: path[0].x, y: path[0].y}; // currentObject is the object you are currently at
    let absGoal = {x: path[1].x, y: path[1].y}; // Accessing x and y of the second object in the array

    let diffX = absGoal.x - absCurrent.x;
    let diffY = absGoal.y - absCurrent.y;

    if (diffX < 0 ) return  this.previousDirection = "left";
    if (diffX > 0 ) return  this.previousDirection = "right";
    if (diffY < 0 ) return  this.previousDirection = "up";
    if (diffY > 0 ) return  this.previousDirection = "down";
    return null;
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
//Manhattan distance
 heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
  
    return d1 + d2;
  }

  aStar(current, goal, state){
console.log(goal, "goal astar beginning")
    // If the goal is a wall, find the nearest free cell
    if (state.map.isWallGrid(goal)) {
      goal = this.findNearestFreeCell(goal, state);
      this.recalculatedGoal = goal
  }
    console.log(goal, 'GOAL after iswall condition ')
    let openSet = [current]; //array containing unevaluated grid points
    let closedSet = []; //array containing completely evaluated grid points
    let path = [];
  
    current.g = 0;
    current.h = this.heuristic(current, goal);
    current.f = current.g + current.h;
  
    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];
  
      if (current.x === goal.x && current.y === goal.y) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("a path was found");
        console.log(path)
        return path.reverse();
      }
  
      openSet.splice(lowestIndex, 1);
      closedSet.push(current);
  
      let neighbors = state.map.wallsAround(current.x, current.y);
  
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1; // assuming cost is 1 - cost not 1 means terrain effects
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }
          neighbor.g = possibleG;
          neighbor.h = this.heuristic(neighbor, goal);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
    return [];
  }

  findNearestFreeCell(goal, state) {
    // Define the possible directions to check
    const directions = [
        {x: 1, y: 0},  // right
        {x: -1, y: 0}, // left
        {x: 0, y: 1},  // down
        {x: 0, y: -1}  // up
    ];

    // Initialize the queue with the goal cell
    let queue = [goal];

    // While there are cells in the queue
    while (queue.length > 0) {
        // Get the first cell from the queue
        let cell = queue.shift();

        // Check each direction
        for (let direction of directions) {
            let x = cell.x + direction.x;
            let y = cell.y + direction.y;

            // If the cell in this direction is not a wall, return it
            if (!state.map.isWallGrid({x, y})) {
                return {x, y};
            }

            // If the cell is a wall, add it to the queue to explore its neighbors later
            else {
                queue.push({x, y});
            }
        }
    }
    // If all cells are walls, return null
    return null;
}

}