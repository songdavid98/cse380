//Day time level 
import{
    SCENES
} from "../constants/SceneNames.js"
import{
    ENEMIES
} from "../constants/EnemyTypes.js"
import {
    ENVIRONMENT
} from "../constants/EnvironmentTypes.js";
import {
    Slime
} from "../gamePlay/Monsters/Slime.js";
import {
    Golem
} from "../gamePlay/Monsters/Golem.js";
import {
    Goblin
} from "../gamePlay/Monsters/Goblin.js";

import {
    ShieldHero
} from "../gamePlay/Heroes/ShieldHero.js";
import {
    SwordHero
} from "../gamePlay/Heroes/SwordHero.js";
import {
    MageHero
} from "../gamePlay/Heroes/MageHero.js";
import {
     DayScene 
} from "./DayScene.js";



export class MiniDungeon extends DayScene {
    constructor() {
        super({
            key: SCENES.MINI_DUNGEON
        })
    }
    init(data) {
        
        super.init(data);

        this.slimeSpawnArr = [

        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [

        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [

        ];
        this.goblinCount = this.goblinSpawnArr.length;


    }
    preload() {
        this.level = 0;
        super.preload();

        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("barrel", "./assets/images/tiles/newerTileImages/barrel.png");


        this.load.tilemapTiledJSON("miniMap", "assets/tilemaps/miniMap.json");
        this.mapLevel = "miniMap";
    }
    create() {
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding


        //this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 0, 0).setScale(5, 5);
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5, 5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 0, 0).setScale(5, 5);

        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,Two,Three,Four,Five,Six');

        //collisions
        this.wallLayer.setCollision(6);     //For tutorial

        this.physics.add.collider(this.playerGroup.getChildren(), this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);


        //Objects?
        this.scaleObjects(.5);
        this.map.currentLayer = this.baseLayer;

    }
    
    skip(){
        this.music.stop();
        this.scene.stop(SCENES.DAY_OVERLAY);
        let unlockedLevels = [1,2,0,0,0,0,0,0];
        let data = {
            "str":"Day 1 Unlocked",
            "unlockedLevels":unlockedLevels
        }
        this.scene.start(SCENES.LEVEL_SELECT,data);
        this.scene.stop();
    }

    tasks(){

        console.log("Enter");
        if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
            if(!this.doneOnce){
                this.textWords = "You are now ready to enter the dungeon. Defeat as many monsters as\nyou can before the time runs out. Good luck!";
                this.doneOnce = true;
            }
        }
        else{
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            let unlockedLevels = [1,2,0,0,0,0,0,0];

            let data = {
                "str":"Day 1 Unlocked",
                "unlockedLevels":unlockedLevels
            }
            this.scene.start(SCENES.LEVEL_SELECT,data);
            this.scene.stop();
        }
    }




    update(time, delta) {
        super.update(time);
        //cheats
        if (this.input.keyboard.keys[50].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            console.log(this.money);
            this.scene.start(SCENES.DUNGEON2, {
                "money": this.money,
                "level": 4
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[51].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON3, {
                "money": this.money,
                "level": 5
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[52].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 1
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[53].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 2
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[54].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 3
            });
            this.scene.stop();
        }
    }
}
