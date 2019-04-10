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
        this.load.image("logo","../assets/images/logo.png");
        this.load.image("startButton", "../assets/images/temp_startbutton.png"); //FIXME: temporary button image
        this.load.image("level1Button", "../assets/images/temp_level_box.png"); //FIXME: temporary button image



    }
    create(){
        console.log("scene");
        this.scene.start(SCENES.SPLASH, "loaded main menu");
    }

}