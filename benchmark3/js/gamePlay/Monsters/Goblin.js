import {
    ENEMIES
} from "../../constants/EnemyTypes.js";

import {
    Enemy
} from "../Enemy.js";

export class Goblin extends Enemy {

    constructor(data) {
        super(data);
        this.enemyType = ENEMIES.GOBLIN;    // like slime
        this.health = 5;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 200;
        this.movement = 60;                 //Monster keeps moving in square pattern for now
        this.killCost = 25;
        this.state = "sleeping";            //The behavioral states of the goblin
        this.detectionRange = 1000;           //Need this to know how far away the player has to be to get detected
        this.goblinContainer = data.goblinContainer;
        this.frmRt = 10;
        this.behaviourCounter = 0;





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
        this.frameRate = 3;      //Frame rate has to be defined here (with var)
        var leftFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftGoblin', frames: leftFramesGoblin, frameRate: this.frameRate, repeat: -1 });
        var leftIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleGoblin', frames: leftIdleFrameGoblin, frameRate: this.frameRate, repeat: -1 });

        var rightFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightGoblin', frames: rightFramesGoblin, frameRate: this.frameRate, repeat: -1 });
        var rightIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleGoblin', frames: rightIdleFrameGoblin, frameRate: this.frameRate, repeat: -1 });
     
        var upFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upGoblin', frames: upFramesGoblin, frameRate: this.frameRate, repeat: -1 });
        var upIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleGoblin', frames: upIdleFrameGoblin, frameRate: this.frameRate, repeat: -1 });
       
        var downFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downGoblin', frames: downFramesGoblin, frameRate: this.frameRate, repeat: -1 });
        var downIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleGoblin', frames: downIdleFrameGoblin, frameRate: this.frameRate, repeat: -1 });
 
        var sleepFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'sleep/', suffix:'.png' });
        this.anims.create({ key: 'sleepGoblin', frames: sleepFramesGoblin, frameRate: this.frameRate, repeat: -1 });

        var zzzFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 3, zeroPad: 4, prefix:'zzz/', suffix:'.png' });
        this.anims.create({ key: 'zzz', frames: zzzFramesGoblin, frameRate: this.frameRate, repeat: -1 });


    }


  

    dayUpdate(time, player) {
        //have dayscene activity here
        if(this.active && !this.dead){
            switch(this.state){
                case "sleeping":
                    this.sprite.anims.play("sleepGoblin", true);
                    this.goblinContainer.list[1].anims.play("zzz",true);

                    if(this.beenAttacked){
                        this.state = "patrolling";
                    }

                    break;
                case "patrolling":
                    //console.log("patrolling");
                    this.goblinContainer.list[1].visible = false;

                    if(this.withinVacinity(player.sprite, this.sprite)){
                        this.state = "attacking";      
                        //console.log("patrollng");
                 
                        break;
                    }

                    if (this.direction == 1) {
                        this.sprite.body.setVelocityX(0);
                        this.sprite.body.setVelocityY(-this.speed);
                        this.sprite.anims.play("upGoblin", true);
                        this.moveCounter++;
                        if(this.moveCounter >= this.movement){
                            this.direction =  2;
                            this.moveCounter = 0;
                        }
                    } 
                    else if (this.direction == 2) {
                        this.sprite.body.setVelocityX(-this.speed);
                        this.sprite.body.setVelocityY(0);
                        this.sprite.anims.play("leftGoblin", true);
                        this.moveCounter++;
                        if(this.moveCounter >= this.movement){
                            this.direction = 3;
                            this.moveCounter = 0;
                        }
                    }
                    else if (this.direction == 3) {
                        this.sprite.body.setVelocityX(0);
                        this.sprite.body.setVelocityY(this.speed);
                        this.sprite.anims.play("downGoblin", true);
                        this.moveCounter++;
                        if(this.moveCounter >= this.movement){
                            this.direction = 4;
                            this.moveCounter = 0;
                        }
                    } 
                    else if (this.direction == 4) {
                        this.sprite.body.setVelocityX(this.speed);
                        this.sprite.body.setVelocityY(0);
                        this.sprite.anims.play("rightGoblin", true);
                        this.moveCounter++;
                        if(this.moveCounter >= this.movement){
                            this.direction = 1;
                            this.moveCounter = 0;
                        }
                    }
                    break;
                case "attacking":

                    if(!player){
                        //console.log("CAN'T detect plaeyer");
                    }
                    try{
                        if(!this.withinVacinity(player.sprite, this.sprite)){
                            //this.state = "patrolling";
                            //console.log("Player out of bounds");
                            this.sprite.body.setVelocityX(0);
                            this.sprite.body.setVelocityY(0);
                            break;
                        }
                        
                        
                        let gobX = Math.floor((this.sprite.body.position.x+this.sprite.width/2)/80);
                        let gobY = Math.floor((this.sprite.body.position.y+this.sprite.height/2)/80);
                        //console.log(player.sprite.body.position);
                        let heroX = Math.floor((player.sprite.body.position.x+this.sprite.width/2)/80);
                        let heroY = Math.floor((player.sprite.body.position.y+this.sprite.height/2)/80);

                        if(gobX > 0 && gobY > 0 && heroX > 0 && heroY > 0){
                            //console.log("Gobling attacking");
                            //this.attack(gobX, gobY, heroX, heroY);
                        }

                    }
                    catch(error){
                        //console.log("The player has died");
                    }

                    break;
            }
        }else if(this.dead && this.goblinContainer.list[0]){

            this.goblinContainer.list[0].destroy();
            console.log("hello");

        }

    }

    withinVacinity(playerSprite, enemySprite){
        if(playerSprite.body){
            let distX = ((playerSprite.body.position.x) - (enemySprite.body.position.x));
            let distY = ((playerSprite.body.position.y) - (enemySprite.body.position.y));
            
            let dist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
            //console.log(dist);
            if(dist < this.detectionRange){
                return true;
            }
            else{
                return false;   
            }
        }
    }
            

                            


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

    



    nightUpdate(time) {
        super.nightUpdate(time);
        this.sprite.anims.play("leftGoblin",true);
        //        if (this.active) {
        //            this.sprite.body.setVelocityX(-1 * this.speed);
        //            this.sprite.body.setVelocityY(0);
        //            this.sprite.anims.play("leftSlime", true);
        //        }
    }

}
