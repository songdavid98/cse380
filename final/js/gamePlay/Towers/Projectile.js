export class Projectile {
    constructor(data) {
        this.damage = data.damage;
        this.speed = 500;
        this.size = 50;
        this.sprite = data.sprite;
//        this.sprite.body.setVelocityX( data.vx );
//        this.sprite.body.setVelocityY( data.vy );
        this.vx = 0;
        this.vy = 0;
        this.dead = true;
        this.create();
    }
    init() {}
    
    create() {}
    
    distanceCalc(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
    
    update(time, enemies) {
        if (!this.dead) {
            this.sprite.body.setVelocityX( this.vx * this.speed);
            this.sprite.body.setVelocityY( this.vy * this.speed);
        }
        
        
        if (enemies && enemies.length > 0) {
            for (let j = 0; j < enemies.length; j++) {
                let enem = enemies[j];

                let defX = this.sprite.x;
                let defY = this.sprite.y;
                let enemX = enem.sprite.x;
                let enemY = enem.sprite.y;

                let enemDistToProj = this.distanceCalc(defX, defY, enemX, enemY);

                if (enemDistToProj > this.size)
                    continue;
                
                enem.health -= this.damage;
                this.sprite.x = -1000;
                this.sprite.y = -1000;
                this.dead = true;
                return;
            }
        }
    }
}