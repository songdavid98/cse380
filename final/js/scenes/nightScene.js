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

        this.gameEndTime = -1;
        this.winGame = false;

        this.level = data.level;
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

        //for tower test
        this.maxAttackDistance = 500;

        this.justPaused = false;

        this.money = data.money;
        this.villageHealth = 3;

        this.enemies = new Array();
        this.defStrs = new Array();
        this.projectiles = new Array();
        this.defStrsSpritesGroup = this.physics.add.group();
        this.enemySpritesGroup = this.physics.add.group(); //a bunch of enemy sprites

        this.towerToBePlaced = null;
        this.towerSpriteForBuying = null;

        this.enemiesSpawned = 0;
//        this.numEnemySpawns = 30;
//        this.spawnX = 1600;
//        this.spawnY = 170;
        this.enemiesToSpawn = [];
        //        [30, ENEMIES.GOBLIN, 500] spawn 30 goblins at 0.5sec intervals
        this.spawnIntervalVar = null;
        this.currentlySpawning = null;
        this.startWavePressed = false;
        this.timeToStopInterval = null;

        
        this.alreadyClicked = false;
    }

    preload() {
        this.load.image("terrain", "./assets/images/tiles/addableTiles.png");

        this.load.image("buyicetower", "./assets/images/buttons/buyicetower.JPG");
        this.load.image("buycannon", "./assets/images/buttons/buycannonturret.JPG");

        this.load.image("startwave", "./assets/images/buttons/startwave.JPG");

//        this.load.tilemapTiledJSON("night-map2", "./assets/tilemaps/nightMap2.json");
//        this.mapLevel = "night-map2";
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
        
        this.load.multiatlas(DEFSTR.CANNONBALL, './assets/images/defenseStructure/cannonBall.json', "./assets/images/defenseStructure");
        
        //Load song
        this.load.audio("audionightbackgroundsong", "./assets/audio/nightbackgroundsong.wav");
    }

    create() {
        console.log("start create in nightscene");
        this.music = this.sound.add("audionightbackgroundsong");
        this.music.setLoop(true);
        this.music.play()
        this.music.setVolume(0.25);
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain");
        this.groundLayer = this.map.createStaticLayer("background ground", [this.terrain], 0, 0).setScale(5, 3);
        this.pathLayer = this.map.createStaticLayer("background path", [this.terrain], 1, 0).setScale(5, 3);
        this.plantLayer = this.map.createStaticLayer("background plants", [this.terrain], 2, 0).setScale(5, 3);
        this.rockLayer = this.map.createStaticLayer("background rocks", [this.terrain], 2, 0).setScale(5, 3);
        this.wallLayer = this.map.createStaticLayer("background wall", [this.terrain], 4, 0).setScale(5, 3);


        //add money info
        this.add.image(1300, 100, "coin").setScale(1.2, 1.2).setDepth(1);
        this.moneyText = this.add.text(1335, 68, ':' + this.money, {
            fontSize: '70px',
            fill: '#fff',
            strokeThickness: 10,
            stroke: "#000000"
        });

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
        let buyicetower = this.add.image(this.buttonX, this.buttonYinc * 6, "buyicetower").setDepth(3).setScale(1, 1);
        let buycannon = this.add.image(this.buttonX, this.buttonYinc * 7, "buycannon").setDepth(3).setScale(1, 1);


        this.add.text(this.game.renderer.width * .15, this.game.renderer.height * .02, "Defend the town! Enemies coming from the right!", {
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


        buyicetower.setInteractive();
        buyicetower.on("pointerdown", () => {
            console.log("buyicetower pressed");
            if ( this.money < 400 )
                return;
            if (!this.alreadyClicked && !this.startDragging) {
                this.alreadyClicked = true;
                buyicetower.alpha = 0.5;
                this.towerSpriteForBuying = this.physics.add.sprite(400, 500, DEFSTR.ICE, 'right/0001.png').setScale(8, 8);

                
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
            }
        });

        buycannon.setInteractive();
        buycannon.on("pointerdown", () => {
            console.log("buycannon pressed");
            if ( this.money < 100 )
                return;
            if (!this.alreadyClicked && !this.startDragging) {
                this.alreadyClicked = true;
                buycannon.alpha = 0.5;
                this.towerSpriteForBuying = this.physics.add.sprite(400, 500, DEFSTR.CANNON, 'right/0003.png').setScale(5, 5);
                
                this.towerToBePlaced = new Cannon({
                    "sprite": this.towerSpriteForBuying,
                    "physics": this.physics,
                    "anims": this.anims
                });
                
                let projSprite = this.physics.add.sprite(-1000, -1000, DEFSTR.CANNONBALL, '0001.png').setScale(5,5);
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
            }
        });
        
        

        this.input.on("pointermove", function (pointer) {
            if (this.scene.startDragging) {
                let rectangle = new Phaser.Geom.Rectangle(this.scene.towerSpriteForBuying.body.position.x,this.scene.towerSpriteForBuying.body.position.y,this.scene.towerSpriteForBuying.body.width,this.scene.towerSpriteForBuying.body.height);
                let pathArray = this.scene.pathLayer.getTilesWithinShape(rectangle);
                let placeable = true;
                pathArray.forEach(function(pathTile){
                    if(pathTile.index != -1){
                        placeable = false;
                    }
                });
                this.scene.towerToBePlaced.placeable = placeable;
                this.scene.towerSpriteForBuying.x = pointer.x;
                this.scene.towerSpriteForBuying.y = pointer.y;
//                if (this.scene.towerToBePlaced.defStrType == DEFSTR.CANNON) {
//                    this.scene.towerSpriteForBuying.x = pointer.x;
//                    this.scene.towerSpriteForBuying.y = pointer.y;
//                }
                //if the pointer is not in bounds
                if (pointer.x <= this.scene.minX || pointer.y <= this.scene.minY || !this.scene.towerToBePlaced.placeable) {
                    this.scene.towerSpriteForBuying.alpha = 0.5;
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
                    enem.sprite.destroy();
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
        if (this.gameEndTime == -1 && this.enemies && this.enemies.length == 0 && this.enemiesSpawned >= this.numEnemySpawns && this.villageHealth > 0) {
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
            this.scene.launch(SCENES.PAUSE, {
                "scenes": [this.sceneKey],
                "unlockedLevels":this.unlockedLevels
            });
            this.scene.pause();
        } else if (this.input.keyboard.keys[27].isUp && this.justPaused) {
            this.justPaused = false;
            this.music.resume();
        }
        
        //for stopping/restarting the spawn of enemies
        if (this.timeToStopInterval && time >= this.timeToStopInterval) {
            
            this.spawnIntervalVar.remove();

            if (this.enemiesToSpawn.length == 0) {
                this.timeToStopInterval = null;
                this.spawnIntervalVar = null;
            } else {
                let nextSetOfEnemies = this.enemiesToSpawn.shift();
                console.log(nextSetOfEnemies);
                this.spawnMultipleEnemies(nextSetOfEnemies[0], nextSetOfEnemies[1], nextSetOfEnemies[2]);
            }
        } else if (!this.spawnIntervalVar && this.enemiesToSpawn.length > 0) {
            let nextSetOfEnemies = this.enemiesToSpawn.shift();
            this.spawnMultipleEnemies(nextSetOfEnemies[0], nextSetOfEnemies[1], nextSetOfEnemies[2]);
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
    }

    spawnEnemy(enemyType) {
        let enemySprite = null;
        let healthBarSprite = this.add.sprite(0, 0, 'healthBar').setScale(2, 2);
        let healthSprite = this.add.sprite(0, 0, 'greenHealth').setScale(2, 2);
        
        switch (enemyType) {
            case ENEMIES.SLIME:
                
                enemySprite = this.physics.add.sprite(this.spawnX, this.spawnY, ENEMIES.SLIME, 'left/0001.png').setScale(5, 5);
                this.enemySpritesGroup.add(enemySprite);
                let newSlime = new Slime({
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
        this.timeToStopInterval = numberOfEnemies * msInterval + this.time.now;
    }



}
