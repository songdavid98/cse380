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
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        let level1Button = this.add.image(this.game.renderer.width/2, this.game.renderer.height*.5,"level1Button").setDepth(1).setScale(1,1);

        //add button events
        level1Button.setInteractive();
        level1Button.on("pointerover", ()=>{
            console.log("woah");
        });
        level1Button.on("pointerdown", ()=>{
            let data = {"level":1}
            this.scene.start(SCENES.DAY, data);
        });
    }
}