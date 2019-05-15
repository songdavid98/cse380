import {
    SCENES
} from "../constants/SceneNames.js";
import {
    ENEMIES
} from "../constants/EnemyTypes.js";
import {
    HEROES
} from "../constants/PlayerTypes.js";

export class DayOverlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.DAY_OVERLAY
        })
    }
    init(data) {
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
        this.text;
        this.playerType = data.playerType;

        this.moneyText;
        this.checkIfMoneyIsSame = 0;
        this.timer = data.timer || 620;
        this.initTime = 0;
    }
    create() {

        if(this.dayScene.mapLevel == 'tutorial'){
            this.add.image(800, 820, "textBar").setScale(12.5, 10).setDepth(3);
            
            this.text = this.add.text(30, 790, "Welcome to the tutorial", {
                fontSize: '32px',
                fill: '#000000',
            }).setDepth(4);
        }
        else{
            
            //add timer
            let seconds = this.timer % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            this.timerText = this.add.text(20, 10, Math.floor(this.timer / 60) + ':' + seconds, {
                fontSize: '70px',
                fill: '#fff',
                strokeThickness: 10,
                stroke: "#000000"
            });

            this.bigTimerText = this.add.text(450, 300, Math.floor(this.timer / 60) + ':' + seconds, {
                fontSize: '270px',
                fill: '#fff',
                strokeThickness: 10,
                stroke: "#000000"
            });
            this.bigTimerText.visible = false;
            this.haveShownBigTimerText = false;
        }







        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        for (var i = 0; i < this.shieldHero.health; i++) {
            this.shieldHearts.push(this.add.image(50 + i * 75, 110, "heart1").setScale(2, 2).setDepth(3));
        }

        for (var i = 0; i < this.swordHero.health; i++) {
            this.swordHearts.push(this.add.image(50 + i * 75, 130, "heart2").setScale(2, 2).setDepth(2));
        }

        for (var i = 0; i < this.mageHero.health; i++) {
            this.mageHearts.push(this.add.image(50 + i * 75, 150, "heart3").setScale(2, 2).setDepth(1));
        }


        this.add.image(1300, 100, "coin").setScale(1.2, 1.2).setDepth(1);


        this.shieldIcon = this.add.image(300, 100, "shieldIcon").setScale(4).setDepth(1);
        this.shieldIcon.visible = false;
        this.swordIcon = this.add.image(300, 100, "swordIcon").setScale(4).setDepth(1);
        this.swordIcon.visible = false;
        this.staffIcon = this.add.image(300, 100, "staffIcon").setScale(4).setDepth(1);
        this.staffIcon.visible = false;









        //Death stuff
        this.deathText = this.add.text(600, 400, 'You are dead', {
            fontSize: '70px',
            fill: '#a700ff',
            strokeThickness: 10,
            stroke: "#ffffff"
        });
        this.deathText.setDepth(5);
        this.deathText.visible = false;
        this.haveShownDeathText = false;


        //variables
        this.shieldHealth = this.shieldHero.health;
        this.swordHealth = this.swordHero.health;
        this.mageHealth = this.mageHero.health;

        this.swapHeartPos();

        //Initialize text stuff
        this.moneyText = this.add.text(1335, 68, ':' + this.dayScene.money, {
            fontSize: '70px',
            fill: '#fff',
            strokeThickness: 10,
            stroke: "#000000"
        });

        
    }

    swapHeartPos(){
        this.heartDepth; //Shield, Sword, Mage   [depth, depth, depth, yPos, yPos, yPos]
            switch (this.dayScene.player.playerType) {
                case HEROES.SHIELD_HERO:
                    this.shieldIcon.visible = true;
                    this.swordIcon.visible = false;
                    this.staffIcon.visible = false;
                    this.heartDepth = [3, 2, 1, 150, 130, 110];
                    break;
                case HEROES.SWORD_HERO:
                    this.shieldIcon.visible = false;
                    this.swordIcon.visible = true;
                    this.staffIcon.visible = false;
                    this.heartDepth = [1, 3, 2, 110, 150, 130];
                    break;
                case HEROES.MAGE_HERO:
                    this.shieldIcon.visible = false;
                    this.swordIcon.visible = false;
                    this.staffIcon.visible = true;
                    this.heartDepth = [2, 1, 3, 130, 110, 150];
                    break;
            }
            for (let i = 0; i < this.shieldHero.health; i++) {
                this.shieldHearts[i].setDepth(this.heartDepth[0]);
                this.shieldHearts[i].y = this.heartDepth[3];
            }
            for (let i = 0; i < this.swordHero.health; i++) {
                this.swordHearts[i].setDepth(this.heartDepth[1]);
                this.swordHearts[i].y = this.heartDepth[4];
            }
            for (let i = 0; i < this.mageHero.health; i++) {
                this.mageHearts[i].setDepth(this.heartDepth[2]);
                this.mageHearts[i].y = this.heartDepth[5];
            }
    }


    update(time, delta) {

        //Change position of hearts depending on the currentHero
        if(this.playerType != this.dayScene.player.playerType){
            this.swapHeartPos();
            this.playerType = this.dayScene.player.playerType;
        }




        if (this.initTime == 0) {
            this.initTime = this.time.now;
            this.dayScene.initTime = this.time.now;
        }else{
            this.initTime = this.dayScene.initTime;
        }
        if (this.shieldHero.health > this.shieldHealth) {
            this.shieldHearts.push(this.add.image(50 + this.shieldHealth * 75, this.heartDepth[3], "heart1").setScale(2, 2).setDepth(this.heartDepth[0]));
            this.shieldHealth++;
        } else if (this.shieldHero.health < this.shieldHealth) {
            while (this.shieldHealth > this.shieldHero.health) {
                this.shieldHearts.pop().destroy();
                this.shieldHealth--;
            }
        }

        if (this.swordHero.health > this.swordHealth) {
            this.swordHearts.push(this.add.image(50 + this.swordHealth * 75, this.heartDepth[4], "heart2").setScale(2, 2).setDepth(this.heartDepth[1]));
            this.swordHealth++;
        } else if (this.swordHero.health < this.swordHealth) {
            while (this.swordHealth > this.swordHero.health) {
                this.swordHearts.pop().destroy();
                this.swordHealth--;
            }
        }

        if (this.mageHero.health > this.mageHealth) {
            this.mageHearts.push(this.add.image(50 + this.mageHealth * 75, this.heartDepth[5], "heart3").setScale(2, 2).setDepth(this.heartDepth[2]));
            this.mageHealth++;
        } else if (this.mageHero.health < this.mageHealth) {
            while (this.mageHealth > this.mageHero.health) {
                this.mageHearts.pop().destroy();
                this.mageHealth--;
            }
        }

        //------------------- Text box stuff -----------------------
        if(this.dayScene.mapLevel == 'tutorial'){
            if(this.text != this.dayScene.textWords){
                this.text.setText(this.dayScene.textWords);
            }
        }

        //---------------------------------------------------------

        if (this.shieldHero.health <= 0 && this.swordHero.health <= 0 && this.mageHero.health <= 0) {
            if(!this.haveShownDeathText){
                console.log("I'm completely dead");
                this.deathText.visible = true;
                this.haveShownDeathText = true;
            }
        }

        //--------------------------- Money Stuff -------------------------

        if (this.checkIfMoneyIsSame != this.dayScene.money) {
            this.moneyText.setText(':' + this.dayScene.money);
            this.checkIfMoneyIsSame = this.dayScene.money;
        }



        //------------------------- Time Stuff ------------------------------------
        if(this.dayScene.mapLevel != 'tutorial'){
            let timeRemaining = this.timer - (Math.floor(time / 1000) - Math.floor(this.initTime / 1000));
            let seconds = timeRemaining % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            this.timerText.setText(Math.floor(timeRemaining / 60) + ":" + seconds);
            this.bigTimerText.setText(Math.floor(timeRemaining / 60) + ":" + seconds);


            if (timeRemaining <= 5 && !this.haveShownBigTimerText){
                this.bigTimerText.visible = true;
                this.haveShownBigTimerText = true;
            }
            if (timeRemaining <= 0 && this.dayScene.level != 0) {
                this.dayScene.music.stop();
                this.scene.stop(this.sceneKey);
    
                //you win
                switch(this.dayScene.level){
                    case 1: 
                        this.unlockedLevels = [1,1,2,0,0,0,0,0];
                        break;
                    case 3: 
                        this.unlockedLevels = [1,1,1,1,2,0,0,0];
                        break;
                    case 5: 
                        this.unlockedLevels = [1,1,1,1,1,1,2,0];
                        break;
                }
                let data = {
                    "str":"moving to level select",
                    "unlockedLevels":this.unlockedLevels
                }
                this.scene.start(SCENES.LEVEL_SELECT,data);
                this.scene.stop();
            }
        }
    }


}
