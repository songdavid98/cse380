//Day time player
import { CST } from "../CST";
class DayPlayer{

    player! : Phaser.Physics.Arcade.Sprite;
    keyboard! : {[index: string ] : Phaser.Input.Keyboard.Key };

    constructor(data){
        super({
            key: CST.SCENES.PLAY,
        });
        var playerType = data.playerType; //Sword, mage, shield?
        var health = data.health;
        var attack = data.attack;
        var speed = data.speed;
    }
    init(){

    }

    preload(){
        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack1Left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack1Right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack1Up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });        
        this.anims.create({
            key: "attack1Down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack2Left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack2Right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack2Up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });        
        this.anims.create({
            key: "attack2Down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });              
        this.anims.create({
            key: "damageLeft",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });        
        this.anims.create({
            key: "damageRight",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "damageUp",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "damageDown",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "wallShield",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });

    }
    create(){
        this.player = this.physics.add.sprite(400, 400, playerType, 26).setScale(2);

        this.shieldWall = this.physics.add.group();

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if(pointer.isDown){
                let shield = this.add.sprite(pointer.x, pointer.y, "attack", "file.png").play("wallShield");
                this.shieldWall.add(shield);
                shield.on("animationcomplete", () => {
                    shield.destroy();
                })
                
            }
        });

    }
    update(time: number, delta: number){


        if(this.player.active === true){

            
            if(this.keyboard.A.isDown === true){
                this.player.setVelocityX(-64);
                this.player.play("left", true);
            }
            if(this.keyboard.D.isDown === true){
                this.player.setVelocityX(64);
                this.player.anims.playReverse("right", true);
            }

            if(this.keyboard.A.isUp && this.keyboard.D.isUp){
                this.player.setVelocityX(0);
            }

            if(this.keyboard.W.isDown === true){
                this.player.setVelocityY(64);
                this.player.play("up", true);
            }
            if(this.keyboard.S.isDown === true){
                this.player.setVelocityY(-64);
                this.player.anims.playReverse("down", true);
            }

            if(this.keyboard.W.isUp && this.keyboard.S.isUp){
                this.player.setVelocityY(0);
            }
        }
    }


    animation(){

    }
    movement(){

    }
    damage(monster){
        


    }




}
