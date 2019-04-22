//Night time defense structure

//Day time enemy
import {
    DEFSTR
} from "../constants/DefenseStructureTypes.js";

export class NightDefenseStructure {
    constructor(data) {

        this.sprite = data.sprite;
        this.physics = data.physics;
        this.anims = data.anims;
        //sprite has attribute x and y

        //        this.defstrType = data.defstrType;
        //        this.health = data.health;
        //        this.damage = data.d;
        //        this.speed = data.speed;
        //
        //        this.range = data.range;
        //        this.active = true; //FIXME: remove this
        //        this.shoots = data.shoots;
        //        this.cooldown = data.cooldown; // unit is seconds
        //        this.prevTime = 0;
        //        this.create();
        //        this.placed = true;
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

    distanceCalc(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }

    searchForTarget(enemies) {

        if (enemies && enemies.length > 0 && this.placed) {

            let chosenEnem = null;
            for (let j = 0; j < enemies.length; j++) {
                let enem = enemies[j];

                let defX = this.sprite.x;
                let defY = this.sprite.y;
                let enemX = enem.sprite.x;
                let enemY = enem.sprite.y;

                let enemDistToTower = this.distanceCalc(defX, defY, enemX, enemY);

                if (enemDistToTower > this.range)
                    continue;
                if (chosenEnem == null || chosenEnem.distanceTraveled < enem.distanceTraveled)
                    chosenEnem = enem;
            }
            return chosenEnem;
        }
        return null;
    }

    update(time, enemies) {
        let timePassed = (time - this.prevTime) / 1000;

        if (timePassed < this.cooldown)
            return;

        let targetEnem = this.searchForTarget(enemies);
        if (targetEnem == null)
            return;

        targetEnem.health -= this.damage;
        this.prevTime = time;
    }


}
