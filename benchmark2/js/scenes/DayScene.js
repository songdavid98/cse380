//Day time level 

import {SCENES} from "../constants/SceneNames.js";
import {HEROES} from "../constants/PlayerTypes.js";
import {ENEMIES} from "../constants/EnemyTypes.js";
//import {DayPlayer} from "../gamePlay/DayPlayer.js";   //Don't use this!!!!!!!!!
//import {Enemy} from "../gamePlay/Enemy.js";           //Don't use this!!!!!!!!!
import {Slime} from "../gamePlay/Monsters/Slime.js";
import {Golem} from "../gamePlay/Monsters/Golem.js";
import {Goblin} from "../gamePlay/Monsters/Goblin.js";

import { ShieldHero } from "../gamePlay/Heroes/ShieldHero.js";
import { SwordHero } from "../gamePlay/Heroes/SwordHero.js";
import { MageHero } from "../gamePlay/Heroes/MageHero.js";



export class DayScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.DAY
        })
    }
    init(data){
        this.timer;         //Day Countdown timer ~ 2min?
        this.map;
        this.monsterArray = new Array();
        this.level = data.level;
        this.mapLevel;
        this.easystar;


         //This variable is used for attack cooldowns as well as time in between damages from monsters
        this.deathSceneLength = 5;
        this.slimeSpawnArr = [
            [800,600],
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

        this.golemSpawnArr = [
            [300,2000],
            [1400,1500]
        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [
            [320,400],
            [400,600],
            [500,400],
            [600,1000],
            [700,900],
            [800,800],

        ];
        this.goblinCount = this.goblinSpawnArr.length;


    }
    preload(){
        this.load.image("terrain", "assets/images/tiles/addableTiles.png");


        this.load.multiatlas(HEROES.SHIELD_HERO, 'assets/images/heroes/shield.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.SWORD_HERO, 'assets/images/heroes/sword.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.MAGE_HERO, 'assets/images/heroes/mage.json', "assets/images/heroes");


        this.load.multiatlas(ENEMIES.GOLEM, 'assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.SLIME, 'assets/images/enemies/slime.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, 'assets/images/enemies/goblin.json', "assets/images/enemies");


        switch(this.level){
            case 1: 
            this.load.tilemapTiledJSON("iceMap1", "assets/tilemaps/IceRoom.json");

                this.load.tilemapTiledJSON("map1", "assets/tilemaps/IceRoom.json");

                this.mapLevel = "map1";
                console.log("Welcome to level 1");
                break;
            case 2: 
                this.load.tilemapTiledJSON("map2", "assets/tilemaps/dungeon2.json");
                this.mapLevel = "map2";
                console.log("make suer this dungeon even exits, dumbo");
                break;
            case 3: 
                this.load.tilemapTiledJSON("map3", "assets/tilemaps/Dungeon3.json");
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

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5,5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 1, 0).setScale(5,5); 


        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc');

        //Create the enemies
        this.enemyGroup = this.physics.add.group();
        for(var i = 0; i < this.slimeCount; i++){
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(5, 5);
            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({"sprite":slimeSprite, "allEnemySprites":this.enemyGroup.getChildren(),"physics":this.physics,"enemyType":ENEMIES.SLIME, "anims":this.anims});
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }

        for(var i = 0; i < this.golemCount; i++){
            let golemSprite = this.physics.add.sprite(this.golemSpawnArr[i][0], this.golemSpawnArr[i][1], ENEMIES.GOLEM, 'down/0001.png').setScale(8, 8);
            this.enemyGroup.add(golemSprite);
            let golem = new Golem({"sprite":golemSprite,"allEnemySprites":this.enemyGroup.getChildren(),"physics":this.physics,"enemyType":ENEMIES.GOLEM, "anims":this.anims});
            golemSprite.class = golem;
            this.monsterArray.push(golem);
        }

        for(var i = 0; i < this.goblinCount; i++){
            let goblinSprite = this.physics.add.sprite(this.goblinSpawnArr[i][0], this.goblinSpawnArr[i][1], ENEMIES.GOBLIN, 'sleep/0001.png').setScale(5, 5);
            let zzzSprite = this.physics.add.sprite(this.goblinSpawnArr[i][0]+100, this.goblinSpawnArr[i][1]-100, ENEMIES.GOBLIN, 'zzz/0001.png').setScale(5, 5);
            this.enemyGroup.add(goblinSprite);
            let goblin = new Goblin({"sprite":goblinSprite,"allEnemySprites":this.enemyGroup.getChildren(),"physics":this.physics,"enemyType":ENEMIES.GOBLIN, "anims":this.anims, "zzzSprite":zzzSprite, "scene":this});
            goblinSprite.class = goblin;
            this.monsterArray.push(goblin);
        }

        //Create the heroes
        this.shieldHeroSprite = this.physics.add.sprite(200,200, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5);
        this.swordHeroSprite = this.physics.add.sprite(200,200, HEROES.SWORD_HERO, 'down/0001.png').setScale(5, 5);        
        this.mageHeroSprite = this.physics.add.sprite(200,200, HEROES.MAGE_HERO, 'down/0001.png').setScale(5, 5);
        
        console.log(this.shieldHeroSprite.anims);



        let allHeroSprites = [this.shieldHeroSprite, this.swordHeroSprite, this.mageHeroSprite];

        this.shieldHeroSprite.visible = true;
        this.swordHeroSprite.visible = false;
        this.mageHeroSprite.visible = false;

        //First player is always shieldHero
        this.shieldHero = new ShieldHero({"playerType":HEROES.SHIELD_HERO,"sprite":this.shieldHeroSprite,"physics":this.physics,"keyboard":this.input.keyboard,"anims":this.anims,"scene":this});
        this.swordHero = new SwordHero({"playerType":HEROES.SWORD_HERO,"sprite":this.swordHeroSprite,"physics":this.physics,"keyboard":this.input.keyboard,"anims":this.anims,"scene":this});
        this.mageHero = new MageHero({"playerType":HEROES.MAGE_HERO,"sprite":this.mageHeroSprite,"physics":this.physics,"keyboard":this.input.keyboard,"anims":this.anims,"scene":this});

        this.player = this.shieldHero;

        //Launch the overlay scene
        this.scene.launch(SCENES.DAY_OVERLAY, {"player":this.player});

	    //collisions
	    //this.wallLayer.setCollision(5); //dungeon level     //Change this if you want a different tile set. This is the ID.
        
        this.wallLayer.setCollision(6);     //Snow level
        
        this.physics.add.collider(this.player.sprite,this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(),this.wallLayer);

        this.door = this.map.objects[0];
        //this.createFromTiles(0, null,this.doors,this.scene);


        //Damaging the player
        this.physics.add.overlap(this.player.sprite,this.enemyGroup.getChildren(), function(o1, o2){
            console.log(o2);
            if(Math.floor((o1.scene.time.now/1000))-Math.floor(o1.scene.player.lastDamaged/1000) >= o1.scene.player.damageCooldown){             //Uses the cooldown variable to allow time buffer between damages
                o1.scene.player.damage(o2);                               //Decrease the health (from the player CLASS) when overlaps with enemy
                o1.scene.player.lastDamaged = o1.scene.time.now;                               //Set the prevTime to current time
            }
        });


        //Camera
        this.cameras.main.setBounds(0,0,this.map.widthInPixels*5, this.map.heightInPixels*5);
        this.cameras.main.startFollow(this.player.sprite);

        //Event Listener
        this.input.on('pointermove', function (pointer) {
            let cursor = pointer;
            this.player.angle = Phaser.Math.Angle.Between(this.player.sprite.x, this.player.sprite.y, cursor.x+this.cameras.main.scrollX, cursor.y+this.cameras.main.scrollY);
        }, this);



        this.input.on('pointerdown', function (pointer) {
            if(pointer.leftButtonDown() && Math.floor(this.time.now/1000)-this.player.previousTime >= this.player.attackCooldown ){
                this.player.previousTime = Math.floor(this.time.now/1000);
                let pointY;
                let pointX;
                let clickedOnce = true;

                let dist = 100;
                pointX = this.player.sprite.x + dist*(Math.sin(Math.PI/2-this.player.angle)); 
                pointY = this.player.sprite.y + dist*(Math.cos(Math.PI/2-this.player.angle)); 


                let shieldBeamSprite = this.physics.add.sprite(pointX, pointY, HEROES.SHIELD_HERO, 'shield/0001.png').setScale(5, 5);
                shieldBeamSprite.class = this.player;


                //The beam attacked
                this.physics.add.overlap(shieldBeamSprite,this.enemyGroup.getChildren(), function(o1,o2){
                    console.log(this);
                    o1.scene.hitMe(o1,o2);    
                });
                
               
                //Want to destroy shieldBeam if it hits the wall (so that it doesn't attack slimes on the other side of the wall)
                this.physics.add.collider(shieldBeamSprite,this.wallLayer);

                let xx = Math.abs(shieldBeamSprite.height * (Math.sin(this.player.angle + Math.PI/2))) + Math.abs(shieldBeamSprite.width * (Math.sin(this.player.angle)));
                let yy = Math.abs(shieldBeamSprite.width * (Math.cos(this.player.angle))) + Math.abs(shieldBeamSprite.height * (Math.cos(this.player.angle + Math.PI/2)));

                shieldBeamSprite.body.setSize(xx, yy);
                shieldBeamSprite.body.setOffset(shieldBeamSprite.body.offset.x-60, shieldBeamSprite.body.offset.y-20)
                //shieldBeamSprite.body.reset(shieldBeamSprite.x, shieldBeamSprite.y);

                shieldBeamSprite.setRotation(this.player.angle+ Math.PI/2);

                shieldBeamSprite.on('animationcomplete', function (anim, frame) {
                    this.emit('animationcomplete_' + anim.key, anim, frame);
                }, shieldBeamSprite);
                
                shieldBeamSprite.on('animationcomplete_shield', function (o1) {
                    if(this.colliding){
                        for(var i = 0; i < this.colliding.length; i++){
                            this.colliding[i].class.active = true;
                        }
                    }
                    this.destroy();                   
                });

                this.player.sprite.on('animationcomplete', function (anim, frame) {
                    this.emit('animationcomplete_' + anim.key, anim, frame);
                }, this.player.sprite);
                
                this.player.sprite.on('animationcomplete_rightBasicAttack', function () {
                    //console.log("print");                   
                });


                this.player.attackBasic(pointer, this.player.angle, shieldBeamSprite);


            }
            else if(pointer.rightButtonDown()){
                this.player.attackSpecial(pointer, this.player.angle);
            }
        }, this);


        this.input.mouse.disableContextMenu();
        this.map.currentLayer = this.baseLayer;
        this.pathFinding();
    }


    hitMe(shieldBeamSprite, enemySpriteChildren){
        enemySpriteChildren.setVelocity(shieldBeamSprite.body.velocity.x,shieldBeamSprite.body.velocity.y);
        if(clickedOnce){
            enemySpriteChildren.class.damaged(shieldBeamSprite.class);
            console.log(enemySpriteChildren.texture," got hit");
            enemySpriteChildren.class.lastDamaged = shieldBeamSprite.scene.time.now;
            clickedOnce = false; 
        }
        if(!shieldBeamSprite.colliding){
            shieldBeamSprite.colliding = [];
        }
        shieldBeamSprite.colliding.push(enemySpriteChildren);
    }


    //Setting up pathfinding
    pathFinding(){
        this.easystar = new EasyStar.js();
        var grid = [];
        for(var y = 0; y < this.map.height; y++){
            var col = [];
            for(var x = 0; x < this.map.width; x++){
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                col.push(this.getTileID(x,y));
            }
            grid.push(col);
        }

        this.easystar.setGrid(grid);
        this.easystar.enableDiagonals();

        var tileset = this.map.tilesets[0];
        var properties = tileset.tileProperties;
        var acceptableTiles = [];
    
        // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
        // and see what properties have been entered in Tiled.
        for(var i = tileset.firstgid-1; i < this.terrain.total; i++){ // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
            if(!properties.hasOwnProperty(i)) {
                // If there is no property indicated at all, it means it's a walkable tile
                acceptableTiles.push(i+1);
                continue;
            }
            if(!properties[i].collide) acceptableTiles.push(i+1);
            if(properties[i].cost) this.easystar.setTileCost(i+1, properties[i].cost); // If there is a cost attached to the tile, let's register it
        }
        this.easystar.setAcceptableTiles(acceptableTiles);
    }

    //Used in pathfinding
    getTileID(x,y){
        var tile = this.map.getTileAt(x, y,true);
        return tile.index;
    }
    checkCollision(x,y){
        var tile = this.map.getTileAt(x, y,true);
        return tile.properties.collide == true;
    }

    swapMaps(currentMap){
        console.log("Swapped");

        /*
        this.map = this.add.tilemap("iceMap1");
        let iceTerrain = this.map.addTilesetImage("ice", "iceTerrain");
        this.baseLayer = this.map.createStaticLayer("base", [iceTerrain], 0, 0).setScale(5,5);
        this.wallLayer = this.map.createStaticLayer("walls", [iceTerrain], 1, 0).setScale(5,5); 
        this.doorLayer = this.map.createStaticLayer("door", [iceTerrain], 2, 0).setScale(5,5); 
*/
    }


    update(time, delta){
        if(this.player.dead && this.timeOfDeath == null){     //Kill the player and get the time of death
            this.player.active = false;
            this.player.sprite.destroy();
            this.timeOfDeath = time;
            //console.log(time);
            //console.log(Math.floor(this.timeOfDeath/1000));

        }
        else if(this.player.dead && Math.floor((time/1000))-Math.floor(this.timeOfDeath/1000) >= this.deathSceneLength ){
            //Shows the game going without the Player for x amount of seconds before it sends the game to the main menu
            this.timeOfDeath = null;
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.MAIN_MENU, 'dead');
            this.scene.stop(SCENES.DAY);
        }
        else{
            this.player.update(time);

            //Space bar for swapping heroes
            if(this.input.keyboard.keys[32].isDown && Math.floor(time/1000)-this.player.lastSwapped >= this.player.swapCooldown){
                //Swap the heroes
                let tempX = this.player.sprite.x;
                let tempY = this.player.sprite.y;
                switch(this.player.swap()){
                    case HEROES.SHIELD_HERO: 
                        this.player = this.shieldHero;
                        this.shieldHeroSprite.visible = true;
                        this.swordHeroSprite.visible = false;
                        this.mageHeroSprite.visible = false;
                        break;
                    case HEROES.SWORD_HERO:
                        this.player = this.swordHero;
                        this.shieldHeroSprite.visible = false;
                        this.swordHeroSprite.visible = true;
                        this.mageHeroSprite.visible = false;
                        break;
                    case HEROES.MAGE_HERO:
                        this.player = this.mageHero;
                        this.shieldHeroSprite.visible = false;
                        this.swordHeroSprite.visible = false;
                        this.mageHeroSprite.visible = true;
                        break;
                }

                this.player.sprite.x = tempX;
                this.player.sprite.y = tempY;
                this.cameras.main.startFollow(this.player.sprite);
                this.physics.add.collider(this.player.sprite,this.wallLayer);
                //Damaging the player
                this.physics.add.overlap(this.player.sprite,this.enemyGroup.getChildren(), function(o1, o2){
                    if(Math.floor((o1.scene.time.now/1000))-Math.floor(o1.scene.player.lastDamaged/1000) >= o1.scene.player.damageCooldown){             //Uses the cooldown variable to allow time buffer between damages
                        o1.scene.player.damage(o2);                               //Decrease the health (from the player CLASS) when overlaps with enemy
                        o1.scene.player.lastDamaged = o1.scene.time.now;                               //Set the prevTime to current time
                    }
                });
                this.player.lastSwapped = Math.floor(time/1000);
            }






            //Pause stuff
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

            //Player enters door

            /*
            console.log(this.player.sprite);
            console.log(this.door);

            console.log(this.door.sprite);
            this.swapMaps();
            this.physics.arcade.overlap(this.player.sprite, this.doors.sprite, this.swapMaps(), null, this);
*/


            for(let i = 0; i < this.monsterArray.length; i++){
                var monster = this.monsterArray[i].dayUpdate(time, this.player);
            }
        }
    }
}
