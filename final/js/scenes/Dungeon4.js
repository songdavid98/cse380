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



export class Dungeon4 extends DayScene {
    constructor() {
        super({
            key: SCENES.DUNGEON4
        })
    }
    init(data) {
        super.init(data);

        this.slimeSpawnArr = [
            /*
            [700,700],
            [1000,1000],
            [1200,1100],
            [1300,1500],
            [1300,1200],

            [1400,1200],
            [1400,1600],
            [1500,1300],
            [1600,1400],

            [2100,2100],
            [2200,2100],
            [2100,2200],
            [2200,2200],*/
            [2300, 2000],

        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [
            [300, 2000],
            [2000, 1800]
        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [

            [1320, 400],
            [1400, 600],
            [1600, 1000],
            [1700, 1900],
            [1800, 1800],
            [1670, 1400],
            [1220, 300],
            [1740, 900],
            [1800, 800]

        ];
        this.goblinCount = this.goblinSpawnArr.length;


    }
    preload() {
        super.preload();
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");

        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("barrel", "./assets/images/tiles/newerTileImages/barrel.png");

        this.level = 4;
        this.load.tilemapTiledJSON("map4", "assets/tilemaps/FireRoom.json");
        this.mapLevel = "map4";
    }
    create() {
        //Generate map
        console.log("COmes");
        this.map = this.add.tilemap(this.mapLevel);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding

        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5, 5);
        this.grassLayer = this.map.createStaticLayer("grass", [this.terrain], 1, 0).setScale(5, 5);
        this.dangerGrassLayer = this.map.createStaticLayer("dangerGrass", [this.terrain], 1, 0).setScale(5, 5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 1, 0).setScale(5, 5);
        this.lavaLayer = this.map.createStaticLayer("lava", [this.terrain], 1, 0).setScale(5, 5);



        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        //collisions
        this.wallLayer.setCollision(6); 

        this.physics.add.collider(this.playerGroup.getChildren(), this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);



        this.scaleObjects(.5);
        let doors = this.createObjects('objectsLayer',118,'door', 16, 16);
        let barrels = this.createObjects('objectsLayer',117,'barrel', 16, 16);
        let treasures = this.createObjects('objectsLayer',136,'treasure', 16, 16);

        console.log(doors);

        this.door1 = this.physics.add.existing(doors.getChildren()[0]);
        this.door2 = this.physics.add.existing(doors.getChildren()[1]);

        this.barrel1 = this.physics.add.existing(barrels.getChildren()[0]);
        this.barrel2 = this.physics.add.existing(barrels.getChildren()[1]);
        this.barrel3 = this.physics.add.existing(barrels.getChildren()[2]);
        this.barrel4 = this.physics.add.existing(barrels.getChildren()[3]);
        this.barrel5 = this.physics.add.existing(barrels.getChildren()[4]);
        this.barrel6 = this.physics.add.existing(barrels.getChildren()[5]);

        this.treasure1 = this.physics.add.existing(treasures.getChildren()[0]);
        this.treasure2 = this.physics.add.existing(treasures.getChildren()[1]);

        this.barrel1.body.immovable = true;
        this.barrel2.body.immovable = true;
        this.barrel3.body.immovable = true;
        this.barrel4.body.immovable = true;
        this.barrel5.body.immovable = true;
        this.barrel6.body.immovable = true;

        this.physics.add.collider(this.playerGroup, barrels.getChildren());
        this.physics.add.collider(this.enemyGroup, barrels.getChildren());
        this.physics.add.collider(barrels.getChildren(), this.wallLayer);


        //door overlap
        this.physics.add.overlap(this.door1, this.playerGroup.getChildren(), function (o1,o2) {
            console.log(o2);
        });

        //Treasure stuff
        this.physics.add.overlap(this.treasure1, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 1500;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure2, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 4000;
            o1.destroy();
        });


        //Danger grass stuffs
        this.physics.add.overlap(this.playerGroup.getChildren(), this.dangerGrassLayer, function (playerSprite,hazard) {
            if(hazard.index != -1){
                playerSprite.class.hazardDamage(hazard.layer.properties[0].value);
                console.log("Getting hit by some weed");
            }
        });
        this.physics.add.overlap(this.enemyGroup.getChildren(), this.dangerGrassLayer, function (enemySprite,hazard) {
            if(hazard.index != -1){
                enemySprite.class.damaged(hazard.layer.properties[0].value);
                console.log("Getting hit by some weed");
            }
        });

        this.map.currentLayer = this.baseLayer;
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
