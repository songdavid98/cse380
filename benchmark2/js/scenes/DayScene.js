//Day time level 

import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import {DayPlayer} from "../gamePlay/DayPlayer.js";
export class DayScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.DAY
        })
    }
    init(data){
        this.time;
        this.map;
        this.monsterArray;
        this.level = data.level;
        this.mapLevel;
        this.angle;
    }
    preload(){
        this.load.image("terrain", "assets/images/tiles.png");

        this.load.multiatlas(HEROES.SHIELD_HERO, 'assets/images/heroes.json', "assets/images");
        //this.load.multiatlas(HEROES.SHIELD_HERO, 'assets/images/cityscene.json', "assets/images");

        switch(this.level){
            case 1: 
                this.load.tilemapTiledJSON("map1", "assets/tilemaps/dungeon2.json");
                this.mapLevel = "map1";
                console.log("Welcome to level 1");
                break;
            case 2: 
                this.load.tilemapTiledJSON("map2", "assets/tilemaps/dungeon2.json");
                this.mapLevel = "map2";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 3: 
                this.load.tilemapTiledJSON("map3", "assets/tilemaps/dungeon3.json");
                this.mapLevel = "map3";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 4: 
                this.load.tilemapTiledJSON("map4", "assets/tilemaps/dungeon4.json");
                this.mapLevel = "map4";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 5: 
                this.load.tilemapTiledJSON("map5", "assets/tilemaps/dungeon5.json");
                this.mapLevel = "map5";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 6: 
                this.load.tilemapTiledJSON("map6", "assets/tilemaps/dungeon6.json");
                this.mapLevel = "map6";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            default:
                this.scene.start(SCENES.Main_MENU, "how");
        }
    }
    create(){
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        let terrain = this.map.addTilesetImage("tiles", "terrain");
        this.baseLayer = this.map.createStaticLayer("base", [terrain], 0, 0).setScale(5,5);
        this.wallLayer = this.map.createStaticLayer("walls", [terrain], 1, 0).setScale(5,5); 

        //Generate sprites
        this.sprite = this.physics.add.sprite(600, 400, HEROES.SHIELD_HERO, 'shieldHero/down/0001.png').setScale(5, 5);


        //Keyboard stuff
        console.log(this.input.keyboard);
        this.input.keyboard.addKeys('W,S,A,D');

        //Create the heroes
        this.hero = new DayPlayer({"sprite":this.sprite,"physics":this.physics,"keyboard":this.input.keyboard,
        "health":1,"basicAttack":1,"specialAttack":2,"speed":2*128,"playerType":HEROES.SHIELD_HERO, "anims":this.anims});

	    //collisions
	    this.wallLayer.setCollisionBetween(265,300);
        this.physics.add.collider(this.sprite,this.wallLayer);

        //Camera
        this.cameras.main.setBounds(0,0,this.map.widthInPixels*5, this.map.heightInPixels*5);
        this.cameras.main.startFollow(this.sprite);

        //Event Listeners
        this.input.on('pointermove', function (pointer) {
            let cursor = pointer;
            this.angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, cursor.x+this.cameras.main.scrollX, cursor.y+this.cameras.main.scrollY);
            if(pointer.leftButtonDown()){
                this.hero.attackBasic(cursor, this.angle);
            }
            else if(pointer.rightButtonDown()){
                this.hero.attackSpecial(cursor, this.angle);
            }
        }, this);







        //DayPlayer swordHero = new DayPlayer();
        //DayPlayer mageHero = new DayPlayer();

        //let bottomLayer = map.createStaticLayer("bottom", [terrain], 0,0).setDepth(-1);
        //let topLayer = map.createStaticLayer("top", [terrain], 0,0);


    }
    update(time, delta){
        this.hero.update(this.angle);


    }
}












