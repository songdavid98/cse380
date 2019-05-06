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
    tasks(time){
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
                if(this.resetStep){

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
                        this.tempMoney = this.money;    //debugging purpose
                        this.timeOfStepFinished = time; //debugging purpose

                    }
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
                if(this.resetStep){
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

        //Click to attack
        else if(this.lessonStep == 3){
            if(this.money == 0){
                if(!this.doneOnce && !this.slimeFound){
                    this.textWords = "A single slime will spawn somewhere on the map. Try locating\nit and then attacking by left-clicking the mouse.\nFor now, you will have infinite lives.";
                    this.player.semiInvincible = true;
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
                                this.lessonStep = 4;    //Go to mage
                                this.killedWithShield = false;
                                this.killedWithSword = true;
                                this.killedWithMage = false;
                                break;
                            case HEROES.MAGE_HERO:
                                this.lessonStep = 5;    //Go to shield
                                this.killedWithShield = false;
                                this.killedWithSword = false;
                                this.killedWithMage = true;
                                break;
                            case HEROES.SHIELD_HERO:
                                this.lessonStep = 6;    //Go to sword?
                                this.killedWithShield = true;
                                this.killedWithSword = false;
                                this.killedWithMage = false;
                                break;
                        }
                        this.doneOnce = false;  //Reset
                        this.resetStep = false;
                    }
                }
            }
        }

        //Swapping heroes to mage
        else if(this.lessonStep == 4){
            if(this.player.playerType != HEROES.MAGE_HERO && !this.resetStep && !this.killedWithMage){
                if(!this.doneOnce){
                    this.textWords = "Now, try switching heroes. Press the space bar to turn in to the MAGE hero.\nFind and defeat a slime with the mage hero.";
                    this.doneOnce = true;
                    this.enemy = this.spawn();
                }
                else if(!this.slimeFound){
                    this.enemy = this.spawn();
                }
            }
            else if(this.player.playerType == HEROES.MAGE_HERO && this.doneOnce && !this.resetStep && this.enemy.dead){
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.resetStep = true;
                this.killedWithMage = true;
                console.log("cleared");

            }
            else{
                if(this.resetStep){
                    if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                        if(!this.doneOnce){
                            this.textWords = "Great, you defeated a slime!";
                            this.doneOnce = true;
                        }
                    }
                    else if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength + 4){
                        if(this.doneOnce){
                            this.textWords = "The mage can do long-ranged attack. If the enemies are hit, they will slow down.";
                            this.doneOnce = false;
                        }
                    }
                    else if(this.killedWithMage){
                        console.log("FINISHED MAGE");
                        switch(this.currentPlayer){     //Using the previous player's type
                            case HEROES.SWORD_HERO:
                                if(!this.killedWithShield){ this.lessonStep = 5; }   //Did mage and sword -> Go to shield
                                else{ this.lessonStep = 7; }   //move onto the last step
                                break;
                            case HEROES.SHIELD_HERO:
                                if(!this.killedWithSword){ this.lessonStep = 6; }   //Did mage and shield -> Go to sword?
                                else{ this.lessonStep = 7; }   //move onto the last step
                                break;
                            default:
                                console.log("WHAT???? MAGE AGAIN?");
                        }
                        this.doneOnce = false;  //Reset
                        this.resetStep = false;
                        this.timeOfStepFinished = time;
                        this.tempMoney = this.money;
                    }
                }
            }                 
        }

        //Swap to shield 
        else if(this.lessonStep == 5){
            console.log("WELCOME TO SHIELD");
            if(this.player.playerType != HEROES.SHIELD_HERO && !this.resetStep && !this.killedWithShield){
                if(!this.doneOnce){
                    this.textWords = "Now, try switching heroes. Press the space bar to turn in to the SHIELD hero.\nThe shield hero doesn't deal damage. But you can use her attack to push monsters into hazardous environment!\nFind and defeat a slime with the shield hero.";
                    this.doneOnce = true;
                    this.enemy = this.spawn();
                }
                else if(!this.slimeFound){
                    this.enemy = this.spawn();
                }
            }
            else if(this.player.playerType == HEROES.SHIELD_HERO && this.doneOnce && !this.resetStep && this.enemy.dead){
                this.timeOfStepFinished = time;
                this.doneOnce = false;
                this.killedWithShield = true;
                this.resetStep = true;
                console.log("cleared");

            }
            else if(this.killedWithShield){
                if(this.resetStep){
                    if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                        if(!this.doneOnce){
                            this.textWords = "Great, you defeated a slime!";
                            this.doneOnce = true;
                        }
                    }
                    else if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength + 4){
                        if(this.doneOnce){
                            this.textWords = "You can push monsters into one corner and use the mage to deal\ndamage to all of them. You can also use her attack to push objects!";
                            this.doneOnce = false;
                        }
                    }
                    else{
                        switch(this.currentPlayer){     //Using the previous player's type
                            case HEROES.SWORD_HERO:
                                if(!this.killedWithMage){ this.lessonStep = 4; }    //Did sword and shield -> Go to mage
                                else{ this.lessonStep = 7; }   //move onto the last step
                                break;
                            case HEROES.MAGE_HERO:
                                if(!this.killedWithSword){ this.lessonStep = 6; }   //Did mage and shield -> Go to sword?
                                else{ this.lessonStep = 7; }   //move onto the last step
                                break;
                            default:
                                console.log("WHAT???? SHIELD AGAIN?");
                        }
                        this.doneOnce = false;  //Reset
                        this.resetStep = false;
                        this.timeOfStepFinished = time;
                        this.tempMoney = this.money;

                    }
                }
            }
        }

        //Swapping heroes to sword
        else if(this.lessonStep == 6){
            console.log("WELCOME TO SWORD");

            if(this.player.playerType != HEROES.SWORD_HERO && !this.resetStep && !this.killedWithSword){
                if(!this.doneOnce){
                    this.textWords = "Now, try switching heroes. Press the space bar to turn in to the SWORD hero.\nFind and defeat a slime with the sword hero.";
                    this.doneOnce = true;
                    this.enemy = this.spawn();
                }
                else if(!this.slimeFound){
                        this.enemy = this.spawn();
                }
            }
            else if(this.player.playerType == HEROES.SWORD_HERO && this.doneOnce && !this.resetStep && this.enemy.dead){
                console.log("cleared");
                this.timeOfStepFinished = time;
                this.killedWithSword = true;
                this.doneOnce = false;
                this.resetStep = true;
            }
            else if(this.killedWithSword){
                if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    if(!this.doneOnce){
                        this.textWords = "Great, you defeated a slime!";
                        this.doneOnce = true;
                    }
                }
                else if(Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength + 4){
                    if(this.doneOnce){
                        this.textWords = "The sword hero can do short-ranged attacks.\nHe can deal the most damage out of all the other heroes.";
                        this.doneOnce = false;
                    }
                }
                else{
                    console.log("COMES HERE");
                    switch(this.currentPlayer){     //Using the previous player's type
                        case HEROES.MAGE_HERO:
                            if(!this.killedWithShield){ this.lessonStep = 5; }   //Did mage and sword -> Go to shield
                            else{ this.lessonStep = 7; }   //move onto the last step
                            break;
                        case HEROES.SHIELD_HERO:
                            if(!this.killedWithMage){ this.lessonStep = 4; }   //Did shield and sword -> Go to mage?
                            else{ this.lessonStep = 7; }   //move onto the last step
                            break;
                        default:
                            console.log("WHAT???? SWORD AGAIN?");
                    }
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                    this.timeOfStepFinished = time;
                    this.tempMoney = this.money;


                }
            }                 
        }



        //Look at coins and defeat more monsters
        else if(this.lessonStep == 7){
            console.log("WELCOME TO THE NEXT LEVEL", this.tempMoney, this.money);
            if(this.tempMoney+30 > this.money){
                if(!this.doneOnce && Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) <= this.stepLength){
                    this.textWords = "When you defeat a monster, you will get coins.Take a look at the top right of\nthe screen. The more coins you collect, the more defence structures you will\nbe able to buy for night.";
                    this.doneOnce = true;
                    this.killedWithSword = false;
                    this.killedWithShield = false;
                    this.killedWithMage = false;
                }
                else{
                    if(this.doneOnce&& Math.floor((time / 1000)) - Math.floor(this.timeOfStepFinished / 1000) > this.stepLength){
                        this.textWords = "Now, more slimes will spawn. Find and defeat 3 more slimes.\nAll your health will be restored now,\nbut this time, you won't be invincible so becareful!";
                        this.player.semiInvincible = false;
                        this.player.health = 3;
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
                    this.lessonStep = 8;
                    this.doneOnce = false;  //Reset
                    this.resetStep = false;
                }
            }
        }

               //Look at coins and defeat more monsters
            else if(this.lessonStep == 8){
                if(!this.slimeFound){
                    if(!this.doneOnce && !this.slimeFound){
                        this.textWords = "Now, find the dungeon door! If you need to move objects to get through, use the shield hero!";
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
                            this.textWords = "You are now ready to enter the dungeon. Defeat as many monsters as you can before the time runs out. Good luck!";
                            this.doneOnce = true;
                        }
                    }
                    else{
                        this.lessonStep = 9;
                        this.doneOnce = false;  //Reset
                        this.resetStep = false;
                    }
                }
            }


    }



    

    //Puzzle with push
    task4(){

        //Push objects to clear puzzle


        //Push monsters into lava


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
        }
        if(this.player.sprite.x < 1000 && this.player.sprite.x > 200 && this.player.sprite.y < 1000 && this.player.sprite.y > 200){
            for(let i = 0; i < num; i++){
                this.slimeSpawnArr.push([i*20 + 400+this.player.sprite.x,i*20 + 500+this.player.sprite.y]);
            }
        }
        else{
            for(let i = 0; i < num; i++){
                this.slimeSpawnArr.push([800+i*20,400+i*20]);
            }
        }
        this.slimeCount = this.slimeSpawnArr.length;

        let slime = this.spawnMoreSlimes();
        return slime;
    }
}
