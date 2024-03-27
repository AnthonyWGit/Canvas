class OverworldMap{
    constructor(config)
    {
        this.gameObjects = config.gameObjects
        this.walls = config.walls || {}

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; 
    }
    
    drawLowerImage(ctx)
    {
        ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx)
    {
        ctx.drawImage(this.upperImage, 0 , 0)
    }

    isSpaceTaken(currentX, currentY, direction)
    {
        const {x,y} = utils.nextPosition(currentX, currentY, direction)
        return this.walls[`${x},${y}`] || false //left there is a wall in direction faction else false 
    }

    isSpaceTakenUngrid(currentX, currentY, direction)
    {
        const {x,y} = utils.nextPositionUngrid(currentX, currentY, direction)
        return this.walls[`${x},${y}`] || false //left there is a wall in direction faction else false 
    }

    drawGrid(ctx, canvas) 
    {
        const size = 48;// size of a tile
        const width = canvas.width
        const height = canvas.height

        for (let x = 0; x <= width; x += size) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }

        for (let y = 0; y <= height; y += size) {
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
        }

        ctx.strokeStyle = 'black'
        ctx.stroke()
    }

    findPath(start, goal) {
        let openSet = [start]
        let cameFrom = {}
        let gScore = {}
        let fScore = {}
        gScore[start] = 0
        fScore[start] = this.heuristicCostEstimate(start, goal)
        console.log("openSet", openSet, cameFrom, gScore, fScore,start, goal)
        while (openSet.length > 0) {
            let current = this.lowestFScore(openSet, fScore)
            if (current === goal) {
                return this.reconstructPath(cameFrom, current)
            }
            openSet = openSet.filter(node => node !== current)
            console.log("opesnet222", openSet)
            for (let neighbor of this.getNeighbors(current)) {
                let tentativeGScore = gScore[current] + this.distanceBetween(current, neighbor)
                console.log(neighbor,tentativeGScore, gScore, current, gScore[neighbor], "SCORE")
                if (!(neighbor in gScore) || tentativeGScore < gScore[neighbor]) {
                    cameFrom[neighbor] = current;
                    gScore[neighbor] = tentativeGScore;
                    fScore[neighbor] = gScore[neighbor] + this.heuristicCostEstimate(neighbor, goal)
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return null; // Return null if no path is found
    }

    heuristicCostEstimate(start, goal) {
        // Implement your heuristic here. For example, using Manhattan distance:
        console.log(start,goal, "math :", Math.abs(goal.x - start.x) + Math.abs(goal.y - start.y) )
        return Math.abs(goal.x - start.x) + Math.abs(goal.y - start.y);
    }

    lowestFScore(openSet, fScore) {
        let lowest = openSet[0];
        for (let node of openSet) {
            if (fScore[node] < fScore[lowest]) {
                lowest = node;
            }
        }
        return lowest;
    }

    reconstructPath(cameFrom, current) {
        let totalPath = [current];
        while (current in cameFrom) {
            current = cameFrom[current];
            totalPath.unshift(current);
        }
        console.log("recon", totalPath, cameFrom, current)
        return totalPath;
    }

    getNeighbors(node) {
        // Define the possible directions a node can move to
        const directions = ['left', 'right', 'up', 'down'];

        // Calculate the neighbors of the current node
        let neighbors = [];
        for (let direction of directions) {
            let {x, y} = utils.nextPositionUngrid(node.x, node.y, direction);
            console.log("node", x, y, direction, node)
            if (!this.isSpaceTaken(node.x, node.y, direction)) {
                neighbors.push({x, y});
            }
        }
        console.log(neighbors)
        return neighbors;
    }

    distanceBetween(current, neighbor) {
        // Since your grid is 48x48 and your characters move one cell at a time,
        // the distance between two adjacent cells is always 1.
        return 1;
    }
}

window.OverworldMaps = 
{
    WorldMap : {
        lowerSrc :  "./public/img/Map001.png",
        upperSrc :  "",
        gameObjects : {
            hero : new Person({
                    isPlayerControlled : true,
                    x:utils.withGrid(5),
                    y:utils.withGrid(5)
                    //optional src for here sprite here 
                }),
            npc1 : new Person({
                    x: utils.withGrid(6),
                    y: utils.withGrid(7),
                    idleAnimation : "walk-left"

                }),
        },
            walls : {
                // "48,48" : true
                [utils.asGridCoord(8,6)] : true,
                [utils.asGridCoord(9,6)] : true,
                [utils.asGridCoord(7,6)] : true,
                [utils.asGridCoord(10,6)] : true,
                [utils.asGridCoord(8,7)] : true,
                [utils.asGridCoord(9,7)] : true,
                [utils.asGridCoord(7,7)] : true,
                [utils.asGridCoord(10,7)] : true,
                [utils.asGridCoord(8,8)] : true,
                [utils.asGridCoord(9,8)] : true,
                [utils.asGridCoord(7,8)] : true,
                [utils.asGridCoord(10,8)] : true,
                [utils.asGridCoord(8,5)] : true,
                [utils.asGridCoord(9,5)] : true,
                [utils.asGridCoord(7,5)] : true,
                [utils.asGridCoord(10,5)] : true,
                [utils.asGridCoord(8,4)] : true,
                [utils.asGridCoord(9,4)] : true,
                [utils.asGridCoord(7,4)] : true,
                [utils.asGridCoord(10,4)] : true,
                [utils.asGridCoord(6,7)] : true,
            },
        },
    
    AdFinemRoom : {

    }
}




