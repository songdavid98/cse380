//Day time enemy
import {
    ENEMIES
} from "../constants/EnemyTypes.js";


export class Enemy {
    constructor(data) {
        this.distanceTraveled = 0; //Night stuff
        this.sprite = data.sprite;
        this.allEnemySprites = data.allEnemySprites;
        this.scaleX = data.scaleX;
        this.scaleY = data.scaleY;

        this.healthBar = data.healthBar; //Outside layer of health bar
        this.greenBar = data.greenBar; //The green health bar thing that moves 

        this.physics = data.physics;
        this.anims = data.anims;
        this.scene = data.scene;
        this.dead = false;
        this.angle = 0;

        this.lastDamaged = 0; //Timer thing
        this.beenAttacked = false; //Need this to change behaviour
        this.notTakenEffect = true;

        this.specialDamageCooldown = 5; //1 second

        this.lastAttacked = 0;
        this.attackCooldown = 2;

        this.justGotHit;
        this.direction = 2; // up, down, left, right;  Please replace this with a better algorithm
        this.moveCounter = 0;

        this.active = true;
        this.nightWaypoint = 0;
        this.create(); //Must call create ... that's odd?

    }
    init() {}

    create() {


    }

    //When the hero tries to kill the monster
    damaged(intDamageTaken, player) {
        if (this.health > 0) {
            if (!this.healthBar.visible || !this.greenBar.visible) {
                this.healthBar.visible = true;
                this.greenBar.visible = true;
            }
            this.health -= intDamageTaken; //For now, it's only the basic attack...
            this.beenAttacked = true;
            this.greenBar.setScale(2 * (this.health / this.totalHealth), 2);

            if (this.health <= 0) {
                if(player){
                    player.kills++;
                }
                this.dead = true;
                this.active = false;
                console.log("killed");
                this.scene.getMoney(this.killCost);
                this.destroySprite(); //Calls a function to destroy all the things attached to sprite
            }
        }
    }

    destroySprite() {
        this.sprite.destroy();
        
        this.healthBar.destroy();
        this.greenBar.destroy();
    }

    slowDown() {
        if (this.notTakenEffect) {
            this.speed = Math.floor(this.speed / 2);
            this.frameRate = Math.floor(this.frameRate / 2);
            // console.log(this.frameRate);
            this.notTakenEffect = false;
        }
    }

    damagedSuspensionState() {
        if (!this.active && !this.dead) { //Get damaged state

        }
    }

    dayUpdate(time) {
        //Moving the healthbar along with the sprite{
        if (!this.dead && this.beenAttacked) {
            this.healthBar.x = this.sprite.x;
            this.healthBar.y = this.sprite.y - this.sprite.height * this.scaleY / 2 - 20;
            this.greenBar.x = this.sprite.x - this.healthBar.width + ((this.greenBar.width) * this.greenBar.scaleX / 2);
            this.greenBar.y = this.sprite.y - this.sprite.height * this.scaleY / 2 - 20;
        }
    }
    
    nightLevel1Pathfinding() {
        switch (this.nightWaypoint) {
            case 0:
                if (this.sprite.x > 1425) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(-1 * this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 1;
            case 1:
                if (this.sprite.y + this.sprite.height*2.5 < 750) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(this.speed);
                    break;
                }
                this.nightWaypoint = 2;
            case 2:
                if (this.sprite.x > 700) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(-1 * this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 3;
            case 3:
                if (this.sprite.y + this.sprite.height*2.5 > 475) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(-1 * this.speed);
                    break;
                }
                this.nightWaypoint = 4;
            case 4:
                this.distanceTraveled += this.speed;
                this.sprite.body.setVelocityX(-1 * this.speed);
                this.sprite.body.setVelocityY(0);
                break;
        }
    }

    nightLevel2Pathfinding() {
        switch (this.nightWaypoint) {
            case 0:
                if (this.sprite.x > 800) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(-1 * this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 1;
            case 1:
                if (this.sprite.y + this.sprite.height*2.5 < 375) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(this.speed);
                    break;
                }
                this.nightWaypoint = 2;
            case 2:
                if (this.sprite.x < 1440) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 3;
            case 3:
                if (this.sprite.y + this.sprite.height*2.5 < 805) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(this.speed);
                    break;
                }
                this.nightWaypoint = 4;
            case 4:
                if (this.sprite.x > 500) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(-1 * this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 5;
            case 5:
                if (this.sprite.y + this.sprite.height*2.5 > 475) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(-1*this.speed);
                    break;
                }
                this.nightWaypoint = 6;
            case 6:
                this.distanceTraveled += this.speed;
                this.sprite.body.setVelocityX(-1 * this.speed);
                this.sprite.body.setVelocityY(0);
                break;
        }
    }
    
    nightLevel3Pathfinding() {
        switch (this.nightWaypoint) {
            case 0:
                if (this.sprite.x > 800) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(-1 * this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 1;
            case 1:
                if (this.sprite.y + this.sprite.height*2.5 < 750) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(this.speed);
                    break;
                }
                this.nightWaypoint = 2;
            case 2:
                if (this.sprite.x < 1450) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 3;
            case 3:
                if (this.sprite.y + this.sprite.height*2.5 > 130) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(-1*this.speed);
                    break;
                }
                this.nightWaypoint = 4;
            case 4:
                if (this.sprite.x > 500) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(-1 * this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
                }
                this.nightWaypoint = 5;
            case 5:
                if (this.sprite.y + this.sprite.height*2.5 < 475) {
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(this.speed);
                    break;
                }
                this.nightWaypoint = 6;
            case 6:
                this.distanceTraveled += this.speed;
                this.sprite.body.setVelocityX(-1 * this.speed);
                this.sprite.body.setVelocityY(0);
                break;
        }
    }
    
    nightUpdate(time, level) {
        switch (level) {
            case 2:
                this.nightLevel1Pathfinding();
                break;
            case 4:
                this.nightLevel2Pathfinding();
                break;
            case 6:
                this.nightLevel3Pathfinding();
                break;
            default:
                console.log("invalid level in nightupdate");
                break;       
        }
        
        this.healthBar.x = this.sprite.x;
        this.healthBar.y = this.sprite.y - this.sprite.height * this.scaleY / 2 - 20;
        this.greenBar.x = this.sprite.x - this.healthBar.width + ((this.greenBar.width) * this.greenBar.scaleX / 2);
        this.greenBar.y = this.sprite.y - this.sprite.height * this.scaleY / 2 - 20;
    }

}
