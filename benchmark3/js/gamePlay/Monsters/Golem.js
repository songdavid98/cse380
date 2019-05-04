import {
    ENEMIES
} from "../../constants/EnemyTypes.js";
import {
    Enemy
} from "../Enemy.js";

export class Golem extends Enemy { //   ---- Someone fix this~

    constructor(data) {
        super(data);
        this.enemyType = ENEMIES.GOLEM; // like slime
        this.health = 20;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 40;
        this.movement = 80; //Monster keeps moving in square pattern for now
        this.killCost = 50;


        //taken care of in super constructor
        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        //        this.distanceTraveled = 0;
        //        this.active = true;


    }


    init() {}

    create() {

        this.frameRate = 3; //Frame rate has to be defined here (with var)

        var leftFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftGolem',
            frames: leftFramesGolem,
            frameRate: this.frameRate,
            repeat: -1
        });
        var leftIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftIdleGolem',
            frames: leftIdleFrameGolem,
            frameRate: this.frameRate,
            repeat: -1
        });

        var rightFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightGolem',
            frames: rightFramesGolem,
            frameRate: this.frameRate,
            repeat: -1
        });
        var rightIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleGolem',
            frames: rightIdleFrameGolem,
            frameRate: this.frameRate,
            repeat: -1
        });

        var upFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upGolem',
            frames: upFramesGolem,
            frameRate: this.frameRate,
            repeat: -1
        });
        var upIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upIdleGolem',
            frames: upIdleFrameGolem,
            frameRate: this.frameRate,
            repeat: -1
        });

        var downFramesGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downGolem',
            frames: downFramesGolem,
            frameRate: this.frameRate,
            repeat: -1
        });
        var downIdleFrameGolem = this.anims.generateFrameNames(ENEMIES.GOLEM, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downIdleGolem',
            frames: downIdleFrameGolem,
            frameRate: this.frameRate,
            repeat: -1
        });
    }

    dayUpdate(time) {

        if(!this.dead){
            //Moving the healthbar along with the sprite
            this.healthBar.x = this.sprite.x;
            this.healthBar.y = this.sprite.y - 50;
            this.greenBar.x = this.sprite.x - this.healthBar.width + ((this.greenBar.width) * this.greenBar.scaleX/2);
            this.greenBar.y = this.sprite.y - 50;
        }
        //have dayscene activity here
        if (this.active && !this.dead) {
            if (this.direction == 1) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(-this.speed);
                this.sprite.anims.play("upGolem", true);
                this.moveCounter++;
                if (this.moveCounter >= this.movement) {
                    this.direction = 2;
                    this.moveCounter = 0;
                }
            } else if (this.direction == 2) {
                this.sprite.body.setVelocityX(-this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("leftGolem", true);
                this.moveCounter++;
                if (this.moveCounter >= this.movement) {
                    this.direction = 3;
                    this.moveCounter = 0;
                }
            } else if (this.direction == 3) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(this.speed);
                this.sprite.anims.play("downGolem", true);
                this.moveCounter++;
                if (this.moveCounter >= this.movement) {
                    this.direction = 4;
                    this.moveCounter = 0;
                }
            } else if (this.direction == 4) {
                this.sprite.body.setVelocityX(this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("rightGolem", true);
                this.moveCounter++;
                if (this.moveCounter >= this.movement) {
                    this.direction = 1;
                    this.moveCounter = 0;
                }
            }
        }
    }
    nightUpdate(time, level) {
        super.nightUpdate(time, level);
        //        if (this.active) {
        //            this.sprite.body.setVelocityX(-1 * this.speed);
        //            this.sprite.body.setVelocityY(0);
        //            this.sprite.anims.play("leftSlime", true);
        //        }
    }

}
