class GameObject
{
    constructor(config)
    {
        this.x = 0 || 0 //defaults to 0 or if falsy value 
        this.y = 0 || 0 
        this.sprite = nex Sprite(
            {
                gameObject:this,
                src : config.src || "./public/img/hero.png" , //if no defaults has been set 
            }
        );
    }
}