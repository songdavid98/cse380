//Day time level 
import{
    SCENES
} from "../constants/SceneNames.js";

import { DayScene } from "./DayScene.js";
import { HEROES } from "../constants/PlayerTypes.js";

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

            [200000, 180000]        //Off the map
        ];
        this.golemCount = this.golemSpawnArr.length;

        this.goblinSpawnArr = [

            [13000,21500]           //Off the map

        ];
        this.goblinCount = this.goblinSpawnArr.length;

        this.clearTask1 = false;
        this.clearTask2 = false;
        this.clearTask3 = false;
        this.clearTask4 = false;

        this.lessonStep = 1;
        this.stepLength = 2;   //3 seconds
        this.doneOnce = false;
        this.resetStep = false;
        this.killedSlime = false;

        this.clearedAngle = [false, false, false, false]; //0, 90, 180, 270


    }
    preload() {
     
        super.preload();
        this.load.image("door", "./assets/images/tiles/newerTileImages/caveDoor.png");
        this.load.image("treasure", "./assets/images/tiles/newerTileImages/treasure.png");


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
        this.wallLayer = this.map.createStaticLayer("rockLayer", [this.terrain], 0, 0).setScale(5, 5);

        super.create();

        //Keyboard stuff
        this.input.keyboard.addKeys('W,S,A,D,Space,Esc,I,Two,Three,Four,Five,Six');

        //collisions
        this.wallLayer.setCollision(6);     //For tutorial
        this.physics.add.collider(this.playerGroup, this.wallLayer);
        this.physics.add.collider(this.enemyGroup.getChildren(), this.wallLayer);

        this.map.currentLayer = this.baseLayer;

    }

    //Walk and attack slimes, get coins
    task1(time){
        //Walk with ASDW
        if(this.lessonStep == 1){
            if(this.player.sprite.x <= this.initPos[0]+250 && this.player.sprite.x >= this.initPos[0]-250 && this.player.sprite.y <= this.initPos[1]+250 && this.player.sprite.y >= this.initPos[1]-250){
                if(!this.doneOnce){
                    this.textWords = "Your first task is to move. Press the A,S,W,D keys on the keyboard to move\nthe player.";
                    this.doneOnce = true;
                }
            }
            else if(this.doneOnce && !this.resetStep){
                console.log("CLEERED");
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
            }
            else{
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.doneOnce){
                        this.textWords = "Great, you moved!";
                        this.doneOnce = true;
                    }
                }
                else{
                    this.lessonStep = 2;
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                }
            }
        }

        //Direction with mouse
        else if(this.lessonStep == 2){
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
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.doneOnce){
                        this.textWords = "Great, you rotated!";
                        this.doneOnce = true;
                    }
                }
                else{
                    this.lessonStep = 3;
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                }
            }
        }

        //Click to attack
        else if(this.lessonStep == 3){
            if(this.money == 0){
                if(!this.doneOnce && !this.slimeFound){
                    this.textWords = "A single slime will spawn somewhere on the map. Try locating\nit and then attacking by left-clicking the mouse.\nFor now, you will have infinite lives.";
                    this.player.semiInvincible = true;
                    this.spawn();
                    this.doneOnce = true;
                    this.currentPlayer = this.player.playerType;
                }
            }
            else if(this.doneOnce && !this.resetStep){
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
                console.log("CLEARED");
            }
            else{
                console.log("HERE");
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.doneOnce){
                        this.textWords = "Great, you defeated a slime!";
                        this.doneOnce = true;
                    }
                }
                else{
                    this.lessonStep = 3;
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                }
            }
        }

        //Swapping heroes to mage
        else if(this.lessonStep == 4){
            if(this.player.playerType != HEROES.MAGE_HERO){
                if(!this.doneOnce){
                    this.textWords = "Now, try switching heroes. Press the space bar to turn in to the mage hero.";
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
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.doneOnce){
                        this.textWords = "Great, you defeated a slime!";
                        this.doneOnce = true;
                    }
                }
                else{
                    this.lessonStep = 3;
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                }
            } 







        }


        //Look at coins and defeat more monsters
        else if(this.lessonStep == 5){
            if(this.money == 10){
                if(!this.doneOnce && !this.slimeFound){
                    this.textWords = "When you defeat a monster, you will get coins. Take a look at the top right of the screen.\nThe more coins you collect, the more defence structures you will be able to buy for night.";
                    this.timeOfStepFinished = time;
                    this.doneOnce = true;
                }
                else if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){                    
                    this.textWords = "Now, more slimes will spawn. Find and defeat 3 more slimes.\nBut this time, you won't be invincible so becareful!";
                    this.player.semiInvincible = false;
                    this.spawn();
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
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.doneOnce){
                        this.textWords = "Great, you rotated!";
                        this.doneOnce = true;
                    }
                }
                else{
                    this.lessonStep = 3;
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                }
            }


        }


    }



    //Switch characters and try their attack
    task3(){

        //Shoot at goblin to slow them down


        //Use sword to hack at golem


        //Gather up slimes with shield

    }

    //Puzzle with push
    task4(){

        //Push objects to clear puzzle


        //Push monsters into lava


    }


    task5(){



    }


    update(time, delta) {
        super.update(time);       //Get rid of super since we will be using some new stuff only for tutorial
        this.slimeFound = false;
        for(var i = 0; i < this.enemyGroup.getChildren().length; i++){
            //console.log(this.enemyGroup.getChildren()[i].enemyType);
            if(this.enemyGroup.getChildren()[i].class.enemyType == "SLIME"){
                this.slimeFound = true;
            }
        }
 



        if(this.clearTask1){ this.task2(time); }
        else if(this.clearTask2){ this.task3(time); }
        else if(this.clearTask3){ this.task4(time); }
        else if(this.clearTask4){ this.task5(time); }
        else if(this.clearTask5){
            this.music.pause();
            this.scene.stop(SCENES.DAY_OVERLAY);
            this.scene.start(SCENES.DUNGEON1,{"money":0});
            this.scene.stop();
        }
        else{ this.task1(time); }



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

    
    spawn(){
        if(this.player.sprite.x < 1000 && this.player.sprite.x > 200 && this.player.sprite.y < 1000 && this.player.sprite.y > 200){
            this.slimeSpawnArr = [
                [400+this.player.sprite.x,400+this.player.sprite.y]
            ];
            
        }
        else{
            this.slimeSpawnArr = [
                [800,400]
            ];
        }
        this.slimeCount = this.slimeSpawnArr.length;
            this.spawnMoreSlimes();
    }
}
