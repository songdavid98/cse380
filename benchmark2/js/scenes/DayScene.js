//Day time level 

import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import {ENEMIES} from "../constants/EnemyTypes.js";
import {DayPlayer} from "../gamePlay/DayPlayer.js";
import {DayEnemy} from "../gamePlay/DayEnemy.js";

export class DayScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.DAY
        })
    }
    init(data){
        this.timer;
        this.map;
        this.monsterArray;
        this.level = data.level;
        this.mapLevel;
        this.angle;
        this.cooldown = 0;
    }
    preload(){
        this.load.image("terrain", "assets/images/tiles.png");

        this.load.multiatlas(HEROES.SHIELD_HERO, 'assets/images/heroes.json', "assets/images");
        this.load.multiatlas(ENEMIES.SLIME, 'assets/images/enemies/slime.json', "assets/images/enemies");

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
        this.slimeSprite = this.physics.add.sprite(600, 700, ENEMIES.SLIME, 'slime/down/0001.png').setScale(5, 5);



        

        //Keyboard stuff
        console.log(this.input.keyboard);
        this.input.keyboard.addKeys('W,S,A,D');
        this.input.keyboard.addKeys('Esc');

        //Create the heroes
        this.hero = new DayPlayer({"sprite":this.sprite,"physics":this.physics,"keyboard":this.input.keyboard,
        "health":1,"basicAttack":1, "basicAttackSpeed":80,"specialAttack":2,"specialAttackSpeed":20,"speed":2*128,"playerType":HEROES.SHIELD_HERO, "anims":this.anims});

        //Create the enemies
        this.enemy = new DayEnemy({"sprite":this.slimeSprite,"physics":this.physics,"keyboard":this.input.keyboard,
        "health":5,"basicAttack":1, "basicAttackSpeed":80,"speed":2*128,"playerType":ENEMIES.SLIME, "anims":this.anims});



	    //collisions
	    this.wallLayer.setCollisionBetween(265,300);
        this.physics.add.collider(this.sprite,this.wallLayer);
        this.physics.add.collider(this.slimeSprite,this.wallLayer);

        //Camera
        this.cameras.main.setBounds(0,0,this.map.widthInPixels*5, this.map.heightInPixels*5);
        this.cameras.main.startFollow(this.sprite);

        //Event Listeners
        this.input.on('pointermove', function (pointer) {
            let cursor = pointer;
            this.angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, cursor.x+this.cameras.main.scrollX, cursor.y+this.cameras.main.scrollY);
            //console.log((Math.PI/2-this.angle) / (Math.PI/180));
        }, this);


        //Jakukob can put this ANYWHERE he wants
        this.prevTime = 0;
    
        this.input.on('pointerdown', function (pointer) {
            if(pointer.leftButtonDown() && this.time >= this.cooldown + this.prevTime){
                this.prevTime = this.time;
                let pointY;
                let pointX;

                let dist = 100;
                pointX = this.sprite.x + dist*(Math.sin(Math.PI/2-this.angle)); 
                pointY = this.sprite.y + dist*(Math.cos(Math.PI/2-this.angle)); 

                this.shieldBeamSprite = this.physics.add.sprite(pointX, pointY, HEROES.SHIELD_HERO, 'shieldHero/shield/0001.png').setScale(5, 5);
                
                let xx = Math.abs( this.shieldBeamSprite.height * (Math.sin(this.angle + Math.PI/2))) + Math.abs(this.shieldBeamSprite.width * (Math.sin(this.angle)));
                let yy = Math.abs(this.shieldBeamSprite.width * (Math.cos(this.angle))) + Math.abs(this.shieldBeamSprite.height * (Math.cos(this.angle + Math.PI/2)));

                this.shieldBeamSprite.body.setSize(xx, yy);
                //this.shieldBeamSprite.body.center.x = 10;
                //this.shieldBeamSprite.body.center.y = 10000;
                //console.log(this.sprite.x - (pointer.x +this.cameras.main.scrollX));
                //console.log(this.sprite.y - (pointer.y +this.cameras.main.scrollY));
                console.log(this.shieldBeamSprite.x);
                console.log(this.shieldBeamSprite.body.position.x);
                console.log(this.shieldBeamSprite.body.offset);
                this.shieldBeamSprite.body.setOffset(this.shieldBeamSprite.body.offset.x-60, this.shieldBeamSprite.body.offset.y-20)
                //this.shieldBeamSprite.body.reset(this.shieldBeamSprite.x, this.shieldBeamSprite.y);


                this.shieldBeamSprite.setRotation(this.angle+ Math.PI/2);
                //this.shieldBeamSprite.body.angle = this.angle+ Math.PI/2;

                this.shieldBeamSprite.on('animationcomplete', function (anim, frame) {
                    this.emit('animationcomplete_' + anim.key, anim, frame);
                }, this.shieldBeamSprite);
                
                this.shieldBeamSprite.on('animationcomplete_shield', function () {
                    this.destroy();                   
                });

                this.sprite.on('animationcomplete', function (anim, frame) {
                    this.emit('animationcomplete_' + anim.key, anim, frame);
                }, this.sprite);
                
                this.sprite.on('animationcomplete_rightBasicAttack', function () {
                    //console.log("print");                   
                });

                this.hero.attackBasic(pointer, this.angle, this.shieldBeamSprite);
            }
            else if(pointer.rightButtonDown()){
                this.hero.attackSpecial(pointer, this.angle);
            }
        }, this);




        //DayPlayer swordHero = new DayPlayer();
        //DayPlayer mageHero = new DayPlayer();



    }
    update(time, delta){
        this.time = Math.floor(time/1000);

        this.hero.update(this.angle, time);
        this.enemy.update(time);
        if(this.input.keyboard.keys[27].isDown && !this.justPaused){
            this.justPaused = true
            this.input.keyboard.keys[68].isDown = false
            this.input.keyboard.keys[65].isDown = false
            this.input.keyboard.keys[87].isDown = false
            this.input.keyboard.keys[83].isDown = false
            this.scene.launch(SCENES.PAUSE);
            this.scene.pause();
        }else if(this.input.keyboard.keys[27].isUp){
            this.justPaused = false;
        }
    }
}












