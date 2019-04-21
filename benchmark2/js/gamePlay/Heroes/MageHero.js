//Day time player
import {HEROES} from "../../constants/PlayerTypes.js";
import { DayPlayer } from "../DayPlayer.js";
export class MageHero{

    constructor(data){
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
    init(){

    }

    preload(){
      

    }
    create(){
        

        // animation
        /*
        var shieldFrame = this.anims.generateFrameNames(this.playerType, { start: 1, end: 16, zeroPad: 4, prefix:'shield/', suffix:'.png' });
        this.anims.create({ key: 'shield', frames: shieldFrame, frameRate: 10, repeat: 0 });
        */


    }
    update(angle, time){
        
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




}
