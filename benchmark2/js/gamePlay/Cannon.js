//Night time defense structure

//Day time enemy
import {
    DEFSTR
} from "../constants/DefenseStructureTypes.js";

export class NightDefenseStructure {
    constructor(data) {
        this.defstrType = DEFSTR.CANNO;
        this.health = 3;
        this.basicAttack = 1;
        this.speed = 128;

        this.sprite = data.sprite;
        this.physics = data.physics;
        this.anims = data.anims;

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

    update(time) {
        if (Math.floor(time / 1000) - Math.floor(this.prevTime / 1000) >= this.cooldown) {

        }
        for (var i = 0; i < this.defStrs.length; i++) {
            let min = -1;
            let targetIndex = -1;
            if (this.enemies && this.enemies.sprite.length > 0) {
                for (var j = 0; j < this.enemies.sprite.length; j++) {
                    let defX = this.defStrs[i].sprite.x;
                    let defY = this.defStrs[i].sprite.y;
                    let enemX = this.enemies.sprite[j].x;
                    let enemY = this.enemies.sprite[j].y;
                    //console.log(enemX);
                    // console.log(enemY);
                    // console.log(defX);
                    //console.log(defY);
                    let possibleMin = Math.sqrt(Math.pow((defX - enemX), 2) + Math.pow((defY - enemY), 2));
                    //console.log(possibleMin);
                    if (min == -1 || min > possibleMin) {
                        min = possibleMin;
                        targetIndex = j;
                    }
                }
                //console.log(min);
                if (min <= this.maxAttackDistance) {
                    //console.log("enemy nearby");
                    if (Math.floor(time / 1000) - Math.floor(this.defStrs[i].prevTime / 1000) >= this.defStrs[i].cooldown) {
                        this.enemies.sprite.splice(targetIndex, 1)[0].destroy();
                        this.defStrs[i].prevTime = time;
                    }
                }
            }
        }

    }


}
