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
        this.speed = 100;
        this.movement = 60;                 //Monster keeps moving in square pattern for now
        this.killCost = 15;
        this.state = "sleeping";            //The behavioral states of the goblin
        this.detectionRange = 10;           //Need this to know how far away the player has to be to get detected
        this.goblinContainer = data.goblinContainer;
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
        var frameRate = 3;      //Frame rate has to be defined here (with var)

        var leftFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftGoblin', frames: leftFramesGoblin, frameRate: frameRate, repeat: -1 });
        var leftIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdleGoblin', frames: leftIdleFrameGoblin, frameRate: frameRate, repeat: -1 });

        var rightFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightGoblin', frames: rightFramesGoblin, frameRate: frameRate, repeat: -1 });
        var rightIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdleGoblin', frames: rightIdleFrameGoblin, frameRate: frameRate, repeat: -1 });
     
        var upFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upGoblin', frames: upFramesGoblin, frameRate: frameRate, repeat: -1 });
        var upIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 1, zeroPad: 4, prefix:'up/', suffix:'.png' });
        this.anims.create({ key: 'upIdleGoblin', frames: upIdleFrameGoblin, frameRate: frameRate, repeat: -1 });
       
        var downFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downGoblin', frames: downFramesGoblin, frameRate: frameRate, repeat: -1 });
        var downIdleFrameGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 2, end: 2, zeroPad: 4, prefix:'down/', suffix:'.png' });
        this.anims.create({ key: 'downIdleGoblin', frames: downIdleFrameGoblin, frameRate: frameRate, repeat: -1 });
 
        var sleepFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 4, zeroPad: 4, prefix:'sleep/', suffix:'.png' });
        this.anims.create({ key: 'sleepGoblin', frames: sleepFramesGoblin, frameRate: frameRate, repeat: -1 });

        var zzzFramesGoblin = this.anims.generateFrameNames(ENEMIES.GOBLIN, { start: 1, end: 3, zeroPad: 4, prefix:'zzz/', suffix:'.png' });
        this.anims.create({ key: 'zzz', frames: zzzFramesGoblin, frameRate: frameRate, repeat: -1 });


    }


  

    dayUpdate(time, player) {
        //have dayscene activity here
        if(this.active && !this.dead){
            switch(this.state){
                case "sleeping":
                    console.log(this.sprite);
                    this.sprite.anims.play("sleepGoblin", true);
                    this.goblinContainer.list[1].anims.play("zzz",true);

                    if(this.beenAttacked){
                        this.state = "patrolling";
                    }

                    break;
                case "patrolling":
                    this.goblinContainer.list[1].visible = false;

                    if(this.withinVacinity(player.sprite.x, player.sprite.y, this.sprite.x,this.sprite.y)){
                        this.state = "attacking";
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

                    if(!this.withinVacinity(player.sprite, this.sprite)){
                        this.state = "patrolling";
                    }
                    let gobX = Math.floor(this.scene.map.worldToTileX(this.sprite.x));
                    let gobY = Math.floor(this.scene.map.worldToTileY(this.sprite.y));
                    let heroX = Math.floor(this.scene.map.worldToTileX(player.sprite.x));
                    let heroY = Math.floor(this.scene.map.worldToTileY(player.sprite.y));
                        //console.log(gobX," ",gobY," ",heroX," ",heroY);
                    this.attack(gobX, gobY, heroX, heroY);
                    break;
            }
        }

    }

    withinVacinity(playerSprite, enemySprite){
        let distX = (playerSprite.x - enemySprite.x);
        let distY = (playerSprite.y - enemySprite.y);

        let dist = Math.sqrt(distX^2 - distY^2);

        if(dist < this.detectionRange){
            return true;
        }
        else{
            return false;   
        }
    }
            

                            


    attack(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile, currentPlayerYtile){
        let currentNextPointX = null;
        let currentNextPointY = null;
        let enemyAnimation = "";
        let enemyDirection = "";
        this.scene.easystar.findPath(currentGoblinXtile, currentGoblinYtile, currentPlayerXtile, currentPlayerYtile, function( path ) {
            
            //console.log(path);
            
            if (path === null) {
                //console.log("The path to the destination point was not found.");
            }
            if (path) {
                currentNextPointX = path[1].x;
                currentNextPointY = path[1].y;
            }

            if (currentNextPointX < currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
                //console.log("GO LEFT UP");
                enemyAnimation = "leftGoblin";
                enemyDirection = "leftUp";
            }
            else if (currentNextPointX == currentGoblinXtile && currentNextPointY < currentGoblinYtile){
                //console.log("GO UP");
                enemyDirection = "up";
                enemyAnimation = "upGoblin";
            }
            else if (currentNextPointX > currentGoblinXtile && currentNextPointY < currentGoblinYtile) {
                //console.log("GO RIGHT UP");
                enemyDirection = "rightUp";
                enemyAnimation = "rightGoblin";
            }
            else if (currentNextPointX < currentGoblinXtile && currentNextPointY == currentGoblinYtile) {
                //console.log("GO LEFT");
                enemyDirection = "left";
                enemyAnimation = "leftGoblin";
            }
            else if (currentNextPointX > currentGoblinXtile && currentNextPointY == currentGoblinYtile){
                //console.log("GO RIGHT");
                enemyDirection = "right";
                enemyAnimation = "rightGoblin";
            }
            else if (currentNextPointX > currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                //console.log("GO RIGHT DOWN");
                enemyDirection = "rightDown";
                enemyAnimation = "rightGoblin";
            }
            else if (currentNextPointX == currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                //console.log("GO DOWN");
                enemyDirection = "down";
                enemyAnimation = "downGoblin";
                
            }
            else if (currentNextPointX < currentGoblinXtile && currentNextPointY > currentGoblinYtile) {
                //console.log("GO LEFT DOWN");
                enemyDirection = "leftDown";
                enemyAnimation = "leftGoblin";
            }
            else{
                enemyDirection = "";
                enemyAnimation = "";
            }
            
           
                            
        });
        
        this.scene.easystar.calculate();
        

        switch(enemyDirection){
            case "leftUp":
                this.sprite.body.setVelocityX(-this.speed);
                this.sprite.body.setVelocityY(-this.speed);
                this.sprite.anims.play(enemyAnimation);
                break;
            case "up":
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(-this.speed);
                this.sprite.anims.play(enemyAnimation);
                break;
            case "rightUp":
                this.sprite.body.setVelocityX(this.speed);
                this.sprite.body.setVelocityY(-this.speed);
                this.sprite.anims.play(enemyAnimation);
                break;
            case "left":
                this.sprite.body.setVelocityX(-this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play(enemyAnimation);
                break;
            case "right":
                this.sprite.body.setVelocityX(this.speed);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play(enemyAnimation);
                break;
            case "rightDown":
                this.sprite.body.setVelocityX(this.speed);
                this.sprite.body.setVelocityY(this.speed);
                this.sprite.anims.play(enemyAnimation);
                break;
            case "down":
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(this.speed);
                this.sprit.anims.play(enemyAnimation);
                break;
            case "leftDown":
                this.sprite.body.setVelocityX(-this.speed);
                this.sprite.body.setVelocityY(this.speed);
                this.sprite.anims.play(enemyAnimation);
                break;
            default:
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(0);
                
        }


        /*
            //Pathfinding stuff
            var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            var pointerTileX = this.map.worldToTileX(worldPoint.x);
            var pointerTileY = this.map.worldToTileY(worldPoint.y);
            this.marker.x = this.map.tileToWorldX(pointerTileX);
            this.marker.y = this.map.tileToWorldY(pointerTileY);
            this.marker.setVisible(!this.checkCollision(pointerTileX,pointerTileY));

            var x = Game.camera.scrollX + pointer.x;
            var y = Game.camera.scrollY + pointer.y;
            var toX = Math.floor(x/32);
            var toY = Math.floor(y/32);
            var fromX = Math.floor(Game.player.x/32);
            var fromY = Math.floor(Game.player.y/32);
            console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');
        
            Game.finder.findPath(fromX, fromY, toX, toY, function( path ) {
                if (path === null) {
                    console.warn("Path was not found.");
                } else {
                    console.log(path);
                    Game.moveCharacter(path);
                }
            });
            Game.finder.calculate();
            


            var tweens = [];
            for(var i = 0; i < path.length-1; i++){
                var ex = path[i+1].x;
                var ey = path[i+1].y;
                tweens.push({
                    targets: Game.player,
                    x: {value: ex*Game.map.tileWidth, duration: 200},
                    y: {value: ey*Game.map.tileHeight, duration: 200}
                });
            }

            Game.scene.tweens.timeline({
                tweens: tweens
            });

            */


    }

    



    nightUpdate(time) {
        super.nightUpdate(time);
        //        if (this.active) {
        //            this.sprite.body.setVelocityX(-1 * this.speed);
        //            this.sprite.body.setVelocityY(0);
        //            this.sprite.anims.play("leftSlime", true);
        //        }
    }

}
