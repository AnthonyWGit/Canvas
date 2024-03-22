class Overworld {
    constructor(config)
    {
        this.element = config.element
        this.canvas = this.element.querySelector("#game")
        this.ctx = this.canvas.getContext("2d")
    }

    init()
    {
        console.log('pur')
        const image = new Image()
        const hero = new Image()
    
        const loadImage = (img, src) => {
            return new Promise((resolve, reject) => {
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        }
    //using promises because i want to drow the map then the characters
    //because if the map is heavier than the characters then it will draw on top of them
        Promise.all([
            loadImage(image, "./public/img/Map001.png"),
            loadImage(hero, "./public/img/hero.png")
        ]).then(() => {
            this.ctx.drawImage(image, 0, 0); // Draw the map
            this.ctx.drawImage(hero, 0, 0); // Draw the character
        }).catch(console.error);
    }
}