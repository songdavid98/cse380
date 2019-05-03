//Day time level 
import{
    SCENES
} from "../constants/SceneNames.js"
import{
    ENEMIES
} from "../constants/EnemyTypes.js"
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
import { DayScene } from "./DayScene.js";



export class Dungeon1 extends DayScene {
    constructor() {
        super({
            key: SCENES.DUNGEON1
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
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");

        this.level = 1;
        this.load.tilemapTiledJSON("map1", "assets/tilemaps/IceRoom.json");
        this.mapLevel = "map1";
    }
    create() {
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5, 5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 0, 0).setScale(5, 5);

        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        //Create the enemies
        for (var i = 0; i < this.slimeCount; i++) {
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(5, 5);
            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({
                "sprite": slimeSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.SLIME,
                "anims": this.anims,
                "scene": this
            });
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }

        for (var i = 0; i < this.golemCount; i++) {
            let golemSprite = this.physics.add.sprite(this.golemSpawnArr[i][0], this.golemSpawnArr[i][1], ENEMIES.GOLEM, 'down/0001.png').setScale(8, 8);
            this.enemyGroup.add(golemSprite);
            let golem = new Golem({
                "sprite": golemSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOLEM,
                "anims": this.anims,
                "scene": this
            });
            golemSprite.class = golem;
            this.monsterArray.push(golem);
        }

        for (var i = 0; i < this.goblinCount; i++) {
            let goblinContainer = this.add.container(this.goblinSpawnArr[i][0], this.goblinSpawnArr[i][1]);
            let goblinSprite = this.physics.add.sprite(0, 0, ENEMIES.GOBLIN, 'sleep/0001.png').setScale(5, 5);
            let zzzSprite = this.physics.add.sprite(100, -100, ENEMIES.GOBLIN, 'zzz/0001.png').setScale(5, 5);
            goblinContainer.add([goblinSprite, zzzSprite]);
            this.enemyGroup.add(goblinSprite);
            let goblin = new Goblin({
                "sprite": goblinSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOBLIN,
                "anims": this.anims,
                "goblinContainer": goblinContainer,
                "scene": this
            });
            goblinSprite.class = goblin;
            this.monsterArray.push(goblin);
        }

        //collisions
        this.wallLayer.setCollision(7); //Snow level
        this.wallLayer.setCollision(5); //Snow level

        this.physics.add.collider(this.playerGroup.getChildren(), this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);

        //add cave door
        this.items = this.map.objects[0].objects;
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].width *= 5;
            this.items[i].height *= 5;
            this.items[i].x *= 5;
            this.items[i].y *= 5;
        }
        this.map.createFromObjects('objectsLayer', 20, {
            key: 'treasure'
        });
        this.door = this.map.createFromObjects('objectsLayer', 2, {
            key: 'door'
        })[0];
        this.door = this.physics.add.existing(this.door);
        this.door.body.setSize(this.door.body.width, this.door.body.height);
        this.door.body.setOffset(0, 0);

        //door overlap
        this.physics.add.overlap(this.door, this.playerGroup.getChildren(), function (o1) {
            o1.scene.music.pause();
            o1.scene.scene.stop(SCENES.DAY_OVERLAY);
            o1.scene.scene.start(SCENES.DUNGEON2, {
                "money": o1.scene.money,
                "level": 5
            });
            o1.scene.scene.stop();
            console.log("hello");
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
