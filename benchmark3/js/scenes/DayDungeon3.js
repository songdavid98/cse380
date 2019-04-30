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



export class DayDungeon3 extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.DAY_DUNGEON3
        })
    }
    init(data){
        console.log("eafijoaejiofoeapjif");
        this.timer;         //Day Countdown timer ~ 2min?
        this.map;
        this.monsterArray = new Array();
        this.level = data.level;
        this.mapLevel;
        this.easystar;
        this.money = data['money'] || 0;
        this.lastDamaged = 0;
        this.buttonsPressed = 0;



         //This variable is used for attack cooldowns as well as time in between damages from monsters
        this.deathSceneLength = 5;
        this.slimeSpawnArr = [
            [1800,600],
            [2320,300],
            [1500,500],
            [1750,1300],
            [1700,2200],
            [1950,1000],
            [1600,1200],
            [1550,2600],
            [1500,1000],
            [1600,1500]
        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [
            [1900,1200],
            [1400,1500]
        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [
            [1300,1400],
            [1400,600],
            [1500,1400],
            [1600,1000],
            [1700,900],
            [1800,1800],
            [1600,400],
            [1800,600],
            [1220,1300],
            [1600,600],
            [1700,900],
            [1800,800],


            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],
            [1500,2000],


        ];
        this.goblinCount = this.goblinSpawnArr.length;
        

    }
    preload(){
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("barrel", "./assets/images/tiles/newerTileImages/barrel.png");


        this.load.multiatlas(HEROES.SHIELD_HERO, './assets/images/heroes/shield.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.SWORD_HERO, './assets/images/heroes/sword.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.MAGE_HERO, './assets/images/heroes/mage.json', "assets/images/heroes");


        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");
        
        this.level = 5;
        this.load.tilemapTiledJSON("map5", "./assets/tilemaps/DayDungeon3.json");
        this.mapLevel = "map5";
        console.log("make suer this dungeon even exits, dumbo");

        this.load.audio("audiobackgroundsong", "./assets/audio/backgroundsong.wav");
        this.load.audio("audioswordslice", "./assets/audio/swordslice.wav");
        this.load.audio("audiomageattack", "./assets/audio/mageattack.wav");
    }
    create(){
        this.music = this.sound.add("audiobackgroundsong");
        this.music.setLoop(true);
        this.music.play();
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 1, 0).setScale(4,4); 
        this.groundLayer = this.map.createStaticLayer("ground", [this.terrain], 1, 0).setScale(4,4); 
        this.buttonsLayer = this.map.createStaticLayer("buttons", [this.terrain], 1, 0).setScale(4,4);
        this.prisonLayer = this.map.createStaticLayer("prison", [this.terrain], 1, 0).setScale(4,4); 
        this.doorLayer = this.map.createStaticLayer("door", [this.terrain], 0, 0).setScale(4,4);

        //add objects
        this.items = this.map.objects[0].objects;
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].width *= 4;
            this.items[i].height *= 4;
            this.items[i].x *= 4;
            this.items[i].y *= 4;
        }
        let barrels = this.map.createFromObjects('objectLayer', 1, {
            key: 'barrel'
        });
        this.barrels = this.physics.add.group();
        console.log(barrels);
        for(var i = 0; i < barrels.length; i++){
            this.barrels.add(this.physics.add.existing(barrels[i]));
            barrels[i].body.setSize(barrels[i].body.width, barrels[i].body.height);
            barrels[i].body.setOffset(0, 0);
        }


        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc');

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
        this.shieldHeroSprite = this.physics.add.sprite(800*2,1200*2, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5);
        this.swordHeroSprite = this.physics.add.sprite(800*2,1200*2, HEROES.SWORD_HERO, 'down/0001.png').setScale(5, 5);        
        this.mageHeroSprite = this.physics.add.sprite(800*2,1200*2, HEROES.MAGE_HERO, 'down/0001.png').setScale(5, 5);

        let allHeroSprites = [this.shieldHeroSprite, this.swordHeroSprite, this.mageHeroSprite];

        this.shieldHeroSprite.visible = false;
        this.shieldHeroSprite.setVelocity(0,0);
        this.shieldHeroSprite.setPosition(-100,0);
        this.swordHeroSprite.visible = false;
        this.swordHeroSprite.setVelocity(0,0);
        this.swordHeroSprite.setPosition(-100,0);
        this.mageHeroSprite.visible = true;
        //this.mageHeroSprite.setVelocity(0,0);
        //this.mageHeroSprite.setPosition(59,0);

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
        this.scene.launch(SCENES.DAY_OVERLAY, {"dayScene":this,"sceneKey":SCENES.DAY_DUNGEON3,"shieldHero":this.shieldHero,"swordHero":this.swordHero,"mageHero":this.mageHero});

	    //collisions
	    this.wallLayer.setCollision(6); //dungeon level     //Change this if you want a different tile set. This is the ID.
        this.prisonLayer.setCollision(18);
        this.groundLayer.setCollision(1);
        this.doorLayer.setCollision(18);

        this.doorLayerColliders = []
        this.physics.add.collider(this.swordHeroSprite,this.wallLayer);
        this.physics.add.collider(this.swordHeroSprite,this.prisonLayer);
        this.doorLayerColliders.push(this.physics.add.collider(this.swordHeroSprite,this.doorLayer));
        this.physics.add.collider(this.shieldHeroSprite,this.wallLayer);
        this.physics.add.collider(this.shieldHeroSprite,this.prisonLayer);
        this.doorLayerColliders.push(this.physics.add.collider(this.shieldHeroSprite,this.doorLayer));
        this.physics.add.collider(this.mageHeroSprite,this.wallLayer);
        this.physics.add.collider(this.mageHeroSprite,this.prisonLayer);
        this.doorLayerColliders.push(this.physics.add.collider(this.mageHeroSprite,this.doorLayer));
        this.physics.add.collider(this.enemyGroup.getChildren(),this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(),this.prisonLayer);
        this.physics.add.collider(this.barrels.getChildren(), this.wallLayer);
        this.barrelOverlap = this.physics.add.overlap(this.barrels.getChildren(), this.buttonsLayer, function(o1,o2){
            if(o1.scene.buttonsPressed >= 2){
                if(o1.scene.doorLayer){
                    for(var i = 0; i < o1.scene.doorLayerColliders.length; i++){
                        o1.scene.physics.world.removeCollider(o1.scene.doorLayerColliders[i]);
                    }
                    o1.scene.doorLayer.destroy();
                    o1.scene.doorLayer = null;
                    console.log(o1.scene.doorLayer);
                }
                o1.scene.physics.world.removeCollider(o1.scene.barrelOverlap);
            }else if(o2.index == -1){

            }else if(!o1.pressed){
                o1.pressed = true;
                o1.setPosition(o1.x+(20*Math.sign(o1.body.velocity.x)),o1.y);
                o1.body.destroy();
                o1.scene.buttonsPressed++;
            }
        });
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
        this.cameras.main.setBounds(0,0,this.map.widthInPixels*4, this.map.heightInPixels*4);
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
        // this.pathFinding();
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
        if(this.player.active){
            //console.log(this.player.active);
        }
        //console.log((Math.floor(time/1000)) - (Math.floor(this.lastDamaged/1000))); 
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
                this.scene.launch(SCENES.PAUSE, {"scenes":[SCENES.DAY_DUNGEON3, SCENES.DAY_OVERLAY]});
                this.scene.pause(SCENES.DAY_OVERLAY)
                this.scene.pause();
            }else if(this.input.keyboard.keys[27].isUp){
                this.music.resume();
                this.justPaused = false;
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
