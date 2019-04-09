import {MenuScene} from "../menu/mainMenu.js";
import {PreloadScene} from "../loading/preload.js";
import {SplashScene} from "../menu/startUp.js";

//Main
let game = new Phaser.Game({
    width: 500,
    height: 500,
    scene:[
        PreloadScene, SplashScene, MenuScene
    ]
});