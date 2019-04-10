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
    }
    preload(){
        switch(level){
            case 1: 
                this.load.tilemapTiledJSON("mappy", "../assets/tilemaps/dungeon1.json");
                break;
            case 2: 
                this.load.tilemapTiledJSON("mappy", "../assets/tilemaps/dungeon2.json");
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 3: 
                this.load.tilemapTiledJSON("mappy", "../assets/tilemaps/dungeon3.json");
                console.log("make suer this dungeon even exits, dumbo");

                break;
            case 4: 
                this.load.tilemapTiledJSON("mappy", "../assets/tilemaps/dungeon4.json");
                console.log("make suer this dungeon even exits, dumbo");

                break;
            case 5: 
                this.load.tilemapTiledJSON("mappy", "../assets/tilemaps/dungeon5.json");
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 6: 
                this.load.tilemapTiledJSON("mappy", "../assets/tilemaps/dungeon6.json");
                console.log("make suer this dungeon even exits, dumbo");

                break;
            default:
                this.scene.start(SCENES.Main_MENU, "how");
        }
    }
    create(){
        //Generate map


      

    }
    update(){



    }



}












