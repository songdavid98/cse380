//Day time enemy
import {
    ENEMIES
} from "../constants/EnemyTypes.js";

export class DayEnemy {
    constructor(data) {
        this.sprite = data.sprite;
        this.enemyType = data.enemyType;
        this.allEnemySprites = data.allEnemySprites;

        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.dead = false;
        this.angle = 0;


        this.create();

        this.moveCounter = new Array(this.sprite.length).fill(0);
        this.movement = new Array(this.sprite.length).fill(Math.random() * 100);
        this.goX = new Array(this.sprite.length).fill(true);
        this.goY = new Array(this.sprite.length).fill(true);

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

    update(time) {

        for (var i = 0; i < this.sprite.length; i++) {
            if (this.sprite[i].active) {
                if (this.goX[i] && this.goY[i]) {
                    this.sprite[i].body.setVelocityX(this.movement[i]);
                    this.sprite[i].body.setVelocityY(0);
                    this.sprite[i].anims.play("rightSlime", true);
                    this.moveCounter[i]++;
                    if (this.moveCounter[i] >= 50) {
                        this.goX[i] = false;
                        this.goY[i] = false;
                        this.moveCounter[i] = 0;
                    }
                } else if (this.goX[i] == false && this.goY[i] == false) {
                    this.sprite[i].body.setVelocityX(0);
                    this.sprite[i].body.setVelocityY(this.movement[i]);
                    this.sprite[i].anims.play("downSlime", true);
                    this.moveCounter[i]++;
                    if (this.moveCounter[i] >= 50) {
                        this.goX[i] = true;
                        this.goY[i] = false;
                        this.moveCounter[i] = 0;
                    }
                } else if (this.goX[i] == true && this.goY[i] == false) {
                    this.sprite[i].body.setVelocityX(-this.movement[i]);
                    this.sprite[i].body.setVelocityY(0);
                    this.sprite[i].anims.play("leftSlime", true);
                    this.moveCounter[i]--;
                    if (this.moveCounter[i] <= -50) {
                        this.goX[i] = false;
                        this.goY[i] = true;
                        this.moveCounter[i] = 0;
                    }
                } else if (this.goX[i] == false && this.goY[i] == true) {
                    this.sprite[i].body.setVelocityX(0);
                    this.sprite[i].body.setVelocityY(-this.movement[i]);
                    this.sprite[i].anims.play("upSlime", true);
                    this.moveCounter[i]--;
                    if (this.moveCounter[i] <= -50) {
                        this.goX[i] = true;
                        this.goY[i] = true;
                        this.moveCounter[i] = 0;
                    }
                }
            }
        }

    }


}
