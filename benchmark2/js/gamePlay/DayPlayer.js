//Day time player
import {HEROES} from "../constants/PlayerTypes.js";
export class DayPlayer{

    constructor(data){
        this.sprite = data.sprite;
        this.playerType = data.playerType; //Sword, mage, shield?
        this.health = data.health;
        this.attack = data.attack;
        this.speed = data.speed;
        this.keyboard = data.keyboard;
        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.preload();
    }
    init(){

    }

    preload(){
      

    }
    create(){
        this.player = this.physics.add.sprite(600, 400, HEROES.SHIELD_HERO, 'shieldHero/left/0001.png');
        this.player.setScale(5, 5);
        //this.capguy = this.physics.add.sprite(600, 400,HEROES.SHIELD_HERO, 'capguy/0001.png');
        //this.capguy.setScale(0.5, 0.5);

        // animation
            //var frameNames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 8, zeroPad: 4, prefix:'capguy/', suffix:'.png' });
        var frameNames = this.anims.generateFrameNames(HEROES.SHIELD_HERO, { start: 1, end: 4, zeroPad: 4, prefix:'shieldHero/left/', suffix:'.png' });
        console.log(frameNames);
        //this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
       // this.capguy.anims.play('walk');
        this.anims.create({ key: 'left', frames: frameNames, frameRate: 5, repeat: -1 });
        console.log(this.anims); 
        this.player.anims.play('left');

        //this.shieldWall = this.physics.add.group();

        //this.keyboard.addKeys("W, A, S, D");
        //console.log(this.keyboard);
        /*this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if(pointer.isDown){
                let shield = this.add.sprite(pointer.x, pointer.y, "attack", "file.png").play("wallShield");
                this.shieldWall.add(shield);
                shield.on("animationcomplete", () => {
                    shield.destroy();
                })
            }
        });*/

    }
    update(){

        /*
        if(this.active === true){
            this.keyboard.on("keydown", function(e){
                //console.log(e);
            });
            //this.sprite.animations.play('walk', 4, true);
            
            //if either are released, set velocityX to 0 for now
            //what if an enemy makes someone move?
            //NOTE: keycodes => W = 87, A = 65, S = 83, D = 68
            if(this.keyboard.keys[68].isUp || this.keyboard.keys[65].isUp){
                this.sprite.body.setVelocityX(0);
            }
            if(this.keyboard.keys[65].isDown && this.keyboard.keys[68].isDown){
                this.sprite.body.setVelocityX(0);
            }else if(this.keyboard.keys[65].isDown){
                //console.log("eyboi");
                this.sprite.body.setVelocityX(-this.speed);
                if(!this.sprite.anims.isPlaying){
                    //this.sprite.anims.play("left", true);
                }
            }else if(this.keyboard.keys[68].isDown){
                this.sprite.body.setVelocityX(this.speed);
                if(!this.sprite.anims.isPlaying){
                   // this.sprite.anims.playReverse("left", true);
                }
            }

            if(this.keyboard.keys[83].isUp || this.keyboard.keys[87].isUp){
                this.sprite.body.setVelocityY(0)
            }
            if(this.keyboard.keys[83].isDown && this.keyboard.keys[87].isDown){
                this.sprite.body.setVelocityY(0);
            }else if(this.keyboard.keys[83].isDown){
                this.sprite.body.setVelocityY(this.speed); //y goes down, not up
                if(!this.sprite.anims.isPlaying){
                    //this.sprite.anims.play("down", true);
                }
            }else if(this.keyboard.keys[87].isDown){
                this.sprite.body.setVelocityY(-this.speed);
                if(!this.sprite.anims.isPlaying){
                   // this.sprite.anims.playReverse("down", true);
                }
            }
            if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                //console.log("hello");
                this.sprite.setFrame(1);
            }
            
        }
        */
    }


    animation(){

    }
    movement(){

    }
    damage(monster){
        


    }




}
