import {
    ENEMIES
} from "../../constants/EnemyTypes.js";

import {
    Enemy
} from "../Enemy.js";

export class Golem extends Enemy{       //   ---- Someone fix this~

    constructor(data) {
        super(data);
        this.enemyType = ENEMIES.GOLEM; // like slime
        this.health = 5;
        this.basicAttack = 1;
        this.basicAttackSpeed = 80;
        this.speed = 100;
        this.movement = 100; //Monster keeps moving in square pattern for now
        //taken care of in super constructor
                this.sprite = data.sprite;
        //        this.physics = data.physics;
                this.anims = data.anims;
        //        this.distanceTraveled = 0;
        //        this.active = true;

        this.create();

    }


    init() {}

    create() {

       

    }

    dayUpdate(time) {
        //have dayscene activity here
    }
    nightUpdate(time) {
        super.nightUpdate(time);
        //        if (this.active) {
        //            this.sprite.body.setVelocityX(-1 * this.speed);
        //            this.sprite.body.setVelocityY(0);
        //            this.sprite.anims.play("leftSlime", true);
        //        }
    }

}
