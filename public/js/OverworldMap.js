class OverworldMap{
    constructor(config)
    {
        this.gameObjects = config.gameObjects

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
}

window.OverworldMaps = {
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
                })
        }
    },
    AdFinemRoom : {

    }
}