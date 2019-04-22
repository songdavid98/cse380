//Day time enemy
import {
    ENEMIES
} from "../constants/EnemyTypes.js";

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

        //sprite has attributes x and y

        this.active = true;
        //        this.create();

    }
    init() {}

    create() {

        var downFrames = this.anims.generateFrameNames(this.enemyType, {
            start: 1,
            end: 6,
            zeroPad: 4,
            prefix: 'slime/down/',
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
            prefix: 'slime/up/',
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
            prefix: 'slime/left/',
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
            prefix: 'slime/right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightSlime',
            frames: rightFrames,
            frameRate: 5,
            repeat: -1
        });

    }

    dayUpdate() {
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
        if (this.active) {
            this.distanceTraveled += this.speed;
            this.sprite.body.setVelocityX(-1 * this.speed);
            this.sprite.body.setVelocityY(0);
            //this.sprite.anims.play("leftSlime", true);
        }

    }

}
