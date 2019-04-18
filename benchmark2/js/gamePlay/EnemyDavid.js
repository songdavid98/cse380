//Day time enemy
import {
    ENEMIES
} from "../constants/EnemyTypes.js";

export class Enemy {
    constructor(data) {

        this.distanceTraveled = 0;

        this.sprite = data.sprite;
        //sprite has attributes x and y

        this.enemyType = data.enemyType; // like slime
        this.health = data.health;
        this.basicAttack = data.basicAttack;
        this.basicAttackSpeed = data.basicAttackSpeed;
        this.speed = data.speed;
        this.physics = data.physics;
        this.anims = data.anims;
        this.active = true;
        this.create();

    }
    init() {}

    create() {}

    dayUpdate() {
        if (this.sprite.active) {
            if (this.goX[i] && this.goY[i]) {
                this.sprite.body.setVelocityX(this.movement[i]);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("rightSlime", true);
                this.moveCounter[i]++;
                if (this.moveCounter[i] >= 50) {
                    this.goX[i] = false;
                    this.goY[i] = false;
                    this.moveCounter[i] = 0;
                }
            } else if (this.goX[i] == false && this.goY[i] == false) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(this.movement[i]);
                this.sprite.anims.play("downSlime", true);
                this.moveCounter[i]++;
                if (this.moveCounter[i] >= 50) {
                    this.goX[i] = true;
                    this.goY[i] = false;
                    this.moveCounter[i] = 0;
                }
            } else if (this.goX[i] == true && this.goY[i] == false) {
                this.sprite.body.setVelocityX(-this.movement[i]);
                this.sprite.body.setVelocityY(0);
                this.sprite.anims.play("leftSlime", true);
                this.moveCounter[i]--;
                if (this.moveCounter[i] <= -50) {
                    this.goX[i] = false;
                    this.goY[i] = true;
                    this.moveCounter[i] = 0;
                }
            } else if (this.goX[i] == false && this.goY[i] == true) {
                this.sprite.body.setVelocityX(0);
                this.sprite.body.setVelocityY(-this.movement[i]);
                this.sprite.anims.play("upSlime", true);
                this.moveCounter[i]--;
                if (this.moveCounter[i] <= -50) {
                    this.goX[i] = true;
                    this.goY[i] = true;
                    this.moveCounter[i] = 0;
                }
            }
        }
    }

    nightUpdate(time) {
        if (this.active) {
            this.sprite.body.setVelocityX(-1 * this.speed);
            this.sprite.body.setVelocityY(0);
            //this.sprite.anims.play("leftSlime", true);
        }

    }

}
