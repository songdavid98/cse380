//Day time player
import {
    HEROES
} from "../../constants/PlayerTypes.js";
import {
    DayPlayer
} from "../DayPlayer.js";

export class ShieldHero extends DayPlayer {

    constructor(data) {
        super(data);
        this.playerType = HEROES.SHIELD_HERO; //Sword, mage, shield?
        this.health = 3;
        this.basicAttack = 1;
        this.basicAttackSpeed = 300;
        this.specialAttack = 2;
        this.specialAttackSpeed = 3;
        this.speed = 400;

        this.damageCooldown = 3;
        this.attackCooldown = 1;

        this.create();
    }
    init() {}
    preload() {}

    create() {
        //Calling the DayPlayer's create
        super.create();
        // Shield animation
        var leftFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftShield',
            frames: leftFrames,
            frameRate: 5,
            repeat: -1
        });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'idleLeft/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftIdleShield',
            frames: leftIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var leftBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackLeft/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftBasicAttackShield',
            frames: leftBasicAttackFrame,
            frameRate: 10,
            repeat: 0
        });

        var rightFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightShield',
            frames: rightFrames,
            frameRate: 5,
            repeat: -1
        });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'idleRight/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleShield',
            frames: rightIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var rightBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackRight/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightBasicAttackShield',
            frames: rightBasicAttackFrame,
            frameRate: 10,
            repeat: 0
        });

        var upFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upShield',
            frames: upFrames,
            frameRate: 5,
            repeat: -1
        });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upIdleShield',
            frames: upIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var upBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackUp/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upBasicAttackShield',
            frames: upBasicAttackFrame,
            frameRate: 10,
            repeat: 0
        });

        var downFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downShield',
            frames: downFrames,
            frameRate: 5,
            repeat: -1
        });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downIdleShield',
            frames: downIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackDown/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downBasicAttackShield',
            frames: downBasicAttackFrame,
            frameRate: 10,
            repeat: 0
        });

        // animation
        var shieldFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 16,
            zeroPad: 4,
            prefix: 'shield/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'shield',
            frames: shieldFrame,
            frameRate: 10,
            repeat: 0
        });

        var shieldExplosionFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, {
            start: 1,
            end: 2,
            zeroPad: 4,
            prefix: 'shieldExplosion/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'shieldExp',
            frames: shieldExplosionFrame,
            frameRate: 10,
            repeat: 0
        });

        //Changing the size of the bounding box and offsetting it 
        //this.sprite.body.setSize(15,20,false);
        //this.sprite.body.setOffset((this.sprite.x + this.sprite.width/2)-this.sprite.body.center.x , (this.sprite.y + this.sprite.height/2) - this.sprite.body.center.y);


    }
    update(angle, time) {
        if (this.active && this.sprite.body) {
            super.update(time);


            if (this.angle > -Math.PI / 4 && this.angle <= Math.PI / 4) {
                if (this.isAttacking) {
                    this.sprite.anims.play("rightBasicAttackShield", true);
                    console.log("Comes here");
                } else {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("rightIdleShield");
                    } else {
                        this.sprite.anims.play("rightShield", true);
                    }
                }
                this.sprite.setRotation(this.angle); //Rotates the image
                this.rotation = this.angle;
                this.sprite.body.angle = this.angle; //Rotates the box (playerclass)
            } else if (this.angle > -3 * Math.PI / 4 && this.angle <= -Math.PI / 4) {
                if (this.isAttacking) {
                    this.sprite.anims.play("upBasicAttackShield", true);
                    console.log("Comes here");

                } else {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("upIdleShield");
                    } else {
                        this.sprite.anims.play("upShield", true);
                    }
                }
                this.sprite.setRotation(this.angle + Math.PI / 2); //Rotates the image
                this.rotation = this.angle + Math.PI / 2
                this.sprite.body.angle = this.angle + Math.PI / 2; //Rotates the box (playerclass)
            } else if ((this.angle > 3 * Math.PI / 4 && this.angle <= Math.PI) || (this.angle <= -3 * Math.PI / 4 && this.angle >= -Math.PI)) {
                if (this.isAttacking) {
                    this.sprite.anims.play("leftBasicAttackShield", true);
                    console.log("Comes here");

                } else {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("leftIdleShield");
                    } else {
                        this.sprite.anims.play("leftShield", true);
                    }
                }
                this.sprite.setRotation(this.angle - Math.PI); //Rotates the image
                this.rotation = this.angle - Math.PI;
                this.sprite.body.angle = this.angle - Math.PI; //Rotates the box (playerclass)
            } else if (this.angle <= 3 * Math.PI / 4 && this.angle > Math.PI / 4) {
                if (this.isAttacking) {
                    this.sprite.anims.play("downBasicAttackShield", true);
                } else {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("downIdleShield");
                    } else {
                        this.sprite.anims.play("downShield", true);
                        //console.log(this.sprite.anims); 
                    }
                }
                this.sprite.setRotation(this.angle - Math.PI / 2); //Rotates the image
                this.rotation = this.angle - Math.PI / 2;
                this.sprite.body.angle = this.angle - Math.PI / 2; //Rotates the box (playerclass)
            }
        }
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor) {
        this.isAttacking = true; //Need this for animation
        //  console.log(shieldSprite);
        //tempSprite.anims.play("shield", true);
        let pointY;
        let pointX;

        let dist = 100;
        pointX = this.sprite.x + dist * (Math.sin(Math.PI / 2 - this.angle));
        pointY = this.sprite.y + dist * (Math.cos(Math.PI / 2 - this.angle));

        this.sprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, this.sprite);
        this.sprite.on('animationcomplete_upBasicAttackShield', function (o1) {
            this.class.isAttacking = false;
        });
        this.sprite.on('animationcomplete_rightBasicAttackShield', function (o1) {
            this.class.isAttacking = false;
        });
        this.sprite.on('animationcomplete_leftBasicAttackShield', function (o1) {
            this.class.isAttacking = false;
        });
        this.sprite.on('animationcomplete_downBasicAttackShield', function (o1) {
            this.class.isAttacking = false;
        });


        let shieldBeamSprite = this.scene.physics.add.sprite(pointX, pointY, HEROES.SHIELD_HERO, 'shield/0001.png').setScale(5, 5);
        shieldBeamSprite.class = this;
        shieldBeamSprite.enemiesHit = [];

        //Want to destroy shieldBeam if it hits the wall (so that it doesn't attack slimes on the other side of the wall)
        this.scene.physics.add.collider(shieldBeamSprite, this.scene.wallLayer);
        //this.scene.physics.add.collider(shieldBeamSprite,this.scene.enemyGroup.getChildren());

        let xx = Math.abs(shieldBeamSprite.height * (Math.sin(this.angle + Math.PI / 2))) + Math.abs(shieldBeamSprite.width * (Math.sin(this.angle)));
        let yy = Math.abs(shieldBeamSprite.width * (Math.cos(this.angle))) + Math.abs(shieldBeamSprite.height * (Math.cos(this.angle + Math.PI / 2)));

        shieldBeamSprite.body.setSize(xx, yy);
        shieldBeamSprite.body.setOffset(shieldBeamSprite.body.offset.x - 60, shieldBeamSprite.body.offset.y - 20)
        //shieldBeamSprite.body.reset(shieldBeamSprite.x, shieldBeamSprite.y);

        shieldBeamSprite.setRotation(this.angle + Math.PI / 2);


        shieldBeamSprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, shieldBeamSprite);

        shieldBeamSprite.on('animationcomplete_shield', function (o1) {
            if (this.colliding) {
                for (var i = 0; i < this.colliding.length; i++) {
                    if (this.colliding[i]) {
                        this.colliding[i].class.active = true;
                    }
                }
            }
            this.colliding = null;
            this.enemiesHit = null;
            this.destroy();
        });


        shieldBeamSprite.body.setVelocityY(this.basicAttackSpeed * Math.sin(this.angle));
        shieldBeamSprite.body.setVelocityX(this.basicAttackSpeed * Math.cos(this.angle));
        //console.log(shieldSprite);        
        shieldBeamSprite.anims.play("shield");
        //The beam attacked
        this.scene.physics.add.overlap(shieldBeamSprite, this.scene.enemyGroup.getChildren(), function (shieldBeamSprite, enemySprite) {
            if (!shieldBeamSprite.enemiesHit.includes(enemySprite)) {
                shieldBeamSprite.enemiesHit.push(enemySprite);
                enemySprite.class.active = false;
                shieldBeamSprite.scene.hittingWithShieldBeam(shieldBeamSprite, enemySprite);
            }
        });
        if (this.scene.barrels) {
            this.scene.physics.add.overlap(shieldBeamSprite, this.scene.barrels.getChildren(), function (shieldBeamSprite, barrel) {
                barrel.body.setVelocity(shieldBeamSprite.body.velocity.x, shieldBeamSprite.body.velocity.y);
            });
        }
        if (Math.random() > 0.5)
            this.scene.sound.play("audioshieldattack1", {
                "volume": 15
            });
        else
            this.scene.sound.play("audioshieldattack2", {
                "volume": 15
            });
    }





    swap() {
        return super.swap(this.playerType);
    }


    attackSpecial(cursor, angle) {


    }








}
