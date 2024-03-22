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
}

window.OverworldMaps = {
    WorldMap : {
        lowerSrc :  "./public/img/Map001.png",
        upperSrc :  "",
        gameObjects : {
            hero : new GameObject({
                    x:utils.withGrid(5),
                    y:utils.withGrid(5)
                    //optional src for here sprite here 
                }),
            npc1 : new GameObject({
                    x: utils.withGrid(6),
                    y: utils.withGrid(7),
                })
        }
    },
    AdFinemRoom : {

    }
}