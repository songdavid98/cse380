//Day time player

class DayPlayer{
    constructor(data){
        var playerType = data.playerType; //Sword, mage, shield?
        var health = data.health;
        var attack = data.attack;
        var speed = data.speed;
    }
    init(){

    }
    create(){
        this.player = this.add.sprite(400, 400, playerType, 26).setScale(2);
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
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });
        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(playerType, {
                start: 1,
                end: 2
            })        
        });

    }


    animation(){

    }
    movement(){

    }
    damage(monster){
        


    }




}
