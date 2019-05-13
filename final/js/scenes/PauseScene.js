import {SCENES} from "../constants/SceneNames.js";
export class PauseScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.PAUSE
        })
    }
    init(data){
        //console.log(data);
        this.scenes = data["scenes"];
    }
    create(){
        this.justPaused = true;
        //add images
        //let backButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.3,"backButton").setDepth(2).setScale(2,2);
        let pauseBox = this.add.image(this.game.renderer.width*.5, this.game.renderer.height*.5,"blueBox").setDepth(2).setScale(4,2.2);
        let continueButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.5,"blueBar").setDepth(2).setScale(2,2);
        let exitButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.7,"blueBar").setDepth(2).setScale(2,2);
        let text = this.add.text(this.game.renderer.width*.425,this.game.renderer.height*.2,"Paused", {fontSize: 64, color: "#000000", strokeThickness:3, stroke:"#ffffff"}).setDepth(3);
        let continueText = this.add.text(this.game.renderer.width*.452,this.game.renderer.height*.485,"Continue", {fontSize: 32, color: "#000000"}).setDepth(3);
        let exitText = this.add.text(this.game.renderer.width*.475,this.game.renderer.height*.685,"Exit", {fontSize: 32, color: "#000000"}).setDepth(3);
        //console.log(text);
        
        //set any colors and opacities
        pauseBox.alpha = 0.75;
        
        //set button interactive
        continueButton.setInteractive();
        exitButton.setInteractive();
        
        //set button event handlers
        continueButton.on("pointerdown", ()=>{
            for(var i = 0; i < this.scenes.length; i++){
                this.scene.resume(this.scenes[i]);
            }
            this.scene.stop();
        });
        exitButton.on("pointerdown", ()=>{
            let data = "main menu from level help"
            for(var i = 0; i < this.scenes.length; i++){
                this.scene.stop(this.scenes[i]);
            }
            this.scene.start(SCENES.MAIN_MENU, data);
        });

        //add keyboard keys
        this.input.keyboard.addKeys('Esc');
    }
    update(time,delta){
        if(this.input.keyboard.keys[27].isDown && !this.justPaused){
            console.log("unpausing");
            for(var i = 0; i < this.scenes.length; i++){
                this.scene.resume(this.scenes[i]);
            }
            this.scene.stop();
        }else if(this.input.keyboard.keys[27].isDown){
            this.justPaused = false;
        }
    }
}