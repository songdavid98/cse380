import {SCENES} from "../constants/SceneNames.js";
export class ControlsScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.CONTROLS
        })
    }
    init(data){
        console.log(data);
        console.log("entered controls");
    }
    create(){

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        this.cameras.main.setBackgroundColor('#008080')
        let backButton = this.add.image(this.game.renderer.width*.05,this.game.renderer.height*.1,"backButton").setDepth(1).setScale(2,2);

        //add button events
        backButton.setInteractive();
        
        backButton.on("pointerdown", ()=>{
            console.log("hello");
            let data = "main menu from controls"
            this.scene.start(SCENES.MAIN_MENU, data);
        });
    }
}