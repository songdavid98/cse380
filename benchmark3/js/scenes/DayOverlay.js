import {SCENES} from "../constants/SceneNames.js";
import {ENEMIES} from "../constants/EnemyTypes.js";
import { HEROES } from "../constants/PlayerTypes.js";

export class DayOverlayScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.DAY_OVERLAY
        })
    }
    init(data){
        this.shieldHero = data.shieldHero;
        this.swordHero = data.swordHero;
        this.mageHero = data.mageHero;
        this.dayScene = data.dayScene;
        this.shieldHearts = [];
        this.swordHearts = [];
        this.mageHearts = [];
        this.shieldHealth;
        this.swordHealth;
        this.mageHealth;
        this.sceneKey = data.sceneKey;

        this.moneyText;
        this.checkIfMoneyIsSame = 0;
        this.timer = data.timer || 120;
        this.initTime = 0; 
    }
    create(){
        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        for(var i = 0; i < this.shieldHero.health; i++){
            this.shieldHearts.push(this.add.image(50 + i*75,110, "heart1").setScale(2,2).setDepth(3));
        }

        for(var i = 0; i < this.swordHero.health; i++){
            this.swordHearts.push(this.add.image(50 + i*75,130, "heart2").setScale(2,2).setDepth(2));
        }

        for(var i = 0; i < this.mageHero.health; i++){
            this.mageHearts.push(this.add.image(50 + i*75,150, "heart3").setScale(2,2).setDepth(1));
        }


        this.add.image(1300,100,"coin").setScale(1.2,1.2).setDepth(1);
        
        //add timer
        let seconds = this.timer % 60;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        this.timerText = this.add.text(20, 10, Math.floor(this.timer/60) + ':' + seconds, { fontSize: '70px', fill: '#fff', strokeThickness: 10, stroke:"#000000"});

        //variables
        this.shieldHealth = this.shieldHero.health;
        this.swordHealth = this.swordHero.health;
        this.mageHealth = this.mageHero.health;


        //Initialize text stuff
        this.moneyText = this.add.text(1335, 68, ':' + this.dayScene.money, { fontSize: '70px', fill: '#fff', strokeThickness: 10, stroke:"#000000"});
        this.deathText = null;
        
        //add button events
        
        //add keyboard keys
    }
    update(time, delta){

        //Change position of hearts depending on the currentHero
        let heartDepth;       //Shield, Sword, Mage   [depth, depth, depth, yPos, yPos, yPos]
        switch(this.dayScene.player.playerType){
            case HEROES.SHIELD_HERO:
                heartDepth = [3,2,1, 150,130,110];
                break;
            case HEROES.SWORD_HERO:
                heartDepth = [1,3,2, 110,150,130];
                break;
            case HEROES.MAGE_HERO:
                heartDepth = [2,1,3, 130,110,150];
                break;
        }
        for(let i = 0; i < this.shieldHero.health; i++){
            this.shieldHearts[i].setDepth(heartDepth[0]);
            this.shieldHearts[i].y = heartDepth[3];
        }
        for(let i = 0; i < this.swordHero.health; i++){
            this.swordHearts[i].setDepth(heartDepth[1]);
            this.swordHearts[i].y = heartDepth[4];
        }
        for(let i = 0; i < this.mageHero.health; i++){
            this.mageHearts[i].setDepth(heartDepth[2]);
            this.mageHearts[i].y = heartDepth[5];
        }

    


        if(this.initTime == 0){
            this.initTime = this.time.now;
        }
        if(this.shieldHero.health > this.shieldHealth){
            this.shieldHearts.push(this.add.image(50 + this.shieldHealth*75,100, "heart1").setScale(2,2).setDepth(1));
            this.shieldHealth++;
        }
        else if(this.shieldHero.health < this.shieldHealth){
            while(this.shieldHealth > this.shieldHero.health){
                this.shieldHearts.pop().destroy();
                this.shieldHealth--;    
            }
        } 

        if(this.swordHero.health > this.swordHealth){
            this.swordHearts.push(this.add.image(50 + this.swordHealth*75,120, "heart2").setScale(2,2).setDepth(1));
            this.swordHealth++;
        }
        else if(this.swordHero.health < this.swordHealth){
            while(this.swordHealth > this.swordHero.health){
                this.swordHearts.pop().destroy();
                this.swordHealth--;    
            }
        } 

        if(this.mageHero.health > this.mageHealth){
            this.mageHearts.push(this.add.image(50 + this.mageHealth*75,140, "heart3").setScale(2,2).setDepth(1));
            this.mageHealth++;
        }
        else if(this.mageHero.health < this.mageHealth){
            while(this.mageHealth > this.mageHero.health){
                this.mageHearts.pop().destroy();
                this.mageHealth--;    
            }
        } 

        //---------------------------------------------------------

        if(this.shieldHero.health <= 0 && this.swordHero.health <= 0 && this.mageHero.health <= 0 && this.deathText == null){
            this.deathText = this.add.text(600, 400, 'You are dead', { fontSize: '70px', fill: '#a700ff', strokeThickness: 10, stroke:"#ffffff"});
        }

        //--------------------------- Money Stuff -------------------------

        if(this.checkIfMoneyIsSame != this.dayScene.money){   
            this.moneyText.setText(':' + this.dayScene.money);
            this.checkIfMoneyIsSame = this.dayScene.money;
        }
        
        
        
        //------------------------- Time Stuff ------------------------------------
        let timeRemaining = this.timer - (Math.floor(time/1000)-Math.floor(this.initTime/1000));
        let seconds = timeRemaining % 60;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        this.timerText.setText(Math.floor(timeRemaining/60) + ":" + seconds);
        if(timeRemaining <= 0){
            this.scene.stop(this.sceneKey);
            console.log(this.dayScene.money);
            this.scene.start(SCENES.NIGHT,{"level":1,"money":this.dayScene.money+200});
            this.scene.stop();
        }
    }


}