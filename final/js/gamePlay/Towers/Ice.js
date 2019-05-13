//Night time defense structure

//Day time enemy
import {
    DEFSTR
} from "../../constants/DefenseStructureTypes.js";

import {
    NightDefenseStructure
} from "../NightDefenseStructure.js";

export class Ice extends NightDefenseStructure {
    constructor(data) {
        super(data);
        this.defStrType = DEFSTR.ICE;
        this.damage = 1;
        this.range = 300; //units in pixels, I think

        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.shoots = true;
        this.rateOfFire = 3;
        this.prevTime = 0;
        this.price = 150;
        
        this.placed = false;
        this.create();

    }
    init() {}

    create() {
        var rightFrames = this.anims.generateFrameNames('ICE', {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIce',
            frames: rightFrames,
            frameRate: 15,
            repeat: 0
        });
        var rightIdleFrames = this.anims.generateFrameNames('ICE', {
            start: 1,
            end: 1,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleIce',
            frames: rightIdleFrames,
            frameRate: 15,
            repeat: 0
        });
        
        //This is a generic animationComplete function. This sends it to different 'complete' animation functions
        //Only need this once. 
        this.sprite.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, this.sprite);

        //This animationComplete function is specific to "rightCannon". Underscore is necessary.
        //Make more for each different animation (if you want to do something after completeing loop)
        this.sprite.on('animationcomplete_rightIce', function (o1) {
            this.class.targetEnem.health -= this.class.damage;
            this.class.targetEnem.slowDown();
            this.class.targetFound = false;
        });
    }

    update(time, enemies) {
        super.update(time, enemies);


        //this.playAnimation is from the generic class. 
        if(this.playAnimation){
            this.sprite.anims.play('rightIce',true); //enemy takes damage in animation
        }
        else{
            this.sprite.anims.play('rightIdleIce'); 
        }
    }


}
