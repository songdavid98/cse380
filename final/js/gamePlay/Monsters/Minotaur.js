import {
    ENEMIES
} from "../../constants/EnemyTypes.js";

import {
    Enemy
} from "../Enemy.js";

export class Minotaur extends Enemy {

    constructor(data) {
        super(data);
        this.zzzSprite = data.zzzSprite;
        this.enemyType = ENEMIES.GOBLIN; // like slime
        this.health = 50;
        this.totalHealth = this.health; //Keep this for health bar stuff
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 200;
        this.movement = 60; //Monster keeps moving in square pattern for now
        this.killCost = 25;
        this.state = "waiting"; //The behavioral states of the goblin
        this.detectionRange = 1000; //Need this to know how far away the player has to be to get detected
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

        if (this.active && !this.dead) {
            switch (this.state) {
                case "waiting":
                    this.sprite.anims.play("rightIdleGoblin", true);
                    break;
                case "basic":

                    if (!player) {
                        //console.log("CAN'T detect plaeyer");
                    }
                    try {

                        let enemX = Math.floor((this.sprite.body.position.x + this.sprite.width / 2) / 80);
                        let enemY = Math.floor((this.sprite.body.position.y + this.sprite.height / 2) / 80);
                        let heroX = Math.floor((player.sprite.body.position.x + this.sprite.width / 2) / 80);
                        let heroY = Math.floor((player.sprite.body.position.y + this.sprite.height / 2) / 80);

                        this.attackDist(this.sprite.body.position.x, this.sprite.body.position.y, player.sprite.body.position.x, player.sprite.body.position.y);

                    } catch (error) {}

                    break;
            }
        }

    }


    attackDist(enemX, enemY, playerX, playerY) {
        let enemClass = this;

        let dist = Math.sqrt(Math.pow(enemX - playerX, 2) + Math.pow(enemY - playerY, 2));

        let currentEnemXTile = Math.floor(enemX);
        let currentEnemYtile = Math.floor(enemY);
        let currentNextPointX = Math.floor(playerX);
        let currentNextPointY = Math.floor(playerY);


        if (currentNextPointX < currentEnemXTile && currentNextPointY < currentEnemYTile) {
            //console.log("GO LEFT UP");
            enemClass.sprite.body.setVelocityX(-enemClass.speed);
            enemClass.sprite.body.setVelocityY(-enemClass.speed);
            enemClass.sprite.anims.play("leftGoblin", true);
        } else if (currentNextPointX == currentEnemXTile && currentNextPointY < currentEnemYTile) {
            //console.log("GO UP");
            enemClass.sprite.body.setVelocityX(0);
            enemClass.sprite.body.setVelocityY(-enemClass.speed);
            enemClass.sprite.anims.play("upGoblin", true);
        } else if (currentNextPointX > currentEnemXTile && currentNextPointY < currentEnemYTile) {
            //console.log("GO RIGHT UP");                     
            enemClass.sprite.body.setVelocityX(enemClass.speed);
            enemClass.sprite.body.setVelocityY(-enemClass.speed);
            enemClass.sprite.anims.play("rightGoblin", true);
        } else if (currentNextPointX < currentEnemXTile && currentNextPointY == currentEnemYTile) {
            //console.log("GO LEFT");                     
            enemClass.sprite.body.setVelocityX(-enemClass.speed);
            enemClass.sprite.body.setVelocityY(0);
            enemClass.sprite.anims.play("leftGoblin", true);
        } else if (currentNextPointX > currentEnemXTile && currentNextPointY == currentEnemYTile) {
            //console.log("GO RIGHT");                         
            enemClass.sprite.body.setVelocityX(enemClass.speed);
            enemClass.sprite.body.setVelocityY(0);
            enemClass.sprite.anims.play("rightGoblin", true);
        } else if (currentNextPointX > currentEnemXTile && currentNextPointY > currentEnemYTile) {
            //console.log("GO RIGHT DOWN");                       
            enemClass.sprite.body.setVelocityX(enemClass.speed);
            enemClass.sprite.body.setVelocityY(enemClass.speed);
            enemClass.sprite.anims.play("rightGoblin", true);
        } else if (currentNextPointX == currentEnemXTile && currentNextPointY > currentEnemYTile) {
            //console.log("GO DOWN");                        
            enemClass.sprite.body.setVelocityX(0);
            enemClass.sprite.body.setVelocityY(enemClass.speed);
            enemClass.sprite.anims.play("downGoblin", true);
        } else if (currentNextPointX < currentEnemXTile && currentNextPointY > currentEnemYTile) {
            //console.log("GO LEFT DOWN");    
            enemClass.sprite.body.setVelocityX(-enemClass.speed);
            enemClass.sprite.body.setVelocityY(enemClass.speed);
            enemClass.sprite.anims.play("leftGoblin", true);
        } else {
            enemClass.sprite.body.setVelocityX(0);
            enemClass.sprite.body.setVelocityY(0);
            enemClass.sprite.anims.play("downIdleGoblin");
        }

    }

    nightUpdate(time, level) {
        super.nightUpdate(time, level);
        //play animation here
    }

}
