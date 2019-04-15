//Night time defense structure

//Day time enemy
import {
    DEFSTR
} from "../constants/DefenseStructureTypes.js";

export class NightDefenseStructure {
    constructor(data) {
        this.sprite = data.sprite;
        this.defstrType = data.defstrType;
        this.health = data.health;
        this.basicAttack = data.basicAttack;
        this.speed = data.speed;
        //this.keyboard = data.keyboard;
        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.shoots = data.shoots;
        this.cooldown = data.cooldown;
        this.prevTime = 0;
        this.create();

        // for jakob
        // towers need a range depending on its type
        // they need access to a list of all the enemies
        // they need to have a target
        // do instant damage, just automatically reduce health without projectile


        //this.moveCounter = new Array(this.sprite.length).fill(0);
        //this.movement = new Array(this.sprite.length).fill(Math.random()*100);
        //this.goX = new Array(this.sprite.length).fill(true);
        //this.goY = new Array(this.sprite.length).fill(true);

    }
    init() {}

    create() {
        /*
        var downFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/down/', suffix:'.png' });
        this.anims.create({ key: 'downSlime', frames: downFrames, frameRate: 5, repeat: -1 });
        var upFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/up/', suffix:'.png' });
        this.anims.create({ key: 'upSlime', frames: upFrames, frameRate: 5, repeat: -1 });
        var leftFrames = this.anims.generateFrameNames(this.enemyType, { start: 1, end: 6, zeroPad: 4, prefix:'slime/left/', suffix:'.png' });
        this.anims.create({ key: 'leftSlime', frames: leftFrames, frameRate: 5, repeat: -1 });
        */
        var rightFrames = this.anims.generateFrameNames(this.enemyType, {
            start: 1,
            end: 6,
            zeroPad: 4,
            prefix: 'cannon/right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightSlime',
            frames: rightFrames,
            frameRate: 5,
            repeat: -1
        });

    }

    choose_target() {

    }

    update(time){
        if(Math.floor(time/1000) - Math.floor(this.prevTime/1000) >= this.cooldown){

        }
    }


}
