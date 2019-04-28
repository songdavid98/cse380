//Day time player
import {HEROES} from "../../constants/PlayerTypes.js";
import { DayPlayer } from "../DayPlayer.js";

export class SwordHero extends DayPlayer{

    constructor(data){
        super(data);
        this.playerType = HEROES.SWORD_HERO; //Sword, mage, shield?
        this.health = 3;
        this.basicAttack = 3;
        this.basicAttackSpeed = 3;
        this.specialAttack = 5;
        this.specialAttackSpeed = 4;
        this.speed = 300;

        this.attackCooldown = 1;
        this.damageCooldown = 3;
        this.swapCooldown = 2;
        this.sprite.class = this;
        this.create();

    }
    init(){}
    preload(){}

    create(){
        // Sword animation
        var leftFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftSword', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleSword', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
        var leftBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'attackLeft/', suffix:'.png' });
        this.anims.create({ key: 'leftBasicAttackSword', frames: leftBasicAttackFrame, frameRate: 13, repeat: 0 });

        var rightFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightSword', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleSword', frames: rightIdleFrame, frameRate: 5, repeat: -1 });
        var rightBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'attackRight/', suffix:'.png' });
        this.anims.create({ key: 'rightBasicAttackSword', frames: rightBasicAttackFrame, frameRate: 13, repeat: 0 });

        var upFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upSword', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleSword', frames: upIdleFrame, frameRate: 5, repeat: -1 });
        var upBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'attackUp/', suffix:'.png' });
        this.anims.create({ key: 'upBasicAttackSword', frames: upBasicAttackFrame, frameRate: 13, repeat: 0 });

        var downFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downSword', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleSword', frames: downIdleFrame, frameRate: 5, repeat: -1 });
        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'attackDown/', suffix:'.png' });
        this.anims.create({ key: 'downBasicAttackSword', frames: downBasicAttackFrame, frameRate: 13, repeat: 0 });

        this.sprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, this.sprite);

        this.sprite.on('animationcomplete_rightBasicAttackSword', function(){
            this.class.attacking = false;
        });
        this.sprite.on('animationcomplete_upBasicAttackSword', function(){
            this.class.attacking = false;
        });
        this.sprite.on('animationcomplete_leftBasicAttackSword', function(){
            this.class.attacking = false;
        });
        this.sprite.on('animationcomplete_downBasicAttackSword', function () {
            //console.log("print");
            this.class.attacking = false;                   
        });
       
        // animation
        /*
        var shieldFrame = this.anims.generateFrameNames(this.playerType, { start: 1, end: 16, zeroPad: 4, prefix:'shield/', suffix:'.png' });
        this.anims.create({ key: 'shield', frames: shieldFrame, frameRate: 10, repeat: 0 });
        */


    }
    update(angle, time){

        if(this.active){
            super.update(time);
            if(!this.attacking){
                if(this.angle > -Math.PI/4 && this.angle <= Math.PI/4){
                    if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("rightIdleSword"); 
                    }
                    else{
                        this.sprite.anims.play("rightSword",true); 
                    }
                    this.sprite.setRotation(this.angle);                //Rotates the image
                    this.sprite.body.angle = this.angle;                 //Rotates the box (playerclass)
                }
                else if(this.angle > -3*Math.PI/4 && this.angle <= -Math.PI/4){
                    if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                        this.sprite.anims.play("upIdleSword");
                    }else{
                        this.sprite.anims.play("upSword",true);
                    }
                    this.sprite.setRotation(this.angle + Math.PI/2);     //Rotates the image
                    this.sprite.body.angle = this.angle + Math.PI/2;     //Rotates the box (playerclass)
                }
                else if((this.angle > 3*Math.PI/4 && this.angle <= Math.PI) ||  (this.angle <= -3*Math.PI/4 && this.angle >= -Math.PI)){
                    if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                        this.sprite.anims.play("leftIdleSword");
                    }else{
                        this.sprite.anims.play("leftSword",true); 
                    }
                    this.sprite.setRotation(this.angle - Math.PI);       //Rotates the image
                    this.sprite.body.angle = this.angle - Math.PI;       //Rotates the box (playerclass)
                }
                else if(this.angle <= 3*Math.PI/4 && this.angle > Math.PI/4){
                    if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                        this.sprite.anims.play("downIdleSword"); 
                    }
                    else{
                        this.sprite.anims.play("downSword",true);
                    }
                    this.sprite.setRotation(this.angle - Math.PI/2);     //Rotates the image
                    this.sprite.body.angle = this.angle - Math.PI/2;     //Rotates the box (playerclass)
                }
            }else{
                
            }
        }
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle, shieldSprite){
        this.attacking = true;
        if(this.angle > -Math.PI/4 && this.angle <= Math.PI/4){
            this.sprite.anims.play("rightBasicAttackSword", true);
        }else if(this.angle > -3*Math.PI/4 && this.angle <= -Math.PI/4){
            this.sprite.anims.play("upBasicAttackSword", true);
        }else if((this.angle > 3*Math.PI/4 && this.angle <= Math.PI) ||  (this.angle <= -3*Math.PI/4 && this.angle >= -Math.PI)){
            this.sprite.anims.play("leftBasicAttackSword", true);
        }else if(this.angle <= 3*Math.PI/4 && this.angle > Math.PI/4){
            this.sprite.anims.play("downBasicAttackSword", true);
        }
        
        console.log("attttacking");
        //  console.log(shieldSprite);
        //tempSprite.anims.play("shield", true);
        let pointY;
        let pointX;

        let dist = 100;
        pointX = this.sprite.x + dist*(Math.sin(Math.PI/2-this.angle)); 
        pointY = this.sprite.y + dist*(Math.cos(Math.PI/2-this.angle));

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
        this.scene.physics.add.collider(shieldBeamSprite,this.scene.wallLayer);
        //this.scene.physics.add.collider(shieldBeamSprite,this.scene.enemyGroup.getChildren());

        let xx = Math.abs(shieldBeamSprite.height * (Math.sin(this.angle + Math.PI/2))) + Math.abs(shieldBeamSprite.width * (Math.sin(this.angle)));
        let yy = Math.abs(shieldBeamSprite.width * (Math.cos(this.angle))) + Math.abs(shieldBeamSprite.height * (Math.cos(this.angle + Math.PI/2)));

        shieldBeamSprite.body.setSize(xx, yy);
        shieldBeamSprite.body.setOffset(shieldBeamSprite.body.offset.x-60, shieldBeamSprite.body.offset.y-20)
        //shieldBeamSprite.body.reset(shieldBeamSprite.x, shieldBeamSprite.y);

        shieldBeamSprite.setRotation(this.angle+ Math.PI/2);

    
        shieldBeamSprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, shieldBeamSprite);
        
        shieldBeamSprite.on('animationcomplete_shield', function (o1) {
            if(this.colliding){
                for(var i = 0; i < this.colliding.length; i++){
                    if(this.colliding[i]){
                        this.colliding[i].class.active = true;
                    }
                }
            }
            this.colliding = null;
            this.enemiesHit = null;
            this.destroy();                   
        });
        

        shieldBeamSprite.body.setVelocityY(this.basicAttackSpeed*Math.sin(this.angle));
        shieldBeamSprite.body.setVelocityX(this.basicAttackSpeed*Math.cos(this.angle));
        //console.log(shieldSprite);        
        shieldBeamSprite.anims.play("shield");  
        //The beam attacked
        this.scene.physics.add.overlap(shieldBeamSprite,this.scene.enemyGroup.getChildren(), function(shieldBeamSprite,enemySprite){
            if(!shieldBeamSprite.enemiesHit.includes(enemySprite)){
                shieldBeamSprite.enemiesHit.push(enemySprite);
                shieldBeamSprite.scene.hittingWithShieldBeam(shieldBeamSprite,enemySprite);    
            }
        });
    }

    attackSpecial(cursor, angle){


    }

    swap(){
        
        return super.swap(this.playerType);
    }




}
