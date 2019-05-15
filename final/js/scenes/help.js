import {
    SCENES
} from "../constants/SceneNames.js";
export class HelpScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.HELP
        })
    }
    init(data) {
        this.music = data.music;
        console.log(data);
        console.log("entered help");
    }
    create() {

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        this.cameras.main.setBackgroundColor('#008080')
        let backButton = this.add.image(this.game.renderer.width * .05, this.game.renderer.height * .1, "backButton").setDepth(1).setScale(2, 2);
        let helpBox = this.add.image(this.game.renderer.width * .5, this.game.renderer.height * .5, 'blueBox').setDepth(2).setScale(4, 2);
        let tab1 = this.add.image(this.game.renderer.width * .15, this.game.renderer.height * .12, 'blueTab').setDepth(1).setScale(2, 2);
        let tab2 = this.add.image(this.game.renderer.width * .25, this.game.renderer.height * .12, 'blueTab').setDepth(1).setScale(2, 2);
        let tab3 = this.add.image(this.game.renderer.width * .35, this.game.renderer.height * .12, 'blueTab').setDepth(1).setScale(2, 2);
        let tab4 = this.add.image(this.game.renderer.width * .45, this.game.renderer.height * .12, 'blueTab').setDepth(1).setScale(2, 2);
        this.add.text(this.game.renderer.width * .46, this.game.renderer.height * .2, "Help", {
            fontSize: 64,
            color: "#000000"
        }).setDepth(3); //title
        this.add.text(this.game.renderer.width * .12, this.game.renderer.height * .1, "Story", {
            fontSize: 32,
            color: "#000000"
        }).setDepth(3); //story tab
        this.add.text(this.game.renderer.width * .22, this.game.renderer.height * .09, "Shield\nHero", {
            fontSize: 24,
            color: "#000000"
        }).setDepth(3); //shield tab
        this.add.text(this.game.renderer.width*.32, this.game.renderer.height*.09,"Sword\nHero", {
            fontSize: 24, color: "#000000"
        }).setDepth(3); //sword tab
        this.add.text(this.game.renderer.width*.425, this.game.renderer.height*.09,"Magic\nHero", {
            fontSize: 24, color: "#000000"
        }).setDepth(3); //magic tab


        let storyString = "You have to defend \nyour village!\n" +
            "Enemies are coming\nfrom several dungeons that\nhave suddenly appeared around\nthe village. Kill during\nthe day.\nDefend during the night";

        let storyText = this.add.text(this.game.renderer.width * .2, this.game.renderer.height * .4, storyString, {
            fontSize: 32,
            color: "#000000"
        }).setDepth(3);

        let shieldString = "You bear the shield. Do not \nunderestimate its power. You can\nsafely attack from a long\ndistance via a magical wave.";
        let swordString = "You bear the sword. Do not \nunderestimate its power. You can\nsafely attack from a short\ndistance via a sword.";
        let mageString = "You bear the mage. Do not \nunderestimate its power. You can\n attack from a long\ndistance via a magic beam.";

        
        
        let shieldText = this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .4, shieldString, {
            fontSize: 32,
            color: "#000000"
        }).setDepth(3);
        let swordText = this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .4, swordString, {
            fontSize: 32,
            color: "#000000"
        }).setDepth(3);
        let magicText = this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .4, mageString, {
            fontSize: 32,
            color: "#000000"
        }).setDepth(3);

        //let swordThumb = this.add.image(this.game.renderer.width * .35, this.game.renderer.height * .12, "tba").setDepth(3).setScale(1, .8);
        //let mageThumb = this.add.image(this.game.renderer.width * .45, this.game.renderer.height * .12, "tba").setDepth(3).setScale(1, .8);
        
        
        
        let thumbTitleBar = this.add.image(this.game.renderer.width * .227, this.game.renderer.height * .7, "blueBar").setDepth(5);
        
        let shieldThumbText = this.add.text(this.game.renderer.width * .172, this.game.renderer.height * .69, "Shield Hero", {
            fontSize: 24,
            color: "#000000"
        }).setDepth(7);
        let swordThumbText = this.add.text(this.game.renderer.width * .172, this.game.renderer.height * .69, "Sword Hero", {
            fontSize: 24,
            color: "#000000"
        }).setDepth(7);
        let magicThumbText = this.add.text(this.game.renderer.width * .172, this.game.renderer.height * .69, "Mage Hero", {
            fontSize: 24,
            color: "#000000"
        }).setDepth(7);

        let shieldThumb = this.add.image(this.game.renderer.width * .22, this.game.renderer.height * .45, "shieldThumb").setDepth(6).setScale(8, 8);
        let swordThumb = this.add.image(this.game.renderer.width * .22, this.game.renderer.height * .45, "swordThumb").setDepth(6).setScale(8, 8);
        let magicThumb = this.add.image(this.game.renderer.width * .22, this.game.renderer.height * .45, "magicThumb").setDepth(6).setScale(8, 8);
        
        
        //let swordText = this.add.text(this.game.renderer.width*.12,this.game.renderer.height*.4, "Swordsman stuff go here.", {fontSize: 32, color: "#000000"}).setDepth(3);
        //let magicText = this.add.text(this.game.renderer.width*.12,this.game.renderer.height*.4, "Magician stuff go here.", {fontSize: 32, color: "#000000"}).setDepth(3);
        
        //alphas
        shieldText.alpha = 0;
        swordText.alpha = 0;
        magicText.alpha = 0;
        helpBox.alpha = 1;
        tab1.alpha = 1;
        tab2.alpha = 0.75;
        tab3.alpha = 0.75;
        tab4.alpha = 0.75;
        shieldThumb.alpha = 0;
        shieldThumbText.alpha = 0;
        swordThumb.alpha = 0;
        swordThumbText.alpha = 0;
        magicThumb.alpha = 0;
        magicThumbText.alpha = 0;
        thumbTitleBar.alpha = 0;

        //add button events
        backButton.setInteractive();
        tab1.setInteractive();
        tab2.setInteractive();

        tab3.setInteractive();
        tab4.setInteractive();
        
        backButton.on("pointerdown", () => {
            console.log("hello");
            let data = {
                "str":"main menu from level help",
                "music":this.music
            }
            this.scene.start(SCENES.MAIN_MENU, data);
        });
        tab1.on('pointerdown', () => {
            tab1.alpha = 1;
            tab2.alpha = 0.75;
            tab3.alpha = 0.75;
            tab4.alpha = 0.75;
            storyText.alpha = 1;
            thumbTitleBar.alpha = 0;

            shieldText.alpha = 0;
            shieldThumb.alpha = 0;
            shieldThumbText.alpha = 0;

            swordText.alpha = 0;
            swordThumb.alpha = 0;
            swordThumbText.alpha = 0;

            magicText.alpha = 0;
            magicThumb.alpha = 0;
            magicThumbText.alpha = 0;
            
            
            
        });
        tab2.on('pointerdown', () => {
            tab1.alpha = 0.75;
            tab2.alpha = 1;
            tab3.alpha = 0.75;
            tab4.alpha = 0.75;
            storyText.alpha = 0;
            shieldText.alpha = 1;
            shieldThumb.alpha = 1;
            shieldThumbText.alpha = 1;
            thumbTitleBar.alpha = 1;
            swordText.alpha = 0;
            swordThumb.alpha = 0;
            swordThumbText.alpha = 0;
            magicText.alpha = 0;
            magicThumb.alpha = 0;
            magicThumbText.alpha = 0;
        });
        tab3.on('pointerdown', ()=>{
            tab1.alpha = 0.75;
            tab2.alpha = 0.75;
            tab3.alpha = 1;
            tab4.alpha = 0.75;
            storyText.alpha = 0;
            shieldText.alpha = 0;
            shieldThumb.alpha = 0;
            shieldThumbText.alpha = 0;
            swordText.alpha = 1;
            swordThumb.alpha = 1;
            swordThumbText.alpha = 1;
            magicText.alpha = 0;
            magicThumb.alpha = 0;
            magicThumbText.alpha = 0;
        });
        tab4.on('pointerdown', ()=>{
            tab1.alpha = 0.75;
            tab2.alpha = 0.75;
            tab3.alpha = 0.75;
            tab4.alpha = 1;
            storyText.alpha = 0;
            shieldText.alpha = 0;
            shieldThumb.alpha = 0;
            shieldThumbText.alpha = 0;
            swordText.alpha = 0;
            swordThumb.alpha = 0;
            swordThumbText.alpha = 0;
            magicText.alpha = 1;
            magicThumb.alpha = 1;
            magicThumbText.alpha = 1;
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
