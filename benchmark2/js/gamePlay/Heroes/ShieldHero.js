//Day time player
import {HEROES} from "../../constants/PlayerTypes.js";
import { DayPlayer } from "../DayPlayer.js";

export class ShieldHero extends DayPlayer{

    constructor(data){
        super(data);
        this.playerType = HEROES.SHIELD_HERO; //Sword, mage, shield?
        this.health = 3;
        this.basicAttack = 0;
        this.basicAttackSpeed = 15;
        this.specialAttack = 2;
        this.specialAttackSpeed = 3;
        this.speed = 300;

        this.damageCooldown = 3;
        this.attackCooldown = 1;
        this.swapCooldown = 2;

        this.scene = data.scene;


        this.create();
    }
    init(){}
    preload(){}

    create(){
        // Shield animation
        var leftFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftShield', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleShield', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
        var leftBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackLeft/', suffix:'.png' });
        this.anims.create({ key: 'leftBasicAttackShield', frames: leftBasicAttackFrame, frameRate: 5, repeat: 0 });

        var rightFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightShield', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleShield', frames: rightIdleFrame, frameRate: 5, repeat: -1 });
        var rightBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackRight/', suffix:'.png' });
        this.anims.create({ key: 'rightBasicAttackShield', frames: rightBasicAttackFrame, frameRate: 5, repeat: 0 });

        var upFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upShield', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleShield', frames: upIdleFrame, frameRate: 5, repeat: -1 });
        var upBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'attackUp/', suffix:'.png' });
        this.anims.create({ key: 'upBasicAttackShield', frames: upBasicAttackFrame, frameRate: 5, repeat: 0 });

        var downFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downShield', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleShield', frames: downIdleFrame, frameRate: 5, repeat: -1 });
        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackDown/', suffix:'.png' });
        this.anims.create({ key: 'downBasicAttackShield', frames: downBasicAttackFrame, frameRate: 5, repeat: 0 });
 
        // animation
        
        var shieldFrame = this.anims.generateFrameNames(HEROES.SHEILD_HERO, { start: 1, end: 16, zeroPad: 4, prefix:'shield/', suffix:'.png' });
        this.anims.create({ key: 'shield', frames: shieldFrame, frameRate: 10, repeat: 0 });


        

    }
    update(angle, time){
        if(this.active){
            super.update(time);

            
            if(this.angle > -Math.PI/4 && this.angle <= Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("rightIdleShield");  
                }
                else{
                    this.sprite.anims.play("rightShield",true);
                }
                this.sprite.setRotation(this.angle);                //Rotates the image
                this.sprite.body.angle = this.angle;                 //Rotates the box (playerclass)
            }
            else if(this.angle > -3*Math.PI/4 && this.angle <= -Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("upIdleShield"); 
                }
                else{
                    this.sprite.anims.play("upShield",true);
                }
                this.sprite.setRotation(this.angle + Math.PI/2);     //Rotates the image
                this.sprite.body.angle = this.angle + Math.PI/2;     //Rotates the box (playerclass)
            }
            else if((this.angle > 3*Math.PI/4 && this.angle <= Math.PI) ||  (this.angle <= -3*Math.PI/4 && this.angle >= -Math.PI)){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("leftIdleShield"); 
                }
                else{
                    this.sprite.anims.play("leftShield",true);
                }
                this.sprite.setRotation(this.angle - Math.PI);       //Rotates the image
                this.sprite.body.angle = this.angle - Math.PI;       //Rotates the box (playerclass)
            }
            else if(this.angle <= 3*Math.PI/4 && this.angle > Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("downIdleShield"); 
                }
                else{
                    this.sprite.anims.play("downShield",true); 
                }
                this.sprite.setRotation(this.angle - Math.PI/2);     //Rotates the image
                this.sprite.body.angle = this.angle - Math.PI/2;     //Rotates the box (playerclass)
            }
        }
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle, shieldSprite){
        console.log(shieldSprite);
        //tempSprite.anims.play("shield", true);
        

        shieldSprite.body.setVelocityY(this.basicAttackSpeed*Math.sin(angle));
        shieldSprite.body.setVelocityX(this.basicAttackSpeed*Math.cos(angle));
        console.log(shieldSprite.class.sprite);        
        shieldSprite.anims.play("shield");


   
    }



    swap(){
        console.log(this.playerType);
        return super.swap(this.playerType);
    }


    attackSpecial(cursor, angle){


    }








}
