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
//import {DayPlayer} from "../gamePlay/DayPlayer.js";   //Don't use this!!!!!!!!!
//import {Enemy} from "../gamePlay/Enemy.js";           //Don't use this!!!!!!!!!
import {
    Slime
} from "../gamePlay/Monsters/Slime.js";
import {
    Golem
} from "../gamePlay/Monsters/Golem.js";
import {
    Goblin
} from "../gamePlay/Monsters/Goblin.js";

import {
    ShieldHero
} from "../gamePlay/Heroes/ShieldHero.js";
import {
    SwordHero
} from "../gamePlay/Heroes/SwordHero.js";
import {
    MageHero
} from "../gamePlay/Heroes/MageHero.js";



export class DayScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.DAY
        })
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
        this.slimeSpawnArr = [
            /*
            [700,700],
            [1000,1000],
            [1200,1100],
            [1300,1500],
            [1300,1200],

            [1400,1200],
            [1400,1600],
            [1500,1300],
            [1600,1400],

            [2100,2100],
            [2200,2100],
            [2100,2200],
            [2200,2200],*/
            [2300, 2000],

        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [
            [300, 2000],
            [2000, 1800]
        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [

            [1320, 400],
            [1400, 600],
            [1600, 1000],
            [1700, 1900],
            [1800, 1800],
            [1670, 1400],
            [1220, 300],
            [1740, 900],
            [1800, 800]

        ];
        this.goblinCount = this.goblinSpawnArr.length;


    }
    preload() {
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        

        this.load.multiatlas(HEROES.SHIELD_HERO, './assets/images/heroes/shield.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.SWORD_HERO, './assets/images/heroes/sword.json', "assets/images/heroes");
        this.load.multiatlas(HEROES.MAGE_HERO, './assets/images/heroes/mage.json', "assets/images/heroes");


        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");

        this.level = 1;
        switch (this.level) {
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
        this.load.audio("audiobackgroundsong", "./assets/audio/backgroundsong.wav");
        this.load.audio("audioswordslice", "./assets/audio/swordslice.wav");
        this.load.audio("audiomageattack", "./assets/audio/mageattack.wav");
        this.load.audio("audioshieldattack1", "./assets/audio/shieldheroha.wav");
        this.load.audio("audioshieldattack2", "./assets/audio/shieldherohuh.wav");
    }
    create() {
        this.scene.stop(SCENES.DAY_DUNGEON3);
        this.scene.stop(SCENES.DUNGEON4);
        this.music = this.sound.add("audiobackgroundsong");
        this.music.setLoop(true);
        this.music.play();

        //Generate map
        this.map = this.add.tilemap(this.mapLevel);

        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding
        this.baseLayer = this.map.createStaticLayer("base", [this.terrain], 0, 0).setScale(5, 5);
        this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 0, 0).setScale(5, 5);



        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,Two,Three,Four,Five,Six');

        //Create the enemies
        this.enemyGroup = this.physics.add.group();
        for (var i = 0; i < this.slimeCount; i++) {
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(5, 5);
            let healthBarSprite = this.add.sprite(this.slimeSpawnArr[i][0],this.slimeSpawnArr[i][1]+100,'healthBar').setScale(2,2);
            let healthSprite = this.add.sprite(this.slimeSpawnArr[i][0],this.slimeSpawnArr[i][1]+100,'greenHealth').setScale(2,2);

            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({
                "sprite": slimeSprite,
                "healthBar": healthBarSprite,
                "greenBar":healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.SLIME,
                "anims": this.anims,
                "scene": this
            });
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }

        for (var i = 0; i < this.golemCount; i++) {
            let golemSprite = this.physics.add.sprite(this.golemSpawnArr[i][0], this.golemSpawnArr[i][1], ENEMIES.GOLEM, 'down/0001.png').setScale(8, 8);
            let healthBarSprite = this.add.sprite(this.golemSpawnArr[i][0],this.golemSpawnArr[i][1]+100,'healthBar').setScale(2,2);
            let healthSprite = this.add.sprite(this.golemSpawnArr[i][0],this.golemSpawnArr[i][1]+100,'greenHealth').setScale(2,2);

            this.enemyGroup.add(golemSprite);
            let golem = new Golem({
                "sprite": golemSprite,
                "healthBar": healthBarSprite,
                "greenBar":healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOLEM,
                "anims": this.anims,
                "scene": this
            });
            golemSprite.class = golem;
            this.monsterArray.push(golem);
        }

        for (var i = 0; i < this.goblinCount; i++) {
            let goblinContainer = this.add.container(this.goblinSpawnArr[i][0], this.goblinSpawnArr[i][1]);
            let goblinSprite = this.physics.add.sprite(0, 0, ENEMIES.GOBLIN, 'sleep/0001.png').setScale(5, 5);
            let zzzSprite = this.physics.add.sprite(100, -100, ENEMIES.GOBLIN, 'zzz/0001.png').setScale(5, 5);
            let healthBarSprite = this.add.sprite(this.goblinSpawnArr[i][0],this.goblinSpawnArr[i][1]+100,'healthBar').setScale(2,2);
            let healthSprite = this.add.sprite(this.goblinSpawnArr[i][0],this.goblinSpawnArr[i][1]+100,'greenHealth').setScale(2,2);
            
            goblinContainer.add([goblinSprite, zzzSprite]);
            this.enemyGroup.add(goblinSprite);
            let goblin = new Goblin({
                "sprite": goblinSprite,
                "healthBar": healthBarSprite,
                "greenBar":healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOBLIN,
                "anims": this.anims,
                "goblinContainer": goblinContainer,
                "scene": this
            });
            goblinSprite.class = goblin;
            this.monsterArray.push(goblin);
        }

        //Create the heroes
        this.shieldHeroSprite = this.physics.add.sprite(200, 200, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5);
        this.swordHeroSprite = this.physics.add.sprite(200, 200, HEROES.SWORD_HERO, 'down/0001.png').setScale(5, 5);
        this.mageHeroSprite = this.physics.add.sprite(200, 200, HEROES.MAGE_HERO, 'down/0001.png').setScale(5, 5);



        let allHeroSprites = [this.shieldHeroSprite, this.swordHeroSprite, this.mageHeroSprite];

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
            "sceneKey": SCENES.DAY,
            "shieldHero": this.shieldHero,
            "swordHero": this.swordHero,
            "mageHero": this.mageHero
        });

        //collisions
        //this.wallLayer.setCollision(5); //dungeon level     //Change this if you want a different tile set. This is the ID.

        this.wallLayer.setCollision(7); //Snow level
        this.wallLayer.setCollision(5); //Snow level


        this.physics.add.collider(this.player.sprite, this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);

        //add cave door
        this.items = this.map.objects[0].objects;
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].width *= 5;
            this.items[i].height *= 5;
            this.items[i].x *= 5;
            this.items[i].y *= 5;
        }
        this.map.createFromObjects('objectsLayer', 20, {
            key: 'treasure'
        });
        this.door = this.map.createFromObjects('objectsLayer', 2, {
            key: 'door'
        })[0];
        this.door = this.physics.add.existing(this.door);
        this.door.body.setSize(this.door.body.width, this.door.body.height);
        this.door.body.setOffset(0, 0);
        this.physics.add.overlap(this.door, this.shieldHeroSprite, function (o1) {
            o1.scene.music.pause();
            o1.scene.scene.stop(SCENES.DAY_OVERLAY);
            o1.scene.scene.start(SCENES.DAY_DUNGEON3, {
                "money": o1.scene.money,
                "level": 5
            });
            o1.scene.scene.stop();
        });
        this.physics.add.overlap(this.door, this.swordHeroSprite, function (o1) {
            o1.scene.music.pause();
            o1.scene.scene.stop(SCENES.DAY_OVERLAY);
            o1.scene.scene.start(SCENES.DAY_DUNGEON3, {
                "money": o1.scene.money,
                "level": 5
            });
            o1.scene.scene.stop();
        });
        this.physics.add.overlap(this.door, this.mageHeroSprite, function (o1) {
            o1.scene.music.pause();
            o1.scene.scene.stop(SCENES.DAY_OVERLAY);
            o1.scene.scene.start(SCENES.DAY_DUNGEON3, {
                "money": o1.scene.money,
                "level": 5
            });
            o1.scene.scene.stop();
        });
        //this.createFromTiles(0, null,this.doors,this.scene);


        //Damaging the player
        this.physics.add.overlap(this.shieldHeroSprite, this.enemyGroup.getChildren(), function (o1, o2) {
            o1.scene.player.damage(o2);
        });
        this.physics.add.overlap(this.swordHeroSprite, this.enemyGroup.getChildren(), function (o1, o2) {
            o1.scene.player.damage(o2)
        });
        this.physics.add.overlap(this.mageHeroSprite, this.enemyGroup.getChildren(), function (o1, o2) {
            o1.scene.player.damage(o2)
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


    hittingWithShield(shieldBeamSprite, enemySprite) {
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

    hittingWithSword(swordSprite, enemySprite) {
        if (!swordSprite.anims) {
            return;
        }
        enemySprite.setVelocity(swordSprite.body.velocity.x, swordSprite.body.velocity.y);
        enemySprite.class.damaged(swordSprite.class.basicAttack);

        //console.log(enemySprite.texture," got hit");
        enemySprite.class.lastDamaged = swordSprite.scene.time.now; //Need this for damage cooldown
        enemySprite.class.justGotHit = true;

        if (!swordSprite.colliding) {
            swordSprite.colliding = [];
        }
        swordSprite.colliding.push(enemySprite);
    }

    hittingWithMagic(magicBeamSprite, enemySprite) {
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
        var tile = this.map.getTileAt(x, y, true, 'walls');
        if (tile.index == -1) {
            tile = this.map.getTileAt(x, y, true, 'base');
        }
        return tile.index;
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
        this.physics.add.collider(this.player.sprite, this.wallLayer);

        console.log(this.player);
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
            this.scene.start(SCENES.MAIN_MENU, 'dead');
            this.scene.stop(SCENES.DAY);
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
                    "scenes": [SCENES.DAY, SCENES.DAY_OVERLAY]
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
            if (this.input.keyboard.keys[50].isDown) {
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                console.log(this.money);
                this.scene.start(SCENES.DUNGEON4, {
                    "money": this.money,
                    "level": 4
                });
                this.scene.stop();
            } else if (this.input.keyboard.keys[51].isDown) {
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.DAY_DUNGEON3, {
                    "money": this.money,
                    "level": 5
                });
                this.scene.stop();
            } else if (this.input.keyboard.keys[52].isDown) {
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.NIGHT, {
                    "money": this.money,
                    "level": 1
                });
                this.scene.stop();
            } else if (this.input.keyboard.keys[53].isDown) {
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.NIGHT, {
                    "money": this.money,
                    "level": 2
                });
                this.scene.stop();
            } else if (this.input.keyboard.keys[54].isDown) {
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.NIGHT, {
                    "money": this.money,
                    "level": 3
                });
                this.scene.stop();
            }


            //Player enters door

            /*
            console.log(this.player.sprite);
            console.log(this.door);

            console.log(this.door.sprite);
            this.swapMaps();
            this.physics.arcade.overlap(this.player.sprite, this.doors.sprite, this.swapMaps(), null, this);
*/


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
