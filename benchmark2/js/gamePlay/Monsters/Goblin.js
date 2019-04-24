import {
    ENEMIES
} from "../../constants/EnemyTypes.js";

import {
    Enemy
} from "../Enemy.js";

export class Goblin extends Enemy {

    constructor(data) {
        super(data);
        this.enemyType = ENEMIES.GOBLIN; // like slime
        this.health = 5;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 100;
        this.killCost = 15;

        this.zzzSprite = data.zzzSprite; //I need this to make the sleeping animation (zzz)

        //taken care of in super constructor
        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        //        this.distanceTraveled = 0;
        //        this.active = true;

        this.create();

    }


    init() {}

    create() {
        var frameRate = 3;      //Frame rate has to be defined here (with var)

        var leftFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftGoblin', frames: leftFramesGoblin, frameRate: frameRate, repeat: -1 });
        var leftIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleGoblin', frames: leftIdleFrameGoblin, frameRate: frameRate, repeat: -1 });

        var rightFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightGoblin', frames: rightFramesGoblin, frameRate: frameRate, repeat: -1 });
        var rightIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleGoblin', frames: rightIdleFrameGoblin, frameRate: frameRate, repeat: -1 });
     
        var upFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upGoblin', frames: upFramesGoblin, frameRate: frameRate, repeat: -1 });
        var upIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleGoblin', frames: upIdleFrameGoblin, frameRate: frameRate, repeat: -1 });
       
        var downFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downGoblin', frames: downFramesGoblin, frameRate: frameRate, repeat: -1 });
        var downIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleGoblin', frames: downIdleFrameGoblin, frameRate: frameRate, repeat: -1 });
 
        var sleepFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'sleep/', suffix:'.png' });
        this.anims.create({ key: 'sleepGoblin', frames: sleepFramesGoblin, frameRate: frameRate, repeat: -1 });

        var zzzFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 3, zeroPad: 4, prefix:'zzz/', suffix:'.png' });
        this.anims.create({ key: 'zzz', frames: zzzFramesGoblin, frameRate: frameRate, repeat: -1 });


    }

    dayUpdate(time) {
        //have dayscene activity here

        if(this.active){
            this.sprite.anims.play("sleepGoblin", true);
            this.zzzSprite.anims.play("zzz",true);

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
