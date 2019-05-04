
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
        this.chosenToFight = false;
        this.gaveAnswer = false;
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

        this.add.image(800, 820, "textBar").setScale(12.5, 10).setDepth(3);
        this.castleImg = this.add.image(800, 420, "castle").setScale(13, 13).setDepth(0);
        this.castleImg.visible = false;

        this.blackScreen = this.add.image(800, 420, "blackScreen").setScale(13, 13).setDepth(5);
        this.blackScreen.visible = false;

        this.text = this.add.text(30, 790, "", {
            fontSize: '32px',
            fill: '#000000',
        }).setDepth(4);
        this.character = this.add.text(20, 755, "", {
            fontSize: '32px',
            fill: '#000000',
            strokeThickness: '1',
            stroke: '#000000'
        }).setDepth(4);


        this.yesButton.setInteractive();
        this.noButton.setInteractive();

        this.yesButton.on("pointerdown", () => {
            console.log("YES we will fight");
            this.gaveAnswer = true;
            this.chosenToFight = true;
            this.lineCounter = 19.5;
        });

        this.noButton.on("pointerdown", () => {
            console.log("NO we will not fight");
            this.gaveAnswer = true;
            this.chosenToFight = false;
            this.lineCounter = 19.5;
        });


        this.music = this.sound.add("audiotitlesong");
        
        this.music.setLoop(true);
        if(!this.music.isPlaying){
            this.music.play();
        }


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
                    if(this.villageGirlSprite.body.position.x >= 700){
                        this.villageGirlSprite.body.velocity.x = 0;
                    }
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
                this.character.setText(this.shield);
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
                this.villageGirlSprite.visible = true;
                this.villageGirlSprite.setPosition(-100,650);
                this.character.setText(this.vilGrl);
                this.str = "Excuse me!";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

            this.villageGirlSprite.anims.play("rightVillageGirl", true);

            if(this.villageGirlSprite.body.position.x < 700){
                this.villageGirlSprite.body.velocity.x = 250;
                console.log("RUn");
            }
            else{
                console.log("STOP");
                this.villageGirlSprite.body.velocity.x = 0;
                this.villageGirlSprite.anims.play("rightIdleVillageGirl");
            }
        }
        else if(this.lineCounter == 16){
            if(this.onlyOnce){
                this.villageGirlSprite.body.velocity.x = 0;
                this.villageGirlSprite.setPosition(700,650);
                this.str = "Excuse me!";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

            this.villageGirlSprite.anims.play("rightIdleVillageGirl");
        }
        else if(this.lineCounter == 17){
            if(this.onlyOnce){
                this.str = "Are you heroes? If so, I need your help!";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 

            this.turn(HEROES.SHIELD_HERO,"left");
        }
        else if(this.lineCounter == 18){
            if(this.onlyOnce){
                this.str = "The prophet told me that monsters will be attacking our village tonight!";
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter == 19){
            if(this.onlyOnce){
                this.str = "So please! Could you three help me defend my village?";
                this.yesButton.active = true;
                this.yesButton.visible = true;
                this.noButton.active = true;
                this.noButton.visible = true;
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }


//------------------------------------------------------------------------------
        if(this.gaveAnswer){
            if(this.lineCounter == 20){
                if(!this.chosenToFight){
                    if(this.onlyOnce){
                        this.yesButton.active = false;
                        this.yesButton.visible = false;
                        this.noButton.active = false;
                        this.noButton.visible = false;
                        this.character.setText(this.shield);
                        this.str = "No thanks. We have to go find food.";
                        this.oneTimeOnly(this.str);
                    }
                    if(this.displayText(time, this.counter)){ this.counter++; } 
                }
                if(this.chosenToFight){
                    if(this.onlyOnce){
                        this.yesButton.active = false;
                        this.yesButton.visible = false;
                        this.noButton.active = false;
                        this.noButton.visible = false;
                        this.character.setText(this.shield);
                        this.str = "Sure! If you give us food.";
                        this.oneTimeOnly(this.str);
                    }
                    if(this.displayText(time, this.counter)){ this.counter++; } 
                }
            }
            else if(this.lineCounter == 21){
                if(!this.chosenToFight ){
                    if(this.onlyOnce){
                        this.character.setText(this.vilGrl);
                        this.str = "If you fight for my village, we can provide you a lot of food afterwards...";
                        this.oneTimeOnly(this.str);
                    }
                    if(this.displayText(time, this.counter)){ this.counter++; } 
                }
                else{
                    if(this.onlyOnce){
                        this.character.setText(this.shield);
                        this.str = "Yes, if you can help my village, we will glad to offer you a meal.";
                        this.oneTimeOnly(this.str);
                    }
                    if(this.displayText(time, this.counter)){ this.counter++; } 
                }    
            }
            else if(this.lineCounter == 22){
                if(!this.chosenToFight ){
                    if(this.onlyOnce){
                        this.character.setText(this.shield);
                        this.str = "We are in. Lead us to your village!";
                        this.oneTimeOnly(this.str);
                    }
                    if(this.displayText(time, this.counter)){ this.counter++; } 
                }
                else{
                    if(this.onlyOnce){
                        this.character.setText(this.shield);
                        this.str = "Alright, then show us the way to your village!";
                        this.oneTimeOnly(this.str);
                    }
                    if(this.displayText(time, this.counter)){ this.counter++; } 
                }    
            }
            else if(this.lineCounter == 23){
                if(this.onlyOnce){
                    this.character.setText(this.shield);
                    this.str = "We are in. Lead us to your village!";
                    this.oneTimeOnly(this.str);
                }
                if(this.displayText(time, this.counter)){ this.counter++; } 
                
                this.villageGirlSprite.anims.play("leftVillageGirl", true);
                this.shieldHeroSprite.anims.play("leftShield", true);
                this.swordHeroSprite.anims.play("leftSword", true);
                this.mageHeroSprite.anims.play("leftMage", true);


                if(this.villageGirlSprite.body.position.x > -1000){
                    this.villageGirlSprite.body.velocity.x = -250;
                    this.shieldHeroSprite.body.velocity.x = -250;
                    this.swordHeroSprite.body.velocity.x = -250;
                    this.mageHeroSprite.body.velocity.x = -250;
                }
                else{
                    this.villageGirlSprite.body.velocity.x = 0;
                    this.shieldHeroSprite.body.velocity.x = 0;
                    this.swordHeroSprite.body.velocity.x = 0;
                    this.mageHeroSprite.body.velocity.x = 0;
                }

            }
            else if(this.lineCounter >= 24){
                if(this.villageGirlSprite.body.position.x < -1000){
                    if(this.onlyOnce){
                        this.character.setText("");
                        this.str = "";
                        this.oneTimeOnly(this.str);

                        this.villageGirlSprite.body.velocity.x = 0;
                        this.shieldHeroSprite.body.velocity.x = 0;
                        this.swordHeroSprite.body.velocity.x = 0;
                        this.mageHeroSprite.body.velocity.x = 0;
                        this.blackScreen.visible = true;
                        this.blackScreen.alpha = 0;
                    }
                    if(this.displayText(time, this.counter)){ this.counter++; } 
                    
                    if(this.blackScreen.alpha < 1){
                        this.blackScreen.alpha += 0.1;
                    }
                    else{
                        this.music.stop();
                        let data = {
                            "level": 0
                        }
                        this.scene.start(SCENES.TUTORIAL, data);
                        this.scene.stop();
                    }
                }
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
            
            case "VILLAGE_GIRL":
                if(dir == "left"){ this.villageGirlSprite.anims.play("leftIdleVillageGirl"); }
                else if(dir == "right"){ this.villageGirlSprite.anims.play("rightIdleVillageGirl"); }
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























