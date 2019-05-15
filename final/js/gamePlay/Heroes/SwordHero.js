//Day time player
import {
    HEROES
} from "../../constants/PlayerTypes.js";
import {
    DayPlayer
} from "../DayPlayer.js";

export class SwordHero extends DayPlayer {

    constructor(data) {
        super(data);
        this.playerType = HEROES.SWORD_HERO; //Sword, mage, shield?
        this.health = 3;
        this.basicAttack = 2;
        this.basicAttackSpeed = 3;
        this.specialAttack = 0.025;
        this.specialAttackSpeed = 4;
        this.speed = 400;

        this.atkDist = 150;     //Attack distance
        this.hitBoxSize = 1.3;

        this.attackCooldown = 1;
        this.damageCooldown = 3;
        this.sprite.class = this; 

        this.continueSpecialAttack = false;
        this.startSpecialAttackTime;
        this.specialAttackDuration = 5; //5 seconds
        this.specialBlinkSpeed = 200;
        this.lastSpecialBlinked = 0;

        this.create();
    }
    init() {}
    preload() {}

    create() {
        //Calling the DayPlayer's create
        super.create();

        // Sword animation
        var leftFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftSword',
            frames: leftFrames,
            frameRate: 5,
            repeat: -1
        });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 5,
            end: 5,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftIdleSword',
            frames: leftIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var leftBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackLeft/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftBasicAttackSword',
            frames: leftBasicAttackFrame,
            frameRate: 13,
            repeat: 0
        });

        var rightFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightSword',
            frames: rightFrames,
            frameRate: 5,
            repeat: -1
        });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 5,
            end: 5,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleSword',
            frames: rightIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var rightBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackRight/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightBasicAttackSword',
            frames: rightBasicAttackFrame,
            frameRate: 13,
            repeat: 0
        });

        var upFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upSword',
            frames: upFrames,
            frameRate: 5,
            repeat: -1
        });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upIdleSword',
            frames: upIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var upBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackUp/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upBasicAttackSword',
            frames: upBasicAttackFrame,
            frameRate: 13,
            repeat: 0
        });

        var downFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downSword',
            frames: downFrames,
            frameRate: 5,
            repeat: -1
        });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downIdleSword',
            frames: downIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackDown/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downBasicAttackSword',
            frames: downBasicAttackFrame,
            frameRate: 13,
            repeat: 0
        });

        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackDown/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downBasicAttackSword',
            frames: downBasicAttackFrame,
            frameRate: 13,
            repeat: 0
        });

        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackDown/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downBasicAttackSword',
            frames: downBasicAttackFrame,
            frameRate: 13,
            repeat: 0
        });

        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'attackDown/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downBasicAttackSword',
            frames: downBasicAttackFrame,
            frameRate: 13,
            repeat: 0
        });

        var specialStartFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1,end: 9, zeroPad: 4, prefix: 'specialStart/',suffix: '.png'});
        this.anims.create({ key: 'specialStart', frames: specialStartFrame, frameRate: 10, repeat: 0 });

        var specialAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1,end: 5, zeroPad: 4, prefix: 'special/',suffix: '.png'});
        this.anims.create({ key: 'special', frames: specialAttackFrame, frameRate: 5, repeat: -1 });
        
        var specialEndFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1,end: 9, zeroPad: 4, prefix: 'specialStart/',suffix: '.png'});
        this.anims.create({ key: 'specialEnd', frames: specialEndFrame, frameRate: 10, repeat: 0 });




        this.sprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, this.sprite);

        this.sprite.on('animationcomplete_rightBasicAttackSword', function () {
            this.class.attacking = false;
        });
        this.sprite.on('animationcomplete_upBasicAttackSword', function () {
            this.class.attacking = false;
        });
        this.sprite.on('animationcomplete_leftBasicAttackSword', function () {
            this.class.attacking = false;
        });
        this.sprite.on('animationcomplete_downBasicAttackSword', function () {
            this.class.attacking = false;
        });
        this.sprite.on('animationcomplete_specialStart', function (o1) {
            this.class.continueSpecialAttack = true;
            this.anims.play("special", true);
            this.class.startSpecialAttackTime = this.class.time;
        });
        this.sprite.on('animationcomplete_specialEnd', function () {
            this.class.specialAttacked = false;
            this.class.attacking = false;
            this.class.invincible = false;
        });



        // animation
        var swordFrame = this.anims.generateFrameNames(this.playerType, {
            start: 1,
            end: 3,
            zeroPad: 4,
            prefix: 'sword/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'sword',
            frames: swordFrame,
            frameRate: 10,
            repeat: 0
        });


        //Changing the size of the bounding box and offsetting it 
        //this.sprite.body.setSize(15,20,false);
        //this.sprite.body.setOffset((this.sprite.x + this.sprite.width/2)-this.sprite.body.center.x , (this.sprite.y + this.sprite.height/2) - this.sprite.body.center.y);

    }
    update(time, angle) {
        if (this.active && this.sprite.body) {
            super.update(time);

            if(this.continueSpecialAttack){
                this.attackSpecialContinued(time);
            }

            if (!this.attacking) {
                if (this.angle > -3*Math.PI / 8 && this.angle <= 3*Math.PI / 8) {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("rightIdleSword");
                    } else {
                        this.sprite.anims.play("rightSword", true);
                    }
                } else if (this.angle >= -5* Math.PI / 8 && this.angle <= -3*Math.PI / 8) {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("upIdleSword");
                    } else {
                        this.sprite.anims.play("upSword", true);
                    }
                    this.sprite.body.angle = this.angle + Math.PI / 2; //Rotates the box (playerclass)
                } else if ((this.angle > 5 * Math.PI / 8 && this.angle <= Math.PI) || (this.angle < -5 * Math.PI / 8 && this.angle >= -Math.PI)) {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("leftIdleSword");
                    } else {
                        this.sprite.anims.play("leftSword", true);
                    }
                    this.sprite.body.angle = this.angle - Math.PI; //Rotates the box (playerclass)
                } else if (this.angle <= 5 * Math.PI / 8 && this.angle > 3*Math.PI / 8) {
                    if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                        this.sprite.anims.play("downIdleSword");
                    } else {
                        this.sprite.anims.play("downSword", true);
                    }
                    this.sprite.body.angle = this.angle - Math.PI / 2; //Rotates the box (playerclass)
                }
            }         
        }
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle, shieldSprite) {
        this.attacking = true;
        if (this.angle > -3*Math.PI / 8 && this.angle <= 3*Math.PI / 8) {
            this.sprite.anims.play("rightBasicAttackSword", true);
        } else if (this.angle >= -5* Math.PI / 8 && this.angle <= -3*Math.PI / 8) {
            this.sprite.anims.play("upBasicAttackSword", true);
        } else if ((this.angle > 5 * Math.PI / 8 && this.angle <= Math.PI) || (this.angle < -5 * Math.PI / 8 && this.angle >= -Math.PI)) {
            this.sprite.anims.play("leftBasicAttackSword", true);
        } else if (this.angle <= 5 * Math.PI / 8 && this.angle > 3*Math.PI / 8) {
            this.sprite.anims.play("downBasicAttackSword", true);
        }

        console.log("attttacking");
        let pointY;
        let pointX;

        pointX = this.sprite.x + this.atkDist * (Math.sin(Math.PI / 2 - this.angle));
        pointY = this.sprite.y + this.atkDist * (Math.cos(Math.PI / 2 - this.angle));


        let swordSlashSprite = this.scene.physics.add.sprite(pointX, pointY, HEROES.SWORD_HERO, 'sword/0001.png').setScale(5, 5);
        swordSlashSprite.class = this;
        swordSlashSprite.enemiesHit = [];

        this.scene.physics.add.collider(swordSlashSprite, this.scene.wallLayer);
        //this.scene.physics.add.collider(swordSlashSprite,this.scene.enemyGroup.getChildren());
        
        let xx = Math.abs(this.hitBoxSize*swordSlashSprite.height * (Math.sin(this.angle + Math.PI / 2))) + this.hitBoxSize*Math.abs(swordSlashSprite.width * (Math.sin(this.angle)));
        let yy = Math.abs(this.hitBoxSize*swordSlashSprite.width * (Math.cos(this.angle))) + this.hitBoxSize*Math.abs(swordSlashSprite.height * (Math.cos(this.angle + Math.PI / 2)));

        swordSlashSprite.body.setSize(xx, yy);


        let radius = 2;
        //swordSlashSprite.body.setOffset(radius*Math.cos(super.properAngle())-swordSlashSprite.width/2,radius*Math.sin(super.properAngle())-swordSlashSprite.height/2);
        swordSlashSprite.body.setOffset(radius*Math.cos(super.properAngle())-1,radius*Math.sin(super.properAngle())-1);

        swordSlashSprite.setRotation(this.angle - Math.PI / 4);

        swordSlashSprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, swordSlashSprite);

        swordSlashSprite.on('animationcomplete_sword', function (o1) {
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

        swordSlashSprite.body.setVelocityY(this.basicAttackSpeed * Math.sin(this.angle));
        swordSlashSprite.body.setVelocityX(this.basicAttackSpeed * Math.cos(this.angle));
        //console.log(shieldSprite);        
        swordSlashSprite.anims.play("sword");

        //The beam attacked
        this.scene.physics.add.overlap(swordSlashSprite, this.scene.enemyGroup.getChildren(), function (swordSlashSprite, enemySprite) {
            if (!swordSlashSprite.enemiesHit.includes(enemySprite)) {
                swordSlashSprite.enemiesHit.push(enemySprite);
                swordSlashSprite.scene.hittingWithSwordBeam(swordSlashSprite, enemySprite);
            }
        });
        //play sound
        this.scene.sound.play("audioswordslice", {
            "volume": 30
        });
    }

    attackSpecial(cursor, angle) {
        this.attacking = true;
        this.sprite.anims.play("specialStart", true);
        this.angle = 0;
        //When the animation is completed, it will run the rest of the function
    }

    //This function follows after attackSpecial()
    attackSpecialContinued(time){
        if(Math.floor(time/1000) - Math.floor(this.startSpecialAttackTime/1000) < this.specialAttackDuration){
                    
            this.invincible = true;
            this.sprite.enemiesHit = [];

            this.scene.physics.add.overlap(this.sprite, this.scene.enemyGroup.getChildren(), function (tornado, enemySprite) {
                if (!tornado.enemiesHit.includes(enemySprite)) {
                    tornado.enemiesHit.push(enemySprite);
                    tornado.scene.hittingWithTornado(tornado, enemySprite);
                }
            });

            if(Math.floor(time/1000) - Math.floor(this.startSpecialAttackTime/1000) > this.specialAttackDuration-2){
                if(this.scene.time.now - this.lastSpecialBlinked >  + this.specialBlinkSpeed){
                    this.blink();
                    this.lastSpecialBlinked = this.scene.time.now;
                }
            }
        }
        else{
            this.sprite.anims.playReverse("specialEnd");
            this.continueSpecialAttack = false;
            this.sprite.clearTint();
        }
    }

    blink(){
        if(!this.sprite.isTinted){
            this.sprite.tint = 0x6283ff;
        }
        else{
            this.sprite.clearTint();
        }
    }

    swap() {
        return super.swap(this.playerType);
    }




}
