import {SCENES} from "../constants/SceneNames.js";
import {ENEMIES} from "../constants/EnemyTypes.js";
import {DEFSTR} from "../constants/DefenseStructureTypes.js";
import {NightEnemy} from "../gamePlay/NightEnemy.js";
import {NightDefenseStructure} from "../gamePlay/NightDefenseStructure.js";


export class NightScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.NIGHT
        })
    }
    init(data) {
        console.log(data);
        console.log("entered night");
        this.time;
        this.map;
        this.monsterArray;
        this.level = data.level;
        this.mapLevel;

        this.buttonYinc = 100;
        this.buttonX = 150;

        this.justPaused = false;

        this.money = data.money;

        this.slimeSpawnArr = [
            [1600,160],
            [1600,320]
        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.defStrs = new Array();
        this.chosenDefStr = null;
    }

    preload() {
        this.load.image("terrain1", "assets/images/tiles.png");

        this.load.image("buyarrow", "assets/images/buttons/buyarrowturret.JPG");
        this.load.image("buycannon", "assets/images/buttons/buycannonturret.JPG");
        this.load.image("buywall", "assets/images/buttons/buywall.JPG");
        this.load.image("startwave", "assets/images/buttons/startwave.JPG");

        this.load.tilemapTiledJSON("night-map1", "assets/tilemaps/nightmap.json");
        this.mapLevel = "night-map1";
        console.log("Welcome to level " + this.level);


        //Load the enemy images
        this.load.multiatlas(ENEMIES.SLIME, 'assets/images/enemies/slime.json', "assets/images/enemies");

        //Load defense structure images
        this.load.multiatlas(DEFSTR.CANNON, 'assets/images/defenseStructure/cannon.json', "assets/images/defenseStructure");



    }

    create() {
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        let terrain = this.map.addTilesetImage("tileset", "terrain1");
        this.groundLayer = this.map.createStaticLayer("background ground", [terrain], 0, 0).setScale(3, 3);
        this.plantLayer = this.map.createStaticLayer("background plants", [terrain], 1, 0).setScale(3, 3);
        this.wallLayer = this.map.createStaticLayer("background wall", [terrain], 2, 0).setScale(3, 3);

        //create buttons
        let startwave = this.add.image(this.buttonX, this.buttonYinc * 2, "startwave").setDepth(3).setScale(1.5, 1.5);

        let buywall = this.add.image(this.buttonX, this.buttonYinc * 3, "buywall").setDepth(3).setScale(1.5, 1.5);

        let buyarrow = this.add.image(this.buttonX, this.buttonYinc * 4, "buyarrow").setDepth(3).setScale(1.5, 1.5);

        let buycannon = this.add.image(this.buttonX, this.buttonYinc * 5, "buycannon").setDepth(3).setScale(1.5, 1.5);


        //Create defense structure group
        this.defStrGroup = this.physics.add.group();

        //add button events
        startwave.setInteractive();
        startwave.on("pointerdown", () => {
            console.log("startwave pressed");
        
            //Create the enemies
            this.enemyGroup = this.physics.add.group();
            for(var i = 0; i < this.slimeCount; i++){
                this.enemySprite = this.physics.add.sprite(this.slimeSpawnArr[i][0], this.slimeSpawnArr[i][1], ENEMIES.SLIME, 'slime/down/0001.png').setScale(5, 5);         
                this.enemyGroup.add(this.enemySprite);
                this.enemies = new NightEnemy({"sprite":this.enemyGroup.getChildren(),"physics":this.physics,"keyboard":this.input.keyboard,
                "health":5,"basicAttack":1, "basicAttackSpeed":80,"speed":128,"enemyType":ENEMIES.SLIME, "anims":this.anims});
                this.enemySprite.user = this.enemies;
            }

            //Set collisions
            this.physics.add.collider(this.enemyGroup.getChildren(),this.wallLayer);
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


            //if(!this.alreadyClicked){
                this.chosenDefStr = DEFSTR.CANNON;
                this.money -= 10;
                console.log(this.money);
                this.startDragging = true;

                this.cannon = this.physics.add.sprite(400, 500, DEFSTR.CANNON, '0001.png').setScale(5, 5);

                this.defStrGroup.add(this.cannon);
                this.defStr = new NightDefenseStructure({"sprite":this.cannon,"physics":this.physics,"keyboard":this.input.keyboard,
                "health":3,"basicAttack":1,"speed":128,"defstrType":DEFSTR.CANNON, "anims":this.anims, "shoots":true});
            
                this.defStrs.push(this.defStr);
            //}




        });

        this.input.on("pointermove", function (pointer) {

            if(this.startDragging){
                if(this.chosenDefStr == DEFSTR.CANNON){
                
                    this.cannon.body.x = pointer.x;
                    this.cannon.body.y = pointer.y;

                    console.log("Pressed button");

                   
                }
            }
        });


        this.groundLayer.setInteractive();
        this.groundLayer.on("pointerdown", (e) => {
            if(this.chosenDefStr != null){


                //HOW DO YOU GRAB MOUSE POINTER??????????????????????????
/*
                if(this.chosenDefStr == DEFSTR.CANNON){
                
                    this.cannon.body.x = pointer.x;
                    this.cannon.body.y = pointer.y;

                }
                */
                console.log("placed");
                this.startDragging = false;
                this.chosenDefStr = null;
            }
        });



        this.input.keyboard.addKeys('Esc');
    }
    update(time, delta){
        if(this.input.keyboard.keys[27].isDown && !this.justPaused){
            this.justPaused = true
            this.scene.launch(SCENES.PAUSE, {"scenes":[SCENES.NIGHT]});
            this.scene.pause();
        }
        else if(this.input.keyboard.keys[27].isUp){
            this.justPaused = false;
        }

        if(this.enemies){
            this.enemies.update(time);
        }

        //console.log(this.chosenDefStr);



    }

}
