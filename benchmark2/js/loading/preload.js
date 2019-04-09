//Preload
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
        this.load.image("startButton", "../assets/images/temp_startbutton.png");
    }
    create(){
        console.log("scene");
        this.scene.start(SCENES.MAIN_MENU, "loaded main menu");
    }

}