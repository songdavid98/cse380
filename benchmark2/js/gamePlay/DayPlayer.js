//Day time player
import {HEROES} from "../constants/PlayerTypes.js";
export class DayPlayer{

    constructor(data){
        this.sprite = data.sprite;
        this.playerType = data.playerType; //Sword, mage, shield?
        this.health = data.health;
        this.basicAttack = data.basicAttack;
        this.specialAttack = data.specialAttack;
        this.speed = data.speed;
        this.keyboard = data.keyboard;
        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.create();
    }
    init(){

    }

    preload(){
      

    }
    create(){
        

        // animation
        var leftFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'shieldHero/left/', suffix:'.png' });
        this.anims.create({ key: 'left', frames: leftFrames, frameRate: 5, repeat: -1 });
        var leftIdleFrame = this.anims.generateFrameNames(this.playerType, { start: 2, end: 2, zeroPad: 4, prefix:'shieldHero/left/', suffix:'.png' });
        this.anims.create({ key: 'leftIdle', frames: leftIdleFrame, frameRate: 5, repeat: -1 });
        var leftBasicAttackFrame = this.anims.generateFrameNames(this.playerType, { start: 2, end: 2, zeroPad: 4, prefix:'shieldHero/attackLeft/', suffix:'.png' });
        this.anims.create({ key: 'leftBasicAttack', frames: leftBasicAttackFrame, frameRate: 5, repeat: -1 });

        var rightFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'shieldHero/right/', suffix:'.png' });
        this.anims.create({ key: 'right', frames: rightFrames, frameRate: 5, repeat: -1 });
        var rightIdleFrame = this.anims.generateFrameNames(this.playerType, { start: 2, end: 2, zeroPad: 4, prefix:'shieldHero/right/', suffix:'.png' });
        this.anims.create({ key: 'rightIdle', frames: rightIdleFrame, frameRate: 5, repeat: -1 });
        var rightBasicAttackFrame = this.anims.generateFrameNames(this.playerType, { start: 2, end: 2, zeroPad: 4, prefix:'shieldHero/attackRight/', suffix:'.png' });
        this.anims.create({ key: 'rightBasicAttack', frames: rightBasicAttackFrame, frameRate: 5, repeat: -1 });

        var upFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'shieldHero/up/', suffix:'.png' });
        this.anims.create({ key: 'up', frames: upFrames, frameRate: 5, repeat: -1 });
        var upIdleFrame = this.anims.generateFrameNames(this.playerType, { start: 1, end: 1, zeroPad: 4, prefix:'shieldHero/up/', suffix:'.png' });
        this.anims.create({ key: 'upIdle', frames: upIdleFrame, frameRate: 5, repeat: -1 });
        var upBasicAttackFrame = this.anims.generateFrameNames(this.playerType, { start: 1, end: 1, zeroPad: 4, prefix:'shieldHero/attackUp/', suffix:'.png' });
        this.anims.create({ key: 'upBasicAttack', frames: upBasicAttackFrame, frameRate: 5, repeat: -1 });

        var downFrames = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'shieldHero/down/', suffix:'.png' });
        this.anims.create({ key: 'down', frames: downFrames, frameRate: 5, repeat: -1 });
        var downIdleFrame = this.anims.generateFrameNames(this.playerType, { start: 2, end: 2, zeroPad: 4, prefix:'shieldHero/down/', suffix:'.png' });
        this.anims.create({ key: 'downIdle', frames: downIdleFrame, frameRate: 5, repeat: -1 });
        var downBasicAttackFrame = this.anims.generateFrameNames(this.playerType, { start: 2, end: 2, zeroPad: 4, prefix:'shieldHero/attackDown/', suffix:'.png' });
        this.anims.create({ key: 'downBasicAttack', frames: downBasicAttackFrame, frameRate: 5, repeat: -1 });

        var shieldFrame = this.anims.generateFrameNames(this.playerType, { start: 1, end: 4, zeroPad: 4, prefix:'shieldHero/shield/', suffix:'.png' });
        this.anims.create({ key: 'shield', frames: shieldFrame, frameRate: 5, repeat: -1 });


    }
    update(angle){
        if(this.active === true){
            //if either are released, set velocityX to 0 for now
            //what if an enemy makes someone move?
            //NOTE: keycodes => W = 87, A = 65, S = 83, D = 68
            if(this.keyboard.keys[68].isUp || this.keyboard.keys[65].isUp){     //if D and A are up
                this.sprite.body.setVelocityX(0);
            }
            if(this.keyboard.keys[65].isDown && this.keyboard.keys[68].isDown){ //if D and A are down
                this.sprite.body.setVelocityX(0);
            }
            else if(this.keyboard.keys[65].isDown){                            //else if A is down (and not D)
                this.sprite.body.setVelocityX(-this.speed);
            }
            else if(this.keyboard.keys[68].isDown){                            //else if D is down (and not A)
                this.sprite.body.setVelocityX(this.speed);
            }

            if(this.keyboard.keys[83].isUp || this.keyboard.keys[87].isUp){     //if S and W are up
                this.sprite.body.setVelocityY(0);
            }
            if(this.keyboard.keys[83].isDown && this.keyboard.keys[87].isDown){ //if S and W are down
                this.sprite.body.setVelocityY(0);
            }
            else if(this.keyboard.keys[83].isDown){                            //if S is down (and not W)
                this.sprite.body.setVelocityY(this.speed); //y goes down, not up
            }
            else if(this.keyboard.keys[87].isDown){                            //if W is down (and not S)
                this.sprite.body.setVelocityY(-this.speed);
            }




            //Rotation of sprite and box
            if(angle > -Math.PI/4 && angle <= Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("rightIdle");
                }else{
                    this.sprite.anims.play("right", true);
                }
                this.sprite.setRotation(angle );                //Rotates the image
                this.sprite.body.angle = angle;                 //Rotates the box (playerclass)
            }
            else if(angle > -3*Math.PI/4 && angle <= -Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("upIdle");
                }else{
                    this.sprite.anims.play("up", true);
                }
                this.sprite.setRotation(angle + Math.PI/2);     //Rotates the image
                this.sprite.body.angle = angle + Math.PI/2;     //Rotates the box (playerclass)
            }
            else if((angle > 3*Math.PI/4 && angle <= Math.PI) ||  (angle <= -3*Math.PI/4 && angle >= -Math.PI)){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("leftIdle");
                }else{
                    this.sprite.anims.play("left", true);
                }
                this.sprite.setRotation(angle - Math.PI);       //Rotates the image
                this.sprite.body.angle = angle - Math.PI;       //Rotates the box (playerclass)
            }
            else if(angle <= 3*Math.PI/4 && angle > Math.PI/4){
                if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                    this.sprite.anims.play("downIdle");
                }else{
                    this.sprite.anims.play("down", true);
                }
                this.sprite.setRotation(angle - Math.PI/2);     //Rotates the image
                this.sprite.body.angle = angle - Math.PI/2;     //Rotates the box (playerclass)
            }
            //console.log(angle/ (Math.PI/180));


            //Stopping animation
            if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                //this.sprite.anims.stop(null, true);             //Stops the animation and sets frame to 1
            }




            
        }
        
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle){
        /*
        this.shieldWall = this.physics.add.group();
        let shield = this.add.sprite(pointer.x, pointer.y, "attack", "file.png").play('shield');
        this.shieldWall.add(shield);
        shield.on("animationcomplete", () => {
            shield.destroy();
        })
        */
    }

    attackSpecial(cursor, angle){


    }


    animation(){

    }
    movement(){

    }
    damage(monster){
        


    }




}
