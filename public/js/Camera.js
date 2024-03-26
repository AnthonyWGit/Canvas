class Camera
{
    constructor(config){
        this.x = config.x || 0
        this.y = config.y || 0
        this.width = window.innerWidth
        this.height = window.innerHeight
    }

    update(player, map) {
        if (player.movingProgressRemaining > 0)
        {
            this.x = player.x
            this.y = player.y
            const gameWrapper = document.querySelector('.game-wrapper')
            window.scrollTo(this.x, this.y)
            // console.log(this.x, this.y)     
        }
    }

    init(player,map)
    {
        this.x = player.x + 48
        this.y = player.y + 48 * 5
        window.onbeforeunload = function () { window.scrollTo(this.x, this.y); } //reset scroll at top left
        console.log(this.x, this.y)     
    }
}