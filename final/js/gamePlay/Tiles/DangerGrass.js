import {
    Environment
} from "../Environment.js";

export class DangerGrass extends Environment { // ---- someone fix this~

    constructor(data) {
        super(data);
        this.basicAttack = 1;
        this.attackCooldown = 5;
        this.attacking = null;
        this.targetFound = null;


        //taken care of in super constructor
        //        this.sprite = data.sprite;
        //        this.physics = data.physics;
        //        this.anims = data.anims;
        //        this.active = true;

        //this.create();

    }


    init() {}

    create() {

       
    }

    dayUpdate(time) {


        

        
    }
    
    attack() {
        
    }

}
