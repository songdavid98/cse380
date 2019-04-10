import {SCENES} from "../constants/SceneNames.js";
export class LevelSelectionScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.LEVEL_SELECT
        })
    }
    init(data){
        console.log(data);
        console.log("entered splash");
    }
    create(){

        //add images
        let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        let startButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height*.7,"startButton").setDepth(1).setScale(.5,.5);

        //add button events
        startButton.setInteractive();
        startButton.on("pointerover", ()=>{
            console.log("woah");
        });
        startButton.on("pointerdown", ()=>{
            this.scene.start(SCENES.MAIN_MENU, "splashin in ;)");
        });
    }
}