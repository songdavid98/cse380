import {
    SCENES
} from "../constants/SceneNames.js";
export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.PRELOAD
        })
    }

    init() {

    }
    preload() {
        console.log("loading logo");
        this.load.image("logo", "./assets/images/icons/logo.png");
        this.load.image("textlogo", "./assets/images/icons/title.png");
        this.load.image("startButton", "./assets/images/buttons/startbutton.png"); //FIXME: temporary button image
        this.load.image("level1Button", "./assets/images/buttons/temp_level_box.png"); //FIXME: temporary button image
        this.load.image("playButton", "./assets/images/buttons/playbutton.png");
        this.load.image("controlsButton", "./assets/images/buttons/controlsbutton.png");
        this.load.image("helpButton", "./assets/images/buttons/helpbutton.png");
        this.load.image("backButton", "./assets/images/buttons/backbutton.png");
        this.load.image("blueBox", "./assets/images/buttons/bluebox.png");
        this.load.image("blueBar", "./assets/images/buttons/bluebar.png");
        this.load.image("tba", "./assets/images/buttons/tba.png");
        this.load.image("greyBox", "./assets/images/buttons/greybox.png");
        this.load.image("blueTab", "./assets/images/buttons/bluetab.png");
        this.load.image("coin", "./assets/images/icons/coin.png");
        this.load.image("shieldThumb", "./assets/images/heroes/shieldHero/down/0002.png");
        this.load.image("swordThumb", "./assets/images/heroes/swordHero/down/0001.png");
        this.load.image("magicThumb", "./assets/images/heroes/mageHero/down/0001.png");

        this.load.image("heart", "./assets/images/icons/heart.png");
        this.load.image("heart1", "./assets/images/icons/heart1.png");
        this.load.image("heart2", "./assets/images/icons/heart2.png");
        this.load.image("heart3", "./assets/images/icons/heart3.png");
        this.load.image("tutorialThumb", "./assets/images/icons/Tutorial.png");
        this.load.image("dungeon1Thumb", "./assets/images/icons/IceRoom.png");
        this.load.image("dungeon2Thumb", "./assets/images/icons/Dungeon4.png");
        this.load.image("dungeon3Thumb", "./assets/images/icons/DayDungeon3.png");
        this.load.image("nightmap2Thumb", "./assets/images/icons/nightmap2.png");
        this.load.image("textBar", "assets/images/icons/textBar.png");


        // add audio files
        //        this.load.audio("audiobackgroundsong", "./assets/audio/backgroundsong.wav");
        //        this.load.audio("audiocoin", "./assets/audio/coin.wav");
        //        this.load.audio("audiomageattack", "./assets/audio/mageattack.wav");
        //        this.load.audio("audiosleeping", "./assets/audio/sleeping.wav");
        //        this.load.audio("audiostomp", "./assets/audio/stomp.wav");
        //        this.load.audio("audioswordslice", "./assets/audio/swordslice.wav");

    }
    create() {
        console.log("scene");
        this.scene.start(SCENES.SPLASH, "loaded main menu");
    }

}
