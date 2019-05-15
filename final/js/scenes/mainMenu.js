import {
    SCENES
} from "../constants/SceneNames.js";
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.MAIN_MENU
        })
    }
    init(data) {
        this.music = data.music;
        this.unlockedLevels = data.unlockedLevels;
        console.log(data.unlockedLevels);
    }
    preload() {
        this.load.audio("audiotitlesong", "./assets/audio/titlesong.wav");
    }
    create() {
        console.log("created");
        this.cameras.main.setBackgroundColor('#008080')
        //add images
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .35, "logo").setDepth(1).setScale(.5, .5);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .5, "textlogo").setDepth(2).setScale(3, 3);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .65, "playButton").setDepth(1).setScale(2, 2);
        let controlsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .75, "controlsButton").setDepth(1).setScale(2, 2);
        let helpButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .85, "helpButton").setDepth(1).setScale(2, 2);

        //add button events
        playButton.setInteractive();
        controlsButton.setInteractive();
        helpButton.setInteractive();


        if(!this.music){
            this.music = this.sound.add("audiotitlesong");
        }
        else{
            this.music = this.music;
        }
        this.music.setLoop(true);
        if(!this.music.isPlaying){
            this.music.play();
        }


        playButton.on("pointerdown", () => {
            //this.music.pause();
            let data = {
                "music":this.music,
                "str":"moving to level select",
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.LEVEL_SELECT, data);
            this.scene.stop();
        });
        controlsButton.on("pointerdown", () => {
            //this.music.pause();
            let data = {
                "music":this.music,
                "str":"moving to controls"
            }
            this.scene.start(SCENES.CONTROLS, data);
            this.scene.stop();

        });
        helpButton.on("pointerdown", () => {
            //this.music.pause();
            let data = {
                "music":this.music,
                "str":"moving to help"
            }
            this.scene.start(SCENES.HELP, data);
            this.scene.stop();

        });
    }
}
