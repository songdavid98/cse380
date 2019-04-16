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
        this.timer;         //Day Countdown timer ~ 2min?
        this.map;
        this.monsterArray;
        this.level = data.level;
        this.mapLevel;
        this.angle;
         //This variable is used for attack cooldowns as well as time in between damages from monsters

        this.slimeSpawnArr = [
            [160,160],
            [320,320],
            [500,500],
            [750,1300],
            [1700,3250],
            [1950,1000],
            [167,1230],
            [550,3600],
            [1500,1000],
            [165,1560]
        ];

        this.slimeCount = this.slimeSpawnArr.length;


    }
    preload(){
        this.load.image("terrain", "assets/images/tiles/tiles.png");
        this.load.image("heart", "assets/images/icons/heart.png");

        this.load.multiatlas(HEROES.SHIELD_HERO, 'assets/images/heroes/shield.json', "assets/images/heroes");
        //this.load.multiatlas(HEROES.SWORD_HERO, 'assets/images/heroes/sword.json', "assets/images/heroes");

        this.load.multiatlas(ENEMIES.SLIME, 'assets/images/enemies/slime.json', "assets/images/enemies");

        //this.load.multiatlas(HEROES.SHIELD_HERO, 'assets/images/cityscene.json', "assets/images");

        switch(this.level){
            case 1: 
                this.load.tilemapTiledJSON("map1", "assets/tilemaps/dungeon3.json");
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
        let terrain = this.map.addTilesetImage("uniqueTileSet", "terrain");
        this.baseLayer = this.map.createStaticLayer("base", [terrain], 0, 0).setScale(5,5);
        this.wallLayer = this.map.createStaticLayer("walls", [terrain], 1, 0).setScale(5,5); 
        console.log("tiles");

        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D');
        this.input.keyboard.addKeys('Esc');

        //Create the enemies
        this.enemyGroup = this.physics.add.group();
        for(var i = 0; i < this.slimeCount; i++){
            this.enemySprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'slime/down/0001.png').setScale(5, 5);
            this.enemyGroup.add(this.enemySprite);
            this.enemies = new DayEnemy({"sprite":this.enemyGroup.getChildren(),"physics":this.physics,"keyboard":this.input.keyboard,
            "health":5,"basicAttack":1, "basicAttackSpeed":80,"speed":2*128,"enemyType":ENEMIES.SLIME, "anims":this.anims});
            this.enemySprite.class = this.enemies;  //Getting the class (to get the features) from the image (sprite)
        }

        //Create the heroes

        this.heroSprite = this.physics.add.sprite(600, 400, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5);
        //this.sprite = this.physics.add.sprite(600, 400, HEROES.SWORD_HERO, 'swordHero/down/0001.png').setScale(5, 5);
        this.hero = new DayPlayer({"sprite":this.heroSprite,"physics":this.physics,"keyboard":this.input.keyboard,
        "health":3,"basicAttack":1, "basicAttackSpeed":80*2,"specialAttack":2,"specialAttackSpeed":20,"speed":2.5*128,"playerType":HEROES.SHIELD_HERO, "anims":this.anims});
        this.heroSprite.class = this.hero;
        
        this.scene.launch(SCENES.DAY_OVERLAY, {"hero":this.hero});


	    //collisions
	    this.wallLayer.setCollision(2);     //Change this if you want a different tile set. This is the ID.
        this.physics.add.collider(this.heroSprite,this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(),this.wallLayer);
                                       //This variable is used to store the previous time of the clock - used for attack cooldown and damage cooldown


        //Damaging the player
        this.physics.add.overlap(this.heroSprite,this.enemyGroup.getChildren(), function(o1, o2){

            
            if(Math.floor((o1.scene.time.now/1000))-Math.floor(o1.scene.hero.lastDamaged/1000) >= o1.scene.hero.damageCooldown){             //Uses the cooldown variable to allow time buffer between damages
                console.log("You are getting hurt");
                o1.scene.hero.damage(o2);                               //Decrease the health (from the hero CLASS) when overlaps with enemy
                o1.scene.hero.lastDamaged = o1.scene.time.now;                               //Set the prevTime to current time
            }
        });

        //Camera
        this.cameras.main.setBounds(0,0,this.map.widthInPixels*5, this.map.heightInPixels*5);
        this.cameras.main.startFollow(this.heroSprite);

        //Event Listeners
        this.input.on('pointermove', function (pointer) {
            let cursor = pointer;
            this.angle = Phaser.Math.Angle.Between(this.heroSprite.x, this.heroSprite.y, cursor.x+this.cameras.main.scrollX, cursor.y+this.cameras.main.scrollY);
            //console.log((Math.PI/2-this.angle) / (Math.PI/180));
        }, this);



    
        this.input.on('pointerdown', function (pointer) {
            if(pointer.leftButtonDown() && Math.floor(this.time.now/1000)-this.hero.previousTime >= this.hero.attackCooldown ){
                this.hero.previousTime = Math.floor(this.time.now/1000);
                let pointY;
                let pointX;

                let dist = 100;
                pointX = this.heroSprite.x + dist*(Math.sin(Math.PI/2-this.angle)); 
                pointY = this.heroSprite.y + dist*(Math.cos(Math.PI/2-this.angle)); 

                this.shieldBeamSprite = this.physics.add.sprite(pointX, pointY, HEROES.SHIELD_HERO, 'shield/0001.png').setScale(5, 5);
                this.shieldBeamSprite.class = this.hero;
                //this.physics.add.collider(this.shieldBeamSprite,this.wallLayer);

                //this.physics.add.collider(this.shieldBeamSprite,this.enemyGroup.getChildren());
                this.physics.add.overlap(this.shieldBeamSprite,this.enemyGroup.getChildren(), function(o1, o2){
                    o2.setVelocity(o1.body.velocity.x,o1.body.velocity.y);
                    o2.active = false;
                    o1.class.getMoney(o2);
                    o2.destroy();
                    if(!o1.colliding){
                        o1.colliding = [];
                    }
                    o1.colliding.push(o2);
                });

                //Want to destroy shieldBeam if it hits the wall (so that it doesn't attack slimes on the other side of the wall)
                this.physics.add.collider(this.shieldBeamSprite,this.wallLayer);

                /*
                this.physics.add.overlap(this.wallLayer, this.shieldBeamSprite, function(o1, o2){
                
                    o2.destroy();
                    console.log("It's overlapping????");
                });
                */


                let xx = Math.abs( this.shieldBeamSprite.height * (Math.sin(this.angle + Math.PI/2))) + Math.abs(this.shieldBeamSprite.width * (Math.sin(this.angle)));
                let yy = Math.abs(this.shieldBeamSprite.width * (Math.cos(this.angle))) + Math.abs(this.shieldBeamSprite.height * (Math.cos(this.angle + Math.PI/2)));

                this.shieldBeamSprite.body.setSize(xx, yy);
                this.shieldBeamSprite.body.setOffset(this.shieldBeamSprite.body.offset.x-60, this.shieldBeamSprite.body.offset.y-20)
                //this.shieldBeamSprite.body.reset(this.shieldBeamSprite.x, this.shieldBeamSprite.y);


                this.shieldBeamSprite.setRotation(this.angle+ Math.PI/2);

                this.shieldBeamSprite.on('animationcomplete', function (anim, frame) {
                    this.emit('animationcomplete_' + anim.key, anim, frame);
                }, this.shieldBeamSprite);
                
                this.shieldBeamSprite.on('animationcomplete_shield', function (o1) {
                    if(this.colliding){
                        for(var i = 0; i < this.colliding.length; i++){
                            this.colliding[i].active = true;
                        }
                    }
                    this.destroy();                   
                });

                this.heroSprite.on('animationcomplete', function (anim, frame) {
                    this.emit('animationcomplete_' + anim.key, anim, frame);
                }, this.heroSprite);
                
                this.heroSprite.on('animationcomplete_rightBasicAttack', function () {
                    //console.log("print");                   
                });

                this.hero.attackBasic(pointer, this.angle, this.shieldBeamSprite);
            }
            else if(pointer.rightButtonDown()){
                this.hero.attackSpecial(pointer, this.angle);
            }
        }, this);
        this.input.mouse.disableContextMenu();

        //Taking damage






    }
    update(time, delta){
        //this.time = Math.floor(time/1000);

        this.hero.update(this.angle, time);
        this.enemies.update(time);
        if(this.input.keyboard.keys[27].isDown && !this.justPaused){
            this.justPaused = true
            this.input.keyboard.keys[68].isDown = false
            this.input.keyboard.keys[65].isDown = false
            this.input.keyboard.keys[87].isDown = false
            this.input.keyboard.keys[83].isDown = false
            this.scene.launch(SCENES.PAUSE, {"scenes":[SCENES.DAY, SCENES.DAY_OVERLAY]});
            this.scene.pause(SCENES.DAY_OVERLAY)
            this.scene.pause();
        }else if(this.input.keyboard.keys[27].isUp){
            this.justPaused = false;
        }


 

    }
}












