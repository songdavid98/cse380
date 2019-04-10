import {MenuScene} from "../scenes/mainMenu.js";
import {PreloadScene} from "../scenes/preload.js";
import {SplashScene} from "../scenes/startUp.js";
import {LevelSelectionScene} from "../scenes/levelSelection.js"
import {DayScene} from "../scenes/DayScene.js"

//Main
let game = new Phaser.Game({
    width: 500,
    height: 500,
    scene:[
        PreloadScene, SplashScene, MenuScene, LevelSelection, DayScene
    ]
});