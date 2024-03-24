class GameObject
{
    constructor(config)
    {
        this.x = config.x || 0 //defaults to 0 or if falsy value 
        this.y = config.y || 0 
        this.direction = config.direction || "down"
        this.sprite = new Sprite(
            {
                gameObject : this,
                src : config.src || "./public/img/hero.png" , //if no defaults has been set 
            }
        );
        this.target = config.target || null
    }

    update()
    {

    }
}