//Day time level 
import{
    SCENES
} from "../constants/SceneNames.js";

import { DayScene } from "./DayScene.js";

export class Tutorial extends DayScene {
    constructor() {
        super({
            key: SCENES.TUTORIAL
        })
    }
    init(data) {
        //This variable is used for attack cooldowns as well as time in between damages from monsters
        super.init(data);
        this.deathSceneLength = 5;
        this.slimeSpawnArr = [
            [600,600],
            [900,600],
            [700,700]

        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [

            [200000, 180000]        //Off the map
        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [

            [13000,21500]           //Off the map

        ];
        this.goblinCount = this.goblinSpawnArr.length;


    }
    preload() {
     
        super.preload();
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("greenHealth", "./assets/images/icons/bar1.png");
        this.load.image("healthBar", "./assets/images/icons/bar2.png");

        this.load.tilemapTiledJSON("tutorial", "assets/tilemaps/tutorial.json");
        this.mapLevel = "tutorial";

    }
    create() {
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding

        //this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 0, 0).setScale(5, 5);
        this.baseLayer = this.map.createStaticLayer("groundLayer", [this.terrain], 0, 0).setScale(5, 5);
        this.grassLayer = this.map.createStaticLayer("grassLayer", [this.terrain], 0, 0).setScale(5, 5);
        this.wallLayer = this.map.createStaticLayer("rockLayer", [this.terrain], 0, 0).setScale(5, 5);

        super.create();

        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,Two,Three,Four,Five,Six');

        //collisions
        this.wallLayer.setCollision(6);     //For tutorial
        this.physics.add.collider(this.playerGroup, this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);

        this.map.currentLayer = this.baseLayer;

    }

    update(time, delta) {
        super.update(time);
        var slimeFound = false;
        for(var i = 0; i < this.enemyGroup.getChildren().length; i++){
            //console.log(this.enemyGroup.getChildren()[i].enemyType);
            if(this.enemyGroup.getChildren()[i].class.enemyType == "SLIME"){
                slimeFound = true;
            }
        }
        //console.log(slimeFound);
        if(!slimeFound){
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON1,{"money":this.money});
            this.scene.stop();

        }
        if (this.player.sprite && this.player.sprite.body && !this.player.active && time - (this.lastDamaged + 400) >= 0) {
            //console.log("hello");
            this.player.active = true;
            this.player.sprite.body.setVelocity(0, 0);
        }
        if (this.allThreeDead() && this.timeOfDeath == null) { //Kill the player and get the time of death
            this.player.active = false;
            this.player.sprite.destroy();
            this.timeOfDeath = time;
            //console.log(time);
            //console.log(Math.floor(this.timeOfDeath/1000));

        } else if (this.allThreeDead() && Math.floor((time / 1000)) - Math.floor(this.timeOfDeath / 1000) >= this.deathSceneLength) {
            //Shows the game going without the Player for x amount of seconds before it sends the game to the main menu
            this.timeOfDeath = null;
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.MAIN_MENU, 'dead');
            this.scene.stop();
        } else {
            //cheats
            if(this.input.keyboard.keys[50].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.DUNGEON2, {
                    "money": this.money,
                    "level": 4
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
}
