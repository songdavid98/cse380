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
        this.damage = 3;
        this.range = 500; //units in pixels, I think

        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        this.active = true; //FIXME: remove this
        this.shoots = true;
        this.rateOfFire = 3; //once every x seconds
        this.prevTime = 0;
        this.price = 150;

        this.placed = false;
        
        this.projectile = null;
        
        this.create();

    }
    init() {}

    create() {
        var rightFrames = this.anims.generateFrameNames('CANNON', {
            start: 1,
            end: 5,
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
        var rightIdleFrames = this.anims.generateFrameNames('CANNON', {
            start: 3,
            end: 3,
            zeroPad: 4,
            prefix: 'right/',
            suffix: '.png'
        });
        this.anims.create({
            key: 'rightIdleCannon',
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
        //Make more for each different animation (if you want to do something after completing loop)
        this.sprite.on('animationcomplete_rightCannon', function (o1) {
            //this.class.targetEnem.health -= this.class.damage;
            let enemX = this.class.targetEnem.sprite.x;
            let enemY = this.class.targetEnem.sprite.y;
            
            this.class.projectile.sprite.x = this.class.sprite.x;
            this.class.projectile.sprite.y = this.class.sprite.y;
            
            let enemDistToTower= this.class.distanceCalc(this.class.sprite.x, this.class.sprite.y, enemX, enemY);
            
            let vx = (enemX - this.class.sprite.x) / enemDistToTower;
            let vy = (enemY - this.class.sprite.y) / enemDistToTower;
            
            this.class.projectile.vx = vx;
            this.class.projectile.vy = vy;
            this.class.projectile.dead = false;
            
            this.class.targetFound = false;
        });
        // console.log(this.anims);
    }
    
    update(time, enemies) {
        super.update(time, enemies);
        
        //this.playAnimation is from the generic class. 
        if(this.playAnimation){
            this.sprite.anims.play('rightCannon',true); //enemy takes damage in animation
        }
        else{
            this.sprite.anims.play('rightIdleCannon'); 
        }
    }


}
