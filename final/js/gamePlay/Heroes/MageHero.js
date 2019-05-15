//Day time player
import {
    HEROES
} from "../../constants/PlayerTypes.js";
import {
    DayPlayer
} from "../DayPlayer.js";

export class MageHero extends DayPlayer {

    constructor(data) {
        super(data);
        this.playerType = HEROES.MAGE_HERO; //Sword, mage, shield?
        this.health = 3;
        this.basicAttack = 1;
        this.basicAttackSpeed = 200;
        this.beams = [];
        this.specialAttack = 5;
        this.specialAttackSpeed = 5;
        this.speed = 400;

        this.attackCooldown = 1;
        this.damageCooldown = 3;
        this.create();
    }
    init() {}
    preload() {}

    create() {
        //Calling the DayPlayer's create
        super.create();

        // Mage animation
        var leftFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftMage',
            frames: leftFrames,
            frameRate: 5,
            repeat: -1
        });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 5,
            end: 5,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftIdleMage',
            frames: leftIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var leftBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'attackLeft/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftBasicAttackMage',
            frames: leftBasicAttackFrame,
            frameRate: 5,
            repeat: 0
        });

        var rightFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightMage',
            frames: rightFrames,
            frameRate: 5,
            repeat: -1
        });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 5,
            end: 5,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleMage',
            frames: rightIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var rightBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'attackRight/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightBasicAttackMage',
            frames: rightBasicAttackFrame,
            frameRate: 5,
            repeat: 0
        });

        var upFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upMage',
            frames: upFrames,
            frameRate: 5,
            repeat: -1
        });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upIdleMage',
            frames: upIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var upBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'attackUp/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upBasicAttackMage',
            frames: upBasicAttackFrame,
            frameRate: 5,
            repeat: 0
        });

        var downFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downMage',
            frames: downFrames,
            frameRate: 5,
            repeat: -1
        });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downIdleMage',
            frames: downIdleFrame,
            frameRate: 5,
            repeat: -1
        });
        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'attackDown/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downBasicAttackMage',
            frames: downBasicAttackFrame,
            frameRate: 5,
            repeat: 0
        });

        var magicFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 11,
            zeroPad: 4,
            prefix: 'magic/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'magic',
            frames: magicFrame,
            frameRate: 10,
            repeat: 0
        });

        var magicExplosionFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 12,
            end: 13,
            zeroPad: 4,
            prefix: 'magic/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'magicExp',
            frames: magicExplosionFrame,
            frameRate: 7,
            repeat: 0
        });

        var superMagicFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, {
            start: 1,
            end: 26,
            zeroPad: 4,
            prefix: 'superMagic/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'superMagic',
            frames: superMagicFrame,
            frameRate: 10,
            repeat: 0
        });





        //Changing the size of the bounding box and offsetting it 



    }
    update(angle, time) {
        if (this.active && this.sprite.body) {
            super.update(time);


            if (this.angle > -3*Math.PI / 8 && this.angle <= 3*Math.PI / 8) {
                if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                    this.sprite.anims.play("rightIdleMage");
                } else {
                    this.sprite.anims.play("rightMage", true);
                }
            } else if (this.angle >= -5* Math.PI / 8 && this.angle <= -3*Math.PI / 8) {
                if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                    this.sprite.anims.play("upIdleMage");
                } else {
                    this.sprite.anims.play("upMage", true);
                }
            } else if ((this.angle > 5 * Math.PI / 8 && this.angle <= Math.PI) || (this.angle < -5 * Math.PI / 8 && this.angle >= -Math.PI)) {
                if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                    this.sprite.anims.play("leftIdleMage");
                } else {
                    this.sprite.anims.play("leftMage", true);
                }
            } else if (this.angle <= 5 * Math.PI / 8 && this.angle > 3*Math.PI / 8) {
                if (this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0) {
                    this.sprite.anims.play("downIdleMage");
                } else {
                    this.sprite.anims.play("downMage", true);
                }
            }
        }
        //console.log("wat");
        for(var i=0; i<this.beams.length; i++){
            //console.log("test");
            if(this.beams[i].counter == 8 && this.beams[i].elapsedFrames != 13){
                console.log(this.beams[i].prevPointX, this.beams[i].prevPointY);

                let new1 = this.scene.physics.add.sprite(this.beams[i].prevPointX + this.beams[i].xFactor,this.beams[i].prevPointY + this.beams[i].yFactor,'beamPart').setScale(3,3);
                new1.body.setSize(this.beams[i].yy,this.beams[i].xx);
                new1.body.setOffset(0,0);
                new1.beamSprite = this.beams[i];
                this.beams[i].parts.add(new1);
                this.beams[i].prevPointX = this.beams[i].prevPointX + this.beams[i].xFactor;
                this.beams[i].prevPointY = this.beams[i].prevPointY + this.beams[i].yFactor; 

                let new2 = this.scene.physics.add.sprite(this.beams[i].prevPointX + this.beams[i].xFactor,this.beams[i].prevPointY  + this.beams[i].yFactor,'beamPart').setScale(3,3);
                new2.body.setSize(this.beams[i].yy,this.beams[i].xx);
                new2.body.setOffset(0,0);
                new2.beamSprite = this.beams[i];
                this.beams[i].parts.add(new2);  
                this.beams[i].prevPointX = this.beams[i].prevPointX + this.beams[i].xFactor;
                this.beams[i].prevPointY = this.beams[i].prevPointY + this.beams[i].yFactor; 


                this.beams[i].counter = 0;
                this.beams[i].elapsedFrames++;
            }else{
                this.beams[i].counter++;
            }
        }
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor) {
        this.isAttacking = true; //Need this for animation
        let pointY;
        let pointX;

        let dist = 140;
        pointX = this.sprite.x + dist * (Math.sin(Math.PI / 2 - this.angle));
        pointY = this.sprite.y + dist * (Math.cos(Math.PI / 2 - this.angle));

        /*
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
        */

        let magicBeamSprite = this.scene.physics.add.sprite(pointX, pointY, HEROES.MAGE_HERO, 'magic/0001.png').setScale(5, 5);
        magicBeamSprite.class = this;
        magicBeamSprite.enemiesHit = [];
        this.beam = magicBeamSprite;
        //Want to destroy shieldBeam if it hits the wall (so that it doesn't attack slimes on the other side of the wall)
        //this.scene.physics.add.collider(magicBeamSprite,this.scene.wallLayer);
        //this.scene.physics.add.collider(shieldBeamSprite,this.scene.enemyGroup.getChildren());

        let xx = Math.abs(magicBeamSprite.height * (Math.sin(this.angle + Math.PI / 2))) + Math.abs(magicBeamSprite.width * (Math.sin(this.angle)));
        let yy = Math.abs(magicBeamSprite.width * (Math.cos(this.angle))) + Math.abs(magicBeamSprite.height * (Math.cos(this.angle + Math.PI / 2)));

        magicBeamSprite.body.setSize(xx-15, yy-15);
        magicBeamSprite.body.setOffset(magicBeamSprite.body.offset.x - 65, magicBeamSprite.body.offset.y - 65);
        //shieldBeamSprite.body.reset(shieldBeamSprite.x, shieldBeamSprite.y);

        magicBeamSprite.setRotation(this.angle);

        magicBeamSprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, magicBeamSprite);

        magicBeamSprite.on('animationcomplete_magic', function (o1) {
            if (!this.exploding) {
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
            }
        });

        magicBeamSprite.body.setVelocityY(this.basicAttackSpeed * Math.sin(this.angle));
        magicBeamSprite.body.setVelocityX(this.basicAttackSpeed * Math.cos(this.angle));
        magicBeamSprite.anims.play("magic");
        //The beam attacked
        this.scene.physics.add.overlap(magicBeamSprite, this.scene.enemyGroup.getChildren(), function (magicBeamSprite, enemySprite) {
            if (!magicBeamSprite.exploding) {
                magicBeamSprite.exploding = true;
                magicBeamSprite.anims.play("magicExp");
                magicBeamSprite.body.setSize(32, 32);
                magicBeamSprite.body.setOffset(0, 0);
            }
            if (!magicBeamSprite.enemiesHit.includes(enemySprite)) {
                magicBeamSprite.enemiesHit.push(enemySprite);
                magicBeamSprite.scene.hittingWithMagicBeam(magicBeamSprite, enemySprite);
            }
        });

        magicBeamSprite.on('animationcomplete_magicExp', function (o1) {
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

        this.scene.sound.play("audiomageattack", {
            "volume": 30
        });
    }

    /*
    explosion(magicBeamSprite){
        //console.log(shieldSprite);
        magicBeamSprite.anims.play("magicExp");   

        magicBeamSprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, magicBeamSprite);
        
        magicBeamSprite.on('animationcomplete_shieldExp', function (o1) {
            enemySprite.class.justGotHit = false; 
            magicBeamSprite.destroy();                   
        });
    }
*/

    attackSpecial(cursor, angle) {
        this.isAttacking = true; //Need this for animation
        let pointY;
        let pointX;

        let dist = 800;
        pointX = this.sprite.x + dist * (Math.sin(Math.PI / 2 - this.angle));
        pointY = this.sprite.y + dist * (Math.cos(Math.PI / 2 - this.angle));

        let partPointX = this.sprite.x + 140 * (Math.sin(Math.PI / 2 - this.angle));
        let partPointY = this.sprite.y + 140 * (Math.cos(Math.PI / 2 - this.angle));

        
        let superMagicBeamSprite = this.scene.add.sprite(pointX, pointY, HEROES.MAGE_HERO, 'superMagic/0001.png').setScale(8, 8);
        superMagicBeamSprite.class = this;
        superMagicBeamSprite.xFactor = 50*(Math.sin(Math.PI / 2 - this.angle));
        superMagicBeamSprite.yFactor = 50*(Math.cos(Math.PI / 2 - this.angle));
        superMagicBeamSprite.prevPointX = partPointX + 50*(Math.sin(Math.PI / 2 - this.angle));
        superMagicBeamSprite.prevPointY = partPointY + 50*(Math.cos(Math.PI / 2 - this.angle));
        superMagicBeamSprite.counter = 0;
        superMagicBeamSprite.elapsedFrames = 0;
        superMagicBeamSprite.parts = this.scene.physics.add.group();
        console.log(superMagicBeamSprite);
        console.log((superMagicBeamSprite.width/2) * Math.cos(this.angle));
        superMagicBeamSprite.parts.add(this.scene.physics.add.sprite(partPointX,partPointY,'beamPart').setScale(3,3));
        superMagicBeamSprite.parts.add(this.scene.physics.add.sprite(partPointX + 50*(Math.sin(Math.PI / 2 - this.angle)), partPointY + 50*(Math.cos(Math.PI / 2 - this.angle)), 'beamPart').setScale(3, 3));
       
        superMagicBeamSprite.counter = 0;
        superMagicBeamSprite.enemiesHit = [];
        this.beam = superMagicBeamSprite;
        

        
        let xx = Math.abs(superMagicBeamSprite.parts.getChildren()[0].height * (Math.sin(this.angle + Math.PI / 2))) + Math.abs(superMagicBeamSprite.parts.getChildren()[0].width * (Math.sin(this.angle)));
        let yy = Math.abs(superMagicBeamSprite.parts.getChildren()[0].width * (Math.cos(this.angle))) + Math.abs(superMagicBeamSprite.parts.getChildren()[0].height * (Math.cos(this.angle + Math.PI / 2)));
        superMagicBeamSprite.xx = xx;
        superMagicBeamSprite.yy = yy;
        console.log("SUPER MAGIC",xx,yy );
        
        superMagicBeamSprite.parts.getChildren()[0].body.setSize(yy,xx);
        superMagicBeamSprite.parts.getChildren()[0].body.setOffset(0,0);
        superMagicBeamSprite.parts.getChildren()[0].beamSprite = superMagicBeamSprite;
        superMagicBeamSprite.parts.getChildren()[1].body.setSize(yy,xx);
        superMagicBeamSprite.parts.getChildren()[1].body.setOffset(0,0);
        superMagicBeamSprite.parts.getChildren()[1].beamSprite = superMagicBeamSprite;
        /*superMagicBeamSprite.parts[2].body.setSize(yy,xx);
        superMagicBeamSprite.parts[2].body.setOffset(0,0);
        superMagicBeamSprite.parts[3].body.setSize(yy,xx);
        superMagicBeamSprite.parts[3].body.setOffset(0,0);
        superMagicBeamSprite.parts[4].body.setSize(yy,xx);
        superMagicBeamSprite.parts[4].body.setOffset(0,0);
        superMagicBeamSprite.parts[5].body.setSize(yy,xx);
        superMagicBeamSprite.parts[5].body.setOffset(0,0);*/

        //superMagicBeamSprite.body.setOffset(80,10);
        console.log(superMagicBeamSprite.body);
        console.log(this.sprite.x, this.sprite.y);
        //superMagicBeamSprite.body.x = this.sprite.x;
        //superMagicBeamSprite.body.y = this.sprite.y;

        //superMagicBeamSprite.body.setOffset(superMagicBeamSprite.body.offset.x-40, superMagicBeamSprite.body.offset.y-40);

        superMagicBeamSprite.setRotation(this.angle);

        superMagicBeamSprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, superMagicBeamSprite);

        superMagicBeamSprite.on('animationcomplete_superMagic', function (o1) {
            console.log(this.parts);
            let children = this.parts.getChildren();
            for(var i = 0; i< children.length; i++){
                children[i].destroy();
                i--;
            }
            this.parts.destroy();
            this.parts = null;
            this.class.beams.splice(this.class.beams.indexOf(this),1);
            console.log(this.class.beams);
            this.destroy();
        });
        this.beams.push(superMagicBeamSprite);
        //superMagicBeamSprite.body.setVelocityY(this.basicAttackSpeed * Math.sin(this.angle));
        //superMagicBeamSprite.body.setVelocityX(this.basicAttackSpeed * Math.cos(this.angle));
        superMagicBeamSprite.anims.play("superMagic");

        //The beam attacked
        this.scene.physics.add.overlap(superMagicBeamSprite.parts.getChildren(), this.scene.enemyGroup.getChildren(), function (beamPart, enemySprite) {
            if (!beamPart.beamSprite.enemiesHit.includes(enemySprite)) {
                beamPart.beamSprite.enemiesHit.push(enemySprite);
                beamPart.beamSprite.scene.hittingWithSuperMagicBeam(beamPart.beamSprite, enemySprite);
            }
        });



        this.scene.sound.play("audiomageattack", {
            "volume": 30
        });
    





    }

    swap() {
        return super.swap(this.playerType);
    }




}
