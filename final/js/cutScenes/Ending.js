
import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import { CutScene } from "./CutScene.js";


export class Ending extends CutScene{
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
        this.load.image("youWin", "assets/images/cutScene/YOUWIN.png");
        this.load.image("endingScene", "assets/images/cutScene/YOUWIN1.png");

    }
    create(){
        


        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        this.add.image(800, 820, "textBar").setScale(12.5, 10).setDepth(3);
        this.endingScene = this.add.image(800, 420, "endingScene").setScale(13, 13).setDepth(0);
        this.endingScene.visible = false;

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

        this.skipButton.setInteractive();


        this.skipButton.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "level": 0
            }
            this.scene.start(SCENES.MAIN_MENU, data);
            this.scene.stop();
        });

        this.music = this.sound.add("audiotitlesong");
        
        this.music.setLoop(true);
        if(!this.music.isPlaying){
            this.music.play();
        }


        console.log("Ending Cutscene");

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
                this.str = "Thank you so much for protecting the village.\nAnd to keep my promise, the village prepared a feast at the dinner table! so Let's go!";
                this.endingScene.visible = true;
                this.oneTimeOnly(this.str);
            }
            if(this.displayText(time, this.counter)){ this.counter++; } 
        }
        else if(this.lineCounter >= 1){
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

    
}























