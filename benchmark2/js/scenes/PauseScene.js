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
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        let backButton = this.add.image(this.game.renderer.width*.05,this.game.renderer.height*.1,"backButton").setDepth(1).setScale(2,2);

        //add button events
        backButton.setInteractive();
        this.input.keyboard.addKeys('Esc');
        backButton.on("pointerdown", ()=>{
            console.log("hello");
            let data = "main menu from level help"
            this.scene.stop(SCENES.DAY);
            this.scene.start(SCENES.MAIN_MENU, data);
        });
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