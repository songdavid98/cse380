import {
    ENEMIES
} from "../../constants/EnemyTypes.js";
import {
    HEROES
} from "../../constants/PlayerTypes.js";

import {
    Enemy
} from "../Enemy.js";

export class Minotaur extends Enemy {

    constructor(data) {
        super(data);
        this.zzzSprite = data.zzzSprite;
        this.enemyType = ENEMIES.MINOTAUR; // like slime
        this.health = 50;
        this.atkDist = 150; 
        this.hitBoxSize = 1.3;
        this.totalHealth = this.health; //Keep this for health bar stuff
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 200;
        this.movement = 60; //Monster keeps moving in square pattern for now
        this.killCost = 25;
        this.state = "waiting"; //The behavioral states of the mino
        this.detectionRange = 1000; //Need this to know how far away the player has to be to get detected
        this.frmRt = 10;
        this.behaviourCounter = 0;
        this.active = true;
        this.dead = false;
        this.movementTime = 20;
        this.counter = 0;


        this.lastAttacked = 0;
        this.atkCooldown = 3;





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
        var leftFramesMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftMinotaur',
            frames: leftFramesMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });
        var leftIdleFrameMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'left/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'leftIdleMinotaur',
            frames: leftIdleFrameMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });

        var rightFramesMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightMinotaur',
            frames: rightFramesMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });
        var rightIdleFrameMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleMinotaur',
            frames: rightIdleFrameMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });

        var upFramesMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upMinotaur',
            frames: upFramesMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });
        var upIdleFrameMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'up/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'upIdleMinotaur',
            frames: upIdleFrameMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });

        var downFramesMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downMinotaur',
            frames: downFramesMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });
        var downIdleFrameMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 2,
            end: 2,
            zeroPad: 4,
            prefix: 'down/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'downIdleMinotaur',
            frames: downIdleFrameMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });

        var attackLeftFramesMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'swingLeft/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'attackLeftMinotaur',
            frames: attackLeftFramesMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });

        var attackRightFramesMinotaur = this.anims.generateFrameNames(ENEMIES.MINOTAUR, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'swingRight/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'attackRightMinotaur',
            frames: attackRightFramesMinotaur,
            frameRate: this.frameRate,
            repeat: -1
        });




    }




    dayUpdate(time, player) {
        //have dayscene activity here
        
        if(!this.dead && !player.dead){
            //Call the enemy class dayUpdate
            super.dayUpdate(time);
        
            let distance = Phaser.Math.Distance.Between(this.sprite.body.position.x,this.sprite.body.position.y,this.scene.player.sprite.body.position.x,this.scene.player.sprite.body.position.y);
            //console.log(Phaser.Math.Distance.Between(this.sprite.body.position.x,this.sprite.body.position.y,this.scene.player.sprite.body.position.x,this.scene.player.sprite.body.position.y));
            if(this.state != 'attacking' && this.state != 'basic' && distance <= 500){
                this.state = 'basic';
                console.log("testing");
            }

            if (this.active && !this.dead) {
                switch (this.state) {
                    case "waiting":
                        this.sprite.anims.play("rightIdleMinotaur", true);
                        break;
                    case "basic":

                        if (!player) {
                            //console.log("CAN'T detect plaeyer");
                        }
                        try {

                            if(this.counter > this.movementTime){  
                                    this.attackDist(this.sprite.body.position.x, this.sprite.body.position.y, player.sprite.body.position.x, player.sprite.body.position.y);
                                    if(distance <= 300 && time - this.lastAttacked >= this.atkCooldown*1000){
                                        this.lastAttacked = time;
                                        console.log(this.state);
                                        this.sprite.body.setVelocity(0,0);
                                        this.state = 'attacking';
                                        this.attack();
                                    }
                                    this.counter = 0;
                                    
                            }
                            else{
                                this.counter++;
                            }

                        } catch (error) {console.log(error);}

                        break;
                }
            }
        }

    }


    attackDist(enemX, enemY, playerX, playerY) {
        console.log('enters attack');
        let enemClass = this;

        let dist = Math.sqrt(Math.pow(enemX - playerX, 2) + Math.pow(enemY - playerY, 2));

        let currentEnemXTile = Math.floor(enemX);
        let currentEnemYTile = Math.floor(enemY);
        let currentNextPointX = Math.floor(playerX);
        let currentNextPointY = Math.floor(playerY);
        //console.log(currentEnemXTile);
        //console.log(currentNextPointX);


        if (currentNextPointX < currentEnemXTile && currentNextPointY < currentEnemYTile) {
            //console.log("GO LEFT UP");
            enemClass.sprite.body.setVelocityX(-enemClass.speed);
            enemClass.sprite.body.setVelocityY(-enemClass.speed);
            enemClass.sprite.anims.play("leftMinotaur", true);
        } else if (currentNextPointX == currentEnemXTile && currentNextPointY < currentEnemYTile) {
            //console.log("GO UP");
            enemClass.sprite.body.setVelocityX(0);
            enemClass.sprite.body.setVelocityY(-enemClass.speed);
            enemClass.sprite.anims.play("upMinotaur", true);
        } else if (currentNextPointX > currentEnemXTile && currentNextPointY < currentEnemYTile) {
            //console.log("GO RIGHT UP");                     
            enemClass.sprite.body.setVelocityX(enemClass.speed);
            enemClass.sprite.body.setVelocityY(-enemClass.speed);
            enemClass.sprite.anims.play("rightMinotaur", true);
        } else if (currentNextPointX < currentEnemXTile && currentNextPointY == currentEnemYTile) {
            //console.log("GO LEFT");                     
            enemClass.sprite.body.setVelocityX(-enemClass.speed);
            enemClass.sprite.body.setVelocityY(0);
            enemClass.sprite.anims.play("leftMinotaur", true);
        } else if (currentNextPointX > currentEnemXTile && currentNextPointY == currentEnemYTile) {
            //console.log("GO RIGHT");                         
            enemClass.sprite.body.setVelocityX(enemClass.speed);
            enemClass.sprite.body.setVelocityY(0);
            enemClass.sprite.anims.play("rightMinotaur", true);
        } else if (currentNextPointX > currentEnemXTile && currentNextPointY > currentEnemYTile) {
            //console.log("GO RIGHT DOWN");                       
            enemClass.sprite.body.setVelocityX(enemClass.speed);
            enemClass.sprite.body.setVelocityY(enemClass.speed);
            enemClass.sprite.anims.play("rightMinotaur", true);
        } else if (currentNextPointX == currentEnemXTile && currentNextPointY > currentEnemYTile) {
            //console.log("GO DOWN");                        
            enemClass.sprite.body.setVelocityX(0);
            enemClass.sprite.body.setVelocityY(enemClass.speed);
            enemClass.sprite.anims.play("downMinotaur", true);
        } else if (currentNextPointX < currentEnemXTile && currentNextPointY > currentEnemYTile) {
            //console.log("GO LEFT DOWN");    
            enemClass.sprite.body.setVelocityX(-enemClass.speed);
            enemClass.sprite.body.setVelocityY(enemClass.speed);
            enemClass.sprite.anims.play("leftMinotaur", true);
        } else {
            //console.log("GO DOWN");
            enemClass.sprite.body.setVelocityX(0);
            enemClass.sprite.body.setVelocityY(0);
            enemClass.sprite.anims.play("downIdleMinotaur");
        }

    }

    nightUpdate(time, level) {
        super.nightUpdate(time, level);
        //play animation here
    }
    attack(){
        console.log("attacckckckk!!111");
        let pointY;
        let pointX;
        let angle = Phaser.Math.Angle.BetweenPoints(this.sprite, this.scene.player.sprite);
        pointX = this.sprite.x + this.atkDist * (Math.sin(Math.PI / 2 - angle));
        pointY = this.sprite.y + this.atkDist * (Math.cos(Math.PI / 2 - angle));


        let swordSlashSprite = this.scene.physics.add.sprite(pointX, pointY, HEROES.SWORD_HERO, 'sword/0001.png').setScale(5, 5);
        swordSlashSprite.class = this;

        this.scene.physics.add.collider(swordSlashSprite, this.scene.wallLayer);
        //this.scene.physics.add.collider(swordSlashSprite,this.scene.enemyGroup.getChildren());
        
        let xx = Math.abs(this.hitBoxSize*swordSlashSprite.height * (Math.sin(angle + Math.PI / 2))) + this.hitBoxSize*Math.abs(swordSlashSprite.width * (Math.sin(angle)));
        let yy = Math.abs(this.hitBoxSize*swordSlashSprite.width * (Math.cos(angle))) + this.hitBoxSize*Math.abs(swordSlashSprite.height * (Math.cos(angle + Math.PI / 2)));

        swordSlashSprite.body.setSize(xx, yy);


        let radius = 2;
        //swordSlashSprite.body.setOffset(radius*Math.cos(super.properAngle())-swordSlashSprite.width/2,radius*Math.sin(super.properAngle())-swordSlashSprite.height/2);
        swordSlashSprite.body.setOffset(0,0);

        swordSlashSprite.setRotation(angle - Math.PI / 4);
        this.scene.physics.overlap(this.scene.playerGroup.getChildren(),swordSlashSprite,function(player,swordSprite){
            player.class.damage(swordSprite);
        })
        swordSlashSprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, swordSlashSprite);

        swordSlashSprite.on('animationcomplete_sword', function (o1, o2, o3) {
            console.log(this);
            this.class.state = 'basic';
            this.destroy();
        });

        swordSlashSprite.body.setVelocityY(this.basicAttackSpeed * Math.sin(this.angle));
        swordSlashSprite.body.setVelocityX(this.basicAttackSpeed * Math.cos(this.angle));
        //console.log(shieldSprite);        
        swordSlashSprite.anims.play("sword");

        if(angle > -Math.PI/2 && angle < Math.PI/2){
            this.sprite.anims.play("attackRightMinotaur");
        }
        else{
            this.sprite.anims.play("attackLeftMinotaur");

        }

        //The beam attacked
    }

}
