import {ENEMIES} from "../../constants/EnemyTypes.js";
import {Enemy} from "../Enemy.js";

export class Slime extends Enemy{       // ---- someone fix this~

    constructor(data) {
        super(data);
        this.enemyType = ENEMIES.SLIME; // like slime
        this.health = 2;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 20;
        this.movement = 60; //Monster keeps moving in square pattern for now
        this.killCost = 10;

        //taken care of in super constructor
        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        //        this.distanceTraveled = 0;
        //        this.active = true;

        //this.create();

    }


    init() {}

    create() {
    
        this.frameRate = 5;          //Frame rate has to be defined here (with var)

        var leftFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftSlime', frames: leftFramesSlime, frameRate: this.frameRate, repeat: -1 });
        var leftIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleSlime', frames: leftIdleFrameSlime, frameRate: this.frameRate, repeat: -1 });
    
        var rightFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightSlime', frames: rightFramesSlime, frameRate: this.frameRate, repeat: -1 });
        var rightIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleSlime', frames: rightIdleFrameSlime, frameRate: this.frameRate, repeat: -1 });
        
        var upFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upSlime', frames: upFramesSlime, frameRate: this.frameRate, repeat: -1 });
        var upIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleSlime', frames: upIdleFrameSlime, frameRate: this.frameRate, repeat: -1 });
    
        var downFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downSlime', frames: downFramesSlime, frameRate: this.frameRate, repeat: -1 });
        var downIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleSlime', frames: downIdleFrameSlime, frameRate: this.frameRate, repeat: -1 });
    }

    dayUpdate(time) {
        if(this.active && !this.dead){
            if (this.direction == 1) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(-this.speed);
                this.sprite.anims.play("upSlime", true);
                this.moveCounter++;
                if(this.moveCounter >= this.movement){
                    this.direction = 2;
                    this.moveCounter = 0;
                }
            }

            else if (this.direction == 2) {
                this.sprite.body.setVelocityX(-this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("leftSlime", true);
                this.moveCounter++;
                if(this.moveCounter >= this.movement){
                    this.direction = 3;
                    this.moveCounter = 0;
                }
            }
            else if (this.direction == 3) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(this.speed);
                this.sprite.anims.play("downSlime", true);
                this.moveCounter++;
                if(this.moveCounter >= this.movement){
                    this.direction = 4;
                    this.moveCounter = 0;
                }
            }  
            else if (this.direction == 4) {
                this.sprite.body.setVelocityX(this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("rightSlime", true);
                this.moveCounter++;
                if(this.moveCounter >= this.movement){
                    this.direction = 1;
                    this.moveCounter = 0;
                }
            }
            
        }
    }
    nightUpdate(time) {
        super.nightUpdate(time);
        //        if (this.active) {
        //            this.sprite.body.setVelocityX(-1 * this.speed);
        //            this.sprite.body.setVelocityY(0);
        //            this.sprite.anims.play("leftSlime", true);
        //        }
    }

}
