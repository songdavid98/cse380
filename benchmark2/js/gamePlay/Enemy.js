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

        this.lastDamaged = 0;
        this.beenAttacked = false; //Need this to change behaviour



        this.direction = 2; // up, down, left, right;  Please replace this with a better algorithm
        this.moveCounter = 0;

        this.active = true;
        this.create();          //Must call create ... that's odd?

    }
    init() {}

    create() {

       

    }



    //When the hero tries to kill the monster
    damaged(hero){
        if(this.health > 0){
            this.health -= hero.basicAttack;        //For now, it's only the basic attack...
            this.beenAttacked = true;
            if(this.health <= 0){
                this.dead = true;
                this.active = false;
                hero.getMoney(this.killCost);
                this.sprite.destroy();
            }
            console.log(this.health);

        }
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
