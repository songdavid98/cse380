import {
    ENEMIES
} from "../../constants/EnemyTypes.js";

import {
    Enemy
} from "../Enemy.js";

export class Goblin extends Enemy {

    constructor(data) {
        super(data);
        this.zzzSprite = data.zzzSprite;
        this.enemyType = ENEMIES.GOBLIN; // like slime
        this.health = 5;
        this.totalHealth = this.health; //Keep this for health bar stuff
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 200;
        this.movement = 60; //Monster keeps moving in square pattern for now
        this.killCost = 25;
        this.state = "sleeping"; //The behavioral states of the goblin
        this.justWokeUp = false;
        this.wakeUpOnce = true;
        this.wakeUpLength = 1; //1 seconds
        this.detectionRange = 1000; //Need this to know how far away the player has to be to get detected
        this.frmRt = 10;
        this.behaviourCounter = 0;
        
        //Attack AI stuff
        this.counter = 0; //Used for timing the attack
        this.movementTime = 20;
        this.gobDiffMovement = 0;



        //taken care of in super constructor
        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        //        this.distanceTraveled = 0;
        //        this.active = true;

        this.create();

    }


    init() {}

    create() {
        this.frameRate = 3; //Frame rate has to be defined here (with var)
        var leftFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftGoblin',
            frames: leftFramesGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });
        var leftIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftIdleGoblin',
            frames: leftIdleFrameGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });

        var rightFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightGoblin',
            frames: rightFramesGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });
        var rightIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleGoblin',
            frames: rightIdleFrameGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });

        var upFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upGoblin',
            frames: upFramesGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });
        var upIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upIdleGoblin',
            frames: upIdleFrameGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });

        var downFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downGoblin',
            frames: downFramesGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });
        var downIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downIdleGoblin',
            frames: downIdleFrameGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });

        var sleepFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'sleep/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'sleepGoblin',
            frames: sleepFramesGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });

        var zzzFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, {
            start: 1,
            end: 3,
            zeroPad: 4,
            prefix: 'zzz/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'zzz',
            frames: zzzFramesGoblin,
            frameRate: this.frameRate,
            repeat: -1
        });


    }




    dayUpdate(time, player) {
        //have dayscene activity here

        //Call the enemy class dayUpdate
        super.dayUpdate(time);

        if(this.dead){
            this.zzzSprite.destroy();
        }

        if (this.active && !this.dead) {
            switch (this.state) {
                case "sleeping":
                    this.sprite.anims.play("sleepGoblin", true);
             
                    if(this.justWokeUp){
                        if(this.wakeUpOnce){
                            this.touched = true;
                            this.wakeUpTime = time;
                            this.wakeUpOnce = false;
                        }
                        if((Math.floor(time / 1000) - Math.floor(this.wakeUpTime / 1000)) > this.wakeUpLength){
                            console.log("ALREADY AWAKE");
                            this.state = "attacking";
                        }
                        else{
                            if(this.zzzSprite){
                                this.zzzSprite.visible = false;
                                this.zzzSprite.destroy();
                            }
                        }
                    }
                    else{
                        this.zzzSprite.anims.play("zzz", true);
                    }

                    break;
                case "patrolling":
                    //console.log("patrolling");
                    this.zzzSprite.visible = false;
                    this.zzzSprite.destroy();

                    if (this.withinVacinity(player.sprite, this.sprite)) {
                        this.state = "attacking";
                        //console.log("patrollng");

                        break;
                    }

                    if (this.direction == 1) {
                        this.sprite.body.setVelocityX(0);
                        this.sprite.body.setVelocityY(-this.speed);
                        this.sprite.anims.play("upGoblin", true);
                        this.moveCounter++;
                        if (this.moveCounter >= this.movement) {
                            this.direction = 2;
                            this.moveCounter = 0;
                        }
                    } else if (this.direction == 2) {
                        this.sprite.body.setVelocityX(-this.speed);
                        this.sprite.body.setVelocityY(0);
                        this.sprite.anims.play("leftGoblin", true);
                        this.moveCounter++;
                        if (this.moveCounter >= this.movement) {
                            this.direction = 3;
                            this.moveCounter = 0;
                        }
                    } else if (this.direction == 3) {
                        this.sprite.body.setVelocityX(0);
                        this.sprite.body.setVelocityY(this.speed);
                        this.sprite.anims.play("downGoblin", true);
                        this.moveCounter++;
                        if (this.moveCounter >= this.movement) {
                            this.direction = 4;
                            this.moveCounter = 0;
                        }
                    } else if (this.direction == 4) {
                        this.sprite.body.setVelocityX(this.speed);
                        this.sprite.body.setVelocityY(0);
                        this.sprite.anims.play("rightGoblin", true);
                        this.moveCounter++;
                        if (this.moveCounter >= this.movement) {
                            this.direction = 1;
                            this.moveCounter = 0;
                        }
                    }
                    break;
                case "attacking":
                    if(this.zzzSprite){
                        this.zzzSprite.visible = false;
                        this.zzzSprite.destroy();
                    }


                        try {
                            if (!this.withinVacinity(player.sprite, this.sprite)) {
                                this.state = "patrolling";
                                //console.log("Player out of bounds");
                                this.sprite.body.setVelocityX(0);
                                this.sprite.body.setVelocityY(0);
                                break;
                            }
                            let gobX = Math.floor((this.sprite.body.position.x + this.sprite.width / 2) / 80);
                            let gobY = Math.floor((this.sprite.body.position.y + this.sprite.height / 2) / 80);
                            //console.log(player.sprite.body.position);
                            let heroX = Math.floor((player.sprite.body.position.x + this.sprite.width / 2) / 80);
                            let heroY = Math.floor((player.sprite.body.position.y + this.sprite.height / 2) / 80);
                            //if(gobX > 0 && gobY > 0 && heroX > 0 && heroY > 0){
                                //this.attack2(gobX, gobY, heroX, heroY, player.sprite);
                            //}

                            if(this.counter > this.movementTime){
                                this.attackDist(this.sprite.body.position.x, this.sprite.body.position.y, player.sprite.body.position.x, player.sprite.body.position.y);
                                this.counter = 0;
                                this.gobPosX = this.sprite.body.position.x;
                                this.gobPosY = this.sprite.body.position.y;
                            }
                            else{
                                this.counter++;
                            }

                        } catch (error) {}
                    
                    break;
            }
        }
    }

    withinVacinity(playerSprite, enemySprite) {
        if (playerSprite.body) {
            let distX = ((playerSprite.body.position.x) - (enemySprite.body.position.x));
            let distY = ((playerSprite.body.position.y) - (enemySprite.body.position.y));

            let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            //console.log(dist);
            if (dist < this.detectionRange) {
                return true;
            } else {
                return false;
            }
        }
    }

    attackDist(gobX, gobY, playerX, playerY) {
        let gobClass = this;

        let dist = Math.sqrt(Math.pow(gobX - playerX, 2) + Math.pow(gobY - playerY, 2));

        let currentGoblinXtile = Math.floor(gobX);
        let currentGoblinYtile = Math.floor(gobY);
        let currentNextPointX = Math.floor(playerX);
        let currentNextPointY = Math.floor(playerY);

        if (currentNextPointX < currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
            //console.log("GO LEFT UP");
            gobClass.sprite.body.setVelocityX(-gobClass.speed);
            gobClass.sprite.body.setVelocityY(-gobClass.speed);
            gobClass.sprite.anims.play("leftGoblin", true);
            //this.movementStack.push(7);
        } else if (currentNextPointX == currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
            //console.log("GO UP");
            gobClass.sprite.body.setVelocityX(0);
            gobClass.sprite.body.setVelocityY(-gobClass.speed);
            gobClass.sprite.anims.play("upGoblin", true);
            //this.movementStack.push(0);
        } else if (currentNextPointX > currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
            //console.log("GO RIGHT UP");                     
            gobClass.sprite.body.setVelocityX(gobClass.speed);
            gobClass.sprite.body.setVelocityY(-gobClass.speed);
            gobClass.sprite.anims.play("rightGoblin", true);
            //this.movementStack.push(1);
        } else if (currentNextPointX < currentGoblinXtile && currentNextPointY == currentGoblinYtile) {
            //console.log("GO LEFT");                     
            gobClass.sprite.body.setVelocityX(-gobClass.speed);
            gobClass.sprite.body.setVelocityY(0);
            gobClass.sprite.anims.play("leftGoblin", true);
            //this.movementStack.push(6);
        } else if (currentNextPointX > currentGoblinXtile && currentNextPointY == currentGoblinYtile) {
            //console.log("GO RIGHT");                         
            gobClass.sprite.body.setVelocityX(gobClass.speed);
            gobClass.sprite.body.setVelocityY(0);
            gobClass.sprite.anims.play("rightGoblin", true);
            //this.movementStack.push(2);
        } else if (currentNextPointX > currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
            //console.log("GO RIGHT DOWN");                       
            gobClass.sprite.body.setVelocityX(gobClass.speed);
            gobClass.sprite.body.setVelocityY(gobClass.speed);
            gobClass.sprite.anims.play("rightGoblin", true);
            //this.movementStack.push(3);
        } else if (currentNextPointX == currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
            //console.log("GO DOWN");                        
            gobClass.sprite.body.setVelocityX(0);
            gobClass.sprite.body.setVelocityY(gobClass.speed);
            gobClass.sprite.anims.play("downGoblin", true);
            //this.movementStack.push(4);
        } else if (currentNextPointX < currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
            //console.log("GO LEFT DOWN");    
            gobClass.sprite.body.setVelocityX(-gobClass.speed);
            gobClass.sprite.body.setVelocityY(gobClass.speed);
            gobClass.sprite.anims.play("leftGoblin", true);
            //this.movementStack.push(5);
        } else {
            gobClass.sprite.body.setVelocityX(0);
            gobClass.sprite.body.setVelocityY(0);
            gobClass.sprite.anims.play("downIdleGoblin");
        }
    }



/*  
    attack2(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile, currentPlayerYtile, playerSprite){
        let gobClass = this;
        if(!currentPlayerXtile && !currentPlayerYtile){
            console.log("PLAYER NOT FOUND");
        }
        if(currentGoblinXtile != currentPlayerXtile && currentGoblinYtile != currentPlayerYtile){
            console.log(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile,currentPlayerYtile);
            this.scene.easystar.findPath(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile, currentPlayerYtile, function(path) {
                let currentNextPointX = null;
                let currentNextPointY = null;
                let tileWidth = 16;
                let tileHeight = 16;
                if (path === null) {
                    console.log("The path to the destination point was not found.");
                }
                if (path) {
                    console.log(path);
                    currentNextPointX = path[1].x;
                    currentNextPointY = path[1].y;
                    console.log(currentNextPointX*tileWidth*5);
                    console.log(currentNextPointY*tileHeight*5);

                    console.log(playerSprite.body.position.x);
                    console.log(playerSprite.body.position.y);

                    gobClass.move(path,tileWidth,tileHeight,gobClass.sprite);
                    //gobClass.sprite.setPosition(currentNextPointX*tileWidth*5,currentNextPointY*tileHeight*5);
                    
                    //console.log("gobclass sprite", gobClass.sprite.x, gobClass.sprite.y);
                }

                /*
                if (currentNextPointX < currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
                    //console.log("GO LEFT UP");
                    //gobClass.sprite.body.setVelocityX(-gobClass.speed);
                    //gobClass.sprite.body.setVelocityY(-gobClass.speed);
                    gobClass.sprite.anims.play("leftGoblin",true);
                }
                else if (currentNextPointX == currentGoblinXtile && currentNextPointY < currentGoblinYtile){
                    //console.log("GO UP");
                    //gobClass.sprite.body.setVelocityX(0);
                    //gobClass.sprite.body.setVelocityY(-gobClass.speed);
                    gobClass.sprite.anims.play("upGoblin",true);                      
                }
                else if (currentNextPointX > currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
                    //console.log("GO RIGHT UP");                     
                    //gobClass.sprite.body.setVelocityX(gobClass.speed);
                    //gobClass.sprite.body.setVelocityY(-gobClass.speed);
                    gobClass.sprite.anims.play("rightGoblin",true);
                }
                else if (currentNextPointX < currentGoblinXtile && currentNextPointY == currentGoblinYtile) {
                    //console.log("GO LEFT");                     
                    //gobClass.sprite.body.setVelocityX(-gobClass.speed);
                    //gobClass.sprite.body.setVelocityY(0);
                    gobClass.sprite.anims.play("leftGoblin",true);
                }
                else if (currentNextPointX > currentGoblinXtile && currentNextPointY == currentGoblinYtile){
                    //console.log("GO RIGHT");                         
                    //gobClass.sprite.body.setVelocityX(gobClass.speed);
                    //gobClass.sprite.body.setVelocityY(0);
                    gobClass.sprite.anims.play("rightGoblin",true);
                }
                else if (currentNextPointX > currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                    //console.log("GO RIGHT DOWN");                       
                    //gobClass.sprite.body.setVelocityX(gobClass.speed);
                    //gobClass.sprite.body.setVelocityY(gobClass.speed);
                    gobClass.sprite.anims.play("rightGoblin",true);
                }
                else if (currentNextPointX == currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                    //console.log("GO DOWN");                        
                    //gobClass.sprite.body.setVelocityX(0);
                    //gobClass.sprite.body.setVelocityY(gobClass.speed);
                    gobClass.sprite.anims.play("downGoblin",true);
                }
                else if (currentNextPointX < currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                    //console.log("GO LEFT DOWN");    
                    //gobClass.sprite.body.setVelocityX(-gobClass.speed);
                    //gobClass.sprite.body.setVelocityY(gobClass.speed);
                    gobClass.sprite.anims.play("leftGoblin",true);
                }
                else{
                    //gobClass.sprite.body.setVelocityX(0);
                    //gobClass.sprite.body.setVelocityY(0); 
                    gobClass.sprite.anims.play("downIdleGoblin");
                }
                */
            /*});

            this.scene.easystar.calculate();
        }
    }  
    */      
    /*       
    move(path,tileWidth,tileHeight,player){
        // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
        var tweens = [];
        for(var i = 0; i < path.length-1; i++){
            var currentNextPointX = path[i+1].x;
            var currentNextPointY = path[i+1].y;
            tweens.push({
                targets: player,
                x: {value: currentNextPointX*tileWidth*5, duration: 1500},
                y: {value: currentNextPointY*tileHeight*5, duration: 1500}
            });
        }
        console.log(currentNextPointX*tileWidth*5, currentNextPointY*tileHeight*5);
        this.scene.tweens.timeline({
            tweens: tweens
        });
    }
*/

    /*
        attack(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile, currentPlayerYtile){
            let gobClass = this;
            if(!currentPlayerXtile && !currentPlayerYtile){
                //console.log("PLAYER NOT FOUND");
            }
            if(currentGoblinXtile != currentPlayerXtile && currentGoblinYtile != currentPlayerYtile){
                //console.log(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile,currentPlayerYtile);
                this.scene.easystar.findPath(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile, currentPlayerYtile, function( path) {
                    let currentNextPointX = null;
                    let currentNextPointY = null;
                    
                    if (path === null) {
                        //console.log("The path to the destination point was not found.");
                    }
                    if (path) {
                        //console.log(path);
                        currentNextPointX = path[1].x;
                        currentNextPointY = path[1].y;
                        //console.log(currentNextPointX);
                        //console.log(currentNextPointY);
                    }

                    if (currentNextPointX < currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
                        //console.log("GO LEFT UP");
                        gobClass.sprite.body.setVelocityX(-gobClass.speed);
                        gobClass.sprite.body.setVelocityY(-gobClass.speed);
                        gobClass.sprite.anims.play("leftGoblin",true);
                    }
                    else if (currentNextPointX == currentGoblinXtile && currentNextPointY < currentGoblinYtile){
                        //console.log("GO UP");
                        gobClass.sprite.body.setVelocityX(0);
                        gobClass.sprite.body.setVelocityY(-gobClass.speed);
                        gobClass.sprite.anims.play("upGoblin",true);                      
                    }
                    else if (currentNextPointX > currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
                        //console.log("GO RIGHT UP");                     
                        gobClass.sprite.body.setVelocityX(gobClass.speed);
                        gobClass.sprite.body.setVelocityY(-gobClass.speed);
                        gobClass.sprite.anims.play("rightGoblin",true);
                    }
                    else if (currentNextPointX < currentGoblinXtile && currentNextPointY == currentGoblinYtile) {
                        //console.log("GO LEFT");                     
                        gobClass.sprite.body.setVelocityX(-gobClass.speed);
                        gobClass.sprite.body.setVelocityY(0);
                        gobClass.sprite.anims.play("leftGoblin",true);
                    }
                    else if (currentNextPointX > currentGoblinXtile && currentNextPointY == currentGoblinYtile){
                        //console.log("GO RIGHT");                         
                        gobClass.sprite.body.setVelocityX(gobClass.speed);
                        gobClass.sprite.body.setVelocityY(0);
                        gobClass.sprite.anims.play("rightGoblin",true);
                    }
                    else if (currentNextPointX > currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                        //console.log("GO RIGHT DOWN");                       
                        gobClass.sprite.body.setVelocityX(gobClass.speed);
                        gobClass.sprite.body.setVelocityY(gobClass.speed);
                        gobClass.sprite.anims.play("rightGoblin",true);
                    }
                    else if (currentNextPointX == currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                        //console.log("GO DOWN");                        
                        gobClass.sprite.body.setVelocityX(0);
                        gobClass.sprite.body.setVelocityY(gobClass.speed);
                        gobClass.sprite.anims.play("downGoblin",true);
                    }
                    else if (currentNextPointX < currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                        //console.log("GO LEFT DOWN");    
                        gobClass.sprite.body.setVelocityX(-gobClass.speed);
                        gobClass.sprite.body.setVelocityY(gobClass.speed);
                        gobClass.sprite.anims.play("leftGoblin",true);
                    }
                    else{
                        gobClass.sprite.body.setVelocityX(0);
                        gobClass.sprite.body.setVelocityY(0); 
                        gobClass.sprite.anims.play("downIdleGoblin");
                    }
                });

                this.scene.easystar.calculate();
                //console.log(this.sprite.body);
            }
        }
    */


    nightUpdate(time, level) {
        super.nightUpdate(time, level);
        if(this.sprite.body.velocity.x > 0){
            this.sprite.anims.play('rightGoblin',true);
        }else if(this.sprite.body.velocity.y > 0){
            this.sprite.anims.play('downGoblin',true);
        }else if(this.sprite.body.velocity.y < 0){
            this.sprite.anims.play('upGoblin', true);
        }else{
            this.sprite.anims.play("leftGoblin", true);
        }
        //        if (this.active) {
        //            this.sprite.body.setVelocityX(-1 * this.speed);
        //            this.sprite.body.setVelocityY(0);
        //            this.sprite.anims.play("leftSlime", true);
        //        }
    }

}
