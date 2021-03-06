import {
    SCENES
} from "../constants/SceneNames.js";
import {
    ENEMIES
} from "../constants/EnemyTypes.js";
import {
    DEFSTR
} from "../constants/DefenseStructureTypes.js";
import {
    NightDefenseStructure
} from "../gamePlay/NightDefenseStructure.js";

import {
    Slime
} from "../gamePlay/Monsters/Slime.js";
import {
    Goblin
} from "../gamePlay/Monsters/Goblin.js";
import {
    Golem
} from "../gamePlay/Monsters/Golem.js";

import {
    Cannon
} from "../gamePlay/Towers/Cannon.js";
import {
    Ice
} from "../gamePlay/Towers/Ice.js";
import {
    Turret
} from "../gamePlay/Towers/Turret.js";

import {
    Projectile
} from "../gamePlay/Towers/Projectile.js"


export class NightScene extends Phaser.Scene {
    constructor(data) {
        super({
            key: data['key']
        });
        this.sceneKey = data['key'];
    }
    
    init(data) {
        console.log(data);
        console.log("entered night scene");
        this.time;
        this.map;

        this.sceneType = "night";
        this.gameEndTime = -1;
        this.winGame = false;

        this.level = data.level;
        this.money = data.money;
        this.unlockedLevels = data.unlockedLevels;
        console.log(data.unlockedLevels);

        this.mapLevel;
        this.music = null;

        //to place buttons
        this.buttonYinc = 100;
        this.buttonX = 150;

        //the limits on where you can place a tower
        this.minX = 290;
        this.minY = 60;

        this.spawnX = 1700;

        this.rangeCircle = null; // for towers


        this.justPaused = false;
        
        this.villageHealth = 3;

        this.enemies = new Array();
        this.defStrs = new Array();
        this.projectiles = new Array();
        this.defStrsSpritesGroup = this.physics.add.group();
        this.enemySpritesGroup = this.physics.add.group(); //a bunch of enemy sprites

        this.towerToBePlaced = null;
        this.towerSpriteForBuying = null;

        this.enemiesSpawned = 0;
        this.enemiesToSpawn = [];
        //        [30, ENEMIES.GOBLIN, 500] spawn 30 goblins at 0.5sec intervals
        this.spawnIntervalVar = null;
        this.currentlySpawning = null;
        this.startWavePressed = false;
        //this.timeToStopInterval = null;

        this.alreadyClicked = false; // describes if a buytower button has been clicked
        this.descriptionText = null;
    }

    preload() {
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");

        this.load.image("buyicetower", "./assets/images/buttons/buyicetower.JPG");
        this.load.image("buycannon", "./assets/images/buttons/buycannonturret.JPG");
        this.load.image("buyturret", "./assets/images/buttons/buyturret.JPG");
        this.load.image("startwave", "./assets/images/buttons/startwave.JPG");

        this.load.image("rangeCircle", "./assets/images/defenseStructure/circle/newcircle.png");


        console.log("Welcome to level " + this.level);


        //Load the enemy images
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "./assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");

        this.load.image("greenHealth", "./assets/images/icons/bar1.png");
        this.load.image("healthBar", "./assets/images/icons/bar2.png");
        
        //Load defense structure images
        this.load.multiatlas(DEFSTR.CANNON, './assets/images/defenseStructure/cannon.json', "./assets/images/defenseStructure");
        
        this.load.multiatlas(DEFSTR.ICE, './assets/images/defenseStructure/ice.json', "./assets/images/defenseStructure");

        this.load.multiatlas(DEFSTR.TURRET, './assets/images/defenseStructure/turret.json', "./assets/images/defenseStructure");
        
        this.load.multiatlas(DEFSTR.CANNONBALL, './assets/images/defenseStructure/cannonBall.json', "./assets/images/defenseStructure");
        
        //Load song
        this.load.audio("audionightbackgroundsong", "./assets/audio/nightbackgroundsong.wav");
    }

    create() {
        console.log("start create in nightscene");
        this.music = this.sound.add("audionightbackgroundsong");
        this.music.setLoop(true);
        this.music.play()
        this.music.setVolume(1);
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain");
        this.groundLayer = this.map.createStaticLayer("background ground", [this.terrain], 0, 0).setScale(5, 3);
        this.pathLayer = this.map.createStaticLayer("background path", [this.terrain], 1, 0).setScale(5, 3);
        this.plantLayer = this.map.createStaticLayer("background plants", [this.terrain], 2, 0).setScale(5, 3);
        this.rockLayer = this.map.createStaticLayer("background rocks", [this.terrain], 2, 0).setScale(5, 3);
        this.wallLayer = this.map.createStaticLayer("background wall", [this.terrain], 4, 0).setScale(5, 3);


        //add money info
        this.add.image(1300, 100, "coin").setScale(1.2, 1.2).setDepth(3);
        this.moneyText = this.add.text(1335, 68, ':' + this.money, {
            fontSize: '70px',
            fill: '#fff',
            strokeThickness: 10,
            stroke: "#000000"
        });
        this.moneyText.setDepth(3);

        //add heart
        this.add.image(100, 100, "heart").setDepth(3).setScale(2, 2);
        this.heartText = this.add.text(150, 70, this.villageHealth, {
            fontSize: '65px',
            fill: '#fff',
            strokeThickness: 10,
            stroke: "#000000"
        });

        //create buttons
        let startwave = this.add.image(this.buttonX, this.buttonYinc * 2, "startwave").setDepth(3).setScale(1.5, 1.5);
        let buyicetower = this.add.image(this.buttonX, this.buttonYinc * 5, "buyicetower").setDepth(3).setScale(1, 1);
        let buycannon = this.add.image(this.buttonX, this.buttonYinc * 6, "buycannon").setDepth(3).setScale(1, 1);
        let buyturret = this.add.image(this.buttonX, this.buttonYinc * 7, "buyturret").setDepth(3).setScale(1, 1);
        // place circle off screen
        this.rangeCircle = this.add.image(-1000, -1000, "rangeCircle").setDepth(3).setScale(1, 1);
        this.rangeCircle.alpha = 0.15;

        this.descriptionText = this.add.text(this.game.renderer.width * .15, this.game.renderer.height * .02, "Defend the town! Enemies coming from the right!", {
            fontSize: '30px',
            fill: '#fff',
            strokeThickness: 10,
            stroke: "#000000"
        });

        //add button events
        startwave.setInteractive();
        startwave.on("pointerdown", () => {
            console.log("startwave pressed");
            if (this.startWavePressed)
                return;
            this.startWavePressed = true;
            startwave.alpha = 0.5;
        });
        startwave.on("pointerover", (pointer) => {
            this.descriptionText.alpha = 1;
            this.descriptionText.setText("Press to start the wave");
            this.descriptionText.x = this.game.renderer.width * 0.2;
            this.descriptionText.y = this.buttonYinc * 2 - 12;
        });
        startwave.on("pointerout", (pointer) => {
            this.descriptionText.alpha = 0;
        });

        buyicetower.setInteractive();
        buyicetower.on("pointerdown", (pointer) => {
            console.log("buyicetower pressed");
            buycannon.alpha = 1;
            buyturret.alpha = 1;
            if ( this.money < 500 )
                return;
            if (!this.alreadyClicked && !this.startDragging) {
                this.alreadyClicked = true;
                buyicetower.alpha = 0.5;
                this.towerSpriteForBuying = this.physics.add.sprite(pointer.x, pointer.y, DEFSTR.ICE, 'right/0001.png').setScale(5, 5);

                
                this.towerToBePlaced = new Ice({
                    "sprite": this.towerSpriteForBuying,
                    "physics": this.physics,
                    "anims": this.anims
                });
                this.towerToBePlaced.placeable = false; 
                this.towerSpriteForBuying.class = this.towerToBePlaced;

                this.defStrsSpritesGroup.add(this.towerSpriteForBuying);
                this.startDragging = true;
            }
            else {
                buyicetower.alpha = 1;
                this.alreadyClicked = false;
                this.towerSpriteForBuying.destroy();
                this.towerSpriteForBuying = null;
                this.startDragging = false;
                this.towerToBePlaced = null;
                this.rangeCircle.x = -1000;
                this.rangeCircle.y = -1000;
            }
        });
        buyicetower.on("pointerover", (pointer) => {
            this.descriptionText.alpha = 1;
            this.descriptionText.setText("Ice Tower: Permanently slows enemies\nAffects all enemies in range\nRange: 250\nDamage: 1\nRate of Fire: 3sec");
            this.descriptionText.x = this.game.renderer.width * 0.2;
            this.descriptionText.y = pointer.y - 50;
        });
        buyicetower.on("pointerout", (pointer) => {
            this.descriptionText.alpha = 0;
        });


        buycannon.setInteractive();
        buycannon.on("pointerdown", (pointer) => {
            console.log("buycannon pressed");
            buyicetower.alpha = 1;
            buyturret.alpha = 1;
            if ( this.money < 150 )
                return;
            if (!this.alreadyClicked && !this.startDragging) {
                this.alreadyClicked = true;
                buycannon.alpha = 0.5;
                this.towerSpriteForBuying = this.physics.add.sprite(pointer.x, pointer.y, DEFSTR.CANNON, 'right/0003.png').setScale(6, 6);
                
                this.towerToBePlaced = new Cannon({
                    "sprite": this.towerSpriteForBuying,
                    "physics": this.physics,
                    "anims": this.anims
                });
                
                let projSprite = this.physics.add.sprite(-1000, -1000, DEFSTR.CANNONBALL, '0001.png').setScale(8,8);
                let proj = new Projectile({
                    "damage": this.towerToBePlaced.damage,
                    "sprite": projSprite
                });
                this.towerToBePlaced.projectile = proj;
                
                this.towerToBePlaced.placeable = false; 
                this.towerSpriteForBuying.class = this.towerToBePlaced;

                this.defStrsSpritesGroup.add(this.towerSpriteForBuying);
                this.startDragging = true;
            }
            else {
                buycannon.alpha = 1;
                this.alreadyClicked = false;
                this.towerSpriteForBuying.destroy();
                this.towerSpriteForBuying = null;
                this.startDragging = false;
                this.towerToBePlaced = null;
                this.rangeCircle.x = -1000;
                this.rangeCircle.y = -1000;
            }
        });
        buycannon.on("pointerover", (pointer) => {
            this.descriptionText.alpha = 1;
            this.descriptionText.setText("Cannon Tower\nSingle target damage\nRange: 500\nDamage: 3\nRate of Fire: 3sec");
            this.descriptionText.x = this.game.renderer.width * 0.2;
            this.descriptionText.y = pointer.y - 50;
        });
        buycannon.on("pointerout", (pointer) => {
            this.descriptionText.alpha = 0;
        });


        buyturret.setInteractive();
        buyturret.on("pointerdown", (pointer) => {
            console.log("buyturret pressed");
            buyicetower.alpha = 1;
            buycannon.alpha = 1;
            if ( this.money < 150 )
                return;
            if (!this.alreadyClicked && !this.startDragging) {
                this.alreadyClicked = true;
                buyturret.alpha = 0.5;
                this.towerSpriteForBuying = this.physics.add.sprite(pointer.x, pointer.y, DEFSTR.TURRET, 'right/0001.png').setScale(4, 4);
                
                this.towerToBePlaced = new Turret({
                    "sprite": this.towerSpriteForBuying,
                    "physics": this.physics,
                    "anims": this.anims
                });
                
                let projSprite = this.physics.add.sprite(-1000, -1000, DEFSTR.CANNONBALL, '0001.png').setScale(4, 4);
                let proj = new Projectile({
                    "damage": this.towerToBePlaced.damage,
                    "sprite": projSprite
                });
                this.towerToBePlaced.projectile = proj;
                
                this.towerToBePlaced.placeable = false; 
                this.towerSpriteForBuying.class = this.towerToBePlaced;

                this.defStrsSpritesGroup.add(this.towerSpriteForBuying);
                this.startDragging = true;
            }
            else {
                buyturret.alpha = 1;
                this.alreadyClicked = false;
                this.towerSpriteForBuying.destroy();
                this.towerSpriteForBuying = null;
                this.startDragging = false;
                this.towerToBePlaced = null;
                this.rangeCircle.x = -1000;
                this.rangeCircle.y = -1000;
            }
        });
        buyturret.on("pointerover", (pointer) => {
            this.descriptionText.alpha = 1;
            this.descriptionText.setText("Turret\nSingle target damage\nRange: 200\nDamage: 1\nRate of Fire: 0.8sec");
            this.descriptionText.x = this.game.renderer.width * 0.2;
            this.descriptionText.y = pointer.y - 50;
        });
        buyturret.on("pointerout", (pointer) => {
            this.descriptionText.alpha = 0;
        });


        this.input.on("pointermove", function (pointer) {
            if (this.scene.startDragging) {
                let rectangle = new Phaser.Geom.Rectangle(this.scene.towerSpriteForBuying.body.position.x,this.scene.towerSpriteForBuying.body.position.y,this.scene.towerSpriteForBuying.body.width,this.scene.towerSpriteForBuying.body.height);
                let pathArray = this.scene.pathLayer.getTilesWithinShape(rectangle);
                let placeable = true;

                let sizeOfTower = this.scene.towerToBePlaced.sprite.body.halfWidth;
                if (this.scene.closeToTower(pointer.x, pointer.y, sizeOfTower) ) {
                    placeable = false;
                    console.log("close to tower");
                }
                else {
                    pathArray.forEach(function(pathTile){
                        if(pathTile.index != -1){
                            placeable = false;
                        }
                    });
                }
                this.scene.towerToBePlaced.placeable = placeable;
                this.scene.towerSpriteForBuying.x = pointer.x;
                this.scene.towerSpriteForBuying.y = pointer.y;
                let scaleFactor = this.scene.towerToBePlaced.range / 100;
                this.scene.rangeCircle.setScale(scaleFactor, scaleFactor);
                this.scene.rangeCircle.x = pointer.x;
                this.scene.rangeCircle.y = pointer.y;

                //if the pointer is not in bounds
                if (pointer.x <= this.scene.minX || pointer.y <= this.scene.minY || !this.scene.towerToBePlaced.placeable) {
                    this.scene.towerSpriteForBuying.alpha = 0.25;
                } else {
                    this.scene.towerSpriteForBuying.alpha = 1;
                }
                rectangle = null;
            }
            pointer = null;
        });


        this.groundLayer.setInteractive();
        this.groundLayer.on("pointerdown", (pointer) => {
            //if pointer is in bounds and a tower is chosen
            if (this.towerToBePlaced != null && pointer.x > this.minX && pointer.y > this.minY && this.towerToBePlaced.placeable) {
                this.towerToBePlaced.placed = true;
                this.defStrs.push(this.towerToBePlaced);
                if (this.towerToBePlaced.projectile)
                    this.projectiles.push(this.towerToBePlaced.projectile);
                this.startDragging = false;
                this.money -= this.towerToBePlaced.price;
                this.towerToBePlaced = null;
                this.towerSpriteForBuying = null;
                this.alreadyClicked = false;
                buycannon.alpha = 1;
                buyicetower.alpha = 1;
                buyturret.alpha = 1;
                this.rangeCircle.x = -1000;
                this.rangeCircle.y = -1000;
            }
            pointer = null;
        });
        this.input.keyboard.addKeys('Esc');
        this.input.keyboard.addKeys('One,Two,Three,Four,Five,Six,I');
        console.log("end of create in nightscene");
    }

    update(time, delta) {

        //enemy update, so that when the game ends, the enemy Pathfinding doesn't shut down
        if (this.enemies) {
            for (let i = 0; i < this.enemies.length; i++) {
                let enem = this.enemies[i];
                if (enem.sprite.x <= 0) {
                    if (!this.invulnerable) {
                        this.villageHealth--;
                    }
                    enem.health = 0;
                }
                if (enem.health <= 0) {
                    //enem.destroySprite();
                    enem.active = false;
                    this.enemies.splice(i, 1);
                    i--;
                } else
                    enem.nightUpdate(time, this.level);
            }
        }
        // if the game is over
        if (this.gameEndTime != -1) {
            //  if 5 seconds has passed
            if (((time - this.gameEndTime) / 1000) >= 5) {
                this.music.stop();
                if(this.winGame){
                    switch(this.level){
                        case 2: 
                            this.unlockedLevels = [1,1,1,2,0,0,0,0];
                            break;
                        case 4: 
                            this.unlockedLevels = [1,1,1,1,1,2,0,0];
                            break;
                        case 6: 
                            this.unlockedLevels = [1,1,1,1,1,1,1,2];
                            /*
                            let datam = {
                                "str":"moving to level select",
                                "unlockedLevels":this.unlockedLevels
                            }
                            this.scene.start(SCENES.ENDING,datam);
                            this.scene.stop();
                            */
                            break;
                    }
                    let data = {
                        "str":"moving to level select",
                        "unlockedLevels":this.unlockedLevels
                    }
                    this.scene.start(SCENES.LEVEL_SELECT,data);
                }
                else{
                    this.scene.start(SCENES.SPLASH);
                }
                this.scene.stop();

            }
            //  do nothing and wait until the 5 seconds has passed
            else
                return;
        }

        //you win after you've defeating everything and village still alive
        if (this.gameEndTime == -1 && this.enemies && 
                this.enemies.length == 0 && 
                this.enemiesSpawned >= this.numEnemySpawns && 
                this.villageHealth > 0)
        {
            this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .45, "You win!", {
                fontSize: '65px',
                fill: '#fff',
                strokeThickness: 10,
                stroke: "#000000"
            });
            this.gameEndTime = time;
            this.winGame = true;
        }

        //obviously lose here
        if (this.gameEndTime == -1 && this.villageHealth <= 0) {
            this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .45, "You lose!", {
                fontSize: '65px',
                fill: '#fff',
                strokeThickness: 10,
                stroke: "#000000"
            });
            this.gameEndTime = time;
            this.winGame = false;
        }

        //for pausing
        if (this.input.keyboard.keys[27].isDown && !this.justPaused) {
            this.justPaused = true
            this.music.pause();
            if (this.spawnIntervalVar)
                this.spawnIntervalVar.paused = true;
            this.scene.launch(SCENES.PAUSE, {
                "scenes": [this.sceneKey],
                "scene":this,
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.pause();
        } else if (this.input.keyboard.keys[27].isUp && this.justPaused) {
            this.justPaused = false;
            this.music.resume();
            if (this.spawnIntervalVar)
                this.spawnIntervalVar.paused = false;
        }
        
        //for stopping/restarting the spawn of enemies
        if (this.startWavePressed) {
            if (!this.spawnIntervalVar && this.enemiesToSpawn.length > 0) {
                let nextSetOfEnemies = this.enemiesToSpawn.shift();
                this.spawnMultipleEnemies(nextSetOfEnemies[0], nextSetOfEnemies[1], nextSetOfEnemies[2]);
            } else if (this.spawnIntervalVar.repeatCount == 0 && this.enemiesToSpawn.length > 0) {
                this.spawnIntervalVar.remove();
                let nextSetOfEnemies = this.enemiesToSpawn.shift();
                this.spawnMultipleEnemies(nextSetOfEnemies[0], nextSetOfEnemies[1], nextSetOfEnemies[2]);                
            }
        }

        if (this.defStrs.length > 0) {
            for (let i = 0; i < this.defStrs.length; i++)
                this.defStrs[i].update(time, this.enemies);
        }
        

        if (this.projectiles.length > 0) {
            for (let i = 0; i < this.projectiles.length; i++)
                this.projectiles[i].update(time, this.enemies);
        }

        this.moneyText.setText(":" + this.money);
        if (this.villageHealth <= 0) {
            this.heartText.setText(0);
        } else {
            this.heartText.setText(this.villageHealth);
        }

        if (this.input.keyboard.keys[73].isDown) {
            this.invulnerable = true;
        }
        /*
        if (this.input.keyboard.keys[49].isDown) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DAY, {
                "money": this.money,
                "level": 4
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[50].isDown) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON4, {
                "money": this.money,
                "level": 5
            });
            this.scene.stop();
        } else if (this.input.keyboard.keys[51].isDown) {
            this.music.stop();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DAY_DUNGEON3, {
                "money": this.money,
                "level": 1
            });
            this.scene.stop();
        }
        */
    }

    spawnEnemy(enemyType) {
        let enemySprite = null;
        let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
        let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);
        
        healthBarSprite.visible = false;
        healthSprite.visible = false;

        switch (enemyType) {
            case ENEMIES.SLIME:
                enemySprite = this.physics.add.sprite(this.spawnX, this.spawnY, ENEMIES.SLIME, 'left/0001.png').setScale(5, 5);
                this.enemySpritesGroup.add(enemySprite);
                let newSlime = new Slime({
                    "scene": this,
                    "sprite": enemySprite,
                    "physics": this.physics,
                    "anims": this.anims,
                    "healthBar": healthBarSprite,
                    "greenBar": healthSprite
                });
                this.enemies.push(newSlime);
                //Set collisions
                break;
            case ENEMIES.GOBLIN:
                enemySprite = this.physics.add.sprite(this.spawnX, this.spawnY, ENEMIES.GOBLIN, 'left/0001.png').setScale(5, 5);
                this.enemySpritesGroup.add(enemySprite);
                let newgoblin = new Goblin({
                    "scene": this,
                    "sprite": enemySprite,
                    "physics": this.physics,
                    "anims": this.anims,
                    "healthBar": healthBarSprite,
                    "greenBar": healthSprite
                });
                this.enemies.push(newgoblin);
                break;
            case ENEMIES.GOLEM:
                enemySprite = this.physics.add.sprite(this.spawnX, this.spawnY, ENEMIES.GOLEM, 'left/0001.png').setScale(5, 5);
                this.enemySpritesGroup.add(enemySprite);
                let newgolem = new Golem({
                    "scene": this,
                    "sprite": enemySprite,
                    "physics": this.physics,
                    "anims": this.anims,
                    "healthBar": healthBarSprite,
                    "greenBar": healthSprite
                });
                this.enemies.push(newgolem);
                this.physics.add.collider(this.enemySpritesGroup.getChildren(), this.wallLayer);
                break;
            default:
                console.log("invalid enemy type in spawnEnemy");
                break;

        }
        this.enemiesSpawned++;
        enemySprite.y = this.spawnY - enemySprite.height*2.5;
    }

    spawnMultipleEnemies(numberOfEnemies, enemyType, msInterval) {
        console.log(enemyType);
        this.currentlySpawning = enemyType;
        this.spawnIntervalVar = this.time.addEvent({
            delay: msInterval, // ms
            callback: this.spawnEnemy,
            args:[enemyType],
            callbackScope: this,
            repeat:numberOfEnemies
        });
        console.log(this.spawnIntervalVar);
        //this.timeToStopInterval = numberOfEnemies * msInterval + this.time.now;
    }

    closeToTower(x, y, sizeOfTower) {
        for (let i = 0; i < this.defStrs.length; i++) {
            let towerSprite = this.defStrs[i].sprite;
            let distance = Phaser.Math.Distance.Between(x, y, towerSprite.x, towerSprite.y);
            if ( distance < sizeOfTower + towerSprite.body.halfWidth)
                return true;
        }
        return false;
    }

    getMoney( money ) {
        this.money += money;
    }
}
