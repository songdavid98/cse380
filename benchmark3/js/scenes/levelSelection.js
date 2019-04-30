import {
    SCENES
} from "../constants/SceneNames.js";
export class LevelSelectionScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.LEVEL_SELECT
        })
    }
    init(data) {
        console.log(data);
        console.log("entered splash");
    }
    create() {

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        this.cameras.main.setBackgroundColor('#008080')
        let backButton = this.add.image(this.game.renderer.width * .05, this.game.renderer.height * .1, "backButton").setDepth(1).setScale(2, 2);
        let level1Button = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * .38, "dungeon1Thumb").setDepth(2).setScale(1, 1);
        let level2Button = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .38, "dungeon2Thumb").setDepth(2).setScale(1, 1); //level2
        let level3Button = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .38, "dungeon3Thumb").setDepth(2).setScale(1, 1); //level3
        let nightLevel1Button = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * .68, "nightmap2Thumb").setDepth(2).setScale(1, 1);
        let nightLevel2Button = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .68, "nightmap2Thumb").setDepth(2).setScale(1, 1);
        let nightLevel3Button = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .68, "nightmap2Thumb").setDepth(2).setScale(1, 1);

        //        this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .68, "greyBox").setDepth(2).setScale(3, 3); //n-level2
        //        this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .68, "greyBox").setDepth(2).setScale(3, 3); //n-level3
        let levelsBox = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .5, 'blueBox').setDepth(1).setScale(4, 2);

        //add tbas
        //this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .38, "tba").setDepth(3).setScale(3, 3); //level2 tba
        //this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .38, "tba").setDepth(3).setScale(3, 3); //level3 tba
        //this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .68, "tba").setDepth(3).setScale(3, 3); //n-level2 tba
        //this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .68, "tba").setDepth(3).setScale(3, 3); //n-level3 tba

        //add text
        this.add.text(this.game.renderer.width * .31, this.game.renderer.height * .18, "Level Selection", {
            fontSize: 64,
            color: "#000000"
        }).setDepth(2); //title
        this.add.text(this.game.renderer.width * .183, this.game.renderer.height * .50, "Day Level 1", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .433, this.game.renderer.height * .50, "Day Level 2", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .683, this.game.renderer.height * .50, "Day Level 3", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .171, this.game.renderer.height * .80, "Night Level 1", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .421, this.game.renderer.height * .80, "Night Level 2", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .681, this.game.renderer.height * .80, "Night Level 3", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);

        //set opacities and stuff
        levelsBox.alpha = 0.75

        //add button events
        level1Button.setInteractive();
        level2Button.setInteractive();
        level3Button.setInteractive();

        nightLevel1Button.setInteractive();
        nightLevel2Button.setInteractive();
        nightLevel3Button.setInteractive();
        backButton.setInteractive();

        level1Button.on("pointerover", () => {
            console.log("woah");
        });
        level1Button.on("pointerdown", () => {
            let data = {
                "level": 1
            }
            this.scene.start(SCENES.DAY, data);
        });
        level2Button.on("pointerdown", () => {
            let data = {
                "level": 2
            }
            this.scene.start(SCENES.DUNGEON4, data);
        });
        level3Button.on("pointerdown", () => {
            let data = {
                "level": 3
            }
            this.scene.start(SCENES.DAY_DUNGEON3, data);
        });
        nightLevel1Button.on("pointerdown", () => {
            let data = {
                "level": 1,
                "money": 1000
            } //Change this to make sure money comes from day time
            this.scene.start(SCENES.NIGHT, data);
        });

        nightLevel2Button.on("pointerdown", () => {
            let data = {
                "level": 2,
                "money": 1500
            } //Change this to make sure money comes from day time
            this.scene.start(SCENES.NIGHT, data);
        });
        nightLevel3Button.on("pointerdown", () => {
            let data = {
                "level": 3,
                "money": 2000
            } //Change this to make sure money comes from day time
            this.scene.start(SCENES.NIGHT, data);
        });

        backButton.on("pointerdown", () => {
            console.log("hello");
            let data = "main menu from level select"
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
