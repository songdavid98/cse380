import {
    ENEMIES
} from "../constants/EnemyTypes.js";

export class Slime extends NightEnemy {

    constructor(data) {
        this.sprite = data.sprite;
        this.enemyType = ENEMIES.SLIME; // like slime
        this.health = 5;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 400;

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
        //var rightFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/right/', suffix:'.png' });
        //this.anims.create({ key: 'rightSlime', frames: rightFrames, frameRate: 5, repeat: -1 });

    }

    update(time) {
        for (var i = 0; i < this.sprite.length; i++) {
            if (this.sprite[i].active) {
                this.sprite[i].body.setVelocityX(-1 * this.speed);
                this.sprite[i].body.setVelocityY(0);
                this.sprite[i].anims.play("leftSlime", true);
            }
        }
    }

}
