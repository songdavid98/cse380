//Day time enemy
import { ENEMIES } from "../constants/EnemyTypes.js";


export class Enemy {
    constructor(data) {
        this.distanceTraveled = 0;              //Night stuff
        this.sprite = data.sprite;
        this.allEnemySprites = data.allEnemySprites;

        this.physics = data.physics;
        this.anims = data.anims;
        this.scene = data.scene;
        this.dead = false;
        this.angle = 0;

        this.lastDamaged = 0;       //Timer thing
        this.beenAttacked = false;  //Need this to change behaviour
        this.notTakenEffect = true;

        this.justGotHit = false;
        this.direction = 2;             // up, down, left, right;  Please replace this with a better algorithm
        this.moveCounter = 0;

        this.active = true;
        this.create();                  //Must call create ... that's odd?

    }
    init() {}

    create() {
    }

    //When the hero tries to kill the monster
    damaged(intDamageTaken){
        this.active = false;          //FIX THIS LATTTTTTTTTTTTTTTER
        console.log(intDamageTaken);
        console.log(this.enemyType);
        console.log(this.health);
        if(this.health > 0){
            this.health -= intDamageTaken;        //For now, it's only the basic attack...
            this.beenAttacked = true;
            //console.log("damaged");
            if(this.health <= 0){
                this.dead = true;
                this.active = false;
                console.log("killed");
                this.scene.getMoney(this.killCost);
                this.sprite.destroy();
            }
        }
    }

    slowDown(){
        if(this.notTakenEffect){
            this.speed = Math.floor(this.speed/2);
            this.frameRate = Math.floor(this.frameRate/2);
            console.log(this.frameRate);
            this.notTakenEffect = false;
        }
    }



    damagedSuspensionState(){
        if(!this.active && !this.dead){     //Get damaged state
            
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
