import {
    ENEMIES
} from "../../constants/EnemyTypes.js";

import {
    Enemy
} from "../Enemy.js";

export class Slime extends Enemy {

    constructor(data) {
        super(data);
        this.enemyType = ENEMIES.SLIME; // like slime
        this.health = 5;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 100;
        this.money = 10;

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

        var downFrames = this.anims.generateFrameNames(this.enemyType, {
            start: 1,
            end: 6,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downSlime',
            frames: downFrames,
            frameRate: 5,
            repeat: -1
        });
        var upFrames = this.anims.generateFrameNames(this.enemyType, {
            start: 1,
            end: 6,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upSlime',
            frames: upFrames,
            frameRate: 5,
            repeat: -1
        });
        var leftFrames = this.anims.generateFrameNames(this.enemyType, {
            start: 1,
            end: 6,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftSlime',
            frames: leftFrames,
            frameRate: 5,
            repeat: -1
        });
        var rightFrames = this.anims.generateFrameNames(this.enemyType, {
            start: 1,
            end: 6,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightSlime',
            frames: rightFrames,
            frameRate: 5,
            repeat: -1
        });

    }

    dayUpdate(time) {
        //have dayscene activity here
        if (this.sprite.active) {
            if (this.goX[i] && this.goY[i]) {
                this.sprite.body.setVelocityX(this.movement[i]);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("rightSlime", true);
                this.moveCounter[i]++;
                if (this.moveCounter[i] >= 50) {
                    this.goX[i] = false;
                    this.goY[i] = false;
                    this.moveCounter[i] = 0;
                }
            } else if (this.goX[i] == false && this.goY[i] == false) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(this.movement[i]);
                this.sprite.anims.play("downSlime", true);
                this.moveCounter[i]++;
                if (this.moveCounter[i] >= 50) {
                    this.goX[i] = true;
                    this.goY[i] = false;
                    this.moveCounter[i] = 0;
                }
            } else if (this.goX[i] == true && this.goY[i] == false) {
                this.sprite.body.setVelocityX(-this.movement[i]);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("leftSlime", true);
                this.moveCounter[i]--;
                if (this.moveCounter[i] <= -50) {
                    this.goX[i] = false;
                    this.goY[i] = true;
                    this.moveCounter[i] = 0;
                }
            } else if (this.goX[i] == false && this.goY[i] == true) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(-this.movement[i]);
                this.sprite.anims.play("upSlime", true);
                this.moveCounter[i]--;
                if (this.moveCounter[i] <= -50) {
                    this.goX[i] = true;
                    this.goY[i] = true;
                    this.moveCounter[i] = 0;
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
