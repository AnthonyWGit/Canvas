class Overworld {
    constructor(config)
    {
        this.element = config.element
        this.canvas = this.element.querySelector("#game")
        this.ctx = this.canvas.getContext('2d')
    }

    init()
    {
        console.log('hi', this)
    }
}