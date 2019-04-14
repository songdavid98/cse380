import {SCENES} from "../constants/SceneNames.js";
export class PauseScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.PAUSE
        })
    }
    init(data){
        console.log(data);
        console.log("entered pause");
    }
    create(){
        this.justPaused = true;
        //add images
        let backButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.3,"backButton").setDepth(2).setScale(2,2);
        let pauseBox = this.add.image(this.game.renderer.width*.5, this.game.renderer.height*.5,"blueBox").setDepth(1).setScale(4,2.2);
        let text = this.add.text(this.game.renderer.width*.46,this.game.renderer.height*.15,"Paused", {fontSize: 32, color: "#fff", strokeThickness:6, stroke:"#000000"}).setDepth(3);
        console.log(text);
        
        //set any colors and opacities
        pauseBox.alpha = 0.75;
        
        //add button events
        backButton.setInteractive();
        backButton.on("pointerdown", ()=>{
            console.log("hello");
            let data = "main menu from level help"
            this.scene.stop(SCENES.DAY);
            this.scene.start(SCENES.MAIN_MENU, data);
        });

        //add keyboard keys
        this.input.keyboard.addKeys('Esc');
    }
    update(time,delta){
        if(this.input.keyboard.keys[27].isDown && !this.justPaused){
            console.log("unpausing");
            this.scene.resume(SCENES.DAY);
            this.scene.stop();
        }else if(this.input.keyboard.keys[27].isDown){
            this.justPaused = false;
        }
    }
}