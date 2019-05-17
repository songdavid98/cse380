//Day time level 

import {
    SCENES
} from "../constants/SceneNames.js";
import {
    HEROES
} from "../constants/PlayerTypes.js";
import {
    ENEMIES
} from "../constants/EnemyTypes.js";
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
     Minotaur 
} from "../gamePlay/Monsters/Minotaur.js";

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



export class Dungeon3 extends DayScene {
    constructor() {
        super({
            key: SCENES.DUNGEON3
        })
    }
    init(data) {
        super.init(data);

        this.slimeSpawnArr = [
            /*[1800, 600+3200],
            [2320, 300+3200],
            [1500, 500+3200],
            [1750, 1300+3200],
            [1700, 1200+3200],
            [1950, 1000+3200],
            [1600, 1200+3200],
            [1550, 1600+3200],
            [1500, 1000+3200],
            [1600, 1500+3200]*/
        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [
            /*[1900, 1200+3200],
            [1400, 1500+3200]*/
        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [
            /*[1300, 1400+3200],
            [1400, 600+3200],
            [1500, 1400+3200],
            [1600, 1000+3200],
            [1700, 900+3200],
            [1800, 1800+3200],
            [1600, 400+3200],
            [1800, 600+3200],
            [1220, 1300+3200],
            [1600, 600+3200],
            [1700, 900+3200],
            [1800, 800+3200],*/

        ];
        this.goblinCount = this.goblinSpawnArr.length;

        this.minotaurSpawnArr = [
            [1600,800]
        ];
        this.minotaurLength = this.minotaurSpawnArr.length;


    }
    preload() {
        super.preload();
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("barrel", "./assets/images/tiles/newerTileImages/barrel.png");

        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");

        this.load.tilemapTiledJSON("map3", "./assets/tilemaps/PuzzleDungeonv2.json");
        this.mapLevel = "map3";
        console.log("make suer this dungeon even exits, dumbo");
    }
    create() {
        //Generate map
        this.buttonsPressed = 0;
        this.map = this.add.tilemap(this.mapLevel);

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 0, 0).setScale(4, 4);
        this.groundLayer = this.map.createStaticLayer("ground", [this.terrain], 0, 0).setScale(4, 4);
        this.buttonsLayer = this.map.createStaticLayer("buttons", [this.terrain], 0, 0).setScale(4, 4);
        this.prisonLayer = this.map.createStaticLayer("prison", [this.terrain], 0, 0).setScale(4, 4);
        this.doorLayer = this.map.createStaticLayer("door", [this.terrain], 0, 0).setScale(4, 4);
        super.create({"initialX":1600, "initialY":3000+2600});//3000+2600});
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 4, this.map.heightInPixels * 4);
        //add objects
        this.items = this.map.objects[0].objects;
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].width *= 4;
            this.items[i].height *= 4;
            this.items[i].x *= 4;
            this.items[i].y *= 4;
        }
        let barrels = this.map.createFromObjects('objectLayer', 1, {
            key: 'barrel'
        });
        this.barrels = this.physics.add.group();
        console.log(barrels);
        for (var i = 0; i < barrels.length; i++) {
            this.barrels.add(this.physics.add.existing(barrels[i]));
            barrels[i].body.setSize(barrels[i].body.width, barrels[i].body.height);
            barrels[i].body.setOffset(0, 0);
        }

        //collisions
        this.wallLayer.setCollision(6); //dungeon level     //Change this if you want a different tile set. This is the ID.
        this.prisonLayer.setCollision(18);
        this.groundLayer.setCollision(1);
        this.doorLayer.setCollision(18);

        let goblinSpawnPoints = this.createSpawnPoints('goblinSpawnPoints',60,'clear');
        for(let i = 0; i < goblinSpawnPoints.getChildren().length; i++){
            let halfOfTileWidth = goblinSpawnPoints.getChildren()[0].width/2;
            let halfOfTileHeight = goblinSpawnPoints.getChildren()[0].height/2;
            let x = (goblinSpawnPoints.getChildren()[i].x-halfOfTileWidth)*4;
            let y = (goblinSpawnPoints.getChildren()[i].y-halfOfTileHeight)*4;
            this.goblinSpawnArr.push([x,y]);
        }
        this.spawnMoreGoblins();

        this.physics.add.collider(this.playerGroup.getChildren(), this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);

        this.physics.add.collider(this.playerGroup.getChildren(), this.prisonLayer);
        


        this.doorCollider = this.physics.add.collider(this.playerGroup.getChildren(), this.doorLayer);
        this.prisonCollider = this.physics.add.collider(this.enemyGroup.getChildren(), this.prisonLayer);
        this.barrelOverlap = this.physics.add.overlap(this.barrels.getChildren(), this.buttonsLayer, function (o1, o2) {
            if (o1.scene.buttonsPressed >= 2) {
                if (o1.scene.doorLayer) {
                    o1.scene.physics.world.removeCollider(o1.scene.doorCollider);
                    o1.scene.doorLayer.destroy();
                    o1.scene.doorLayer = null;
                    console.log(o1.scene.doorLayer);
                }
                o1.scene.physics.world.removeCollider(o1.scene.barrelOverlap);
            } else if (o2.index == -1) {

            } else if (!o1.pressed) {
                o1.pressed = true;
                o1.setPosition(o1.x + (20 * Math.sign(o1.body.velocity.x)), o1.y);
                o1.body.destroy();
                o1.scene.buttonsPressed++;
            }
        });
        this.map.currentLayer = this.baseLayer;
        // this.pathFinding();
    }

    update(time, delta) {
        //console.log(this.player.sprite.body.position);
        console.log(this.minotaur.sprite);
        if(!this.minotaur.sprite.scene && this.doorLayer2){
            console.log("testing");
            this.physics.world.removeCollider(this.doorCollider2);
            this.physics.world.removeCollider(this.doorCollider2pt2);
            this.doorLayer2.destroy();
            this.doorLayer2 = null;
            this.permanentDestroy = true;
        }
        super.update(time);
            //console.log(this.player.sprite.body.position);
        if(this.player.active && this.player.sprite.body.position.y <= 1240 & this.player.sprite.body.position.y > 0){
            //console.log("hello");
            this.player.active = false;
        }
        //console.log(this.buttonsPressed);
        if(!this.doorLayer && !this.doorLayer2 && this.player.sprite.body.y < 2800 && !this.permanentDestroy){
            this.doorLayer2 = this.map.createStaticLayer("door", [this.terrain], 0, 0).setScale(4, 4);
            this.doorLayer2.setCollision(18);
            this.doorCollider2 = this.physics.add.collider(this.playerGroup.getChildren(), this.doorLayer2);
            this.doorCollider2pt2 = this.physics.add.collider(this.enemyGroup.getChildren(), this.doorLayer2);
        }
        if (this.player.sprite.body && this.player.sprite.body.position.x > 1400 && this.player.sprite.body.position.x < 1700 && this.player.sprite.body.position.y < 50) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            let data = {
                "str":"winner",
                "unlockedLevels":this.unlockedLevels
            }
            this.scene.start(SCENES.MAIN_MENU, data);
            this.scene.stop();
        }
        //cheats
        /*
        if (this.input.keyboard.keys[49].isDown) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON1, {
                "money": this.money,
                "level": 4,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[50].isDown) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON2, {
                "money": this.money,
                "level": 5,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[52].isDown) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 1,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[53].isDown) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.NIGHT, {
                "money": this.money,
                "level": 2,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[54].isDown) {
            this.music.stop();
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
