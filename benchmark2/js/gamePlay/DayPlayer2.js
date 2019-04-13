//Day time player

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
        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack1Left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack1Right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack1Up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });        
        this.anims.create({
            key: "attack1Down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack2Left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack2Right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "attack2Up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });        
        this.anims.create({
            key: "attack2Down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });              
        this.anims.create({
            key: "damageLeft",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });        
        this.anims.create({
            key: "damageRight",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "damageUp",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "damageDown",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "wallShield",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(this.playerType, {
                start: 1,
                end: 2
            })        
        });

    }
    create(){

        this.player = this.physics.add.sprite(400, 400, 'shieldHero1',this.playerType, 26).setScale(2);
            //this.capguy = this.physics.add.sprite(600, 400,'cityscene', 'capguy/walk/0001.png');
            //this.capguy.setScale(0.5, 0.5);

        // animation
            //var frameNames = this.anims.generateFrameNames('cityscene', { start: 1, end: 8, zeroPad: 4, prefix:'capguy/walk/', suffix:'.png' });
        var frameNames = this.anims.generateFrameNames('shieldHero1', { start: 1, end: 4, zeroPad: 4, prefix:'shieldHero1/', suffix:'.png' });

        //  this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
       //    this.capguy.anims.play('walk');
        
        this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
        console.log(this.anims);
        this.player.anims.play('walk');

        this.shieldWall = this.physics.add.group();

        //this.keyboard.addKeys("W, A, S, D");
        console.log(this.keyboard);
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
                this.sprite.body.setVelocityX(-128);
                //this.player.play("left", true);
            }else if(this.keyboard.keys[68].isDown){
                this.sprite.body.setVelocityX(128);
                //this.player.anims.playReverse("right", true);
            }

            if(this.keyboard.keys[83].isUp || this.keyboard.keys[87].isUp){
                this.sprite.body.setVelocityY(0)
            }
            if(this.keyboard.keys[83].isDown && this.keyboard.keys[87].isDown){
                this.sprite.body.setVelocityY(0);
            }else if(this.keyboard.keys[83].isDown){
                this.sprite.body.setVelocityY(128); //y goes down, not up
                //this.player.play("up", true);
            }else if(this.keyboard.keys[87].isDown){
                this.sprite.body.setVelocityY(-128);
                //this.player.anims.playReverse("down", true);
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