
import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import { CutScene } from "./CutScene.js";


export class Beginning extends CutScene{
    constructor(){
        super({
            key: SCENES.BEGINNING
        })
    }
    init(data){
        super.init(data);
        this.shieldGroundY = 650;
        this.swordGroundY = 670;
        this.mageGroundY = 655;
        this.shield = "Shield Hero";
        this.sword = "Sword Hero";
        this.mage = "Mage Hero";
        console.log("Beginning Cutscene");
    }
    preload(){
        super.preload();

        this.load.image("skyImg", "assets/images/tiles/bigsky.png");

        this.load.tilemapTiledJSON("beginningCutscene", "./assets/tilemaps/beginningCutscene.json");


    }
    create(){
        
        this.map = this.add.tilemap("beginningCutscene");
        this.skyImg = this.map.addTilesetImage("bigsky", "skyImg"); //Variable used in pathfinding
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        let scale = 3;
        this.skyLayer = this.map.createStaticLayer("sky", [this.skyImg], -1400, 0).setScale(scale,scale); 
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], -1400, 0).setScale(scale,scale);
        this.grassLayer = this.map.createStaticLayer("grass", [this.terrain], -1400, 0).setScale(scale,scale);
        
        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        this.add.image(800, 820, "textBar").setScale(12.5, 10).setDepth(0);

        this.text = this.add.text(30, 790, "", {
            fontSize: '32px',
            fill: '#000000',
        }).setDepth(1);
        this.character = this.add.text(20, 755, "", {
            fontSize: '32px',
            fill: '#000000',
            strokeThickness: '1',
            stroke: '#000000'
        }).setDepth(1);


        this.text.fixedToCamera = false;
        this.character.fixedToCamera = true;

        console.log("Beginning Cutscene");

    }

    update(time){
        super.update(time);

        //Math.floor((time / 1000)) - Math.floor(this.timeOfDeath / 1000) >= this.deathSceneLength;

        if(this.lineCounter == 1){
            this.shieldHeroSprite.setPosition(1000,this.shieldGroundY);
            this.swordHeroSprite.setPosition(1150,this.swordGroundY);
            this.mageHeroSprite.setPosition(1300,this.mageGroundY);

            this.character.setText(this.shield);
            this.text.setText('This is the cut scene at the beginning');
            this.walk();
        }
        else if(this.lineCounter == 2){



            this.character.setText("");
            this.text.setText('Keep clicking to find out what happens');

            this.stop();
        }







        

    }


    walk(){
        this.shieldHeroSprite.anims.play("leftShield", true);
        this.swordHeroSprite.anims.play("leftSword", true);
        this.mageHeroSprite.anims.play("leftMage", true);

        this.skyLayer.x += 0.2;
        this.baseLayer.x += 0.3;
        this.grassLayer.x += 0.3;
    }

    stop(){
        this.shieldHeroSprite.anims.play("leftIdleShield");
        this.swordHeroSprite.anims.play("leftIdleSword");
        this.mageHeroSprite.anims.play("leftIdleMage");
    }

}























