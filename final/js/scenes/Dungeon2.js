//Day time level 

import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import {ENEMIES} from "../constants/EnemyTypes.js";
import {ENVIRONMENT} from "../constants/EnvironmentTypes.js";

//import {DayPlayer} from "../gamePlay/DayPlayer.js";   //Don't use this!!!!!!!!!
//import {Enemy} from "../gamePlay/Enemy.js";           //Don't use this!!!!!!!!!
import {Slime} from "../gamePlay/Monsters/Slime.js";
import {Golem} from "../gamePlay/Monsters/Golem.js";
import {Goblin} from "../gamePlay/Monsters/Goblin.js";

import { ShieldHero } from "../gamePlay/Heroes/ShieldHero.js";
import { SwordHero } from "../gamePlay/Heroes/SwordHero.js";
import { MageHero } from "../gamePlay/Heroes/MageHero.js";
import { DayScene } from "./DayScene.js";



export class Dungeon2 extends DayScene{
    constructor(){
        super({
            key: SCENES.DUNGEON2
        })
    }
    init(data){
        super.init(data);

        this.slimeSpawnArr = [
            [900,900],
            [900,1200],
            [1000,1000],
            [1100,1300],

            [1700,100],
            [1800,200],
            [1800,100],
            [1900,300],

            [1800,1600],
            [1800,1700],
            [1900,1800],
            [1900,1900],
            [2100,1500],

            [1900,4000],
            [2000,3900],
            [2000,4000],
            [2100,4100],
            [2200,3800],
            [2500,3700],

            [4800,200],
            [4200,300],
            [4800,700],
            [4300,300],
            [4100,300],
            [3900,200],

            [2800,3700],
            [2800,3800],
            [3000,3800],
            [3100,3500],
            [3100,3600],

            [2500,4500],
            [2600,4000],
            [2300,4000],
            [2500,4300],
            [2700,4300],


            [4000,4000],
            [4200,4400],
            [4200,4500],
            [4200,4800],
            [4300,4000],
            [4500,4000],
            [4800,4300],

            [4900,4900]
            
           
        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [
            [1200,3800],
            [1400,800],
            [2000,3700],
            [2200,4300]


        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [
            [2800,200],
            [2800,400],
            [2900,200],
            [3100,300],
            [3200,300],
            [3300,300],


            [2000,2800],
            [2100,2500],
            [2000,2700],
            [2100,2900],
            [2200,2600],
            [2300,2100],

            [3900,2600],
            [3400,2700],
            [3600,2500],
            [3700,2200],
            [3300,2000],
            [3100,1900],
           

        ];
        this.goblinCount = this.goblinSpawnArr.length;
        

    }
    preload(){
        super.preload();
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("barrel", "./assets/images/tiles/newerTileImages/barrel.png");

        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");
        
        this.load.tilemapTiledJSON("map2", "./assets/tilemaps/Dungeon4.json");
        this.mapLevel = "map2";
    }
    create(){
        //Generate map
        console.log(this.mapLevel);
        this.map = this.add.tilemap(this.mapLevel);

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5,5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 1, 0).setScale(5,5); 
        this.grassLayer = this.map.createStaticLayer("grass", [this.terrain], 1, 0).setScale(5,5); 

        super.create();

	    //collisions
        this.wallLayer.setCollision(6); //dungeon level     //Change this if you want a different tile set. This is the ID.
        
        this.physics.add.collider(this.playerGroup.getChildren(),this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(),this.wallLayer);




        this.scaleObjects(.5);
        console.log(this.map.objects);
        let doors = this.createObjects('objectsLayer',60,'door', 16, 16);
        let barrels = this.createObjects('objectsLayer',59,'barrel', 16, 16);
        let treasures = this.createObjects('objectsLayer',78,'treasure', 16, 16);

        this.door = this.physics.add.existing(doors.getChildren()[0]);


        console.log(doors);
        this.barrel1 = this.physics.add.existing(barrels.getChildren()[0]);
        this.barrel2 = this.physics.add.existing(barrels.getChildren()[1]);
        this.barrel3 = this.physics.add.existing(barrels.getChildren()[2]);
        this.barrel4 = this.physics.add.existing(barrels.getChildren()[3]);
        this.barrel5 = this.physics.add.existing(barrels.getChildren()[4]);
        this.barrel6 = this.physics.add.existing(barrels.getChildren()[5]);
        this.barrel7 = this.physics.add.existing(barrels.getChildren()[5]);
        this.barrel8 = this.physics.add.existing(barrels.getChildren()[5]);
        this.barrel9 = this.physics.add.existing(barrels.getChildren()[5]);
        this.barrel10 = this.physics.add.existing(barrels.getChildren()[5]);
        this.barrel11 = this.physics.add.existing(barrels.getChildren()[5]);


        this.treasure1 = this.physics.add.existing(treasures.getChildren()[0]);
        this.treasure2 = this.physics.add.existing(treasures.getChildren()[1]);

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
        this.barrel11.body.immovable = true;

        this.physics.add.collider(this.playerGroup, barrels.getChildren());
        this.physics.add.collider(barrels.getChildren(), this.wallLayer);



        //door overlap
        this.physics.add.overlap(this.door, this.playerGroup.getChildren(), function (o1) {
            o1.scene.music.pause();
            o1.scene.scene.stop(SCENES.DAY_OVERLAY);
            o1.scene.scene.start(SCENES.DUNGEON4, {
                "money": o1.scene.money,
                "level": 4
            });
            o1.scene.scene.stop();
        });



        this.map.currentLayer = this.baseLayer;
    }

    update(time, delta){
        super.update(time);
        if(this.input.keyboard.keys[49].isDown){
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON1, {
                "money": this.money,
                "level": 3
            });
            this.scene.stop();
        }else if(this.input.keyboard.keys[51].isDown){
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON3, {
                "money": this.money,
                "level": 5
            });
            this.scene.stop();
        }else if(this.input.keyboard.keys[52].isDown){
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 1
            });
            this.scene.stop();
        }else if(this.input.keyboard.keys[53].isDown){
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 2
            });
            this.scene.stop();
        }else if(this.input.keyboard.keys[54].isDown){
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
