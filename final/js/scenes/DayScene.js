//Day time level 

import {
    SCENES
} from "../constants/SceneNames.js";
import {
    HEROES
} from "../constants/PlayerTypes.js";
import {
    ENEMIES
} from "../constants/EnemyTypes.js";
import {
    ShieldHero
} from "../gamePlay/Heroes/ShieldHero.js";
import {
    SwordHero
} from "../gamePlay/Heroes/SwordHero.js";
import {
    MageHero
} from "../gamePlay/Heroes/MageHero.js";
import {
    Slime
} from "../gamePlay/Monsters/Slime.js";
import {
    Golem
} from "../gamePlay/Monsters/Golem.js";
import {
    Goblin
} from "../gamePlay/Monsters/Goblin.js";


export class DayScene extends Phaser.Scene {
    constructor(data) {
        super({
            key: data['key']
        })
        this.sceneKey = data['key'];
    }
    init(data) {
        this.timer; //Day Countdown timer ~ 2min?
        this.map;
        this.monsterArray = new Array();
        this.level = data.level;
        this.mapLevel;
        this.easystar;
        this.money = data['money'] || 0;
        this.lastDamaged = 0;
        //This variable is used for attack cooldowns as well as time in between damages from monsters
        this.deathSceneLength = 5;

        this.textWords;

    }
    preload() {
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");
        this.load.image("greenHealth", "./assets/images/icons/bar1.png");
        this.load.image("healthBar", "./assets/images/icons/bar2.png");
        
        this.load.multiatlas(HEROES.SHIELD_HERO, './assets/images/heroes/shield.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.SWORD_HERO, './assets/images/heroes/sword.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.MAGE_HERO, './assets/images/heroes/mage.json', "assets/images/heroes");


        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");

    
        this.load.audio("audiobackgroundsong", "./assets/audio/backgroundsong.wav");
        this.load.audio("audioswordslice", "./assets/audio/swordslice.wav");
        this.load.audio("audiomageattack", "./assets/audio/mageattack.wav");
        this.load.audio("audioshieldattack1", "./assets/audio/shieldheroha.wav");
        this.load.audio("audioshieldattack2", "./assets/audio/shieldherohuh.wav");
    }
    create(data) {
        if(!data){
            data = {};
        }
        let initialX = data['initialX'] || 200;
        let initialY = data['initialY'] || 200;
        this.initPos = [initialX, initialY];    //Need this for tutorial

        this.music = this.sound.add("audiobackgroundsong");
        this.music.setLoop(true);
        this.music.play();

        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        console.log(this.map);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
       //this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5, 5);


        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,One,Two,Three,Four,Five,Six');

        //Create the enemies
        this.enemyGroup = this.physics.add.group();
        
        //Create the heroes
        this.shieldHeroSprite = this.physics.add.sprite(initialX, initialY, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5);
        this.swordHeroSprite = this.physics.add.sprite(initialX, initialY, HEROES.SWORD_HERO, 'down/0001.png').setScale(5, 5);
        this.mageHeroSprite = this.physics.add.sprite(initialX, initialY, HEROES.MAGE_HERO, 'down/0001.png').setScale(5, 5);

        this.playerGroup = this.physics.add.group();

        this.playerGroup.add(this.shieldHeroSprite);
        this.playerGroup.add(this.swordHeroSprite);
        this.playerGroup.add(this.mageHeroSprite);


        this.shieldHeroSprite.visible = false;
        this.shieldHeroSprite.setVelocity(0, 0);
        this.swordHeroSprite.visible = true;
        //this.swordHeroSprite.setVelocity(0,0);
        this.mageHeroSprite.visible = false;
        this.mageHeroSprite.setVelocity(0, 0);

        //First player is always shieldHero
        this.shieldHero = new ShieldHero({
            "playerType": HEROES.SHIELD_HERO,
            "sprite": this.shieldHeroSprite,
            "physics": this.physics,
            "keyboard": this.input.keyboard,
            "anims": this.anims,
            "scene": this
        });
        this.swordHero = new SwordHero({
            "playerType": HEROES.SWORD_HERO,
            "sprite": this.swordHeroSprite,
            "physics": this.physics,
            "keyboard": this.input.keyboard,
            "anims": this.anims,
            "scene": this
        });
        this.mageHero = new MageHero({
            "playerType": HEROES.MAGE_HERO,
            "sprite": this.mageHeroSprite,
            "physics": this.physics,
            "keyboard": this.input.keyboard,
            "anims": this.anims,
            "scene": this
        });

        this.player = this.swordHero;

        //Setting the .class method of sprite to the sprite's class (the hero class)
        this.shieldHeroSprite.class = this.shieldHero;
        this.swordHeroSprite.class = this.swordHero;
        this.mageHeroSprite.class = this.mageHero;

        //Launch the overlay scene
        this.scene.launch(SCENES.DAY_OVERLAY, {
            "dayScene": this,
            "sceneKey": this.sceneKey,
            "shieldHero": this.shieldHero,
            "swordHero": this.swordHero,
            "mageHero": this.mageHero,
            "playerType": this.player.playerType
        });

        //Create the enemies
        for (var i = 0; i < this.slimeCount; i++) {
            let scaleX = 5;
            let scaleY = 5;
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0,0,'healthBar').setScale(2,2);
            let healthSprite = this.add.sprite(0,0,'greenHealth').setScale(2,2);
            
            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({
                "sprite": slimeSprite,
                "healthBar": healthBarSprite,
                "greenBar":healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.SLIME,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY":scaleY
            });
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }

        for (var i = 0; i < this.golemCount; i++) {
            let scaleX = 8;
            let scaleY = 8;
            let golemSprite = this.physics.add.sprite(this.golemSpawnArr[i][0], this.golemSpawnArr[i][1], ENEMIES.GOLEM, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0,0,'healthBar').setScale(2,2);
            let healthSprite = this.add.sprite(0,0,'greenHealth').setScale(2,2);
   
            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(golemSprite);
            let golem = new Golem({
                "sprite": golemSprite,
                "healthBar": healthBarSprite,
                "greenBar":healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOLEM,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY":scaleY
            });
            golemSprite.class = golem;
            this.monsterArray.push(golem);
        }

        for (var i = 0; i < this.goblinCount; i++) {
            let scaleX = 5;
            let scaleY = 5;
            let goblinSprite = this.physics.add.sprite(this.goblinSpawnArr[i][0], this.goblinSpawnArr[i][1], ENEMIES.GOBLIN, 'sleep/0001.png').setScale(scaleX, scaleY);
            let zzzSprite = this.add.sprite(this.goblinSpawnArr[i][0]+100, this.goblinSpawnArr[i][1]-100, ENEMIES.GOBLIN, 'zzz/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0,0,'healthBar').setScale(2,2);
            let healthSprite = this.add.sprite(0,0,'greenHealth').setScale(2,2);
   
            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(goblinSprite);
            let goblin = new Goblin({
                "sprite": goblinSprite,
                "healthBar": healthBarSprite,
                "greenBar":healthSprite,
                "zzzSprite":zzzSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOBLIN,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY":scaleY
            });
            goblinSprite.class = goblin;
            this.monsterArray.push(goblin);
        }

        //Damaging the player
        this.physics.add.overlap(this.playerGroup.getChildren(), this.enemyGroup.getChildren(), function (o1, o2) {
            o1.scene.player.damage(o2);
        });

        //Camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 5, this.map.heightInPixels * 5);
        this.cameras.main.startFollow(this.player.sprite);

        //Event Listener
        this.input.on('pointermove', function (pointer) {
            let cursor = pointer;
            this.player.angle = Phaser.Math.Angle.Between(this.player.sprite.x, this.player.sprite.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
        }, this);



        this.input.on('pointerdown', function (pointer) {

            if (this.player.dead) {

            } else if (pointer.leftButtonDown() && Math.floor(this.time.now / 1000) - this.player.previousTime >= this.player.attackCooldown) {
                this.player.previousTime = Math.floor(this.time.now / 1000);
                //Call the player's attack 
                this.player.attackBasic(pointer);
            } else if (pointer.rightButtonDown()) {
                this.player.attackSpecial(pointer, this.player.angle);
            }
        }, this);

        this.input.mouse.disableContextMenu();
        this.map.currentLayer = this.baseLayer;
        this.pathFinding();
    }

    spawnMoreSlimes(){
         //Create the enemies
         for (var i = 0; i < this.slimeCount; i++) {
             
            let scaleX = 5;
            let scaleY = 5;
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0,0,'healthBar').setScale(2,2);
            let healthSprite = this.add.sprite(0,0,'greenHealth').setScale(2,2);
            
            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({
                "sprite": slimeSprite,
                "healthBar": healthBarSprite,
                "greenBar":healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.SLIME,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY":scaleY
            });
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }
    }

    hittingWithShieldBeam(shieldBeamSprite, enemySprite) {
        if (!shieldBeamSprite.anims) {
            return;
        }
        enemySprite.setVelocity(shieldBeamSprite.body.velocity.x, shieldBeamSprite.body.velocity.y);
        enemySprite.class.damaged(shieldBeamSprite.class.basicAttack);

        //console.log(enemySprite.texture," got hit");
        enemySprite.class.lastDamaged = shieldBeamSprite.scene.time.now; //Need this for damage cooldown
        enemySprite.class.justGotHit = true;

        if (!shieldBeamSprite.colliding) {
            shieldBeamSprite.colliding = [];
        }
        shieldBeamSprite.colliding.push(enemySprite);
    }

    hittingWithMagicBeam(magicBeamSprite, enemySprite) {
        if (!magicBeamSprite.anims) {
            return;
        }
        console.log(magicBeamSprite.class.basicAttack);
        enemySprite.class.damaged(magicBeamSprite.class.basicAttack);

        //Slows the enemy down by half the speed
        enemySprite.class.slowDown();
        enemySprite.class.lastDamaged = magicBeamSprite.scene.time.now; //Need this for damage cooldown
        enemySprite.class.justGotHit = true;

        if (!magicBeamSprite.colliding) {
            magicBeamSprite.colliding = [];
        }
        magicBeamSprite.colliding.push(enemySprite);
    }


    //Setting up pathfinding
    pathFinding() {
        this.easystar = new EasyStar.js();
        var grid = [];
        for (var y = 0; y < this.map.height; y++) {
            var col = [];
            for (var x = 0; x < this.map.width; x++) {
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                col.push(this.getTileID(x, y));
            }
            grid.push(col);
        }
        console.log(this.map);
        this.easystar.setGrid(grid);
        this.easystar.enableDiagonals();

        var tileset = this.map.tilesets[0];
        var properties = tileset.tileProperties;
        console.log(tileset);
        var acceptableTiles = [];

        // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
        // and see what properties have been entered in Tiled.
        for (var i = tileset.firstgid - 1; i < this.terrain.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
            if (!properties.hasOwnProperty(i)) {
                // If there is no property indicated at all, it means it's a walkable tile
                acceptableTiles.push(i + 1);
                continue;
            }
            if (!properties[i].collide) acceptableTiles.push(i + 1);
            if (properties[i].cost) this.easystar.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
        }

        this.easystar.setAcceptableTiles(acceptableTiles);

        console.log(acceptableTiles);
        console.log(grid);
    }

    //Used in pathfinding
    getTileID(x, y) {
        /*var tile = this.map.getTileAt(x, y, true, 'walls');
        if (tile.index == -1) {
            tile = this.map.getTileAt(x, y, true, 'base');
        }
        return tile.index;*/
    }
    checkCollision(x, y) {
        var tile = this.map.getTileAt(x, y, true);
        return tile.properties.collide == true;
    }

    swapMaps(currentMap) {
        console.log("Swapped");

        /*
        this.map = this.add.tilemap("iceMap1");
        let iceTerrain = this.map.addTilesetImage("ice", "iceTerrain");
        this.baseLayer = this.map.createStaticLayer("base", [iceTerrain], 0, 0).setScale(5,5);
        this.wallLayer = this.map.createStaticLayer("walls", [iceTerrain], 1, 0).setScale(5,5); 
        this.doorLayer = this.map.createStaticLayer("door", [iceTerrain], 2, 0).setScale(5,5); 
        */
    }

    swapHero() {

        let tempX = this.player.sprite.x; //Save temporary placement of the current hero
        let tempY = this.player.sprite.y;

        switch (this.player.swap()) {
            case HEROES.SHIELD_HERO:
                if (!this.shieldHero.dead) {
                    this.player = this.shieldHero;
                    this.shieldHeroSprite.visible = true;
                    this.swordHeroSprite.visible = false;
                    this.mageHeroSprite.visible = false;
                    this.swordHeroSprite.setVelocity(0, 0);
                    this.swordHeroSprite.setPosition(-100, 0);
                    this.mageHeroSprite.setVelocity(0, 0);
                    this.mageHeroSprite.setPosition(-100, 0);
                    break;
                }
            case HEROES.SWORD_HERO:
                if (!this.swordHero.dead) {
                    this.player = this.swordHero;
                    this.shieldHeroSprite.visible = false;
                    this.swordHeroSprite.visible = true;
                    this.mageHeroSprite.visible = false;
                    this.shieldHeroSprite.setVelocity(0, 0);
                    this.shieldHeroSprite.setPosition(-100, 0);
                    this.mageHeroSprite.setVelocity(0, 0);
                    this.mageHeroSprite.setPosition(-100, 0);
                    break;
                }
            case HEROES.MAGE_HERO:
                if (!this.mageHero.dead) {
                    this.player = this.mageHero;
                    this.shieldHeroSprite.visible = false;
                    this.swordHeroSprite.visible = false;
                    this.mageHeroSprite.visible = true;
                    this.shieldHeroSprite.setVelocity(0, 0);
                    this.shieldHeroSprite.setPosition(-100, 0);
                    this.swordHeroSprite.setVelocity(0, 0);
                    this.swordHeroSprite.setPosition(-100, 0);
                    break;
                }
        }

        this.player.sprite.x = tempX; //Use the temporary placement of the hero to place new hero
        this.player.sprite.y = tempY;

        this.cameras.main.startFollow(this.player.sprite);
    }

    update(time, delta) {
        if (this.player.sprite && this.player.sprite.body && !this.player.active && time - (this.lastDamaged + 400) >= 0) {
            console.log("hello");
            this.player.active = true;
            this.player.sprite.body.setVelocity(0, 0);
        }
        if (this.allThreeDead() && this.timeOfDeath == null) { //Kill the player and get the time of death
            this.player.active = false;
            this.player.sprite.destroy();
            this.timeOfDeath = time;
            //console.log(time);
            //console.log(Math.floor(this.timeOfDeath/1000));

        } else if (this.allThreeDead() && Math.floor((time / 1000)) - Math.floor(this.timeOfDeath / 1000) >= this.deathSceneLength) {
            //Shows the game going without the Player for x amount of seconds before it sends the game to the main menu
            this.timeOfDeath = null;
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            console.log(this.scene);
            this.scene.start(SCENES.MAIN_MENU, 'dead');
            this.scene.stop();
        } else {
            this.player.update(time);
            //Space bar for swapping heroes
            if (this.input.keyboard.keys[32].isDown && Math.floor(time / 1000) - this.player.lastSwapped >= this.player.swapCooldown) {

                this.swapHero(); //Swap the heroes by calling the function 
                this.player.lastSwapped = Math.floor(time / 1000);


            }

            //Pause stuff
            if (this.input.keyboard.keys[27].isDown && !this.justPaused) {
                this.justPaused = true;
                this.music.pause();
                this.input.keyboard.keys[68].isDown = false
                this.input.keyboard.keys[65].isDown = false
                this.input.keyboard.keys[87].isDown = false
                this.input.keyboard.keys[83].isDown = false
                this.scene.launch(SCENES.PAUSE, {
                    "scenes": [this.sceneKey, SCENES.DAY_OVERLAY]
                });
                this.scene.pause(SCENES.DAY_OVERLAY)
                this.scene.pause();
            } else if (this.input.keyboard.keys[27].isUp && this.justPaused) {
                this.justPaused = false;
                this.music.resume();
            }
            //cheats
            if (this.input.keyboard.keys[73].isDown) {
                this.player.invulnerable = true;
            }

            for (let i = 0; i < this.monsterArray.length; i++) {
                var monster = this.monsterArray[i].dayUpdate(time, this.player);
            }
        }
    }

    allThreeDead() {
        if (this.shieldHero.dead && this.swordHero.dead && this.mageHero.dead) {
            return true;
        } else return false;
    }

    getMoney(money) {
        if (this.money < 99999) {
            this.money += money;
        } else {
            this.money = "MAXED_OUT";
        }
    }
}
