//Night time defense structure

//Day time enemy
import {
    DEFSTR
} from "../../constants/DefenseStructureTypes.js";

import {
    NightDefenseStructure
} from "../NightDefenseStructure.js";

export class Cannon extends NightDefenseStructure {
    constructor(data) {
        super(data);
        this.defStrType = DEFSTR.CANNON;
        this.health = 3;
        this.damage = 5;
        this.speed = 128;
        this.range = 300; //units in pixels, I think

        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.shoots = true;
        this.cooldown = 3;
        this.prevTime = 0;

        this.placed = false;
        this.create();

    }
    init() {}

    create() {
        var rightFrames = this.anims.generateFrameNames(this.defstrType, {
            start: 1,
            end: 4,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightCannon',
            frames: rightFrames,
            frameRate: 15,
            repeat: 0
        });
    }

    update(time, enemies) {
        super.update(time, enemies);
    }


}
