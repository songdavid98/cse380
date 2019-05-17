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
        this.music = data.music;
        this.unlockedLevels = data.unlockedLevels;
        this.transferMoney = data.money || 0;
        this.allLevelsUnlocked = false;
        console.log(data.str);
    }
    preload() {
        this.load.audio("audiotitlesong", "./assets/audio/titlesong.wav");
    }
    create() {

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        this.cameras.main.setBackgroundColor('#008080')
        let backButton = this.add.image(this.game.renderer.width * .05, this.game.renderer.height * .1, "backButton").setDepth(1).setScale(2, 2);
        
        this.tutorialButton = this.add.image(this.game.renderer.width * .2, this.game.renderer.height * .38, "tutorialThumb").setDepth(2).setScale(1, 1);
        this.level1Button = this.add.image(this.game.renderer.width * .40, this.game.renderer.height * .38, "dungeon1Thumb").setDepth(2).setScale(1, 1);
        this.level2Button = this.add.image(this.game.renderer.width * .60, this.game.renderer.height * .38, "dungeon2Thumb").setDepth(2).setScale(1, 1); //level2
        this.level3Button = this.add.image(this.game.renderer.width * .80, this.game.renderer.height * .38, "dungeon3Thumb").setDepth(2).setScale(1, 1); //level3
        this.nightLevel1Button = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * .68, "nightmap2Thumb").setDepth(2).setScale(1, 1);
        this.nightLevel2Button = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .68, "nightmap2Thumb").setDepth(2).setScale(1, 1);
        this.nightLevel3Button = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .68, "nightmap2Thumb").setDepth(2).setScale(1, 1);

        //        this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .68, "greyBox").setDepth(2).setScale(3, 3); //n-level2
        //        this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .68, "greyBox").setDepth(2).setScale(3, 3); //n-level3
        let levelsBox = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .5, 'blueBox').setDepth(1).setScale(4, 2);

        //add tbas
        this.lock1 = this.add.image(this.game.renderer.width * .4, this.game.renderer.height * .38, "tba").setDepth(3).setScale(3, 3);   //d-level1 tba
        this.lock3 = this.add.image(this.game.renderer.width * .6, this.game.renderer.height * .38, "tba").setDepth(3).setScale(3, 3);   //d-level2 tba
        this.lock5 = this.add.image(this.game.renderer.width * .8, this.game.renderer.height * .38, "tba").setDepth(3).setScale(3, 3);   //d-level3 tba
        this.lock2 = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * .68, "tba").setDepth(3).setScale(3, 3);  //n-level1 tba
        this.lock4 = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .68, "tba").setDepth(3).setScale(3, 3);   //n-level2 tba
        this.lock6 = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .68, "tba").setDepth(3).setScale(3, 3);  //n-level3 tba

        //add checkmarks
        this.checkMark0 = this.add.image(this.game.renderer.width * .2, this.game.renderer.height * .38, "checkmark").setDepth(3).setScale(3);
        this.checkMark1 = this.add.image(this.game.renderer.width * .4, this.game.renderer.height * .38, "checkmark").setDepth(3).setScale(3);
        this.checkMark3 = this.add.image(this.game.renderer.width * .6, this.game.renderer.height * .38, "checkmark").setDepth(3).setScale(3);
        this.checkMark5 = this.add.image(this.game.renderer.width * .8, this.game.renderer.height * .38, "checkmark").setDepth(3).setScale(3);
        this.checkMark2 = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * .68, "checkmark").setDepth(3).setScale(3);
        this.checkMark4 = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .68, "checkmark").setDepth(3).setScale(3);
        this.checkMark6 = this.add.image(this.game.renderer.width * .75, this.game.renderer.height * .68, "checkmark").setDepth(3).setScale(3);

        this.checkMark0.visible = false;
        this.checkMark1.visible = false;
        this.checkMark2.visible = false;
        this.checkMark3.visible = false;
        this.checkMark4.visible = false;
        this.checkMark5.visible = false;
        this.checkMark6.visible = false;



        //Unlock each level
        console.log("UNLOCKED: ", this.unlockedLevels);

        for(let i = 0; i < 7; i++){
            if(this.unlockedLevels[i] == 1){
                this.check(i);
            }
            else if(this.unlockedLevels[i] == 2){ //1 and 2
                this.unlock(i);
            }


        }

        //add text
        this.add.text(this.game.renderer.width * .31, this.game.renderer.height * .18, "Level Selection", {
            fontSize: 64,
            color: "#000000"
        }).setDepth(2); //title
        this.add.text(this.game.renderer.width * .15, this.game.renderer.height * .50, "Tutorial", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .335, this.game.renderer.height * .50, "Day Level 1", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .535, this.game.renderer.height * .50, "Day Level 2", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(2);
        this.add.text(this.game.renderer.width * .735, this.game.renderer.height * .50, "Day Level 3", {
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


        console.log(this.unlockedLevels);
        
        backButton.setInteractive();

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
        this.tutorialButton.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "level": 0,
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.BEGINNING, data);
        });
        this.level1Button.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "transitionScene":"d1",
                "level": 1,
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.DAY_NIGHT_TRANSITION, data);
        });
        this.level2Button.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "transitionScene":"d2",
                "level": 3,
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.DAY_NIGHT_TRANSITION, data);
        });
        this.level3Button.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "transitionScene":"d3",
                "level": 5,
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.DAY_NIGHT_TRANSITION, data);
        });
        this.nightLevel1Button.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "transitionScene":"n1",
                "level": 2,
                "money": this.transferMoney,
                "unlockedLevels":this.unlockedLevels
            } //Change this to make sure money comes from day time
            this.scene.start(SCENES.DAY_NIGHT_TRANSITION, data);
        });

        this.nightLevel2Button.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "transitionScene":"n2",
                "level": 4,
                "money": this.transferMoney,
                "unlockedLevels":this.unlockedLevels
            } //Change this to make sure money comes from day time
            this.scene.start(SCENES.DAY_NIGHT_TRANSITION, data);
        });
        this.nightLevel3Button.on("pointerdown", () => {
            this.music.stop();
            let data = {
                "transitionScene":"n3",
                "level": 6,
                "money": this.transferMoney,
                "unlockedLevels":this.unlockedLevels
            } //Change this to make sure money comes from day time
            this.scene.start(SCENES.DAY_NIGHT_TRANSITION, data);
        });

        backButton.on("pointerdown", () => {
            //this.music.stop();
            let data = {
                "str":"main menu from level select",
                "music":this.music,
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.MAIN_MENU, data);
        });

        //add keyboard keys
        this.input.keyboard.addKeys('Esc,Two');

    }

    unlock(levelNum){
        console.log("Unlocking level: ", levelNum);
        switch(levelNum){
            case 0:
                this.tutorialButton.setInteractive();
                break;
            case 1:
                this.level1Button.setInteractive();
                this.lock1.visible = false;
                break;
            case 2:
                this.nightLevel1Button.setInteractive();
                this.lock2.visible = false;
                break;
            case 3:
                this.level2Button.setInteractive();
                this.lock3.visible = false;
                break;
            case 4: 
                this.nightLevel2Button.setInteractive();
                this.lock4.visible = false;
                break;
            case 5: 
                this.level3Button.setInteractive();
                this.lock5.visible = false;
                break;
            case 6:
                this.nightLevel3Button.setInteractive();
                this.lock6.visible = false;
                break;
            case 7:
                console.log("YOU BEAT THE GAME!!!!!!!!!!!!!!!!");
                console.log("INSERT ENDING SCENNE HERE");
        }
    }

    check(levelNum){
        console.log("Checking level: ", levelNum);
        switch(levelNum){
            case 0:
                this.checkMark0.visible = true;
                break;
            case 1:
                this.lock1.visible = false;

                this.checkMark1.visible = true;
                break;
            case 2:
                this.lock2.visible = false;

                this.checkMark2.visible = true;
                break;
            case 3:
                this.lock3.visible = false;

                this.checkMark3.visible = true;
                break;
            case 4: 
                this.lock4.visible = false;
                this.checkMark4.visible = true;
                break;
            case 5: 
                this.lock5.visible = false;

                this.checkMark5.visible = true;
                break;
            case 6:
                this.lock6.visible = false;

                this.checkMark6.visible = true;
                break;
            case 7:
                console.log("YOU BEAT THE GAME!!!!!!!!!!!!!!!!");
                console.log("INSERT ENDING SCENNE HERE");
        }
    }

    update(time, delta) {
        if (this.input.keyboard.keys[27].isDown) {
            //this.music.stop();
            let data = {
                "music":this.music,
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.MAIN_MENU, data);
        }
        if (this.input.keyboard.keys[50].isDown && !this.allLevelsUnlocked) {
                this.level1Button.setInteractive();
                this.nightLevel1Button.setInteractive();
                this.level2Button.setInteractive();
                this.nightLevel2Button.setInteractive();
                this.level3Button.setInteractive();
                this.nightLevel3Button.setInteractive();

                this.lock1.visible = false;
                this.lock3.visible = false;
                this.lock5.visible = false;
                this.lock2.visible = false;
                this.lock4.visible = false;
                this.lock6.visible = false;
                this.allLevelsUnlocked = true;
        }




    }
}
