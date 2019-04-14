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



    }
    create(){
        console.log("scene");
        this.scene.start(SCENES.SPLASH, "loaded main menu");
    }

}