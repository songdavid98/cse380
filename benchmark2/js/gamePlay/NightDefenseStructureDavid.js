//Night time defense structure

//Day time enemy
import {
    DEFSTR
} from "../constants/DefenseStructureTypes.js";

export class NightDefenseStructure {
    constructor(data) {

        this.sprite = data.sprite;
        //sprite has attribute x and y

        this.defstrType = data.defstrType;
        this.health = data.health;
        this.basicAttack = data.basicAttack;
        this.speed = data.speed;
        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.shoots = data.shoots;
        this.cooldown = data.cooldown; // unit is seconds
        this.prevTime = 0;
        this.create();
        this.placed = true;

        //this.moveCounter = new Array(this.sprite.length).fill(0);
        //this.movement = new Array(this.sprite.length).fill(Math.random()*100);
        //this.goX = new Array(this.sprite.length).fill(true);
        //this.goY = new Array(this.sprite.length).fill(true);

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

    searchForEnemy(enemies) {
        if (enemies && enemies.length > 0 this.placed) {

        }
    }

    update(time, enemies) {
        let timePassed = (time - this.prevTime) / 1000;

        if (timePassed < this.cooldown)
            return;




        let min = -1;
        let targetIndex = -1;

        if (this.enemies && this.enemies.sprite.length > 0 && this.defStrs[i].placed) {
            for (var j = 0; j < this.enemies.sprite.length; j++) {


                let defX = this.sprite.x;
                let defY = this.sprite.y;
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
            if (min <= this.minAttackDistance) {
                //this.defStrs[i].sprite.anims.play("rightCannon");

                //let animRef = .animationReference.isPlaying;

                //console.log("enemy nearby");
                if (Math.floor(time / 1000) - Math.floor(this.defStrs[i].prevTime / 1000) >= this.defStrs[i].cooldown) {

                    this.enemies.sprite.splice(targetIndex, 1)[0].destroy();
                    this.defStrs[i].prevTime = time;
                }
            }
        }

    }


}
