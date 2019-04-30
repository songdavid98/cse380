import {
    MenuScene
} from "../scenes/mainMenu.js";
import {
    PreloadScene
} from "../scenes/preload.js";
import {
    SplashScene
} from "../scenes/startUp.js";
import {
    LevelSelectionScene
} from "../scenes/levelSelection.js"
import {
    HelpScene
} from "../scenes/help.js"
import {
    ControlsScene
} from "../scenes/ControlsScene.js"
import {
    DayScene
} from "../scenes/DayScene.js"
import {
    NightScene
} from "../scenes/nightScene.js"
import {
    PauseScene
} from "../scenes/PauseScene.js"
import {
    DayOverlayScene
} from "../scenes/DayOverlay.js"
import {
    DayDungeon3
} from "../scenes/DayDungeon3.js"
import {
    Dungeon4
} from "../scenes/Dungeon4.js"

import { Beginning } from "../cutScenes/Beginning.js"; //Testing a cut scene
import { Tutorial } from "../scenes/Tutorial.js";

//Main
let game = new Phaser.Game({
    width: 1600,
    height: 900,
    scene: [
        PreloadScene, SplashScene, MenuScene, LevelSelectionScene, HelpScene, ControlsScene, DayScene, NightScene, DayDungeon3, Dungeon4, Beginning, Tutorial, DayOverlayScene, PauseScene
    ],

    //----------------------------------mine 

    render: {
        pixelArt: true,
        transparent: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }

    //---------------------------------until here

});
