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
        ctx.drawImage(this.UpperImage, 0 , 0)
    }
}

window.OverworldMaps = {
    WorldMap : {
        lowerSrc :  "./public/img/Map001.png",
        upperSrc :  "./public/img/Map001.png",
        gameObjects : {
            hero : new GameObject({
                    x:5,
                    y:5
                }),
            npc1 : new GameObject({
                    x: 6,
                    y: 7,
                })
        }
    },
    AdFinemRoom : {

    }
}