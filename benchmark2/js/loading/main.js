import {MenuScene} from "../scenes/mainMenu.js";
import {PreloadScene} from "../scenes/preload.js";
import {SplashScene} from "../scenes/startUp.js";
import {LevelSelectionScene} from "../scenes/levelSelection.js"
import {HelpScene} from "../scenes/help.js"
import {ControlsScene} from "../scenes/ControlsScene.js"
import {DayScene} from "../scenes/DayScene.js"
import {NightScene} from "../scenes/nightScene.js"

//Main
let game = new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight,
    scene:[
        PreloadScene, SplashScene, MenuScene, LevelSelectionScene, HelpScene, ControlsScene, DayScene, NightScene
    ],

    //----------------------------------mine 

    render:{
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }

    //---------------------------------until here

});