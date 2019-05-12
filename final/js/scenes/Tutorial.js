//Day time level 
import{
    SCENES
} from "../constants/SceneNames.js";

import { DayScene } from "./DayScene.js";
import { HEROES } from "../constants/PlayerTypes.js";
import { ENVIRONMENT } from "../constants/EnvironmentTypes.js";

export class Tutorial extends DayScene {
    constructor() {
        super({
            key: SCENES.TUTORIAL
        })
    }
    init(data) {
        //This variable is used for attack cooldowns as well as time in between damages from monsters
        super.init(data);
        this.deathSceneLength = 5;
        this.slimeSpawnArr = [
            
           

        ];
        this.slimeCount = this.slimeSpawnArr.length;

        this.golemSpawnArr = [

        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [


        ];
        this.goblinCount = this.goblinSpawnArr.length;


        //Lesson stuff
        this.stepLength = 2;   //3 seconds
        this.doneOnce = false;
        this.resetStep = false;
        this.killedSlime = false;
        this.slimeFound = false;


        this.clearedAngle = [false, false, false, false]; //0, 90, 180, 270


    }
    preload() {
     
        super.preload();
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");
        this.load.image("barrel", "./assets/images/tiles/newerTileImages/barrel.png");

        this.load.tilemapTiledJSON("tutorial", "assets/tilemaps/tutorial.json");
        this.mapLevel = "tutorial";

    }
    create() {
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        this.terrain = this.map.addTilesetImage("addableTiles", "terrain"); //Variable used in pathfinding

        //this.wallLayer = this.map.createStaticLayer("walls", [this.terrain], 0, 0).setScale(5, 5);
        this.baseLayer = this.map.createStaticLayer("groundLayer", [this.terrain], 0, 0).setScale(5, 5);
        this.grassLayer = this.map.createStaticLayer("grassLayer", [this.terrain], 0, 0).setScale(5, 5);
        this.dangerGrassLayer = this.map.createStaticLayer("dangerGrassLayer", [this.terrain], 0, 0).setScale(5, 5);
        this.wallLayer = this.map.createStaticLayer("rockLayer", [this.terrain], 0, 0).setScale(5, 5);

        super.create(); //at the moment, super.create must come after loading the map, as the map must be loaded before sprites are added

        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,Two,Three,Four,Five,Six');

        //collisions
        this.wallLayer.setCollision(6);     //For tutorial

        this.physics.add.collider(this.playerGroup.getChildren(), this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);


        //Objects?
        this.scaleObjects(.5);
        let doors = this.createObjects('objectsLayer','door','door', 16, 16);
        let barrels = this.createObjects('objectsLayer','barrel','barrel', 16, 16);
        
        console.log(doors);

        this.door = this.physics.add.existing(doors.getChildren()[0]);
        this.barrel = this.physics.add.existing(barrels.getChildren()[0]);

        this.barrel.body.immovable = true;
        this.door.lessonStep = 1; 
        this.door.clearedTasks = false;       

        this.physics.add.collider(this.playerGroup, this.barrel);
        this.physics.add.collider(this.barrel, this.wallLayer);

        //door overlap
        this.physics.add.overlap(this.door, this.playerGroup.getChildren(), function (o1,o2) {
            if(o1.lessonStep == 8){
                o1.clearedTasks = true;
                console.log("Duneon enter");
            }
            else{
                let temp = this.textWords;
                console.log("Comes n ", temp);

                this.textWords = "You can't move onto the next level until you cleared all the tasks.";
            }
        });




        this.physics.add.overlap(this.playerGroup.getChildren(), this.dangerGrassLayer, function (playerSprite,hazard) {
            if(hazard.index != -1){
                playerSprite.class.hazardDamage(hazard.layer.properties[0].value);
                console.log("Getting hit by some weed");
            }
        });
        this.physics.add.overlap(this.enemyGroup.getChildren(), this.dangerGrassLayer, function (enemySprite,hazard) {
            if(hazard.index != -1){
 
                enemySprite.class.damaged(hazard.layer.properties[0].value);
                console.log("Getting hit by some weed");
            }
        });
        this.map.currentLayer = this.baseLayer;

    }

    //Walk and attack slimes, get coins
    tasks(time){
        //Walk with ASDW
        if(this.door.lessonStep == 1){
            if(this.player.sprite.x <= this.initPos[0]+250 && this.player.sprite.x >= this.initPos[0]-250 && this.player.sprite.y <= this.initPos[1]+250 && this.player.sprite.y >= this.initPos[1]-250){
                if(!this.doneOnce){
                    this.textWords = "Your first task is to move. Press the A,S,W,D keys on the keyboard to move\nthe player.";
                    this.doneOnce = true;
                    this.shieldHero.semiInvincible = true;
                    this.swordHero.semiInvincible = true;
                    this.mageHero.semiInvincible = true;
                }
            }
            else if(this.doneOnce && !this.resetStep){
                console.log("CLEERED");
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
            }
            else{
                if(this.resetStep){

                    if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                        if(!this.doneOnce){
                            this.textWords = "Great, you moved!";
                            this.doneOnce = true;
                        }
                    }
                    else{
                        this.door.lessonStep = 2;
                        this.doneOnce = false;  //Reset
                        this.resetStep = false;
                        this.tempMoney = this.money;    //debugging purpose
                        this.timeOfStepFinished = time; //debugging purpose

                    }
                }
            }
        }

        //Direction with mouse
        else if(this.door.lessonStep == 2){
            if(180*this.player.properAngle()/Math.PI+5 >= 0 && 180*this.player.properAngle()/Math.PI-5 <= 0){
                this.clearedAngle[0] = true;
            }
            else if(180*this.player.properAngle()/Math.PI+5 >= 90 && 180*this.player.properAngle()/Math.PI-5 <= 90){
                this.clearedAngle[1] = true;
            } 
            else if(180*this.player.properAngle()/Math.PI+5 >= 180 && 180*this.player.properAngle()/Math.PI-5 <= 180){
                this.clearedAngle[2] = true;
            } 
            else if(180*this.player.properAngle()/Math.PI+5 >= 270 && 180*this.player.properAngle()/Math.PI-5 <= 270){
                this.clearedAngle[3] = true;
            } 

            if(!this.clearedAngle[0] || !this.clearedAngle[1] || !this.clearedAngle[2] || !this.clearedAngle[3]){
                if(!this.doneOnce){
                    this.textWords = "Try moving your mouse around your character.\nYou will be able to make your character look in all directions.";
                    this.doneOnce = true;
                }
            }
            else if(this.doneOnce && !this.resetStep){
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
                console.log("CLEARED");
            }
            else{
                if(this.resetStep){
                    if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                        if(!this.doneOnce){
                            this.textWords = "Great, you rotated!";
                            this.doneOnce = true;
                        }
                    }
                    else{
                        this.door.lessonStep = 3;
                        this.doneOnce = false;  //Reset
                        this.resetStep = false;
                    }
                }
            }
        }

        //Click to attack
        else if(this.door.lessonStep == 3){
            if(this.money == 0){
                if(!this.doneOnce && !this.slimeFound){
                    this.textWords = "A single slime will spawn somewhere on the map. Try locating\nit and then attacking by left-clicking the mouse.\nFor now, you will have infinite lives.";
                    this.spawn();
                    this.doneOnce = true;
                }
            }
            else if(this.doneOnce && !this.resetStep){
                this.currentPlayer = this.player.playerType;
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
            }
            else{
                if(this.resetStep){
                    if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                        if(!this.doneOnce){
                            this.textWords = "Great, you defeated a slime!";
                            this.doneOnce = true;
                        }
                    }
                    else{
                        switch(this.currentPlayer){
                            case HEROES.SWORD_HERO:
                            this.door.lessonStep = 4;    //Go to mage
                                this.killedWithShield = false;
                                this.killedWithSword = true;
                                this.killedWithMage = false;
                                break;
                            case HEROES.MAGE_HERO:
                            this.door.lessonStep = 5;    //Go to shield
                                this.killedWithShield = false;
                                this.killedWithSword = false;
                                this.killedWithMage = true;
                                break;
                            case HEROES.SHIELD_HERO:
                            this.door.lessonStep = 6;    //Go to sword
                                this.killedWithShield = true;
                                this.killedWithSword = false;
                                this.killedWithMage = false;
                                break;
                        }
                        this.doneOnce = false;  //Reset
                        this.resetStep = false;
                        this.saidOnce = false;
                        this.onlyOnce = true;
                        this.youCanMoveOn = false;
                    }
                }
            }
        }

        //Swapping heroes to mage
        else if(this.door.lessonStep == 4){
            if(this.player.playerType != HEROES.MAGE_HERO && !this.killedWithMage){
                if(!this.doneOnce){
                    this.textWords = "Now, try switching heroes. Press the space bar to turn in to the MAGE hero.\nFind and defeat a slime with the mage hero.";
                    this.doneOnce = true;
                    this.spawn();
                }
                else if(!this.slimeFound){
                    this.spawn();
                    console.log(this.slimeCount);

                }
            }
            //Go here if you kill the slime with the mage
            else if((this.player.playerType == HEROES.MAGE_HERO && this.doneOnce && !this.slimeFound) || (!this.onlyOnce)){
                if(this.onlyOnce){
                    this.timeOfStepFinished = time;
                    this.onlyOnce = false;
                    this.killedWithMage = true;
                    console.log("cleared");
                }

                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.saidOnce){
                        this.textWords = "Great, you defeated a slime!";
                        this.saidOnce = true;
                    }
                }
                else if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength + 4){
                    if(this.saidOnce){
                        this.textWords = "The mage can do long-ranged attack. If the enemies are hit, they will slow down.";
                        this.saidOnce = false;
                        this.youCanMoveOn = true;
                    }
                }
                else if(this.youCanMoveOn){
                    console.log("FINISHED MAGE");
                    if(this.killedWithShield){ 
                        if(this.killedWithSword){ this.door.lessonStep = 7; }    //Go to next step
                        else{ this.door.lessonStep = 6; }                        //Go to sword
                    }
                    else{ this.door.lessonStep = 5; }                            //Go to shield
                    
                    this.doneOnce = false;  //Reset
                    this.saidOnce = false;  //Reset
                    this.onlyOnce = true;   //Reset
                    this.youCanMoveOn = false;
                    this.timeOfStepFinished = time;
                    this.tempMoney = this.money;
                }
            }   
                         
        }

        //Swap to shield 
        else if(this.door.lessonStep == 5){
            if(this.player.playerType != HEROES.SHIELD_HERO && !this.killedWithShield){
                if(!this.doneOnce){
                    this.textWords = "Now, try switching heroes. Press the space bar to turn in to the SHIELD hero.\nThe shield hero doesn't deal damage. But you can use her attack to push monsters into hazardous environment!\nFind and defeat a slime with the shield hero.";
                    this.doneOnce = true;
                    this.spawn();
                }
                else if(!this.slimeFound){
                    this.spawn();
                    console.log(this.slimeCount);

                }
            }
            else if((this.player.playerType == HEROES.SHIELD_HERO && this.doneOnce && !this.slimeFound) || (!this.onlyOnce)){
                if(this.onlyOnce){
                    this.timeOfStepFinished = time;
                    this.onlyOnce = false;
                    this.killedWithShield = true;
                    console.log("cleared");
                }

                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.saidOnce){
                        this.textWords = "Great, you defeated a slime!";
                        this.saidOnce = true;
                    }
                }
                else if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength + 4){
                    if(this.saidOnce){
                        this.textWords = "You can push monsters into one corner and use the mage to deal\ndamage to all of them. You can also use her attack to push objects!";
                        this.saidOnce = false;
                        this.youCanMoveOn = true;
                    }
                }
                else if(this.youCanMoveOn){
                    console.log("FINISHED SHIELD");
                    if(this.killedWithMage){ 
                        if(this.killedWithSword){ this.door.lessonStep = 7; }    //Go to next step
                        else{ this.door.lessonStep = 6; }                        //Go to sword
                    }
                    else{ this.door.lessonStep = 4; }                            //Go to mage
                    
                    this.doneOnce = false;  //Reset
                    this.saidOnce = false;
                    this.onlyOnce = true;
                    this.youCanMoveOn = false;
                    this.timeOfStepFinished = time;
                    this.tempMoney = this.money;
                }
            }            
        }

        //Swapping heroes to sword
        else if(this.door.lessonStep == 6){
            if(this.player.playerType != HEROES.SWORD_HERO && !this.killedWithSword){
                if(!this.doneOnce){
                    this.textWords = "Now, try switching heroes. Press the space bar to turn in to the SWORD hero.\nFind and defeat a slime with the sword hero.";
                    this.doneOnce = true;
                    this.spawn();
                }
                else if(!this.slimeFound){
                    this.spawn();
                    console.log(this.slimeCount);
                }
            }
            else if((this.player.playerType == HEROES.SWORD_HERO && this.doneOnce && !this.slimeFound) || (!this.onlyOnce)){
                if(this.onlyOnce){
                    this.timeOfStepFinished = time;
                    this.killedWithSword = true;
                    this.onlyOnce = false;
                    console.log("cleared");
                }
            
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.saidOnce){
                        this.textWords = "Great, you defeated a slime!";
                        this.saidOnce = true;
                    }
                }
                else if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength + 4){
                    if(this.saidOnce){
                        this.textWords = "The sword hero can do short-ranged attacks.\nHe can deal the most damage out of all the other heroes.";
                        this.saidOnce = false;
                        this.youCanMoveOn = true;
                    }
                }
                else if(this.youCanMoveOn){
                    if(this.killedWithShield){ 
                        if(this.killedWithMage){ this.door.lessonStep = 7; }    //Go to next step
                        else{ this.door.lessonStep = 4; }                        //Go to mage
                    }
                    else{ this.door.lessonStep = 5; }                            //Go to shield
                    
                    this.doneOnce = false;  //Reset
                    this.saidOnce = false;
                    this.onlyOnce = true;
                    this.youCanMoveOn = false;
                    this.timeOfStepFinished = time;
                    this.tempMoney = this.money;
                }
            }             
        }



        //Look at coins and defeat more monsters
        else if(this.door.lessonStep == 7){
            //console.log("WELCOME TO THE NEXT LEVEL", this.tempMoney, this.money);
            if(this.tempMoney+30 > this.money){
                if(!this.doneOnce && Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength+3){
                    this.textWords = "When you defeat a monster, you will get coins. Take a look at the top right of\nthe screen. The more coins you collect, the more defence structures you will\nbe able to buy for night.";
                    this.doneOnce = true;
                    this.killedWithSword = false;
                    this.killedWithShield = false;
                    this.killedWithMage = false;
                }
                else{
                    if(this.doneOnce&& Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) > this.stepLength+6){
                        this.textWords = "Now, more slimes will spawn. Find and defeat 3 more slimes.\nAll your health will be restored now, but this time, you won't be invincible\nso becareful!";
                        this.shieldHero.semiInvincible = false;
                        this.swordHero.semiInvincible = false;
                        this.mageHero.semiInvincible = false;
                        this.healAllHeroes();
                        this.spawn(3);
                        this.doneOnce = false;
                    }
                }
            }
            else if(!this.resetStep && !this.slimeFound){
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
                console.log("CLEARED");
            }
            else{
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.doneOnce){
                        this.textWords = "Great, you earned a lot of money.";
                        this.doneOnce = true;
                    }
                }
                else{
                    this.door.lessonStep = 8;
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                }
            }
        }

            //Look at coins and defeat more monsters
        else if(this.door.lessonStep == 8){
            if(!this.door.clearedTasks){
                if(!this.doneOnce && !this.slimeFound){
                    this.textWords = "Now, find the dungeon door! If you need to move objects to get through,\nuse the shield hero!";
                    this.doneOnce = true;
                    this.healAllHeroes();
                }
            }
            else if(this.doneOnce && !this.resetStep){
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
                console.log("CLEARED");
            }
            else{
                console.log("Enter");
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength+2){
                    if(!this.doneOnce){
                        this.textWords = "You are now ready to enter the dungeon. Defeat as many monsters as\nyou can before the time runs out. Good luck!";
                        this.doneOnce = true;
                    }
                }
                else{
                    this.music.pause();
                    this.scene.stop(SCENES.DAY_OVERLAY);
                    this.scene.start(SCENES.DUNGEON1, {
                        "money": this.money,
                        "level": 1
                    });
                    this.scene.stop();
                    console.log("It's a whole new world");
                }
            }
        }


    }



    

    //Puzzle with push
    

        //Push objects to clear puzzle


        //Push monsters into lava


    


    update(time, delta) {
        super.update(time);       //Get rid of super since we will be using some new stuff only for tutorial
        //console.log("Enemy count: ",this.enemyGroup.getChildren().length, "lessonStep: ",this.lessonStep);
        for(var i = 0; i < this.enemyGroup.getChildren().length; i++){
            //console.log(this.enemyGroup.getChildren()[i].enemyType);
            if(this.enemyGroup.getChildren()[i].class.enemyType == "SLIME"){
                this.slimeFound = true; //This needs to be reset somewhere
                break;
            }
            else{
                this.slimeFound = false;
            }
        }
        if(this.enemyGroup.getChildren().length == 0){
            this.slimeFound = false;    //This is the reset counter
        }
 

        if(!this.clearTasks){ this.tasks(time); }
        else{
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON1,{"money":0});
            this.scene.stop();
        }
   



        if (this.player.sprite && this.player.sprite.body && !this.player.active && time - (this.lastDamaged + 400) >= 0) {
            //console.log("hello");
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
            this.scene.start(SCENES.TUTORIAL, 'dead');  //Doens't work because calling super class
            this.scene.stop();
        } else {
            //cheats
            if(this.input.keyboard.keys[50].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.DUNGEON2, {
                    "money": this.money,
                    "level": 4
                });
                this.scene.stop();
            }else if(this.input.keyboard.keys[51].isDown){
                this.music.pause();
                this.scene.stop(SCENES.DAY_OVERLAY);
                this.scene.start(SCENES.DUNGEON3, {
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
        }
    }

    
    spawn(num){
        if(!num){
            num = 1;
            console.log("only one slime");
        }
        else{
            console.log("Spawning more slimes ",num);
        }
        console.log("Are there slimes on the map? ", this.slimeFound);  //false

        //Clears the array first
        for(let i = 0; i < this.slimeSpawnArr.length; i++){
            this.slimeSpawnArr.pop();
        }

        if(this.player.sprite.x < 1000 && this.player.sprite.x > 200 && this.player.sprite.y < 1000 && this.player.sprite.y > 200){
            for(let i = 0; i < num; i++){
                this.slimeSpawnArr.push([i*200 + 400+this.player.sprite.x,i*200 + 500+this.player.sprite.y]);
            }
        }
        else{
            for(let i = 0; i < num; i++){
                this.slimeSpawnArr.push([800+i*200,400+i*200]);
            }
        }
        this.slimeCount = this.slimeSpawnArr.length;
        let slime = this.spawnMoreSlimes();
    }
}
