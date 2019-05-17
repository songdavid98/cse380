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
    Night1
} from "../scenes/night1.js"
import {
    Night2
} from "../scenes/night2.js"
import {
    Night3
} from "../scenes/night3.js"
import {
    PauseScene
} from "../scenes/PauseScene.js"
import {
    DayOverlayScene
} from "../scenes/DayOverlay.js"
import {
    Dungeon1
} from "../scenes/Dungeon1.js"
import {
    Dungeon2
} from "../scenes/Dungeon2.js"
import{
    Dungeon3
} from "../scenes/Dungeon3.js"
import{
    Dungeon4
} from "../scenes/Dungeon4.js"

import { Dungeon5 } from "../scenes/Dungeon5.js";
import { Dungeon6 } from "../scenes/Dungeon6.js";



import { Beginning } from "../cutScenes/Beginning.js"; //Testing a cut scene
import { DayNightTransition } from "../cutScenes/DayNightTransition.js"; //Testing a cut scene

import { Tutorial } from "../scenes/Tutorial.js";
import { MiniDungeon} from "../scenes/MiniDungeon.js";

//Main
let game = new Phaser.Game({
    width: 1600,
    height: 900,
    scene: [
        PreloadScene, SplashScene, MenuScene, LevelSelectionScene, HelpScene, Night1, Night2, Night3, Dungeon1, Dungeon2, Dungeon3, Dungeon4, Dungeon5, Dungeon6, Beginning, DayNightTransition, Tutorial, MiniDungeon,DayOverlayScene, PauseScene, ControlsScene
    ],

    //----------------------------------mine 

    render: {
        pixelArt: true,
        transparent: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }

    //---------------------------------until here

});
