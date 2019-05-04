
import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import { CutScene } from "./CutScene.js";


export class Beginning extends CutScene{
    constructor(){
        super({
            key: SCENES.BEGINNING
        })
    }
    init(data){
        super.init(data);
        this.shieldGroundY = 650;
        this.swordGroundY = 670;
        this.mageGroundY = 655;
        this.shield = "Shield Hero";
        this.sword = "Sword Hero";
        this.mage = "Mage Hero";
        this.vilGrl = "Village Girl";
        console.log("Beginning Cutscene");

        this.charTimeLength = 50; //In milliseconds
        this.lastCharTime = 0;
        this.str = "";
        this.onlyOnce = true;
        this.counter = 0;
        this.strFinished = false;
        this.arr = [];
    }
    preload(){
        super.preload();

        this.load.image("skyImg", "assets/images/tiles/bigsky.png");
        this.load.image("castle", "assets/images/cutScene/castle.png");


        this.load.tilemapTiledJSON("beginningCutscene", "./assets/tilemaps/beginningCutscene.json");


    }
    create(){
        
        this.map = this.add.tilemap("beginningCutscene");
        this.skyImg = this.map.addTilesetImage("bigsky", "skyImg"); //Variable used in pathfinding
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        let scale = 3;
        this.skyLayer = this.map.createStaticLayer("sky", [this.skyImg], -1400, 0).setScale(scale,scale).setDepth(0); 
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], -1400, 0).setScale(scale,scale).setDepth(0);
        this.grassLayer = this.map.createStaticLayer("grass", [this.terrain], -1400, 0).setScale(scale,scale).setDepth(0);
        
        this.skyLayer.alpha = 0;
        this.baseLayer.alpha = 0;
        this.grassLayer.alpha = 0;



        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        this.add.image(800, 820, "textBar").setScale(12.5, 10).setDepth(10);
        this.castleImg = this.add.image(800, 420, "castle").setScale(13, 13).setDepth(0);
        this.castleImg.visible = false;

        this.text = this.add.text(30, 790, "", {
            fontSize: '32px',
            fill: '#000000',
        }).setDepth(11);
        this.character = this.add.text(20, 755, "", {
            fontSize: '32px',
            fill: '#000000',
            strokeThickness: '1',
            stroke: '#000000'
        }).setDepth(11);


        this.text.fixedToCamera = false;
        this.character.fixedToCamera = true;

        console.log("Beginning Cutscene");

    }

    update(time){
        super.update(time);

        if(Math.floor(this.lineCounter) != this.lineCounter ){  //Second time click means finish displaying
            //Line counter is in increments of 0.5
            if(!this.onlyOnce){         //Using this.onlyOnce as a variable but it's negated ... Sorry
                this.arr.length = 0;    //Reset
                this.onlyOnce = true;   //Reset
                this.counter = 0;       //Reset
                this.text.setText(this.str);

                if(this.strFinished){           //If the line naturally finishes,
                    this.strFinished = false;   //Reset
                    this.lineCounter += 0.5;    //Move onto next line automatically
                    return;
                }
            }
        }
        else if(this.lineCounter == 0){
            if(this.onlyOnce){
                this.str = "In a certain world that is quite different from where you live today,\nthere was a place where a large kingdom existed.";
                this.castleImg.visible = true;
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        
        else if(this.lineCounter == 1){
            if(this.onlyOnce){
                this.str = "And in this kingdom, there were strong heroes who protected the royal castle.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 2){
            if(this.onlyOnce){
                this.str = "But our focus won't be on those heroes, nor anyone from royalty.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

        }
        else if(this.lineCounter == 3){
            if(this.onlyOnce){
                this.str = "It's about three Heroes who had nothing better to do than to stroll around\noutside and find money.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

        }
        else if(this.lineCounter == 4){
            if(this.onlyOnce){

                this.shieldHeroSprite.visible = true;
                this.swordHeroSprite.visible = true;
                this.mageHeroSprite.visible = true;

                this.castleImg.visible = false;
                this.character.setText(this.mage);
                this.str = "Ugh... How much longer do we have to run for?";

                this.shieldHeroSprite.setPosition(1000,this.shieldGroundY);
                this.swordHeroSprite.setPosition(1150,this.swordGroundY);
                this.mageHeroSprite.setPosition(1300,this.mageGroundY);

                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

            this.skyLayer.alpha = 1;
            this.baseLayer.alpha = 1;
            this.grassLayer.alpha = 1;

            this.walk();
        }
        else if(this.lineCounter == 5){
            if(this.onlyOnce){
                this.character.setText(this.shield);
                this.str = "So it seems there isn't a Wendy's nearby. Mcdonalds anyone?";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

            this.stop();
            this.turn(HEROES.SHIELD_HERO, "right");
        }
        else if(this.lineCounter == 6){
            if(this.onlyOnce){
                this.character.setText(this.sword);
                this.str = "No thanks";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

        }
        else if(this.lineCounter == 7){
            if(this.onlyOnce){
                this.character.setText(this.mage);
                this.str = "I'll pass.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 8){
            if(this.onlyOnce){
                this.character.setText(this.shield);
                this.str = "Then what do you guys want?";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 9){
            if(this.onlyOnce){
                this.character.setText(this.mage);
                this.str = "I don't know. You decide.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 10){
            if(this.onlyOnce){
                this.character.setText(this.sword);
                this.str = "I don't care. Just get me food. I'm staaaaaaaaarving.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 11){
            if(this.onlyOnce){
                this.character.setText(this.sword);
                this.str = "Uhhh... Well, you two always deny every place I bring up.\nHow about you guys decide for today?";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 12){
            if(this.onlyOnce){
                this.character.setText(this.sword);
                this.str = "No thanks";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

        }
        else if(this.lineCounter == 13){
            if(this.onlyOnce){
                this.character.setText(this.mage);
                this.str = "I'll pass.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 14){
            if(this.onlyOnce){
                this.character.setText(this.shield);
                this.str = "I hate you people.";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        
        else if(this.lineCounter == 15){
            if(this.onlyOnce){
                this.character.setText(this.vilGrl);
                this.str = "Excuse me!";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

            this.villageGirlSprite.anims.play("leftVillageGirl", true);
            if(this.villageGirlSprite.body.position.x < 500){
                this.villageGirlSprite.body.velocity.x = 10;
            }
            else{
                this.villageGirlSprite.body.velocity.x = 0;
            }

        }
    }



    oneTimeOnly(str){
        this.arr = this.str.split("");
        this.onlyOnce = false;        
        this.text.text = "";
    }

    displayText(time,counter){
        if(Math.floor((time)) - Math.floor(this.lastCharTime) >= this.charTimeLength){
            if(counter < this.str.length){
                this.text.setText(this.text.text.concat(this.arr[counter]));
                this.lastCharTime = time;
                return true;
            }
            else{
                this.strFinished = true;
                return false;
            }
        }
    }

    turn(hero, dir){
        switch(hero){
            case HEROES.SHIELD_HERO:
                if(dir == "left"){ this.shieldHeroSprite.anims.play("leftIdleShield"); }
                else if(dir == "right"){ this.shieldHeroSprite.anims.play("rightIdleShield"); }
                break;

            case HEROES.SWORD_HERO:   
                if(dir == "left"){ this.swordHeroSprite.anims.play("leftIdleSword"); }
                else if(dir == "right"){this.swordHeroSprite.anims.play("rightIdleSword"); }
                break;

            case HEROES.MAGE_HERO:
                if(dir == "left"){ this.mageHeroSprite.anims.play("leftIdleMage"); }
                else if(dir == "right"){ this.mageHeroSprite.anims.play("rightIdleMage"); }
                break;


        }
    }

    walk(){
        this.shieldHeroSprite.anims.play("leftShield", true);
        this.swordHeroSprite.anims.play("leftSword", true);
        this.mageHeroSprite.anims.play("leftMage", true);

        if(this.skyLayer.x < 0){
            this.skyLayer.x += 0.2;
        }
        else{
            this.skyLayer.x = -1400;
        }
        if(this.baseLayer.x < 0){
            this.baseLayer.x += 0.3;
            this.grassLayer.x += 0.3;
        }
        else{
            this.baseLayer.x = -1400;
            this.grassLayer.x = -1400;
        }
    }

    stop(){
        this.shieldHeroSprite.anims.play("leftIdleShield");
        this.swordHeroSprite.anims.play("leftIdleSword");
        this.mageHeroSprite.anims.play("leftIdleMage");
    }

}























