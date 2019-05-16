import {SCENES} from "../constants/SceneNames.js";
export class PauseScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.PAUSE
        })
    }
    init(data){
        //console.log(data);
        this.pausedScene = data['scene'];
        this.scenes = data["scenes"];
        this.unlockedLevels = data.unlockedLevels;
        console.log(data);
        this.initTime = 0;
    }
    create(){
        this.justPaused = true;
        //add images
        //let backButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.3,"backButton").setDepth(2).setScale(2,2);
        let pauseBox = this.add.image(this.game.renderer.width*.5, this.game.renderer.height*.5,"blueBox").setDepth(2).setScale(4,2.2);
        let continueButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.5,"blueBar").setDepth(2).setScale(2,2);
        let controlsButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.6,"blueBar").setDepth(2).setScale(2,2);
        let exitButton = this.add.image(this.game.renderer.width*.5,this.game.renderer.height*.7,"blueBar").setDepth(2).setScale(2,2);
        let text = this.add.text(this.game.renderer.width*.425,this.game.renderer.height*.2,"Paused", {fontSize: 64, color: "#000000", strokeThickness:3, stroke:"#ffffff"}).setDepth(3);
        let continueText = this.add.text(this.game.renderer.width*.452,this.game.renderer.height*.485,"Continue", {fontSize: 32, color: "#000000"}).setDepth(3);
        let exitText = this.add.text(this.game.renderer.width*.475,this.game.renderer.height*.685,"Exit", {fontSize: 32, color: "#000000"}).setDepth(3);
        //console.log(text);
        
        //set any colors and opacities
        pauseBox.alpha = 0.75;
        
        //set button interactive
        continueButton.setInteractive();
        controlsButton.setInteractive();
        exitButton.setInteractive();
        
        //set button event handlers
        continueButton.on("pointerdown", ()=>{
            for(var i = 0; i < this.scenes.length; i++){
                this.scene.resume(this.scenes[i]);
                this.pausedScene.music.resume();
                if (this.pausedScene.spawnIntervalVar)
                    this.pausedScene.spawnIntervalVar.paused = false;
            }
            if (this.pausedScene)
                this.pausedScene.initTime += this.time.now - this.initTime;
                this.pausedScene.input.keyboard.keys[27].isUp = true;
                this.pausedScene.input.keyboard.keys[27].isDown = false;
            this.scene.stop();
        });
        //set button event handlers
        controlsButton.on("pointerdown", ()=>{



        //INSERT JAKOB CODE HERE: _____________________________________________________________________   
            for(var i = 0; i < this.scenes.length; i++){    
                this.scene.resume(this.scenes[i]);
                this.pausedScene.music.resume();
                if (this.pausedScene.spawnIntervalVar)
                    this.pausedScene.spawnIntervalVar.paused = false;
            }
            if (this.pausedScene)
                this.pausedScene.initTime += this.time.now - this.initTime;
                this.pausedScene.input.keyboard.keys[27].isUp = true;
                this.pausedScene.input.keyboard.keys[27].isDown = false;
            this.scene.stop();
        });
        exitButton.on("pointerdown", ()=>{
            let data = {
                "str":"main menu from level help",
                "unlockedLevels":this.unlockedLevels
            }

            console.log(this.unlockedLevels);
            for(var i = 0; i < this.scenes.length; i++){
                this.scene.stop(this.scenes[i]);
            }
            this.scene.start(SCENES.MAIN_MENU, data);
        });

        //add keyboard keys
        this.input.keyboard.addKeys('Esc');
    }
    update(time,delta){
        if(this.initTime == 0){
            this.initTime = this.time.now;
        }
        if(this.input.keyboard.keys[27].isDown && !this.justPaused){
            console.log("unpausing");
            if (this.pausedScene.spawnIntervalVar)
                    this.pausedScene.spawnIntervalVar.paused = false;
            for(var i = 0; i < this.scenes.length; i++){
                this.scene.resume(this.scenes[i]);
            }
            this.pausedScene.initTime += this.time.now - this.initTime;
            this.scene.stop();
        }else if(this.input.keyboard.keys[27].isDown){
            this.justPaused = false;
        }
    }
}