//Day time enemy
import {
    ENEMIES
} from "../constants/EnemyTypes.js";

export class NightEnemy {
    constructor(data) {

        this.x = data.x;
        this.y = data.y;

        this.distanceTraveled = 0;

        this.sprite = data.sprite;
        this.enemyType = data.enemyType; // like slime
        this.health = data.health;
        this.basicAttack = data.basicAttack;
        this.basicAttackSpeed = data.basicAttackSpeed;
        this.speed = data.speed;
        this.keyboard = data.keyboard;
        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true;
        this.create();

    }
    init() {}

    create() {}

    update(time) {
        if (this.active) {
            this.sprite.body.setVelocityX(-1 * this.speed);
            this.sprite.body.setVelocityY(0);
            //this.sprite.anims.play("leftSlime", true);
        }
    }

}
