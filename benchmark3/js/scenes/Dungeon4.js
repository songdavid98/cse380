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



export class Dungeon4 extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.DUNGEON4
        })
    }
    init(data){
        console.log(data['money']);
        this.timer;         //Day Countdown timer ~ 2min?
        this.map;
        this.monsterArray = new Array();
        this.level = data.level;
        this.mapLevel;
        this.easystar;
        this.money = data['money'] || 0;
        this.lastDamaged = 0;


        //This dungeon goes up to [5000,5000]

        this.deathSceneLength = 5;
        this.slimeSpawnArr = [
            [900,900],
            [900,1200],
            [1000,1000],
            [1100,1300],

            [1700,100],
            [1800,200],
            [1800,100],
            [1900,300],

            [1800,1600],
            [1800,1700],
            [1900,1800],
            [1900,1900],
            [2100,1500],

            [1900,4000],
            [2000,3900],
            [2000,4000],
            [2100,4100],
            [2200,3800],
            [2500,3700],

            [4800,200],
            [4200,300],
            [4800,700],
            [4300,300],
            [4100,300],
            [3900,200],

            [2800,3700],
            [2800,3800],
            [3000,3800],
            [3100,3500],
            [3100,3600],

            [2500,4500],
            [2600,4000],
            [2300,4000],
            [2500,4300],
            [2700,4300],


            [4000,4000],
            [4200,4400],
            [4200,4500],
            [4200,4800],
            [4300,4000],
            [4500,4000],
            [4800,4300],

            [4900,4900]
            
           
        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [
            [1200,3800],
            [1400,800],
            [2000,3700],
            [2200,4300]


        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [
            [2800,200],
            [2800,400],
            [2900,200],
            [3100,300],
            [3200,300],
            [3300,300],


            [2000,2800],
            [2100,2500],
            [2000,2700],
            [2100,2900],
            [2200,2600],
            [2300,2100],

            [3900,2600],
            [3400,2700],
            [3600,2500],
            [3700,2200],
            [3300,2000],
            [3100,1900],
           

        ];
        this.goblinCount = this.goblinSpawnArr.length;
        

    }
    preload(){
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");


        this.load.multiatlas(HEROES.SHIELD_HERO, './assets/images/heroes/shield.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.SWORD_HERO, './assets/images/heroes/sword.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.MAGE_HERO, './assets/images/heroes/mage.json', "assets/images/heroes");


        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");
        
        this.level = 4;
        this.load.tilemapTiledJSON("map4", "./assets/tilemaps/Dungeon4.json");
        this.mapLevel = "map4";
        console.log("make suer this dungeon even exits, dumbo");

        this.load.audio("audiobackgroundsong", "./assets/audio/backgroundsong.wav");
        this.load.audio("audioswordslice", "./assets/audio/swordslice.wav");
        this.load.audio("audiomageattack", "./assets/audio/mageattack.wav");
    }
    create(){
        this.scene.stop(SCENES.DAY_DUNGEON3);
        this.scene.stop(SCENES.DAY);
        //Generate map
        this.music = this.sound.add("audiobackgroundsong");
        this.music.setLoop(true);
        this.music.play();

        this.map = this.add.tilemap(this.mapLevel);

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5,5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 1, 0).setScale(5,5); 
        this.grassLayer = this.map.createStaticLayer("grass", [this.terrain], 1, 0).setScale(5,5); 


        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,One,Three,Four,Five,Six');

        //Create the enemies
        this.enemyGroup = this.physics.add.group();
        for(var i = 0; i < this.slimeCount; i++){
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(5, 5);
            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({"sprite":slimeSprite, "allEnemySprites":this.enemyGroup.getChildren(),"physics":this.physics,"enemyType":ENEMIES.SLIME, "anims":this.anims,"scene":this});
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }

        for(var i = 0; i < this.golemCount; i++){
            let golemSprite = this.physics.add.sprite(this.golemSpawnArr[i][0], this.golemSpawnArr[i][1], ENEMIES.GOLEM, 'down/0001.png').setScale(8, 8);
            this.enemyGroup.add(golemSprite);
            let golem = new Golem({"sprite":golemSprite,"allEnemySprites":this.enemyGroup.getChildren(),"physics":this.physics,"enemyType":ENEMIES.GOLEM, "anims":this.anims,"scene":this});
            golemSprite.class = golem;
            this.monsterArray.push(golem);
        }

        for(var i = 0; i < this.goblinCount; i++){
            let goblinContainer = this.add.container(this.goblinSpawnArr[i][0],this.goblinSpawnArr[i][1]);
            let goblinSprite = this.physics.add.sprite(0, 0, ENEMIES.GOBLIN, 'sleep/0001.png').setScale(5, 5);
            let zzzSprite = this.physics.add.sprite(100, -100, ENEMIES.GOBLIN, 'zzz/0001.png').setScale(5, 5);
            goblinContainer.add([goblinSprite, zzzSprite]);
            this.enemyGroup.add(goblinSprite);

            let goblin = new Goblin({"sprite":goblinSprite,"allEnemySprites":this.enemyGroup.getChildren(),"physics":this.physics,"enemyType":ENEMIES.GOBLIN, "anims":this.anims,"goblinContainer":goblinContainer, "scene":this});
            goblinSprite.class = goblin;
            this.monsterArray.push(goblin);
        }

        //Create the heroes
        this.shieldHeroSprite = this.physics.add.sprite(200,200, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5);
        this.swordHeroSprite = this.physics.add.sprite(200,200, HEROES.SWORD_HERO, 'down/0001.png').setScale(5, 5);        
        this.mageHeroSprite = this.physics.add.sprite(200,200, HEROES.MAGE_HERO, 'down/0001.png').setScale(5, 5);

        let allHeroSprites = [this.shieldHeroSprite, this.swordHeroSprite, this.mageHeroSprite];

        this.shieldHeroSprite.visible = false;
        this.shieldHeroSprite.setVelocity(0,0);
        this.swordHeroSprite.visible = false;
        this.swordHeroSprite.setVelocity(0,0);
        this.mageHeroSprite.visible = true;
        //this.mageHeroSprite.setVelocity(0,0);

        //First player is always shieldHero
        this.shieldHero = new ShieldHero({"playerType":HEROES.SHIELD_HERO,"sprite":this.shieldHeroSprite,"physics":this.physics,"keyboard":this.input.keyboard,"anims":this.anims,"scene":this});
        this.swordHero = new SwordHero({"playerType":HEROES.SWORD_HERO,"sprite":this.swordHeroSprite,"physics":this.physics,"keyboard":this.input.keyboard,"anims":this.anims,"scene":this});
        this.mageHero = new MageHero({"playerType":HEROES.MAGE_HERO,"sprite":this.mageHeroSprite,"physics":this.physics,"keyboard":this.input.keyboard,"anims":this.anims,"scene":this});

        this.player = this.mageHero;

        //Setting the .class method of sprite to the sprite's class (the hero class)
        this.shieldHeroSprite.class = this.shieldHero;
        this.swordHeroSprite.class = this.swordHero;
        this.mageHeroSprite.class = this.mageHero;

        //Launch the overlay scene
        this.scene.launch(SCENES.DAY_OVERLAY, {"dayScene":this,"sceneKey":SCENES.DUNGEON4,"shieldHero":this.shieldHero,"swordHero":this.swordHero,"mageHero":this.mageHero});

	    //collisions
	    this.wallLayer.setCollision(6); //dungeon level     //Change this if you want a different tile set. This is the ID.



        this.physics.add.collider(this.player.sprite,this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(),this.wallLayer);

        //Damaging the player
        this.physics.add.overlap(this.shieldHeroSprite,this.enemyGroup.getChildren(), function(o1, o2){
            o1.scene.player.damage(o2);
        });
        this.physics.add.overlap(this.swordHeroSprite,this.enemyGroup.getChildren(), function(o1, o2){
            o1.scene.player.damage(o2);
        });
        this.physics.add.overlap(this.mageHeroSprite,this.enemyGroup.getChildren(), function(o1, o2){
            o1.scene.player.damage(o2);
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
            if(this.player.dead){
            
            }else if(pointer.leftButtonDown() && Math.floor(this.time.now/1000)-this.player.previousTime >= this.player.attackCooldown ){
                this.player.previousTime = Math.floor(this.time.now/1000);
                //Call the player's attack 
                this.player.attackBasic(pointer);
                if (this.player.playerType == HEROES.SHIELD_HERO) {
                    this.sound.play("audiomageattack",{"volume":30});
                } else if (this.player.playerType == HEROES.MAGE_HERO) {
                    this.sound.play("audiomageattack",{"volume":30});
                } else {
                    this.sound.play("audioswordslice",{"volume":30});
                }

            }
            else if(pointer.rightButtonDown()){
                this.player.attackSpecial(pointer, this.player.angle);
            }
        }, this);

        this.input.mouse.disableContextMenu();
        this.map.currentLayer = this.baseLayer;
        this.pathFinding();
    }


    hittingWithShieldBeam(shieldBeamSprite, enemySprite){
        if(!shieldBeamSprite.anims){
            return;
        }
        enemySprite.setVelocity(shieldBeamSprite.body.velocity.x,shieldBeamSprite.body.velocity.y);
        enemySprite.class.damaged(shieldBeamSprite.class.basicAttack);

        //console.log(enemySprite.texture," got hit");
        enemySprite.class.lastDamaged = shieldBeamSprite.scene.time.now;        //Need this for damage cooldown
        enemySprite.class.justGotHit = true; 

        if(!shieldBeamSprite.colliding){
            shieldBeamSprite.colliding = [];
        }
        shieldBeamSprite.colliding.push(enemySprite);
    }

    hittingWithMagicBeam(magicBeamSprite, enemySprite){
        if(!magicBeamSprite.anims){
            return;
        }
        console.log(magicBeamSprite.class.basicAttack);
        enemySprite.class.damaged(magicBeamSprite.class.basicAttack);

        //Slows the enemy down by half the speed
        enemySprite.class.slowDown();



        enemySprite.class.lastDamaged = magicBeamSprite.scene.time.now;        //Need this for damage cooldown
        enemySprite.class.justGotHit = true; 

        if(!magicBeamSprite.colliding){
            magicBeamSprite.colliding = [];
        }
        magicBeamSprite.colliding.push(enemySprite);
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
        var tile = this.map.getTileAt(x, y,true,'walls');
        if(tile.index == -1){
            tile = this.map.getTileAt(x,y,true,'base');
        }
        return tile.index;
    }
    checkCollision(x,y){
        var tile = this.map.getTileAt(x, y,true);
        return tile.properties.collide == true;
    }

    swapHero(){

        let tempX = this.player.sprite.x;   //Save temporary placement of the current hero
        let tempY = this.player.sprite.y;
            
            switch(this.player.swap()){
                case HEROES.SHIELD_HERO: 
                    if(!this.shieldHero.dead){
                        this.player = this.shieldHero;
                        this.shieldHeroSprite.visible = true;
                        this.swordHeroSprite.visible = false;
                        this.mageHeroSprite.visible = false;
                        this.swordHeroSprite.setVelocity(0,0);
                        this.swordHeroSprite.setPosition(-100,0);
                        this.mageHeroSprite.setVelocity(0,0);
                        this.mageHeroSprite.setPosition(-100,0);
                        break;
                    }
                case HEROES.SWORD_HERO:
                    if(!this.swordHero.dead){
                        this.player = this.swordHero;
                        this.shieldHeroSprite.visible = false;
                        this.swordHeroSprite.visible = true;
                        this.mageHeroSprite.visible = false;
                        this.shieldHeroSprite.setVelocity(0,0);
                        this.shieldHeroSprite.setPosition(-100,0);
                        this.mageHeroSprite.setVelocity(0,0);
                        this.mageHeroSprite.setPosition(-100,0);
                        break;
                    }
                case HEROES.MAGE_HERO:
                    if(!this.mageHero.dead){
                        this.player = this.mageHero;
                        this.shieldHeroSprite.visible = false;
                        this.swordHeroSprite.visible = false;
                        this.mageHeroSprite.visible = true;
                        this.shieldHeroSprite.setVelocity(0,0);
                        this.shieldHeroSprite.setPosition(-100,0);
                        this.swordHeroSprite.setVelocity(0,0);
                        this.swordHeroSprite.setPosition(-100,0);
                        break;
                    }
            }

        this.player.sprite.x = tempX;       //Use the temporary placement of the hero to place new hero
        this.player.sprite.y = tempY;

        this.cameras.main.startFollow(this.player.sprite);
        this.physics.add.collider(this.player.sprite,this.wallLayer);

        console.log(this.player);
    }

    update(time, delta){
        if(this.player.sprite && this.player.sprite.body && !this.player.active && time - (this.lastDamaged +400)>= 0){
            console.log("hello");
            this.player.active = true;
            this.player.sprite.body.setVelocity(0,0);
        }
        if(this.allThreeDead() && this.timeOfDeath == null){     //Kill the player and get the time of death
            this.player.active = false;
            this.player.sprite.destroy();
            this.timeOfDeath = time;
            //console.log(time);
            //console.log(Math.floor(this.timeOfDeath/1000));

        }
        else if(this.allThreeDead()  && Math.floor((time/1000))-Math.floor(this.timeOfDeath/1000) >= this.deathSceneLength ){
            //Shows the game going without the Player for x amount of seconds before it sends the game to the main menu
            this.timeOfDeath = null;
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.MAIN_MENU, 'dead');
            this.scene.stop(SCENES.DAY);
        }
        else{
            this.player.update(time);
            //Space bar for swapping heroes
            if(this.input.keyboard.keys[32].isDown && Math.floor(time/1000)-this.player.lastSwapped >= this.player.swapCooldown){

                this.swapHero();                    //Swap the heroes by calling the function 
                this.player.lastSwapped = Math.floor(time/1000);


            }



            //Pause stuff
            if(this.input.keyboard.keys[27].isDown && !this.justPaused){
                this.justPaused = true
                this.input.keyboard.keys[68].isDown = false
                this.input.keyboard.keys[65].isDown = false
                this.input.keyboard.keys[87].isDown = false
                this.input.keyboard.keys[83].isDown = false
                this.music.pause();
                this.scene.launch(SCENES.PAUSE, {"scenes":[SCENES.DUNGEON4, SCENES.DAY_OVERLAY]});
                this.scene.pause(SCENES.DAY_OVERLAY)
                this.scene.pause();
            }else if(this.input.keyboard.keys[27].isUp){
                this.music.resume();
                this.justPaused = false;
            }

            if(this.input.keyboard.keys[73].isDown){
                this.player.invulnerable = true;
            }

            if(this.input.keyboard.keys[49].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.DAY, {
                    "money": this.money,
                    "level": 3
                });
                this.scene.stop();
            }else if(this.input.keyboard.keys[51].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.DAY_DUNGEON3, {
                    "money": this.money,
                    "level": 5
                });
                this.scene.stop();
            }else if(this.input.keyboard.keys[52].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.NIGHT, {
                    "money": this.money,
                    "level": 1
                });
                this.scene.stop();
            }else if(this.input.keyboard.keys[53].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.NIGHT, {
                    "money": this.money,
                    "level": 2
                });
                this.scene.stop();
            }else if(this.input.keyboard.keys[54].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.NIGHT, {
                    "money": this.money,
                    "level": 3
                });
                this.scene.stop();
            }

            for(let i = 0; i < this.monsterArray.length; i++){
                var monster = this.monsterArray[i].dayUpdate(time, this.player);
            }
        }
    }

    allThreeDead(){
        if(this.shieldHero.dead && this.swordHero.dead && this.mageHero.dead){
            return true;
        }
        else return false;
    }

    getMoney(money){
        if(this.money < 99999){
            this.money += money;
        }
        else{
            this.money = "MAXED_OUT";
        }
    }
}
