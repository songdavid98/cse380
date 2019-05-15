
import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";

export class CutScene extends Phaser.Scene{
    constructor(data) {
        super({
            key: data['key']
        })
        this.sceneKey = data['key'];
    }
    init(data){
        console.log("Generic Cutscene");
    }
    preload(){
        this.load.image("terrain", "assets/images/tiles/addableTiles.png");
        this.load.image("textBar", "assets/images/icons/textBar.png");
        this.load.image("blackScreen", "assets/images/cutScene/blackScreen.png");
        this.load.image("skipButton", "assets/images/buttons/skipButton.png");
        this.load.image("yesButton", "assets/images/buttons/yesButton.png");
        this.load.image("noButton", "assets/images/buttons/noButton.png");




        this.load.multiatlas(HEROES.SHIELD_HERO, './assets/images/heroes/shield.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.SWORD_HERO, './assets/images/heroes/sword.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.MAGE_HERO, './assets/images/heroes/mage.json', "assets/images/heroes");

        this.load.multiatlas("VILLAGE_GIRL", './assets/images/cutScene/villageGirl.json', "assets/images/cutScene");

    }
    create(data){
        if(!data){
            data = {};
        }
        this.lineCounter = 0;

        if(this.map){
            this.cameras.main.setBounds(0,0,this.map.widthInPixels*5, this.map.heightInPixels*5);
        }
        //Show the heroes facing frontwards
        this.shieldHeroSprite = this.physics.add.sprite(200,200, HEROES.SHIELD_HERO, 'left/0001.png').setScale(5, 5);
        this.swordHeroSprite = this.physics.add.sprite(300,200, HEROES.SWORD_HERO, 'left/0001.png').setScale(5, 5);        
        this.mageHeroSprite = this.physics.add.sprite(400,200, HEROES.MAGE_HERO, 'left/0001.png').setScale(5, 5);
        this.villageGirlSprite = this.physics.add.sprite(400,200, "VILLAGE_GIRL", 'left/0001.png').setScale(5, 5);
        
        this.shieldHeroSprite.visible = false;
        this.swordHeroSprite.visible = false;
        this.mageHeroSprite.visible = false;
        this.villageGirlSprite.visible = false;

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
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 5, end: 5, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleSword', frames: leftIdleFrame, frameRate: 5, repeat: -1 });

        var rightFrames = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightSword', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.SWORD_HERO, { start: 5, end: 5, zeroPad: 4, prefix:'right/', suffix:'.png' });
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
        var leftIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 5, end: 5, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleMage', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
        
        var rightFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightMage', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 5, end: 5, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleMage', frames: rightIdleFrame, frameRate: 5, repeat: -1 });

        var upFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upMage', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleMage', frames: upIdleFrame, frameRate: 5, repeat: -1 });

        var downFrames = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downMage', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(HEROES.MAGE_HERO, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleMage', frames: downIdleFrame, frameRate: 5, repeat: -1 });

        //Village Girl animation
        var rightFrames = this.anims.generateFrameNames("VILLAGE_GIRL", { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightVillageGirl', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames("VILLAGE_GIRL", { start: 5, end: 5, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleVillageGirl', frames: rightIdleFrame, frameRate: 5, repeat: -1 });
        
        var leftFrames = this.anims.generateFrameNames("VILLAGE_GIRL", { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftVillageGirl', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames("VILLAGE_GIRL", { start: 5, end: 5, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleVillageGirl', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
        

        this.yesButton = this.add.image(this.game.renderer.width * .7, this.game.renderer.height * .4, "yesButton").setDepth(3).setScale(2, 2);
        this.noButton = this.add.image(this.game.renderer.width * .3, this.game.renderer.height * .4, "noButton").setDepth(3).setScale(2, 2);
        this.skipButton = this.add.image(this.game.renderer.width * .05, this.game.renderer.height * .1, "skipButton").setDepth(3).setScale(2, 2);



        this.yesButton.active = false;
        this.yesButton.visible = false;
        this.noButton.active = false;
        this.noButton.visible = false;

        this.screenActive = true;

        this.input.on('pointerdown', function (pointer) {
            if(this.screenActive){
                this.lineCounter += 0.5;
            }
        }, this);




        this.input.mouse.disableContextMenu();

    }

    update(time){





        
    }



}























