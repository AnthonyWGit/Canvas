class Overworld {
    constructor(config)
    {
        this.element = config.element
        this.canvas = this.element.querySelector("#game")
        this.ctx = this.canvas.getContext("2d")
    }

    init()
    {

        //coordinates
        const x = 5
        const y = 5
        console.log('pur')
        const image = new Image()
        const hero = new Image()
        // const npcShadow = (x, y) => {
        //     this.ctx.beginPath();
        //     this.ctx.arc((x * 48)+24, (y * 48) + 36, 12, 0, 2 * Math.PI); // Draw a circle
        //     this.ctx.fillStyle = 'rgba(128, 128, 128, 0.75)'; // Set the color to grey with 50% opacity
        //     this.ctx.fill();
        // }; Doesn't work the circle is erased by image
    
        const loadImage = (img, src) => {
            return new Promise((resolve, reject) => {
                img.onload = () => resolve(img)
                img.onerror = reject
                img.src = src
            });
        }

        const drawGrid = () => {
            const size = 48;// size of a tile
            const width = this.canvas.width
            const height = this.canvas.height
    
            for (let x = 0; x <= width; x += size) {
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, height);
            }
    
            for (let y = 0; y <= height; y += size) {
                this.ctx.moveTo(0, y)
                this.ctx.lineTo(width, y)
            }
    
            this.ctx.strokeStyle = 'black'
            this.ctx.stroke()
        }
    
    //using promises because i want to drow the map then the characters
    //because if the map is heavier than the characters then it will draw on top of them
        Promise.all([
            loadImage(image, "./public/img/Map001.png"),
            loadImage(hero, "./public/img/hero.png"),
        ]).then(() => {
            // npcShadow(x,y) doesn't work
            this.ctx.drawImage(image, 0, 0) // Draw the map
            this.ctx.drawImage(hero, // Draw the character
                0, //left cut
                0, //top cut
                48,
                48,
                x * 48, //48 because a tile is 48 
                y * 48,
                48,
                48)

            drawGrid()
        }).catch(console.error)
    }
}