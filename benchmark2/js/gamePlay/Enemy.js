//Day time enemy
import { ENEMIES } from "../constants/EnemyTypes.js";
import { Slime } from "./Monsters/Slime.js";
import { Golem } from "./Monsters/Golem.js";

export class Enemy {
    constructor(data) {
        this.distanceTraveled = 0;              //Night stuff
        this.sprite = data.sprite;
        this.enemyType = data.enemyType;        
        this.allEnemySprites = data.allEnemySprites;

        this.physics = data.physics;
        this.anims = data.anims;
        this.dead = false;
        this.angle = 0;

        //1000 -> up
        this.direction = 8; //In Byte [up, down, left, right] Please replace this with a better algorithm
        this.moveCounter = 0;

        switch(this.enemyType){
            case ENEMIES.SLIME:
                this.slime = new Slime({"sprite":this.allEnemySprites[0], "anims":this.anims});

            break;
            case ENEMIES.GOLEM:
                this.golem = new Golem({"sprite":this.allEnemySprites[1], "anims":this.anims});

            break;


        }




        this.active = true;
        this.create();          //Must call create ... that's odd?

    }
    init() {}

    create() {
        console.log("ENEMIES ANIMATION");
        //Slime
        var leftFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftSlime', frames: leftFramesSlime, frameRate: 5, repeat: -1 });
        var leftIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleSlime', frames: leftIdleFrameSlime, frameRate: 5, repeat: -1 });
   
        var rightFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightSlime', frames: rightFramesSlime, frameRate: 5, repeat: -1 });
        var rightIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleSlime', frames: rightIdleFrameSlime, frameRate: 5, repeat: -1 });
      
        var upFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upSlime', frames: upFramesSlime, frameRate: 5, repeat: -1 });
        var upIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleSlime', frames: upIdleFrameSlime, frameRate: 5, repeat: -1 });
   
        var downFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downSlime', frames: downFramesSlime, frameRate: 5, repeat: -1 });
        var downIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleSlime', frames: downIdleFrameSlime, frameRate: 5, repeat: -1 });

        //Golem
        var leftFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftGolem', frames: leftFramesGolem, frameRate: 5, repeat: -1 });
        var leftIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleGolem', frames: leftIdleFrameGolem, frameRate: 5, repeat: -1 });

        var rightFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightGolem', frames: rightFramesGolem, frameRate: 5, repeat: -1 });
        var rightIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleGolem', frames: rightIdleFrameGolem, frameRate: 5, repeat: -1 });
     
        var upFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upGolem', frames: upFramesGolem, frameRate: 5, repeat: -1 });
        var upIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleGolem', frames: upIdleFrameGolem, frameRate: 5, repeat: -1 });
       
        var downFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downGolem', frames: downFramesGolem, frameRate: 5, repeat: -1 });
        var downIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleGolem', frames: downIdleFrameGolem, frameRate: 5, repeat: -1 });
       

    }

    dayUpdate(time) {
        if(this.sprite.active){
            if (this.enemyType == ENEMIES.SLIME) {
                if (this.direction == 8) {
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(-this.sprite.speed);
                    this.sprite.anims.play("upSlime", true);
                    //console.log(this.sprite);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction >> 1;
                        console.log(this.direction);
                        this.moveCounter == 0;
                    }
                    
                }
                else if (this.direction == 4) {
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(this.sprite.speed);
                    this.sprite.anims.play("downSlime", true);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction >> 1;
                        this.moveCounter == 0;
                    }
                }  
                else if (this.direction == 2) {
                    this.sprite.body.setVelocityX(-this.sprite.speed);
                    this.sprite.body.setVelocityY(0);
                    this.sprite.anims.play("leftSlime", true);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction >> 1;
                        this.moveCounter == 0;
                    }
                }
                else if (this.direction == 1) {
                    this.sprite.body.setVelocityX(this.sprite.speed);
                    this.sprite.body.setVelocityY(0);
                    this.sprite.anims.play("rightSlime", true);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction << 3;
                        this.moveCounter == 0;
                    }
                }
            }
            else if (this.enemyType == ENEMIES.GOLEM) {
                if (this.direction == 8) {
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(-this.sprite.speed);
                    this.sprite.anims.play("upGolem", true);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction >> 1;
                        this.moveCounter == 0;
                    }
                    
                }
                else if (this.direction == 4) {
                    this.sprite.body.setVelocityX(0);
                    this.sprite.body.setVelocityY(this.sprite.speed);
                    this.sprite.anims.play("downGolem", true);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction >> 1;
                        this.moveCounter == 0;
                    }
                }  
                else if (this.direction == 2) {
                    this.sprite.body.setVelocityX(-this.sprite.speed);
                    this.sprite.body.setVelocityY(0);
                    this.sprite.anims.play("leftGolem", true);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction >> 1;
                        this.moveCounter == 0;
                    }
                }
                else if (this.direction == 1) {
                    this.sprite.body.setVelocityX(this.sprite.speed);
                    this.sprite.body.setVelocityY(0);
                    this.sprite.anims.play("rightGolem", true);
                    this.moveCounter++;
                    if(this.moveCounter >= this.sprite.movement){
                        this.direction << 3;
                        this.moveCounter == 0;
                    }
                }
            }
        }
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
