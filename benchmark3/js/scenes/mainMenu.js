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
        let playButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height*.65,"playButton").setDepth(1).setScale(2,2);
        let controlsButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height*.75,"controlsButton").setDepth(1).setScale(2,2);
        let helpButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height*.85,"helpButton").setDepth(1).setScale(2,2);

        //add button events
        playButton.setInteractive();
        controlsButton.setInteractive();
        helpButton.setInteractive();

        playButton.on("pointerdown", ()=>{
            this.scene.start(SCENES.LEVEL_SELECT, "moving to level select");
        });
        controlsButton.on("pointerdown", ()=>{
            this.scene.start(SCENES.CONTROLS, "moving to level select");
        });
        helpButton.on("pointerdown", ()=>{
            this.scene.start(SCENES.HELP, "moving to level select");
        });
    }
}