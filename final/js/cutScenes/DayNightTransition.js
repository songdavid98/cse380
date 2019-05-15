
import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import { CutScene } from "./CutScene.js";


export class DayNightTransition extends CutScene{
    constructor(){
        super({
            key: SCENES.DAY_NIGHT_TRANSITION
        })

    }
    init(data){
        super.init(data);
        this.transitionScene = data.transitionScene;
        this.transferMoney = data.money;
        this.transferToLevel = data.level;

        this.lastTransition = 0;
        this.sceneTimeLength = 2; //2 seconds
        this.blackScreenTimeLength = 1; //1 second
        this.counter = 0;
        this.tic = true;
    }
    preload(){
        super.preload();
        this.load.image("night", "assets/images/cutScene/night.png");
        this.load.image("night1", "assets/images/cutScene/night1.png");
        this.load.image("night2", "assets/images/cutScene/night2.png");
        this.load.image("night3", "assets/images/cutScene/night3.png");
        this.load.image("day", "assets/images/cutScene/day.png");
        this.load.image("day1", "assets/images/cutScene/day1.png");
        this.load.image("day2", "assets/images/cutScene/day2.png");
        this.load.image("day3", "assets/images/cutScene/day3.png");

    }
    create(){


        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        if(this.transitionScene == "d1" || this.transitionScene == "d2" || this.transitionScene == "d3"){
            this.scenePic = this.add.image(800, 420, "day").setScale(7.5, 7.5).setDepth(6);
        }
        else{
            this.scenePic = this.add.image(800, 420, "night").setScale(7.5, 7.5).setDepth(6);
        }

        this.scenePic.visible = false;
        this.scenePic.alpha = 0;


        switch(this.transitionScene){
            case "n1":
                this.pic = this.add.image(800, 420, "night1").setScale(7.5).setDepth(7);
                break;
            case "n2":
                this.pic = this.add.image(800, 420, "night2").setScale(7.5).setDepth(7);
                break;
            case "n3":
                this.pic = this.add.image(800, 420, "night3").setScale(7.5).setDepth(7);
                break;
            case "d1":
                this.pic = this.add.image(800, 420, "day1").setScale(7.5).setDepth(7);
                break;
            case "d2":
                this.pic = this.add.image(800, 420, "day2").setScale(7.5).setDepth(7);
                break;
            case "d3":
                this.pic = this.add.image(800, 420, "day3").setScale(7.5).setDepth(7);
                break;
        }

        this.pic.alpha = 0;
        this.pic.visible = false;



        this.blackScreen = this.add.image(800, 420, "blackScreen").setScale(13, 13).setDepth(5);

        this.music = this.sound.add("audiotitlesong");
        this.music.setLoop(true);
        if(!this.music.isPlaying){
            this.music.play();
        }

        console.log("Day Night Cutscene");

    }

    update(time){
        //super.update(time);

        //Starting the timer
        if(this.tic){
            this.lastTransition = time;
            console.log(time);
            this.tic = false;
        }

        switch(this.counter){
            case 0: //Once the time is here,
                if(Math.floor((time)/1000) - Math.floor(this.lastTransition)/1000 > this.blackScreenTimeLength){
                    this.counter++;
                    this.scenePic.visible = true;
                    this.tic = true;    //This resets the lastTransition variable

                    console.log(this.sceneTimeLength, Math.floor((time)/1000),Math.floor(this.lastTransition)/1000);

                }

                break;
            case 1:
                if(Math.floor((time)/1000) - Math.floor(this.lastTransition)/1000 > this.sceneTimeLength){
                    this.counter++;
                    this.pic.visible = true;
                    this.tic = true;    //This resets the lastTransition variable
                }
                else{
                    this.scenePic.alpha += 0.01;
                }
                break;
            case 2: 
                if(Math.floor((time)/1000) - Math.floor(this.lastTransition)/1000 > this.sceneTimeLength){
                    this.music.stop();

                    switch(this.transferToLevel){
                        case 1: 
                            this.scene.start(SCENES.DUNGEON1, {
                                "level": 1,
                            });
                            break;
                        case 2: 
                            this.scene.start(SCENES.NIGHT1, {
                                "level": 2,
                                "money": this.transferMoney
                            });
                            break;
                        case 3:
                            this.scene.start(SCENES.DUNGEON2, {
                                "level": 3,
                            });
                            break;
                        case 4:
                            this.scene.start(SCENES.NIGHT2, {
                                "level": 4,
                                "money": this.transferMoney
                            });
                            break;
                        case 5:
                            this.scene.start(SCENES.DUNGEON3, {
                                "level": 5,
                            });
                            break;
                        case 6:
                            this.scene.start(SCENES.NIGHT3, {
                                "level": 6,
                                "money": this.transferMoney
                            });
                            break;
                    }

                    this.scene.stop();
                }
                else{
                    this.pic.alpha += 0.01;
                }
                break;




        }
    }
}























