//Day time player
import {HEROES} from "../constants/PlayerTypes.js";
import {ENEMIES} from "../constants/EnemyTypes.js";
import { ShieldHero } from "./Heroes/ShieldHero.js";
import { SwordHero } from "./Heroes/SwordHero.js";
import { MageHero } from "./Heroes/MageHero.js";

export class DayPlayer{

    constructor(data){
        this.playerType = data.playerType;
        this.allHeroSprites = data.allHeroSprites;
        this.sprite = data.sprite;               //The current sprite is the 'sprite' variable in this class
        this.keyboard = data.keyboard;
        this.physics = data.physics;
        this.anims = data.anims;
        this.money = 0;
        this.dead = false;
        this.angle = 0;

        this.scene = data.scene;
        this.previousTime = 0;
        this.lastDamaged = 0;
        this.lastSwapped = 0;
        
        this.active = true; //FIXME: remove this

        //Create all heroes first. When switching characters, set this.hero to a hero
        this.shieldHero = new ShieldHero({"sprite":this.allHeroSprites[0], "anims":this.anims,"scene":this.scene});
        this.swordHero = new SwordHero({"sprite":this.allHeroSprites[1], "anims":this.anims,"scene":this.scene});
        this.mageHero = new MageHero({"sprite":this.allHeroSprites[2], "anims":this.anims,"scene":this.scene});

        //Instantiate hero as the shieldHero
        this.hero = this.shieldHero;

        //Lastly, call in the animations
        this.create();
    }

    init(){

    }

    preload(){
      

    }
    create(){
        console.log(this.anims);

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
        
         // Sword animation
         var leftFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
         this.anims.create({ key: 'leftSword', frames: leftFrames, frameRate: 5, repeat: -1 });
         var leftIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
         this.anims.create({ key: 'leftIdleSword', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
         var leftBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackLeft/', suffix:'.png' });
         this.anims.create({ key: 'leftBasicAttackSword', frames: leftBasicAttackFrame, frameRate: 5, repeat: 0 });
 
         var rightFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
         this.anims.create({ key: 'rightSword', frames: rightFrames, frameRate: 5, repeat: -1 });
         var rightIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
         this.anims.create({ key: 'rightIdleSword', frames: rightIdleFrame, frameRate: 5, repeat: -1 });
         var rightBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackRight/', suffix:'.png' });
         this.anims.create({ key: 'rightBasicAttackSword', frames: rightBasicAttackFrame, frameRate: 5, repeat: 0 });
 
         var upFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
         this.anims.create({ key: 'upSword', frames: upFrames, frameRate: 5, repeat: -1 });
         var upIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
         this.anims.create({ key: 'upIdleSword', frames: upIdleFrame, frameRate: 5, repeat: -1 });
         var upBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'attackUp/', suffix:'.png' });
         this.anims.create({ key: 'upBasicAttackSword', frames: upBasicAttackFrame, frameRate: 5, repeat: 0 });
 
         var downFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
         this.anims.create({ key: 'downSword', frames: downFrames, frameRate: 5, repeat: -1 });
         var downIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
         this.anims.create({ key: 'downIdleSword', frames: downIdleFrame, frameRate: 5, repeat: -1 });
         var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackDown/', suffix:'.png' });
         this.anims.create({ key: 'downBasicAttackSword', frames: downBasicAttackFrame, frameRate: 5, repeat: 0 });

         /*
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
        */
        var downFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downMage', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleMage', frames: downIdleFrame, frameRate: 5, repeat: -1 });
        var downBasicAttackFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'attackDown/', suffix:'.png' });
        this.anims.create({ key: 'downBasicAttackMage', frames: downBasicAttackFrame, frameRate: 5, repeat: 0 });
       
    
        var shieldFrame = this.anims.generateFrameNames(HEROES.SHEILD_HERO, { start: 1, end: 16, zeroPad: 4, prefix:'shield/', suffix:'.png' });
        this.anims.create({ key: 'shield', frames: shieldFrame, frameRate: 10, repeat: 0 });


        this.hero.create();


    }
    update(time){
        //Gets the time of the game and stores it as a variable
        this.time = time;   

        if(this.active === true){
            //if either are released, set velocityX to 0 for now
            //what if an enemy makes someone move?
            //NOTE: keycodes => W = 87, A = 65, S = 83, D = 68
            if(this.keyboard.keys[68].isUp || this.keyboard.keys[65].isUp){     //if D and A are up
                this.sprite.body.setVelocityX(0);
            }
            if(this.keyboard.keys[65].isDown && this.keyboard.keys[68].isDown){ //if D and A are down
                this.sprite.body.setVelocityX(0);
            }
            else if(this.keyboard.keys[65].isDown){                            //else if A is down (and not D)
                this.sprite.body.setVelocityX(-this.hero.speed);
            }
            else if(this.keyboard.keys[68].isDown){                            //else if D is down (and not A)
                this.sprite.body.setVelocityX(this.hero.speed);
            }

            if(this.keyboard.keys[83].isUp || this.keyboard.keys[87].isUp){     //if S and W are up
                this.sprite.body.setVelocityY(0);
            }
            if(this.keyboard.keys[83].isDown && this.keyboard.keys[87].isDown){ //if S and W are down
                this.sprite.body.setVelocityY(0);
            }
            else if(this.keyboard.keys[83].isDown){                            //if S is down (and not W)
                this.sprite.body.setVelocityY(this.hero.speed); //y goes down, not up
            }
            else if(this.keyboard.keys[87].isDown){                            //if W is down (and not S)
                this.sprite.body.setVelocityY(-this.hero.speed);
            }

            //Rotation of sprite and box
            if(this.angle > -Math.PI/4 && this.angle <= Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("rightIdleShield"); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("rightIdleSword"); break;
                        //case HEROES.MAGE_HERO: this.sprite.anims.play("rightIdleMage"); break;
                    }
                    
                }else{
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("rightShield",true); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("rightSword",true); break;
                        //case HEROES.MAGE_HERO: this.sprite.anims.play("rightMage",true); break;
                    }
                }
                this.sprite.setRotation(this.angle);                //Rotates the image
                this.sprite.body.angle = this.angle;                 //Rotates the box (playerclass)
            }
            else if(this.angle > -3*Math.PI/4 && this.angle <= -Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("upIdleShield"); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("upIdleSword"); break;
                        //case HEROES.MAGE_HERO: this.sprite.anims.play("upIdleMage"); break;
                    }
                }else{
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("upShield",true); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("upSword",true); break;
                        //case HEROES.MAGE_HERO: this.sprite.anims.play("upMage",true); break;
                    }
                }
                this.sprite.setRotation(this.angle + Math.PI/2);     //Rotates the image
                this.sprite.body.angle = this.angle + Math.PI/2;     //Rotates the box (playerclass)
            }
            else if((this.angle > 3*Math.PI/4 && this.angle <= Math.PI) ||  (this.angle <= -3*Math.PI/4 && this.angle >= -Math.PI)){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("leftIdleShield"); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("leftIdleSword"); break;
                        //case HEROES.MAGE_HERO: this.sprite.anims.play("leftIdleMage"); break;
                    }
                }else{
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("leftShield",true); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("leftSword",true); break;
                       // case HEROES.MAGE_HERO: this.sprite.anims.play("leftMage",true); break;
                    }
                }
                this.sprite.setRotation(this.angle - Math.PI);       //Rotates the image
                this.sprite.body.angle = this.angle - Math.PI;       //Rotates the box (playerclass)
            }
            else if(this.angle <= 3*Math.PI/4 && this.angle > Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("downIdleShield"); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("downIdleSword"); break;
                        case HEROES.MAGE_HERO: this.sprite.anims.play("downIdleMage"); break;
                    }
                }else{
                    switch(this.playerType){
                        case HEROES.SHIELD_HERO: this.sprite.anims.play("downShield",true); break;
                        case HEROES.SWORD_HERO: this.sprite.anims.play("downSword",true); break;
                        case HEROES.MAGE_HERO: this.sprite.anims.play("downMage",true); break;
                    }
                }
                this.sprite.setRotation(this.angle - Math.PI/2);     //Rotates the image
                this.sprite.body.angle = this.angle - Math.PI/2;     //Rotates the box (playerclass)
            }

            
        } 
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle, tempSprite){
        
        //Call the hero's attackBasic first
        //tempSprite.anims.play("shield",true);
        tempSprite.anims = this.anims;
        console.log(this.anims);

        //this.hero.attackBasic(cursor, angle, tempSprite);
        
        //Rotation of sprite and box
        if(angle > -Math.PI/4 && angle <= Math.PI/4){
            console.log("atacked");
            switch(this.playerType){
                case HEROES.SHIELD_HERO: this.sprite.anims.play("rightBasicAttackShield"); break;
                case HEROES.SWORD_HERO: this.sprite.anims.play("rightBasicAttackSword"); break;
                //case HEROES.MAGE_HERO: this.sprite.anims.play("rightBasicAttackMage"); break;
            }
        }
        else if(angle > -3*Math.PI/4 && angle <= -Math.PI/4){
            switch(this.playerType){
                case HEROES.SHIELD_HERO: this.sprite.anims.play("upBasicAttackShield"); break;
                case HEROES.SWORD_HERO: this.sprite.anims.play("upBasicAttackSword"); break;
                //case HEROES.MAGE_HERO: this.sprite.anims.play("upBasicAttackMage"); break;
            }
        }
        else if((angle > 3*Math.PI/4 && angle <= Math.PI) ||  (angle <= -3*Math.PI/4 && angle >= -Math.PI)){
            switch(this.playerType){
                case HEROES.SHIELD_HERO: this.sprite.anims.play("leftBasicAttackShield"); break;
                case HEROES.SWORD_HERO: this.sprite.anims.play("leftBasicAttackSword"); break;
                //case HEROES.MAGE_HERO: this.sprite.anims.play("leftBasicAttackMage"); break;
            }
        }
        else if(angle <= 3*Math.PI/4 && angle > Math.PI/4){
            switch(this.playerType){
                case HEROES.SHIELD_HERO: this.sprite.anims.play("downBasicAttackShield"); break;
                case HEROES.SWORD_HERO: this.sprite.anims.play("downBasicAttackSword"); break;
                //case HEROES.MAGE_HERO: this.sprite.anims.play("downBasicAttackMage"); break;
            }
        }
   
    }

    getMoney(monster){
        if(this.money < 99999){
            this.money += monster.class.money;
        }
        else{
            this.money = "MAXED_OUT";
        }
    }

    animationStopped(){
        console.log("destroyeeed");
    }

    attackSpecial(cursor, angle){


    }

    //ShieldHero => SwordHero => MageHero
    swap(){
        switch(this.playerType){
            case HEROES.SHIELD_HERO: 
                this.playerType = HEROES.SWORD_HERO;        //Set player type
                this.sprite = this.allHeroSprites[1];       //Set sprite
                this.hero = this.swordHero;                 //Set class
                break;
            case HEROES.SWORD_HERO:
                this.playerType = HEROES.MAGE_HERO;         //Set player type
                this.sprite = this.allHeroSprites[2];       //Set sprite
                this.hero = this.mageHero;                  //Set class
                break;
            case HEROES.MAGE_HERO:
                this.playerType = HEROES.SHIELD_HERO;       //Set player type
                this.sprite = this.allHeroSprites[0];       //Set sprite
                this.hero = this.shieldHero;                //Set class
                break;
            default:
                console.log("SWAAAAAAAAAAPPPPPPPPPPING ERRRRRRRRRRRRORRRRRRRRRRRRR");
        }
        return this.playerType;

       
    }


    damage(monster){
        if(this.health > 0){
            this.health -= monster.class.basicAttack;
            if(this.health <= 0){
                this.dead = true;
            }
        }
    }




}
