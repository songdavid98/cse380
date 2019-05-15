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
    }
    init() {}

    create() {
        //console.log(this.defstrType);
    }

    distanceCalc(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }

    searchForTarget(enemies) {

        if (enemies.length > 0 && this.placed) {
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
        if(this.targetFound){
            return;
        }

        //Find enemies nearby
        this.targetEnem = this.searchForTarget(enemies);
        if (this.targetEnem == null){
            this.playAnimation = false;    
            return;
        }

        //Cooldown for the defence structures
        let timePassed = (time - this.prevTime) / 1000;
        if (timePassed < this.rateOfFire){
            this.playAnimation = false;
            return;
        }

        //If timePassed is > this.rateOfFire and this.targetEnem exists, 
        this.playAnimation = true;    
        this.targetFound = true;
        this.prevTime = time;
    }


}
