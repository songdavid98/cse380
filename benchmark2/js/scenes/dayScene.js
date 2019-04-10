//Day time level 

import {SCENES} from "../constants/SceneNames.js";
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
        this.load.image("terrain", "../assets/image/tiles.png");

        switch(this.level){
            case 1: 
                
                this.load.tilemapTiledJSON("map1", "../assets/tilemaps/dungeon1.json");
                this.mapLevel = "map1";
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


        let map = this.add.tilemap(this.mapLevel);
        let terrain = map.addTilesetImage("testTile", "terrain");

        //let bottomLayer = map.createStaticLayer("bottom", [terrain], 0,0).setDepth(-1);
        //let topLayer = map.createStaticLayer("top", [terrain], 0,0);


    }
    update(){



    }



}












