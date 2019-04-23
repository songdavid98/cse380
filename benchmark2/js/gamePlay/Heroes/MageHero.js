//Day time player
import {HEROES} from "../../constants/PlayerTypes.js";
import { DayPlayer } from "../DayPlayer.js";

export class MageHero extends DayPlayer{

    constructor(data){
        super(data);
        this.playerType = HEROES.MAGE_HERO; //Sword, mage, shield?
        this.health = 3;
        this.basicAttack = 3;
        this.basicAttackSpeed = 3;
        this.specialAttack = 5;
        this.specialAttackSpeed = 5;
        this.speed = 300;

        this.attackCooldown = 1;
        this.damageCooldown = 3;
        this.swapCooldown = 2;
        this.create();
    }
    init(){}
    preload(){}

    create(){
        
        // Mage animation
        var leftFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftMage', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleMage', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
        var leftBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackLeft/', suffix:'.png' });
        this.anims.create({ key: 'leftBasicAttackMage', frames: leftBasicAttackFrame, frameRate: 5, repeat: 0 });

        var rightFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightMage', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleMage', frames: rightIdleFrame, frameRate: 5, repeat: -1 });
        var rightBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackRight/', suffix:'.png' });
        this.anims.create({ key: 'rightBasicAttackMage', frames: rightBasicAttackFrame, frameRate: 5, repeat: 0 });

        var upFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upMage', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleMage', frames: upIdleFrame, frameRate: 5, repeat: -1 });
        var upBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'attackUp/', suffix:'.png' });
        this.anims.create({ key: 'upBasicAttackMage', frames: upBasicAttackFrame, frameRate: 5, repeat: 0 });

        var downFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downMage', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleMage', frames: downIdleFrame, frameRate: 5, repeat: -1 });
        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackDown/', suffix:'.png' });
        this.anims.create({ key: 'downBasicAttackMage', frames: downBasicAttackFrame, frameRate: 5, repeat: 0 });



    }
    update(angle, time){
        if(this.active){
            super.update(time);


            if(this.angle > -Math.PI/4 && this.angle <= Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("rightIdleMage"); 
                }
                else{
                    this.sprite.anims.play("rightMage",true);
                }
                this.sprite.setRotation(this.angle);                //Rotates the image
                this.sprite.body.angle = this.angle;                 //Rotates the box (playerclass)
            }
            else if(this.angle > -3*Math.PI/4 && this.angle <= -Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                this.sprite.anims.play("upIdleMage");
                }
                else{
                    this.sprite.anims.play("upMage",true); 
                }
                this.sprite.setRotation(this.angle + Math.PI/2);     //Rotates the image
                this.sprite.body.angle = this.angle + Math.PI/2;     //Rotates the box (playerclass)
            }
            else if((this.angle > 3*Math.PI/4 && this.angle <= Math.PI) ||  (this.angle <= -3*Math.PI/4 && this.angle >= -Math.PI)){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("leftIdleMage");
                }
                else{
                    this.sprite.anims.play("leftMage",true);
                }
                this.sprite.setRotation(this.angle - Math.PI);       //Rotates the image
                this.sprite.body.angle = this.angle - Math.PI;       //Rotates the box (playerclass)
            }
            else if(this.angle <= 3*Math.PI/4 && this.angle > Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("downIdleMage");
                }
                else{
                    this.sprite.anims.play("downMage",true);
                }
                this.sprite.setRotation(this.angle - Math.PI/2);     //Rotates the image
                this.sprite.body.angle = this.angle - Math.PI/2;     //Rotates the box (playerclass)
            }
        }
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle, shieldSprite){
        /*
        shieldSprite.anims.play("shield", true);
        shieldSprite.body.setVelocityY(this.basicAttackSpeed*Math.sin(angle));
        shieldSprite.body.setVelocityX(this.basicAttackSpeed*Math.cos(angle));
        */
 
        
    }

    attackSpecial(cursor, angle){


    }

    swap(){
        return super.swap(this.playerType);
    }




}
