import {SCENES} from "../constants/SceneNames.js";
export class HelpScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.HELP
        })
    }
    init(data){
        console.log(data);
        console.log("entered help");
    }
    create(){

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        this.cameras.main.setBackgroundColor('#008080')
        let backButton = this.add.image(this.game.renderer.width*.05,this.game.renderer.height*.1,"backButton").setDepth(1).setScale(2,2);
        let helpBox = this.add.image(this.game.renderer.width*.5, this.game.renderer.height*.5,'blueBox').setDepth(1).setScale(4,2);
        this.add.text(this.game.renderer.width*.46, this.game.renderer.height*.2,"Help", {fontSize: 64, color: "#000000"}).setDepth(2); //title
        helpBox.alpha = 0.75;

        //add button events
        backButton.setInteractive();

        backButton.on("pointerdown", ()=>{
            console.log("hello");
            let data = "main menu from level help"
            this.scene.start(SCENES.MAIN_MENU, data);
        });
        
        //add keyboard keys
        this.input.keyboard.addKeys('Esc');
    }
    update(time, delta){
        if(this.input.keyboard.keys[27].isDown){
            this.scene.start(SCENES.MAIN_MENU);
        }
    }
}