import {
    ENEMIES
} from "../constants/EnemyTypes.js";

export class Golem extends Enemy {

    constructor(data) {
        this.enemyType = ENEMIES.GOBLIN; // like slime
        this.health = 20;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 100;
        this.money = 30;

        this.sprite = data.sprite;
        this.physics = data.physics;
        this.anims = data.anims;

        this.active = true; //FIXME: remove this

        this.create();

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

    dayUpdate(time) {
        //have dayscene activity here
    }
    nightUpdate(time) {
        if (this.active) {
            this.sprite.body.setVelocityX(-1 * this.speed);
            this.sprite.body.setVelocityY(0);
            this.sprite.anims.play("leftSlime", true);
        }
    }

}
