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
        this.load.image("logo","../benchmark2/assets/images/logo.png");
        this.load.image("textlogo", "../benchmark2/assets/images/title.png");
        this.load.image("startButton", "../benchmark2/assets/images/startbutton.png"); //FIXME: temporary button image
        this.load.image("level1Button", "../benchmark2/assets/images/temp_level_box.png"); //FIXME: temporary button image



    }
    create(){
        console.log("scene");
        this.scene.start(SCENES.SPLASH, "loaded main menu");
    }

}