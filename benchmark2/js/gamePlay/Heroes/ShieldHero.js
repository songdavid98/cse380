//Day time player
import {HEROES} from "../../constants/PlayerTypes.js";
import { DayPlayer } from "../DayPlayer.js";
export class ShieldHero{

    constructor(data){
        this.playerType = HEROES.SHEILD_HERO; //Sword, mage, shield?
        this.health = 3;
        this.basicAttack = 0;
        this.basicAttackSpeed = 5;
        this.specialAttack = 2;
        this.specialAttackSpeed = 3;
        this.speed = 300;

        this.damageCooldown = 3;
        this.attackCooldown = 1;
        this.swapCooldown = 2;

        this.scene = data.scene;

        this.anims = data.anims;

        this.create();
    }
    init(){

    }

    preload(){
      

    }
    create(){



    }
    update(angle, time){
       
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle, shieldSprite){
        console.log(shieldSprite);
        //tempSprite.anims.play("shield", true);
        
        shieldSprite.class.hero.anims.play("shield",true);

        shieldSprite.body.setVelocityY(this.basicAttackSpeed*Math.sin(angle));
        shieldSprite.body.setVelocityX(this.basicAttackSpeed*Math.cos(angle));
   
    }




    attackSpecial(cursor, angle){


    }








}
