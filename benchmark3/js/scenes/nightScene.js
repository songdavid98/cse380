import {
    SCENES
} from "../constants/SceneNames.js";
import {
    ENEMIES
} from "../constants/EnemyTypes.js";
import {
    DEFSTR
} from "../constants/DefenseStructureTypes.js";
//import {
//    NightEnemy
//} from "../gamePlay/NightEnemy.js";
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


export class NightScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.NIGHT
        })
    }
    init(data) {
        console.log(data);
        console.log("entered night scene");
        this.time;
        this.map;

        this.gameEndTime = -1;

        this.level = data.level;
        this.mapLevel;

        //to place buttons
        this.buttonYinc = 100;
        this.buttonX = 150;

        //the limits on where you can place a tower
        this.minX = 470;
        this.minY = 60;

        //for tower test
        this.maxAttackDistance = 500;

        this.justPaused = false;

        this.money = data.money;
        this.villageHealth = 3;

        this.enemies = new Array();
        this.defStrs = new Array();

        this.defStrsSpritesGroup = this.physics.add.group();
        this.enemySpritesGroup = this.physics.add.group(); //a bunch of enemy sprites

        this.towerToBePlaced = null;
        this.towerSpriteForBuying = null;

        this.music = null;
    }

    preload() {
        this.load.image("terrain1", "./assets/tilemaps/uniqueTileSet.png");

        this.load.image("buyarrow", "./assets/images/buttons/buyarrowturret.JPG");
        this.load.image("buycannon", "./assets/images/buttons/buycannonturret.JPG");
        this.load.image("buywall", "./assets/images/buttons/buywall.JPG");
        this.load.image("startwave", "./assets/images/buttons/startwave.JPG");

        this.load.tilemapTiledJSON("night-map2", "./assets/tilemaps/nightMap2.json");
        this.mapLevel = "night-map2";
        console.log("Welcome to level " + this.level);


        //Load the enemy images
        this.load.multiatlas(ENEMIES.SLIME, './assets/images/enemies/slime.json', "./assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOLEM, './assets/images/enemies/golem.json', "assets/images/enemies");
        this.load.multiatlas(ENEMIES.GOBLIN, './assets/images/enemies/goblin.json', "assets/images/enemies");

        //Load defense structure images
        console.log(this.load.multiatlas(DEFSTR.CANNON, './assets/images/defenseStructure/cannon.json', "./assets/images/defenseStructure"));

        //Load song
        this.load.audio("audionightbackgroundsong", "./assets/audio/nightbackgroundsong.wav");
    }

    create() {
        this.music = this.sound.add("audionightbackgroundsong");
        this.music.setLoop(true);
        this.music.play()
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        let terrain = this.map.addTilesetImage("uniqueTileSet", "terrain1");
        this.groundLayer = this.map.createStaticLayer("background ground", [terrain], 0, 0).setScale(5, 3);
        this.pathLayer = this.map.createStaticLayer("background path", [terrain], 1, 0).setScale(5, 3);
        this.plantLayer = this.map.createStaticLayer("background plants", [terrain], 2, 0).setScale(5, 3);
        this.rockLayer = this.map.createStaticLayer("background rocks", [terrain], 3, 0).setScale(5, 3);
        this.wallLayer = this.map.createStaticLayer("background wall", [terrain], 4, 0).setScale(5, 3);

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
        let buywall = this.add.image(this.buttonX, this.buttonYinc * 3, "buywall").setDepth(3).setScale(1.5, 1.5);
        let buyarrow = this.add.image(this.buttonX, this.buttonYinc * 4, "buyarrow").setDepth(3).setScale(1.5, 1.5);
        let buycannon = this.add.image(this.buttonX, this.buttonYinc * 5, "buycannon").setDepth(3).setScale(1.5, 1.5);


        this.add.text(this.game.renderer.width * .15, this.game.renderer.height * .02, "Defend the the town! Enemies coming from the forest!", {
            fontSize: '30px',
            fill: '#fff',
            strokeThickness: 10,
            stroke: "#000000"
        });

        //add button events
        startwave.setInteractive();
        startwave.on("pointerdown", () => {
            //make a swtich case, to spawn different things for each level
            //Create the enemies
            let slimeSpawnArr = [];
            let slimeCount = 0;
            let goblinSpawnArr = [];
            let goblinCount = 0;
            let golemSpawnArr = [];
            let golemCount = 0;
            switch (this.level) {
                case 1:
                    slimeSpawnArr = [
                        [1600, 160],
                        [1600, 320],
                        [1600, 500],
                        [1600, 600],
                        [1600, 700]
                    ];
                    slimeCount = slimeSpawnArr.length;
                    for (let i = 0; i < slimeCount; i++) {
                        let enemySprite = this.physics.add.sprite(slimeSpawnArr[i][0], slimeSpawnArr[i][1], ENEMIES.SLIME, 'slime/down/0001.png').setScale(5, 5);
                        this.enemySpritesGroup.add(enemySprite);
                        let newSlime = new Slime({
                            "sprite": enemySprite,
                            "physics": this.physics,
                            "anims": this.anims
                        });
                        this.enemies.push(newSlime);
                    }
                    //Set collisions
                    this.physics.add.collider(this.enemySpritesGroup.getChildren(), this.wallLayer);
                    break;

                case 2:
                    goblinSpawnArr = [
                        [1600, 100],
                        [1600, 200],
                        [1600, 300],
                        [1600, 400],
                        [1600, 500],
                        [1600, 600],
                        [1600, 700],
                        [1600, 350],
                        [1600, 450],
                        [1600, 550]
                    ];
                    goblinCount = goblinSpawnArr.length;
                    for (let i = 0; i < goblinCount; i++) {
                        let enemySprite = this.physics.add.sprite(goblinSpawnArr[i][0], goblinSpawnArr[i][1], ENEMIES.GOBLIN, 'goblin/down/0001.png').setScale(5, 5);
                        this.enemySpritesGroup.add(enemySprite);
                        let newgoblin = new Goblin({
                            "sprite": enemySprite,
                            "physics": this.physics,
                            "anims": this.anims
                        });
                        this.enemies.push(newgoblin);
                    }
                    slimeSpawnArr = [
                        [1600, 100],
                        [1600, 200],
                        [1600, 300],
                        [1600, 400],
                        [1600, 500],
                        [1600, 600],
                        [1600, 700],
                        [1600, 150],
                        [1600, 250],
                        [1600, 350],
                        [1600, 450],
                        [1600, 550],
                        [1600, 650],
                        [1600, 750]
                    ];
                    slimeCount = slimeSpawnArr.length;
                    for (let i = 0; i < slimeCount; i++) {
                        let enemySprite = this.physics.add.sprite(slimeSpawnArr[i][0], slimeSpawnArr[i][1], ENEMIES.SLIME, 'slime/down/0001.png').setScale(5, 5);
                        this.enemySpritesGroup.add(enemySprite);
                        let newSlime = new Slime({
                            "sprite": enemySprite,
                            "physics": this.physics,
                            "anims": this.anims
                        });
                        this.enemies.push(newSlime);
                    }
                    //Set collisions
                    this.physics.add.collider(this.enemySpritesGroup.getChildren(), this.wallLayer);
                    break;
                case 3:
                    golemSpawnArr = [
                        [1600, 100],
                        [1600, 200],
                        [1600, 300],
                        [1600, 400],
                        [1600, 500],
                        [1600, 600],
                        [1600, 700],
                        [1600, 150],
                        [1600, 250],
                        [1600, 350],
                        [1600, 450],
                        [1600, 550],
                        [1600, 650],
                        [1600, 750]
                    ];
                    golemCount = golemSpawnArr.length;
                    for (let i = 0; i < golemCount; i++) {
                        let enemySprite = this.physics.add.sprite(golemSpawnArr[i][0], golemSpawnArr[i][1], ENEMIES.GOLEM, 'golem/down/0001.png').setScale(5, 5);
                        this.enemySpritesGroup.add(enemySprite);
                        let newgolem = new Golem({
                            "sprite": enemySprite,
                            "physics": this.physics,
                            "anims": this.anims
                        });
                        this.enemies.push(newgolem);
                    }
                    //Set collisions
                    this.physics.add.collider(this.enemySpritesGroup.getChildren(), this.wallLayer);
                    break;
                default:
                    break;
            }

        });

        buywall.setInteractive();
        buywall.on("pointerdown", () => {
            console.log("buywall pressed");
        });

        buyarrow.setInteractive();
        buyarrow.on("pointerdown", () => {
            console.log("buyArrow pressed");
        });

        buycannon.setInteractive();
        buycannon.on("pointerdown", () => {
            console.log("buycannon pressed");
            //console.log(this);

            if (!this.alreadyClicked && this.money >= 100 && !this.startDragging) {

                this.towerSpriteForBuying = this.physics.add.sprite(400, 500, DEFSTR.CANNON, 'right/0003.png').setScale(5, 5);
                this.towerToBePlaced = new Cannon({
                    "sprite": this.towerSpriteForBuying,
                    "physics": this.physics,
                    "anims": this.anims
                });
                this.towerSpriteForBuying.class = this.towerToBePlaced;

                this.defStrsSpritesGroup.add(this.towerSpriteForBuying);
                this.money -= 100;
                this.startDragging = true;

                //tower.placed = false;
                //placed will be false by default on creation
                this.defStrs.push(this.towerToBePlaced);

            }

        });

        this.input.on("pointermove", function (pointer) {
            if (this.scene.startDragging) {
                if (this.scene.towerToBePlaced.defStrType == DEFSTR.CANNON) {
                    this.scene.towerSpriteForBuying.x = pointer.x;
                    this.scene.towerSpriteForBuying.y = pointer.y;
                }
                //if the pointer is not in bounds
                if (pointer.x <= this.scene.minX || pointer.y <= this.scene.minY) {
                    this.scene.towerSpriteForBuying.alpha = 0.5;
                } else {
                    this.scene.towerSpriteForBuying.alpha = 1;
                }
            }
            pointer = null;
        });


        this.groundLayer.setInteractive();
        this.groundLayer.on("pointerdown", (pointer) => {
            //if pointer is in bounds and a tower is chosen
            if (this.towerToBePlaced != null && pointer.x > this.minX && pointer.y > this.minY) {
                this.towerToBePlaced.placed = true;
                this.startDragging = false;
                this.towerToBePlaced = null;
                this.towerSpriteForBuying = null;
            }
            pointer = null;
        });


        this.input.keyboard.addKeys('Esc');
        this.input.keyboard.addKeys('One,Two,Three,Four,Five,Six,I');
    }
    update(time, delta) {
        // if the game is over
        if (this.gameEndTime != -1) {
            //  if 5 seconds has passed
            if (((time - this.gameEndTime) / 1000) >= 5) {
                this.music.stop();
                this.scene.start(SCENES.SPLASH);
                this.scene.stop();
            }
            //  do nothing and wait until the 5 seconds has passed
            else
                return;
        }

        //you win after you've defeating everything and village still alive
        if (this.gameEndTime == -1 && this.enemies && this.enemies.length == 0 && this.villageHealth > 0) {
            this.add.text(this.game.renderer.width * .4, this.game.renderer.height * .45, "You win!", {
                fontSize: '65px',
                fill: '#fff',
                strokeThickness: 10,
                stroke: "#000000"
            });
            this.gameEndTime = time;
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
        }

        if (this.input.keyboard.keys[27].isDown && !this.justPaused) {
            this.justPaused = true
            this.music.pause();
            this.scene.launch(SCENES.PAUSE, {
                "scenes": [SCENES.NIGHT]
            });
            this.scene.pause();
        } else if (this.input.keyboard.keys[27].isUp) {
            this.justPaused = false;
            this.music.resume();
        }

        if (this.defStrs) {
            for (let i = 0; i < this.defStrs.length; i++)
                this.defStrs[i].update(time, this.enemies);
        }

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

    spawnEnemy(enemyType, x, y) {
        switch (enemyType) {
            case ENEMIES.SLIME:

                break;
            case ENEMIES.GOBLIN:
                break;
            case ENEMIES.GOLEM:
                break;
            default:
                console.log("incorrect enemy type in spawnEnemy function in nightScene.");
                break;
        }

        slimeCount = slimeSpawnArr.length;
        for (let i = 0; i < slimeCount; i++) {
            let enemySprite = this.physics.add.sprite(slimeSpawnArr[i][0], slimeSpawnArr[i][1], ENEMIES.SLIME, 'slime/down/0001.png').setScale(5, 5);
            this.enemySpritesGroup.add(enemySprite);
            let newSlime = new Slime({
                "sprite": enemySprite,
                "physics": this.physics,
                "anims": this.anims
            });
            this.enemies.push(newSlime);
        }
        //Set collisions
        this.physics.add.collider(this.enemySpritesGroup.getChildren(), this.wallLayer);
    }
}
