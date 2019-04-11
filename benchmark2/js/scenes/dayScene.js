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
    }
    preload(){
        this.load.image("terrain", "../assets/images/tiles.png");
        this.load.spritesheet("shieldHero", "../assets/images/shieldHero1.png", {frameWidth: 32, frameHeight:32});


        switch(this.level){
            case 1: 
                this.load.tilemapTiledJSON("map1", "../assets/tilemaps/dungeon2.json");
                this.mapLevel = "map1";
                console.log("Welcome to level 1");
                break;
            case 2: 
                this.load.tilemapTiledJSON("map2", "../assets/tilemaps/dungeon2.json");
                this.mapLevel = "map2";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 3: 
                this.load.tilemapTiledJSON("map3", "../assets/tilemaps/dungeon3.json");
                this.mapLevel = "map3";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 4: 
                this.load.tilemapTiledJSON("map4", "../assets/tilemaps/dungeon4.json");
                this.mapLevel = "map4";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 5: 
                this.load.tilemapTiledJSON("map5", "../assets/tilemaps/dungeon5.json");
                this.mapLevel = "map5";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 6: 
                this.load.tilemapTiledJSON("map6", "../assets/tilemaps/dungeon6.json");
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
        this.baseLayer = this.map.createStaticLayer("base", [terrain], 0, 0).setScale(2,2);
        this.wallLayer = this.map.createStaticLayer("walls", [terrain], 1, 0).setScale(2,2);
        
        //Generate sprite
        this.sprite = this.physics.add.sprite(100,100, 'shieldHero').setScale(3,3);
        console.log(this.sprite);
        //this.walk = this.sprite.animations.add('walk'); 


        //Create the heroes
        console.log(this.input.keyboard);
        /*this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);*/
        this.input.keyboard.addKeys('W,S,A,D');

        this.shieldHero = new DayPlayer({"sprite":this.sprite,"physics":this.physics,"keyboard":this.input.keyboard,
        "health":1,"attack":1,"speed":1,"playerType":HEROES.SHIELD_HERO, "anims":this.anims});

        //DayPlayer swordHero = new DayPlayer();
        //DayPlayer mageHero = new DayPlayer();

        //let bottomLayer = map.createStaticLayer("bottom", [terrain], 0,0).setDepth(-1);
        //let topLayer = map.createStaticLayer("top", [terrain], 0,0);


    }
    update(time, delta){
        this.shieldHero.update();


    }



}












