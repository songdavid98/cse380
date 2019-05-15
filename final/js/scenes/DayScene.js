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
import {
    Minotaur
} from "../gamePlay/Monsters/Minotaur.js";
import {
    DangerGrass
} from "../gamePlay/Tiles/DangerGrass.js";
import {
    Lava
} from "../gamePlay/Tiles/Lava.js";


export class DayScene extends Phaser.Scene {
    constructor(data) {
        super({
            key: data['key']
        })
        this.sceneKey = data['key'];
    }
    init(data) {
        this.map;
        this.monsterArray = new Array();
        this.level = data.level;
        this.mapLevel;
        this.easystar;
        this.money = data['money'] || 0;
        this.lastDamaged = 0;
        //This variable is used for attack cooldowns as well as time in between damages from monsters
        this.deathSceneLength = 5;
        this.timeLimit = 300; //Day Countdown timer ~ 2min?
        this.textWords;
        this.unlockedLevels = data.unlockedLevels || [2,0,0,0,0,0,0,0];
        console.log(this.unlockedLevels);

        if(data.music){
            this.music = data.music;
        }

    }
    preload() {
        
        //adding cookie for unlocking levels
        if(document.cookie || document.cookie.length > 0){
            let cookie = document.cookie.replace("unlock=", "");
            if(cookie = parseInt(cookie)){
                console.log("cookie");
                if(cookie < this.level){
                    document.cookie = "unlock=" + this.level;
                }
            }else{
                document.cookie = "unlock=" + this.level;
            }
        }else{
            document.cookie = "unlock=" + this.level;
        }
        

        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");
        this.load.image("greenHealth", "./assets/images/icons/bar1.png");
        this.load.image("healthBar", "./assets/images/icons/bar2.png");
        this.load.image("beamPart", './assets/images/beamPart.png');
        this.load.image("superShieldBox", "./assets/images/superShieldBox.png");


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
        this.load.audio("audiohurtshield", "./assets/audio/gettinghurtshield.wav");
        this.load.audio("audiohurtmale", "./assets/audio/gettinghurtmale.wav");
        this.load.audio("audiofemaledeath", "./assets/audio/femaledeath.wav");
        this.load.audio("audiomaledeath", "./assets/audio/maledeath.wav");

        this.load.image("clear", "./assets/images/tiles/newerTileImages/zzzclearTile.png");

    }
    create(data) {
        if (!data) {
            data = {};
        }

        
        let initialX;
        let initialY;
        let player = this.createSpawnPoints('objectsLayer',121,'clear');
        if(player.getChildren().length == 0){
            player = this.createSpawnPoints('objectsLayer',59,'clear');
            console.log("Used 59");
        }
        if(player.getChildren().length == 0){
           initialX = data['initialY'] || 200;
           initialY = data['initialY'] || 200;
        }
        else{

            let halfOfTileWidth = player.getChildren()[0].width/2;
            let halfOfTileHeight = player.getChildren()[0].height/2;
            initialX= (player.getChildren()[0].x-halfOfTileWidth)*5;
            initialY = (player.getChildren()[0].y-halfOfTileHeight)*5;
            console.log("player spawned from spawn point");
        }





        //let initialX = data['initialY'] || 200;
        //let initialY = data['initialY'] || 200;
        this.initPos = [initialX, initialY]; //Need this for tutorial



        if(!this.music){
            this.music = this.sound.add("audiobackgroundsong");
        }
        
        this.music.setLoop(true);
        if(!this.music.isPlaying){
            this.music.play();
        }
        
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        console.log(this.map);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding


        //Create environmental hazards
        this.dangerGrass = new DangerGrass({
            "physics": this.physics,
            "anims": this.anims,
            "scene": this
        });

        this.lava = new Lava({
            "physics": this.physics,
            "anims": this.anims,
            "scene": this
        });



        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,One,Two,Three,Four,Five,Six');

        //Create the enemies
        this.enemyGroup = this.physics.add.group();

        //Create the heroes
        this.shieldHeroSprite = this.physics.add.sprite(initialX, initialY, HEROES.SHIELD_HERO, 'down/0001.png').setScale(5, 5).setDepth(1);
        this.swordHeroSprite = this.physics.add.sprite(initialX, initialY, HEROES.SWORD_HERO, 'down/0001.png').setScale(5, 5).setDepth(1);
        this.mageHeroSprite = this.physics.add.sprite(initialX, initialY, HEROES.MAGE_HERO, 'down/0001.png').setScale(5, 5).setDepth(1);

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
            "playerType": this.player.playerType,
            "timer": this.timeLimit
        });

        //Create the enemies
        for (var i = 0; i < this.slimeCount; i++) {
            let scaleX = 5;
            let scaleY = 5;
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
            let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);

            healthBarSprite.visible = false;
            healthSprite.visible = false;




            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({
                "sprite": slimeSprite,
                "healthBar": healthBarSprite,
                "greenBar": healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.SLIME,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY": scaleY
            });
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }

        for (var i = 0; i < this.golemCount; i++) {
            let scaleX = 8;
            let scaleY = 8;
            let golemSprite = this.physics.add.sprite(this.golemSpawnArr[i][0], this.golemSpawnArr[i][1], ENEMIES.GOLEM, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
            let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);

            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(golemSprite);
            let golem = new Golem({
                "sprite": golemSprite,
                "healthBar": healthBarSprite,
                "greenBar": healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOLEM,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY": scaleY
            });
            golemSprite.class = golem;
            this.monsterArray.push(golem);
        }

        for (var i = 0; i < this.goblinCount; i++) {
            let scaleX = 5;
            let scaleY = 5;
            let goblinSprite = this.physics.add.sprite(this.goblinSpawnArr[i][0], this.goblinSpawnArr[i][1], ENEMIES.GOBLIN, 'sleep/0001.png').setScale(scaleX, scaleY);
            let zzzSprite = this.add.sprite(this.goblinSpawnArr[i][0] + 100, this.goblinSpawnArr[i][1] - 100, ENEMIES.GOBLIN, 'zzz/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
            let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);

            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(goblinSprite);
            let goblin = new Goblin({
                "sprite": goblinSprite,
                "healthBar": healthBarSprite,
                "greenBar": healthSprite,
                "zzzSprite": zzzSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOBLIN,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY": scaleY
            });
            goblinSprite.class = goblin;
            this.monsterArray.push(goblin);
        }

        for (var i = 0; i < this.minotaurLength; i++) {
            let scaleX = 8;
            let scaleY = 8;
            let minotaurSprite = this.physics.add.sprite(this.minotaurSpawnArr[i][0], this.minotaurSpawnArr[i][1], ENEMIES.GOBLIN, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
            let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);

            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(minotaurSprite);
            let minotaur = new Minotaur({
                "sprite": minotaurSprite,
                "healthBar": healthBarSprite,
                "greenBar": healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOBLIN,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY": scaleY
            });
            minotaurSprite.class = minotaur;
            this.monsterArray.push(minotaur);
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
            console.log(this.player.specialAttacked);
            if (!this.player.dead && pointer.leftButtonDown() && Math.floor(this.time.now / 1000) - this.player.previousTime >= this.player.attackCooldown) {
                this.player.previousTime = Math.floor(this.time.now / 1000);
                //Call the player's attack 
                this.player.attackBasic(pointer);
            } else if (pointer.rightButtonDown() && Math.floor(this.time.now / 1000) - this.player.previousTime >= this.player.attackCooldown && !this.player.specialAttacked && !this.player.chargeNow) {
                if(this.player == this.swordHero && this.swordHero.kills < this.swordHero.reqKills){
                    
                }else{
                    this.player.specialAttacked = true;
                    this.player.previousTime = Math.floor(this.time.now / 1000);
                    this.player.attackSpecial(pointer, this.player.angle);
                }
            }
        }, this);

        //Creating projectileGroup
        this.projectileGroup = this.physics.add.group();


        this.input.mouse.disableContextMenu();
        this.map.currentLayer = this.baseLayer;
        //this.pathFinding();
    }


    spawnMoreSlimes() {
        //Create the enemies
        this.slimeCount = this.slimeSpawnArr.length;
        for (var i = 0; i < this.slimeCount; i++) {

            let scaleX = 5;
            let scaleY = 5;
            let slimeSprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
            let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);


            console.log(slimeSprite);
            console.log(this.anims);

            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(slimeSprite);
            let slime = new Slime({
                "sprite": slimeSprite,
                "healthBar": healthBarSprite,
                "greenBar": healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.SLIME,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY": scaleY
            });
            slimeSprite.class = slime;
            this.monsterArray.push(slime);
        }
    }

    spawnMoreGoblins() {
        //Create the enemies
        this.goblinCount = this.goblinSpawnArr.length;
        console.log(this.goblinSpawnArr);
        for (var i = 0; i < this.goblinCount; i++) {
            let scaleX = 5;
            let scaleY = 5;
            let goblinSprite = this.physics.add.sprite(this.goblinSpawnArr[i][0], this.goblinSpawnArr[i][1], ENEMIES.GOBLIN, 'sleep/0001.png').setScale(scaleX, scaleY);
            console.log(goblinSprite);
            
            let zzzSprite = this.add.sprite(this.goblinSpawnArr[i][0] + 100, this.goblinSpawnArr[i][1] - 100, ENEMIES.GOBLIN, 'zzz/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
            let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);

            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(goblinSprite);
            let goblin = new Goblin({
                "sprite": goblinSprite,
                "healthBar": healthBarSprite,
                "greenBar": healthSprite,
                "zzzSprite": zzzSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOBLIN,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY": scaleY
            });
            goblinSprite.class = goblin;
            this.monsterArray.push(goblin);
        }
    }

    spawnMoreGolems() {
        //Create the enemies
        this.golemCount = this.golemSpawnArr.length;
        for (var i = 0; i < this.golemCount; i++) {

            let scaleX = 8;
            let scaleY = 8;
            let golemSprite = this.physics.add.sprite(this.golemSpawnArr[i][0], this.golemSpawnArr[i][1], ENEMIES.GOLEM, 'down/0001.png').setScale(scaleX, scaleY);
            let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
            let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);

            healthBarSprite.visible = false;
            healthSprite.visible = false;

            this.enemyGroup.add(golemSprite);
            let golem = new Golem({
                "sprite": golemSprite,
                "healthBar": healthBarSprite,
                "greenBar": healthSprite,
                "allEnemySprites": this.enemyGroup.getChildren(),
                "physics": this.physics,
                "enemyType": ENEMIES.GOLEM,
                "anims": this.anims,
                "scene": this,
                "scaleX": scaleX,
                "scaleY": scaleY
            });
            golemSprite.class = golem;
            this.monsterArray.push(golem);
        }
    }

    hittingWithShieldBeam(shieldBeamSprite, enemySprite) {
        if (!shieldBeamSprite.anims) {
            return;
        }
        if(enemySprite.class.enemyType == ENEMIES.GOBLIN && enemySprite.class.state == "sleeping"){
            enemySprite.class.justWokeUp = true;
        }
        if(shieldBeamSprite.body.velocity.x > 0){
            enemySprite.setVelocity(shieldBeamSprite.body.velocity.x, shieldBeamSprite.body.velocity.y);
        }else{
            let velXSign;
            let velYSign;
            if(enemySprite.x > shieldBeamSprite.x){
                velXSign = 1
            }else if(enemySprite.X < shieldBeamSprite.x){
                velXSign = -1;
            }else{
                velXSign = 0;
            }
            if(enemySprite.y > shieldBeamSprite.y){
                velYSign = 1
            }else if(enemySprite.y < shieldBeamSprite.y){
                velYSign = -1;
            }else{
                velYSign = 0;
            }
            enemySprite.setVelocity(1000*velXSign,1000*velYSign);
        }
        enemySprite.class.damaged(shieldBeamSprite.class.basicAttack);

        //console.log(enemySprite.texture," got hit");
        enemySprite.class.lastDamaged = shieldBeamSprite.scene.time.now; //Need this for damage cooldown
        enemySprite.class.justGotHit = true;

        if (!shieldBeamSprite.colliding) {
            shieldBeamSprite.colliding = [];
        }
        shieldBeamSprite.colliding.push(enemySprite);
    }
    hittingWithSwordBeam(swordBeamSprite, enemySprite) {
        if (!swordBeamSprite.anims) {
            return;
        }

        if(enemySprite.class.enemyType == ENEMIES.GOBLIN && enemySprite.class.state == "sleeping"){
            enemySprite.class.state = "attacking";
        }
        enemySprite.setVelocity(swordBeamSprite.body.velocity.x, swordBeamSprite.body.velocity.y);
        enemySprite.class.damaged(swordBeamSprite.class.basicAttack, this.swordHero);

        enemySprite.class.lastDamaged = swordBeamSprite.scene.time.now; //Need this for damage cooldown
        enemySprite.class.justGotHit = true;

        if (!swordBeamSprite.colliding) {
            swordBeamSprite.colliding = [];
        }
        swordBeamSprite.colliding.push(enemySprite);
    }
    hittingWithTornado(tornado, enemySprite) {
        if (!tornado.anims) {
            return;
        }
        if(enemySprite.class.enemyType == ENEMIES.GOBLIN && enemySprite.class.state == "sleeping"){
            enemySprite.class.state = "attacking";
        }
        enemySprite.setVelocity(tornado.body.velocity.x, tornado.body.velocity.y);

        if(!enemySprite.class.justGotHit){
            enemySprite.class.lastDamaged = tornado.scene.time.now; //Need this for damage cooldown
            enemySprite.class.justGotHit = true;
        }
        
        if(Math.floor(tornado.scene.time.now/1000) - Math.floor(enemySprite.class.lastDamaged/1000) < enemySprite.class.specialDamageCooldown){
            enemySprite.class.damaged(tornado.class.specialAttack, this.swordHero);
        }
        else{
            enemySprite.class.justGotHit = false;

        }


        if (!tornado.colliding) {
            tornado.colliding = [];
        }
        tornado.colliding.push(enemySprite);
    }
    hittingWithMagicBeam(magicBeamSprite, enemySprite) {
        if (!magicBeamSprite.anims) {
            return;
        }
        if(enemySprite.class.enemyType == ENEMIES.GOBLIN && enemySprite.class.state == "sleeping"){
            enemySprite.class.state = "attacking";
        }
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
    hittingWithSuperMagicBeam(magicBeamSprite, enemySprite) {
        if (!magicBeamSprite.anims) {
            return;
        }
        if(enemySprite.class.enemyType == ENEMIES.GOBLIN && enemySprite.class.state == "sleeping"){
            enemySprite.class.state = "attacking";
        }
        enemySprite.class.damaged(magicBeamSprite.class.specialAttack);

        //Slows the enemy down by half the speed
        enemySprite.class.slowDown();
        enemySprite.class.lastDamaged = magicBeamSprite.scene.time.now; //Need this for damage cooldown
        enemySprite.class.justGotHit = true;

        if (!magicBeamSprite.colliding) {
            magicBeamSprite.colliding = [];
        }
        magicBeamSprite.colliding.push(enemySprite);
    }
    hittingProjectiles(shieldBeamSprite, enemyProjectile){
        if (!shieldBeamSprite.anims) {
            return;
        }
        enemyProjectile.reflected = true;
        console.log("SLIME BALL TOUCHED", enemyProjectile.reflected);

        enemyProjectile.setVelocity(shieldBeamSprite.body.velocity.x, shieldBeamSprite.body.velocity.y);

        if (!shieldBeamSprite.colliding) {
            shieldBeamSprite.colliding = [];
        }
        shieldBeamSprite.colliding.push(enemyProjectile);
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
        console.log(grid);
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

    healAllHeroes() {
        this.shieldHero.health = 3;
        this.swordHero.health = 3;
        this.mageHero.health = 3;
        this.shieldHero.dead = false;
        this.swordHero.dead = false;
        this.mageHero.dead = false;
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

            let data = {
                "str":"dead",
                "unlockedLevels":this.unlockedLevels
            }

            this.scene.start(SCENES.MAIN_MENU, data);
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
                    "scenes": [this.sceneKey, SCENES.DAY_OVERLAY],
                    "scene":this,
                    "level":this.level,
                    "unlockedLevels":this.unlockedLevels
                });
                this.scene.pause(SCENES.DAY_OVERLAY)
                this.scene.pause();
            } else if (this.input.keyboard.keys[27].isUp && this.justPaused) {
                console.log(this.justPaused);
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
    createObjects(layer, name, key, spriteWidth, spriteHeight) {
        let objectGroup = this.physics.add.group(); //create new empty physics group
        let objects = this.map.createFromObjects(layer, name, {
            key: key
        }); //create sprites not affected by physics
        console.log(objects);


        
        objectGroup.addMultiple(objects); //add array of objects to physics group, thus adding them to physics
        let children = objectGroup.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].body.setSize(spriteWidth, spriteHeight);
            children[i].body.setOffset(0, 0);
            children[i].setDepth(0);
        }
        console.log(objectGroup);

        objects = null //for garbage collection
        return objectGroup;
    }
    createSpawnPoints(layer, name, key) {
        let objectGroup = this.add.group(); //create new empty physics group
        let objects = this.map.createFromObjects(layer, name, {
            key: key
        }); //create sprites not affected by physics

        objectGroup.addMultiple(objects); //add array of objects to physics group, thus adding them to physics
        
        objects = null //for garbage collection
        return objectGroup;
    }
    scaleObjects(factor) {
        let items = this.map.objects[0].objects;
        for (var i = 0; i < items.length; i++) {
            items[i].width *= 5;
            items[i].height *= 5;
            items[i].x *= 5;
            items[i].y *= 5;
        }
    }
}
