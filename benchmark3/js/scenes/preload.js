import {SCENES} from "../constants/SceneNames.js";
export class PreloadScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.PRELOAD
        })
    }

    init(){

    }
    preload(){
        console.log("loading logo");
        this.load.image("logo","./assets/images/icons/logo.png");
        this.load.image("textlogo", "./assets/images/icons/title.png");
        this.load.image("startButton", "./assets/images/buttons/startbutton.png"); //FIXME: temporary button image
        this.load.image("level1Button", "./assets/images/buttons/temp_level_box.png"); //FIXME: temporary button image
        this.load.image("playButton", "./assets/images/buttons/playbutton.png");
        this.load.image("controlsButton", "./assets/images/buttons/controlsbutton.png");
        this.load.image("helpButton", "./assets/images/buttons/helpbutton.png");
        this.load.image("backButton", "./assets/images/buttons/backbutton.png");
        this.load.image("blueBox", "./assets/images/buttons/bluebox.png");
        this.load.image("blueBar", "./assets/images/buttons/bluebar.png");
        this.load.image("tba", "./assets/images/buttons/tba.png");
        this.load.image("greyBox", "./assets/images/buttons/greybox.png");
        this.load.image("blueTab", "./assets/images/buttons/bluetab.png");
        this.load.image("coin", "./assets/images/icons/coin.png");
        this.load.image("shieldThumb", "./assets/images/heroes/shieldHero/down/0002.png");
        this.load.image("heart", "./assets/images/icons/heart.png");
        this.load.image("heart1", "./assets/images/icons/heart1.png");
        this.load.image("heart2", "./assets/images/icons/heart2.png");
        this.load.image("heart3", "./assets/images/icons/heart3.png");
        this.load.image("dungeon3Thumb", "./assets/images/icons/dungeon3.png");
        this.load.image("nightmap2Thumb", "./assets/images/icons/nightmap2.png")



    }
    create(){
        console.log("scene");
        this.scene.start(SCENES.SPLASH, "loaded main menu");
    }

}