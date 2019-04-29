
import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";

export class Beginning extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.BEGINNING
        })
    }
    init(data){
        console.log("Beginning Cutscene");
    }
    preload(){
        console.log("Beginning Cutscene");
        this.load.image("terrain", "assets/images/tiles/addableTiles.png");
        this.load.image("skyImg", "assets/images/tiles/bigsky.png");


        this.load.multiatlas(HEROES.SHIELD_HERO, 'assets/images/heroes/shield.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.SWORD_HERO, 'assets/images/heroes/sword.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.MAGE_HERO, 'assets/images/heroes/mage.json', "assets/images/heroes");

        this.load.tilemapTiledJSON("beginningCutscene", "assets/tilemaps/beginningCutscene.json");


    }
    create(){
        
        this.map = this.add.tilemap("beginningCutscene");
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.skyImg = this.map.addTilesetImage("bigsky", "skyImg"); //Variable used in pathfinding
        
        this.skyLayer = this.map.createStaticLayer("sky", [this.skyImg], 0, 0).setScale(5,5); 
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 1, 0).setScale(5,5);
        this.grassLayer = this.map.createStaticLayer("grass", [this.terrain], 2, 0).setScale(5,5); 

        this.cameras.main.setBounds(0,0,this.map.widthInPixels*5, this.map.heightInPixels*5);
        

        console.log("Beginning Cutscene");
        //Show the heroes facing frontwards
        this.shieldHeroSprite = this.physics.add.sprite(200,200, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5);
        this.swordHeroSprite = this.physics.add.sprite(300,200, HEROES.SWORD_HERO, 'down/0001.png').setScale(5, 5);        
        this.mageHeroSprite = this.physics.add.sprite(400,200, HEROES.MAGE_HERO, 'down/0001.png').setScale(5, 5);

        // Shield animation
        var leftFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftShield', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'idleLeft/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleShield', frames: leftIdleFrame, frameRate: 5, repeat: -1 });

        var rightFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightShield', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'idleRight/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleShield', frames: rightIdleFrame, frameRate: 5, repeat: -1 });

        var upFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upShield', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleShield', frames: upIdleFrame, frameRate: 5, repeat: -1 });

        var downFrames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downShield', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleShield', frames: downIdleFrame, frameRate: 5, repeat: -1 });

        // Sword animation
        var leftFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftSword', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleSword', frames: leftIdleFrame, frameRate: 5, repeat: -1 });

        var rightFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightSword', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleSword', frames: rightIdleFrame, frameRate: 5, repeat: -1 });

        var upFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upSword', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleSword', frames: upIdleFrame, frameRate: 5, repeat: -1 });

        var downFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downSword', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleSword', frames: downIdleFrame, frameRate: 5, repeat: -1 });

        // Mage animation
        var leftFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftMage', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleMage', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
        
        var rightFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightMage', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleMage', frames: rightIdleFrame, frameRate: 5, repeat: -1 });

        var upFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upMage', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleMage', frames: upIdleFrame, frameRate: 5, repeat: -1 });

        var downFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downMage', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleMage', frames: downIdleFrame, frameRate: 5, repeat: -1 });

    }

    update(){







        
    }



}























