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
    }
    init(){
        this.maxMovement = 100;
        this.movement = 0;
    }
    create(){

        var downFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'slime/down/', suffix:'.png' });
        this.anims.create({ key: 'down', frames: downFrames, frameRate: 5, repeat: -1 });
        var upFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'slime/up/', suffix:'.png' });
        this.anims.create({ key: 'up', frames: upFrames, frameRate: 5, repeat: -1 });
        var leftFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'slime/left/', suffix:'.png' });
        this.anims.create({ key: 'left', frames: leftFrames, frameRate: 5, repeat: -1 });
        var rightFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'slime/right/', suffix:'.png' });
        this.anims.create({ key: 'right', frames: rightFrames, frameRate: 5, repeat: -1 });

    }

    update(time){
        if(this.movement == 100){
            this.movement = 0;
        }
        if(this.maxMovement < this.movement){
            this.sprite.body.setVelocityX(this.movement);
            this.sprite.body.setVelocityY(10);
            this.movement += 1;
        }else{
            this.sprite.body.setVelocityX(0);
            this.sprite.body.setVelocityY(this.movement);

        }


    }
    

}












