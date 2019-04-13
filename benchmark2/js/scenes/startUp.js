import {
    SCENES
} from "../constants/SceneNames.js";
export class SplashScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.SPLASH
        })
    }
    init(data) {
        console.log(data);
        console.log("entered splash");
    }
    create() {

        //add images
        this.cameras.main.setBackgroundColor('#008080')
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .35, "logo").setDepth(1).setScale(.5, .5);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .5, "textlogo").setDepth(2).setScale(3, 3);
        let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * .7, "startButton").setDepth(1).setScale(3, 3);

        //add button events
        startButton.setInteractive();
        startButton.on("pointerover", () => {
            console.log("woah");
        });
        startButton.on("pointerdown", () => {
            this.scene.start(SCENES.MAIN_MENU, "splashin in ;)");
        });
        //        this.scene.start(SCENES.MAIN_MENU, {
        //            "level": 1
        //        })
    }
}
