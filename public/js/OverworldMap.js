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
    //Detect all free cells around a cell 
    wallsAround(currentX, currentY)
    {
        let neighbors = []
        for (let i = 0; i < 4; i++){
            let x, y;
            switch (i){
                case 0:
                    x = currentX + 1;
                    y = currentY;
                    console.log(this.walls[`${x * 48},${y * 48}`])
                    if (!this.walls[`${x * 48},${y * 48}`]) neighbors.push({x, y});
                    break;
                case 1:
                    x = currentX - 1;
                    y = currentY;
                    if (!this.walls[`${x * 48},${y * 48}`]) neighbors.push({x, y});
                    break;
                case 2:
                    x = currentX;
                    y = currentY + 1;
                    if (!this.walls[`${x * 48},${y * 48}`]) neighbors.push({x, y});
                    break;
                case 3:
                    x = currentX;
                    y = currentY - 1;
                    if (!this.walls[`${x * 48},${y * 48}`]) neighbors.push({x, y});
                    break;
            }
        }
        console.log(neighbors, 'NEIGHBORS IN WALLSAROUND')
        return neighbors;
    }
    isWall(target){
        if (!this.walls[`${target.x * 48},${target.y * 48}`]) return true
        return false
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

        ctx.strokeStyle = 'withe'
        ctx.stroke()
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
                    y:utils.withGrid(5),
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




