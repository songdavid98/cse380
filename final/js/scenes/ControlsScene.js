import {
    SCENES
} from "../constants/SceneNames.js";
export class ControlsScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.CONTROLS
        })
    }
    init(data) {
        this.music = data.music;
        console.log(data);
        console.log("entered controls");
    }
    create() {

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        this.cameras.main.setBackgroundColor('#008080')
        let backButton = this.add.image(this.game.renderer.width * .05, this.game.renderer.height * .1, "backButton").setDepth(1).setScale(2, 2);
        let controlsBox = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .5, 'blueBox').setDepth(1).setScale(4, 2);
        this.add.text(this.game.renderer.width * .42, this.game.renderer.height * .2, "Controls", {
            fontSize: 64,
            color: "#000000"
        }).setDepth(2); //title
        this.add.text(this.game.renderer.width * .2, this.game.renderer.height * .3, "Movement:\nW - Move up\nA - Move left\nS - Move down\nD - Move right", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2); //walking
        this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .3, "Attacking:\nLeft click - Regular attack\nRight click - Special attack", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);

        this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .5, "Night Phase: Keep starting and defending \nwaves until you win", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);

        this.add.text(this.game.renderer.width * .2, this.game.renderer.height * .7, "Other:\nEsc - Pause", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        controlsBox.alpha = .75


        //add button events
        backButton.setInteractive();
        backButton.on("pointerdown", () => {
            console.log("hello");
            let data = {
                "str":"main menu from controls",
                "music":this.music
            }
            this.scene.start(SCENES.MAIN_MENU, data);
        });

        //add keyboard keys
        this.input.keyboard.addKeys('Esc');
    }
    update(time, delta) {
        if (this.input.keyboard.keys[27].isDown) {
            this.scene.start(SCENES.MAIN_MENU);
        }
    }
}
