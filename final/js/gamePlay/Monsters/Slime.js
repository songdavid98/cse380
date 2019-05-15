import {
    ENEMIES
} from "../../constants/EnemyTypes.js";
import {
    HEROES
} from "../../constants/PlayerTypes.js";
import {
    Enemy
} from "../Enemy.js";

export class Slime extends Enemy { // ---- someone fix this~

    constructor(data) {
        super(data);
        this.enemyType = ENEMIES.SLIME; // like slime
        this.health = 3;
        this.totalHealth = this.health; //Keep this for health bar stuff
        this.basicAttack = 1;
        this.basicAttackSpeed = 100;
        this.attackCooldown = 5;
        this.attacking = null;
        this.targetFound = null;
        this.speed = 125;
        this.movement = Math.floor(Math.random() * 200) + 25; //Monster keeps moving in square pattern for now
        this.killCost = 10;
        this.lastAttacked = 0;
        this.projectileGroup;
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

        this.frameRate = 5; //Frame rate has to be defined here (with var)

        var leftFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftSlime',
            frames: leftFramesSlime,
            frameRate: this.frameRate,
            repeat: -1
        });
        var leftIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftIdleSlime',
            frames: leftIdleFrameSlime,
            frameRate: this.frameRate,
            repeat: -1
        });

        var rightFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightSlime',
            frames: rightFramesSlime,
            frameRate: this.frameRate,
            repeat: -1
        });
        var rightIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleSlime',
            frames: rightIdleFrameSlime,
            frameRate: this.frameRate,
            repeat: -1
        });

        var upFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upSlime',
            frames: upFramesSlime,
            frameRate: this.frameRate,
            repeat: -1
        });
        var upIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upIdleSlime',
            frames: upIdleFrameSlime,
            frameRate: this.frameRate,
            repeat: -1
        });

        var downFramesSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downSlime',
            frames: downFramesSlime,
            frameRate: this.frameRate,
            repeat: -1
        });
        var downIdleFrameSlime = this.anims.generateFrameNames(ENEMIES.SLIME, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downIdleSlime',
            frames: downIdleFrameSlime,
            frameRate: this.frameRate,
            repeat: -1
        });
    }

    dayUpdate(time) {
        //Call the enemy class dayUpdate
        super.dayUpdate(time);

        //this.sprite.body.setVelocityY(this.speed*Math.sin(Phaser.Math.Angle.BetweenPoints(this.sprite, this.scene.player.sprite)));
        //this.sprite.body.setVelocityX(this.speed*Math.cos(Phaser.Math.Angle.BetweenPoints(this.sprite, this.scene.player.sprite)));
        if (!this.dead && !this.scene.player.dead) {
            let distance = Phaser.Math.Distance.Between(this.sprite.body.position.x, this.sprite.body.position.y, this.scene.player.sprite.body.x, this.scene.player.sprite.body.y);
            //console.log(Phaser.Math.Angle.BetweenPoints(this.sprite, this.scene.player.sprite));
            if (this.targetFound) {
                //console.log(this.sprite.body.position.x);
                //console.log(Phaser.Math.Distance.Between(this.sprite.body.position.x,this.sprite.body.position.y,this.scene.player.sprite.body.x,this.scene.player.sprite.body.y));
                if (distance > 500) {
                    this.targetFound = false;
                    this.attacking = false;
                } else {
                    this.targetFound = this.scene.player.sprite;
                    this.attacking = true;
                }
            } else {
                if (distance <= 500) {
                    this.targetFound = this.scene.player.sprite;
                    this.attacking = true;
                }
            }

            if (this.attacking) {
                if (time - (this.lastAttacked + this.attackCooldown * 1000) >= 0) {
                    this.lastAttacked = time;
                    this.sprite.body.setVelocity(0, 0);
                    this.attack();
                } else {
                    this.attacking = false;
                }
            }
        }

        if (this.active && !this.dead && !this.attacking) {
            if (this.direction == 1) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(-this.speed);
                this.sprite.anims.play("upSlime", true);
                this.moveCounter++;
                if (this.moveCounter >= this.movement) {
                    this.direction = 2;
                    this.moveCounter = 0;
                }
            } else if (this.direction == 2) {
                this.sprite.body.setVelocityX(-this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("leftSlime", true);
                this.moveCounter++;
                if (this.moveCounter >= this.movement) {
                    this.direction = 3;
                    this.moveCounter = 0;
                }
            } else if (this.direction == 3) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(this.speed);
                this.sprite.anims.play("downSlime", true);
                this.moveCounter++;
                if (this.moveCounter >= this.movement) {
                    this.direction = 4;
                    this.moveCounter = 0;
                }
            } else if (this.direction == 4) {
                this.sprite.body.setVelocityX(this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("rightSlime", true);
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
        this.sprite.anims.play("leftSlime", true);
        //        if (this.active) {
        //            this.sprite.body.setVelocityX(-1 * this.speed);
        //            this.sprite.body.setVelocityY(0);
        //            this.sprite.anims.play("leftSlime", true);
        //        }
    }
    attack() {
        //calculations
        let dist = 50;
        let angle = Phaser.Math.Angle.BetweenPoints(this.sprite, this.scene.player.sprite);
        let pointX = this.sprite.x + dist * (Math.sin(Math.PI / 2 - angle));
        let pointY = this.sprite.y + dist * (Math.cos(Math.PI / 2 - angle));

        let attackBall = this.scene.physics.add.sprite(pointX, pointY, HEROES.MAGE_HERO, 'magic/0001.png').setScale(2, 2);
        
        this.scene.projectileGroup.add(attackBall);
        
        attackBall.body.setVelocityY(this.basicAttackSpeed * Math.sin(angle));
        attackBall.body.setVelocityX(this.basicAttackSpeed * Math.cos(angle));
        attackBall.setRotation(angle);
        attackBall.body.setOffset(0, 0);
        attackBall.anims.play('magic');
        attackBall.class = this;
        attackBall.reflected = false;

        attackBall.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, attackBall);

        attackBall.on('animationcomplete_magic', function (o1) {
            if(!this.reflected){
                this.destroy();
            }
            else{
                console.log("REFLECTEDDDDDDDDDDDDDD OWWWWWWWWWOOOOOOOOO");
            }
        });

        //add colliders
        this.scene.physics.add.overlap(attackBall, this.scene.swordHeroSprite, function (attackBall, playerSprite) {
            playerSprite.class.damage(attackBall);
            attackBall.destroy();
        });
        this.scene.physics.add.overlap(attackBall, this.scene.shieldHeroSprite, function (attackBall, playerSprite) {
            playerSprite.class.damage(attackBall);
            attackBall.destroy();
        });
        this.scene.physics.add.overlap(attackBall, this.scene.mageHeroSprite, function (attackBall, playerSprite) {
            playerSprite.class.damage(attackBall);
            attackBall.destroy();
        });
    }

}
