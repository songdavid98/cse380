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
        this.range = 250; //units in pixels, I think

        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.shoots = true;
        this.rateOfFire = 3;
        this.prevTime = 0;
        this.price = 400;
        
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
            for (let i = 0; i < this.class.targetEnem.length; i++) {
                let enem = this.class.targetEnem[i];
                //enem.health -= this.class.damage;
                if (enem.notTakenEffect) {
                    enem.slowDown();
                    enem.sprite.tint = 0x0072ff;
                }
                enem.damaged(this.class.damage);
            }
            this.class.targetFound = false;
        });
    }

    update(time, enemies) {
        if(this.targetFound)
            return;

        //Find enemies nearby
        let enemInRange = new Array();
        for (let i = 0; i < enemies.length; i++) {
            let enem = enemies[i];
            let defX = this.sprite.x;
            let defY = this.sprite.y;
            let enemX = enem.sprite.x;
            let enemY = enem.sprite.y;

            let enemDistToTower = this.distanceCalc(defX, defY, enemX, enemY);

            if (enemDistToTower > this.range)
                continue;
            enemInRange.push( enem );
        }
        this.targetEnem = enemInRange;
        if (this.targetEnem.length == 0){
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

        //this.playAnimation is from the generic class. 
        if(this.playAnimation){
            this.sprite.anims.play('rightIce',true); //enemy takes damage in animation
        }
        else{
            this.sprite.anims.play('rightIdleIce'); 
        }
    }


}
