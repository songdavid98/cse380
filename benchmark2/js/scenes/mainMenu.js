import {SCENES} from "../constants/SceneNames.js";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.MAIN_MENU
        })
    }
    init(data){
        console.log(data);
        console.log("yay data");
    }
    create(){
        console.log("created");
        this.cameras.main.setBackgroundColor('#008080')
        //add images
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .35, "logo").setDepth(1).setScale(.5, .5);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .5, "textlogo").setDepth(2).setScale(3, 3);
        let startButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height*.8,"startButton").setDepth(1).setScale(.5,.5);

        //add button events
        startButton.setInteractive();
        startButton.on("pointerover", ()=>{
            console.log("woohoo");
        });
        startButton.on("pointerdown", ()=>{
            this.scene.start(SCENES.LEVEL_SELECT, "moving to level select");
        });
    }
}