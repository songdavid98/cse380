//Day time enemy
import {
    ENVIRONMENT
} from "../constants/EnvironmentTypes.js";


export class Environment {
    constructor(data) {
        this.physics = data.physics;
        this.anims = data.anims;
        this.scene = data.scene;

        this.active = true;
        this.create(); //Must call create ... that's odd?

    }
    init() {}

    create() {
        

    }


}
