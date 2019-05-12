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
            end: 5,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        console.log(rightFrames);
        this.anims.create({
            key: 'rightIce',
            frames: rightFrames,
            frameRate: 15,
            repeat: 0
        });
        this.sprite.on('animationcomplete', function (anim, frame) {
            
            this.class.targetEnem.health -= this.class.damage;
            this.class.targetEnem.slowDown();
            this.class.targetFound = false;
        }, this.sprite);
        console.log(this.anims);
    }

    update(time, enemies) {
        super.update(time, enemies);
    }


}
