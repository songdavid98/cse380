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
        this.load.image("logo","../benchmark2/assets/images/icons/logo.png");
        this.load.image("textlogo", "../benchmark2/assets/images/icons/title.png");
        this.load.image("startButton", "../benchmark2/assets/images/buttons/startbutton.png"); //FIXME: temporary button image
        this.load.image("level1Button", "../benchmark2/assets/images/buttons/temp_level_box.png"); //FIXME: temporary button image
        this.load.image("playButton", "../benchmark2/assets/images/buttons/playbutton.png");
        this.load.image("controlsButton", "../benchmark2/assets/images/buttons/controlsbutton.png");
        this.load.image("helpButton", "../benchmark2/assets/images/buttons/helpbutton.png");
        this.load.image("backButton", "../benchmark2/assets/images/buttons/backbutton.png");
        this.load.image("blueBox", "../benchmark2/assets/images/buttons/bluebox.png");
        this.load.image("blueBar", "../benchmark2/assets/images/buttons/bluebar.png");
        this.load.image("tba", "../benchmark2/assets/images/buttons/tba.png");
        this.load.image("greyBox", "../benchmark2/assets/images/buttons/greybox.png");
        this.load.image("blueTab", "../benchmark2/assets/images/buttons/bluetab.png");
        this.load.image("coin", "../benchmark2/assets/images/icons/coin.png");
        this.load.image("shieldThumb", "../benchmark2/assets/images/heroes/shieldHero/down/0002.png")



    }
    create(){
        console.log("scene");
        this.scene.start(SCENES.SPLASH, "loaded main menu");
    }

}