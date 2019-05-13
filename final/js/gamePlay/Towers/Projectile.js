export class Projectile {
    constructor(data) {
        this.damage = data.damage;
        this.speed = data.speed;
        this.range = data.range;
        this.sprite = data.sprite;
        this.sprite.body.setVelocityX( data.vx );
        this.sprite.body.setVelocityY( data.vy );
        this.create();
    }
    init() {}
    
    create() {
        
    }
    
    distanceCalc(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
    
    update(time) {}
}