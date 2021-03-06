//Day time enemy
import {
    ENEMIES
} from "../constants/EnemyTypes.js";


export class Enemy {
    constructor(data) {
        this.distanceTraveled = 0; //Night stuff
        this.sprite = data.sprite;
        this.allEnemySprites = data.allEnemySprites;

        this.healthBar = data.healthBar;    //Outside layer of health bar
        this.greenBar = data.greenBar;      //The green health bar thing that moves 

        this.physics = data.physics;
        this.anims = data.anims;
        this.scene = data.scene;
        this.dead = false;
        this.angle = 0;

        this.lastDamaged = 0; //Timer thing
        this.beenAttacked = false; //Need this to change behaviour
        this.notTakenEffect = true;

        this.lastAttacked = 0;
        this.attackCooldown = 2;

        this.justGotHit = false;
        this.direction = 2; // up, down, left, right;  Please replace this with a better algorithm
        this.moveCounter = 0;

        this.active = true;
        this.nightWaypoint = 0;
        this.create();  //We need this here. Don't erase

    }
    init() {}

    create() {

    }

    //When the hero tries to kill the monster
    damaged(intDamageTaken) {
        if (this.health > 0) {
            console.log("comes here");
            this.health -= intDamageTaken; //For now, it's only the basic attack...
            this.beenAttacked = true;
            this.greenBar.setScale(2*(this.health/this.totalHealth), 2);


            if (this.health <= 0) {
                this.dead = true;
                this.active = false;
                console.log("killed");
                this.scene.getMoney(this.killCost);
                this.destroySprite();    //Calls a function to destroy all the things attached to sprite

            }
        }
    }

    destroySprite(){
        this.sprite.destroy();
        this.healthBar.destroy();
        this.greenBar.destroy();
    }

    slowDown() {
        if (this.notTakenEffect) {
            this.speed = Math.floor(this.speed / 2);
            this.frameRate = Math.floor(this.frameRate / 2);
            this.notTakenEffect = false;
        }
    }



    damagedSuspensionState() {
        if (!this.active && !this.dead) { //Get damaged state

        }
    }

    dayUpdate(time) {


    }

    nightUpdate(time, level) {
        if (this.active) {
            switch (level) {
                case 1:
                    switch (this.nightWaypoint) {
                        case 0:
                            if (this.sprite.x > 1000) {
                                this.distanceTraveled += this.speed;
                                this.sprite.body.setVelocityX(-1 * this.speed);
                                this.sprite.body.setVelocityY(0);
                                break;
                            }
                            this.nightWaypoint = 1;
                        case 1:
                            if (this.sprite.y < 800) {
                                this.distanceTraveled += this.speed;
                                this.sprite.body.setVelocityX(0);
                                this.sprite.body.setVelocityY(this.speed);
                                break;
                            }
                            this.nightWaypoint = 2;
                        case 2:
                            if (this.sprite.x > 600) {
                                this.distanceTraveled += this.speed;
                                this.sprite.body.setVelocityX(-1 * this.speed);
                                this.sprite.body.setVelocityY(0);
                                break;
                            }
                            this.nightWaypoint = 3;
                        case 3:
                            if (this.sprite.y > 450) {
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
                    break;

                case 2:
                    switch (this.nightWaypoint) {
                        case 0:
                            if (this.sprite.x > 1000) {
                                this.distanceTraveled += this.speed;
                                this.sprite.body.setVelocityX(-1 * this.speed);
                                this.sprite.body.setVelocityY(0);
                                break;
                            }
                            this.nightWaypoint = 1;
                        case 1:
                            if (this.sprite.y < 450) {
                                this.distanceTraveled += this.speed;
                                this.sprite.body.setVelocityX(0);
                                this.sprite.body.setVelocityY(this.speed);
                                break;
                            }
                            this.nightWaypoint = 2;
                        case 2:
                            this.distanceTraveled += this.speed;
                            this.sprite.body.setVelocityX(-1 * this.speed);
                            this.sprite.body.setVelocityY(0);
                            break;
                    }
                    break;

                case 3:
                    this.distanceTraveled += this.speed;
                    this.sprite.body.setVelocityX(-1 * this.speed);
                    this.sprite.body.setVelocityY(0);
                    break;
            }

        }

    }

}
