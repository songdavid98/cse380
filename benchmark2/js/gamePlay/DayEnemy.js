//Day time enemy
import {ENEMIES} from "../constants/EnemyTypes.js";

export class DayEnemy{    
    constructor(data){
        this.sprite = data.sprite;
        this.enemyType = data.enemyType; //Sword, mage, shield?
        this.health = data.health;
        this.basicAttack = data.basicAttack;
        this.basicAttackSpeed = data.basicAttackSpeed;
        this.speed = data.speed;
        this.keyboard = data.keyboard;
        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.create();

        this.moveCounter = 0;
        this.movement = 50;
        this.goX = true;
        this.goY = true;
    }
    init(){}
    
    create(){

        var downFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/down/', suffix:'.png' });
        this.anims.create({ key: 'downSlime', frames: downFrames, frameRate: 5, repeat: -1 });
        var upFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/up/', suffix:'.png' });
        this.anims.create({ key: 'upSlime', frames: upFrames, frameRate: 5, repeat: -1 });
        var leftFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/left/', suffix:'.png' });
        this.anims.create({ key: 'leftSlime', frames: leftFrames, frameRate: 5, repeat: -1 });
        var rightFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/right/', suffix:'.png' });
        this.anims.create({ key: 'rightSlime', frames: rightFrames, frameRate: 5, repeat: -1 });

    }

    update(time){
        if(this.goX && this.goY){
            this.sprite.body.setVelocityX(this.movement);
            this.sprite.body.setVelocityY(0);
            this.sprite.anims.play("rightSlime", true);
            this.moveCounter++;
            if(this.moveCounter >= 50){
                this.goX = false;
                this.goY = false;
                this.moveCounter = 0;
            }
        }
        else if(this.goX == false && this.goY == false){
            this.sprite.body.setVelocityX(0);
            this.sprite.body.setVelocityY(this.movement);
            this.sprite.anims.play("downSlime", true);
            this.moveCounter++;
            if(this.moveCounter >= 50){
                this.goX = true;
                this.goY = false;
                this.moveCounter = 0;
            }
        }
        else if(this.goX == true && this.goY == false){
            this.sprite.body.setVelocityX(-this.movement);
            this.sprite.body.setVelocityY(0);
            this.sprite.anims.play("leftSlime", true);
            this.moveCounter--;
            if(this.moveCounter <= -50){
                this.goX = false;
                this.goY = true;
                this.moveCounter = 0;
            }
        }
        else if(this.goX == false && this.goY == true){
            this.sprite.body.setVelocityX(0);
            this.sprite.body.setVelocityY(-this.movement);
            this.sprite.anims.play("upSlime", true);
            this.moveCounter--;
            if(this.moveCounter <= -50){
                this.goX = true;
                this.goY = true;
                this.moveCounter = 0;
            }
        }


    }
    

}












