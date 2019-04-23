//Day time enemy
import { ENEMIES } from "../constants/EnemyTypes.js";


export class Enemy {
    constructor(data) {
        this.distanceTraveled = 0;              //Night stuff
        this.sprite = data.sprite;
        this.allEnemySprites = data.allEnemySprites;

        this.physics = data.physics;
        this.anims = data.anims;
        this.dead = false;
        this.angle = 0;

        this.direction = 2; // up, down, left, right;  Please replace this with a better algorithm
        this.moveCounter = 0;

        this.active = true;
        this.create();          //Must call create ... that's odd?

    }
    init() {}

    create() {

       

    }

    dayUpdate(time) {
       
        
    }

    nightUpdate(time) {
        if (this.active) {
            this.distanceTraveled += this.speed;
            this.sprite.body.setVelocityX(-1 * this.speed);
            this.sprite.body.setVelocityY(0);
            //this.sprite.anims.play("leftSlime", true);
        }

    }

}
