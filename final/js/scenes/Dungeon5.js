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



export class Dungeon5 extends DayScene {
    constructor() {
        super({
            key: SCENES.DUNGEON5
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
        this.level = 1;
        super.preload();

        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("barrel", "./assets/images/tiles/newerTileImages/barrel.png");
        this.load.image("clear", "./assets/images/tiles/newerTileImages/zzzclearTile.png");


        this.load.tilemapTiledJSON("map5", "assets/tilemaps/Dungeon5.json");
        this.mapLevel = "map5";
    }
    create() {
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5, 5);
        this.grassLayer = this.map.createStaticLayer("grass", [this.terrain], 1, 0).setScale(5, 5);
        this.hardGrassLayer = this.map.createStaticLayer("hardGrass", [this.terrain], 1, 0).setScale(5, 5);
        this.dangerGrassLayer = this.map.createStaticLayer("dangerGrass", [this.terrain], 1, 0).setScale(5, 5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 1, 0).setScale(5, 5);

        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added



        //collisions
        this.wallLayer.setCollision(6); 

        this.physics.add.collider(this.playerGroup.getChildren(), this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);



        this.scaleObjects(.5);
        this.barrels = this.createObjects('objectsLayer',1,'barrel', 16, 16);   //It needs a "this" keyword
        let barrels = this.barrels;
        let treasures = this.createObjects('objectsLayer',20,'treasure', 16, 16);
        let goblinSpawnPoints = this.createSpawnPoints('goblinSpawnPoints',60,'clear');
        let slimeSpawnPoints = this.createSpawnPoints('slimeSpawnPoints', 62, 'clear');
        let golemSpawnPoints = this.createSpawnPoints('golemSpawnPoints', 61, 'clear');


        for(let i = 0; i < slimeSpawnPoints.getChildren().length; i++){
            let halfOfTileWidth = slimeSpawnPoints.getChildren()[0].width/2;
            let halfOfTileHeight = slimeSpawnPoints.getChildren()[0].height/2;
            let x = (slimeSpawnPoints.getChildren()[i].x-halfOfTileWidth)*5;
            let y = (slimeSpawnPoints.getChildren()[i].y-halfOfTileHeight)*5;
            this.slimeSpawnArr.push([x,y]);
        }
        this.spawnMoreSlimes();
        
        for(let i = 0; i < goblinSpawnPoints.getChildren().length; i++){
            let halfOfTileWidth = goblinSpawnPoints.getChildren()[0].width/2;
            let halfOfTileHeight = goblinSpawnPoints.getChildren()[0].height/2;
            let x = (goblinSpawnPoints.getChildren()[i].x-halfOfTileWidth)*5;
            let y = (goblinSpawnPoints.getChildren()[i].y-halfOfTileHeight)*5;
            this.goblinSpawnArr.push([x,y]);
        }
        this.spawnMoreGoblins();


        for(let i = 0; i < golemSpawnPoints.getChildren().length; i++){
            let halfOfTileWidth = golemSpawnPoints.getChildren()[0].width/2;
            let halfOfTileHeight = golemSpawnPoints.getChildren()[0].height/2;            
            let x = (golemSpawnPoints.getChildren()[i].x-halfOfTileWidth)*5;
            let y = (golemSpawnPoints.getChildren()[i].y-halfOfTileHeight)*5;
            this.golemSpawnArr.push([x,y]);
        }
        this.spawnMoreGolems();





        for(let i = 0; i < 10; i++){
            barrels.getChildren()[i].noMoreMovement = false;
        }


        this.barrel1 = this.physics.add.existing(barrels.getChildren()[0]);
        this.barrel2 = this.physics.add.existing(barrels.getChildren()[1]);
        this.barrel3 = this.physics.add.existing(barrels.getChildren()[2]);
        this.barrel4 = this.physics.add.existing(barrels.getChildren()[3]);
        this.barrel5 = this.physics.add.existing(barrels.getChildren()[4]);
        this.barrel6 = this.physics.add.existing(barrels.getChildren()[5]);
        this.barrel7 = this.physics.add.existing(barrels.getChildren()[6]);
        this.barrel8 = this.physics.add.existing(barrels.getChildren()[7]);
        this.barrel9 = this.physics.add.existing(barrels.getChildren()[8]);
        this.barrel10 = this.physics.add.existing(barrels.getChildren()[9]);

        this.barrel1.body.immovable = true;
        this.barrel2.body.immovable = true;
        this.barrel3.body.immovable = true;
        this.barrel4.body.immovable = true;
        this.barrel5.body.immovable = true;
        this.barrel6.body.immovable = true;
        this.barrel7.body.immovable = true;
        this.barrel8.body.immovable = true;
        this.barrel9.body.immovable = true;
        this.barrel10.body.immovable = true;



        this.treasure1 = this.physics.add.existing(treasures.getChildren()[0]);
        this.treasure2 = this.physics.add.existing(treasures.getChildren()[1]);
        this.treasure3 = this.physics.add.existing(treasures.getChildren()[2]);
        this.treasure4 = this.physics.add.existing(treasures.getChildren()[3]);
        this.treasure5 = this.physics.add.existing(treasures.getChildren()[4]);
        this.treasure6 = this.physics.add.existing(treasures.getChildren()[5]);
        this.treasure7 = this.physics.add.existing(treasures.getChildren()[6]);
        this.treasure8 = this.physics.add.existing(treasures.getChildren()[7]);
        this.treasure9 = this.physics.add.existing(treasures.getChildren()[8]);
        this.treasure10 = this.physics.add.existing(treasures.getChildren()[9]);
        this.treasure11 = this.physics.add.existing(treasures.getChildren()[10]);

        this.physics.add.collider(this.playerGroup, barrels.getChildren());
        this.physics.add.collider(this.enemyGroup, barrels.getChildren());
        this.physics.add.collider(barrels.getChildren(), this.wallLayer);



        //Treasure stuff
        this.physics.add.overlap(this.treasure1, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 200;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure2, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 400;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure3, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 100;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure4, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 2000;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure5, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 500;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure6, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 50;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure7, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 50;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure8, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 50;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure9, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 50;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure10, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 50;
            o1.destroy();
        });

        this.physics.add.overlap(this.treasure11, this.playerGroup.getChildren(), function (o1,o2) {
            o1.scene.money += 50;
            o1.destroy();
        });


        //Danger grass stuffs
        this.physics.add.overlap(this.playerGroup.getChildren(), this.dangerGrassLayer, function (playerSprite,hazard) {
            if(hazard.index != -1){
                playerSprite.class.hazardDamage(hazard.layer.properties[0].value);
                //console.log("Getting hit by some weed");
            }
        });
        this.physics.add.overlap(this.enemyGroup.getChildren(), this.dangerGrassLayer, function (enemySprite,hazard) {
            if(hazard.index != -1){
                enemySprite.class.damaged(hazard.layer.properties[0].value);
                //console.log("Getting hit by some weed");
            }
        });

        this.barrelOverlap = this.physics.add.overlap(this.barrels.getChildren(), this.hardGrassLayer, function (o1, o2) {
            o1.body.immovable = true;
            o1.noMoreMovement = true;
            
        });

        this.map.currentLayer = this.baseLayer;
    }






    update(time, delta) {
        super.update(time);
        //cheats
        /*
        if (this.input.keyboard.keys[50].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            console.log(this.money);
            this.scene.start(SCENES.DUNGEON2, {
                "money": this.money,
                "level": 4,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[51].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON3, {
                "money": this.money,
                "level": 5,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[52].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 1,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[53].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 2,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[54].isDown) {
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 3,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        }
        */
    }
}
