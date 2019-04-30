//Day time player
import {
    HEROES
} from "../constants/PlayerTypes.js";
import {
    ENEMIES
} from "../constants/EnemyTypes.js";


export class DayPlayer {

    constructor(data) {
        this.sprite = data.sprite; //The current sprite is the 'sprite' variable in this class
        this.keyboard = data.keyboard;
        this.physics = data.physics;
        this.anims = data.anims;
        this.dead = false;
        this.angle = 0;

        this.scene = data.scene;
        this.previousTime = 0;
        this.lastDamaged = 0;
        this.lastSwapped = 0;
        this.isAttacking = false;
        this.swapCooldown = 1;

        this.active = true; //FIXME: remove this
    }

    init() {}

    preload() {}
    create() {



    }
    update(time) {
        //Gets the time of the game and stores it as a variable
        this.time = time;

        if (this.active === true) {
            //console.log('helo');
            //if either are released, set velocityX to 0 for now
            //what if an enemy makes someone move?
            //NOTE: keycodes => W = 87, A = 65, S = 83, D = 68
            if (this.keyboard.keys[68].isUp || this.keyboard.keys[65].isUp) { //if D and A are up
                this.sprite.body.setVelocityX(0);
            }
            if (this.keyboard.keys[65].isDown && this.keyboard.keys[68].isDown) { //if D and A are down
                this.sprite.body.setVelocityX(0);
            } else if (this.keyboard.keys[65].isDown) { //else if A is down (and not D)
                this.sprite.body.setVelocityX(-this.speed);
            } else if (this.keyboard.keys[68].isDown) { //else if D is down (and not A)
                this.sprite.body.setVelocityX(this.speed);
            }

            if (this.keyboard.keys[83].isUp || this.keyboard.keys[87].isUp) { //if S and W are up
                this.sprite.body.setVelocityY(0);
            }
            if (this.keyboard.keys[83].isDown && this.keyboard.keys[87].isDown) { //if S and W are down
                this.sprite.body.setVelocityY(0);
            } else if (this.keyboard.keys[83].isDown) { //if S is down (and not W)
                this.sprite.body.setVelocityY(this.speed); //y goes down, not up
            } else if (this.keyboard.keys[87].isDown) { //if W is down (and not S)
                this.sprite.body.setVelocityY(-this.speed);
            }

            //Rotation of sprite and box



        }
    }

    //When this is called, for now, launch a projectile with the correct animation
    attackBasic(cursor, angle, tempSprite) {

        //Call the hero's attackBasic first
        //tempSprite.anims.play("shield",true);
        tempSprite.anims = this.anims;
        console.log(this.anims);

        //this.hero.attackBasic(cursor, angle, tempSprite);

        //Rotation of sprite and box
        if (angle > -Math.PI / 4 && angle <= Math.PI / 4) {
            console.log("atacked");
            switch (this.playerType) {
                case HEROES.SHIELD_HERO:
                    this.sprite.anims.play("rightBasicAttackShield");
                    break;
                case HEROES.SWORD_HERO:
                    this.sprite.anims.play("rightBasicAttackSword");
                    break;
                    //case HEROES.MAGE_HERO: this.sprite.anims.play("rightBasicAttackMage"); break;
            }
        } else if (angle > -3 * Math.PI / 4 && angle <= -Math.PI / 4) {
            switch (this.playerType) {
                case HEROES.SHIELD_HERO:
                    this.sprite.anims.play("upBasicAttackShield");
                    break;
                case HEROES.SWORD_HERO:
                    this.sprite.anims.play("upBasicAttackSword");
                    break;
                    //case HEROES.MAGE_HERO: this.sprite.anims.play("upBasicAttackMage"); break;
            }
        } else if ((angle > 3 * Math.PI / 4 && angle <= Math.PI) || (angle <= -3 * Math.PI / 4 && angle >= -Math.PI)) {
            switch (this.playerType) {
                case HEROES.SHIELD_HERO:
                    this.sprite.anims.play("leftBasicAttackShield");
                    break;
                case HEROES.SWORD_HERO:
                    this.sprite.anims.play("leftBasicAttackSword");
                    break;
                    //case HEROES.MAGE_HERO: this.sprite.anims.play("leftBasicAttackMage"); break;
            }
        } else if (angle <= 3 * Math.PI / 4 && angle > Math.PI / 4) {
            switch (this.playerType) {
                case HEROES.SHIELD_HERO:
                    this.sprite.anims.play("downBasicAttackShield");
                    break;
                case HEROES.SWORD_HERO:
                    this.sprite.anims.play("downBasicAttackSword");
                    break;
                    //case HEROES.MAGE_HERO: this.sprite.anims.play("downBasicAttackMage"); break;
            }
        }

    }



    animationStopped() {
        console.log("destroyeeed");
    }

    attackSpecial(cursor, angle) {


    }

    //ShieldHero => SwordHero => MageHero
    swap(playerType) {
        switch (playerType) {
            case HEROES.SHIELD_HERO:
                playerType = HEROES.SWORD_HERO; //Set player type
                break;
            case HEROES.SWORD_HERO:
                playerType = HEROES.MAGE_HERO; //Set player type
                break;
            case HEROES.MAGE_HERO:
                playerType = HEROES.SHIELD_HERO; //Set player type
                break;
            default:
                console.log("SWAAAAAAAAAAPPPPPPPPPPING ERRRRRRRRRRRRORRRRRRRRRRRRR");
        }
        return playerType;
    }


    damage(monster) {
        if (this.scene.time.now - this.scene.lastDamaged >= this.damageCooldown*1000) { //Uses the cooldown variable to allow time buffer between damages
            this.scene.lastDamaged = this.scene.time.now; //Set the prevTime to current time
            if (this.health > 0) {
                this.health -= monster.class.basicAttack;
                if (this.health <= 0) {
                    this.dead = true;
                }
            }
            this.active = false;
            if (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {
                this.sprite.body.setVelocity((-1) * (Math.sign(this.sprite.body.velocity.x)) * 500, (-1) * (Math.sign(this.sprite.body.velocity.y)) * 500);
            } else {
                this.sprite.body.setVelocity((Math.sign(monster.body.velocity.x)) * 500, (Math.sign(monster.body.velocity.y)) * 500);
            }
            if (this.dead) {
                this.scene.swapHero();
                console.log("I'm trying to swap");
            }
        }
    }

    grayScale(srcKey, method) {
        var bmd = game.make.bitmapData();
        bmd.load(srcKey);
        bmd.processPixelRGB(forEachPixel, this);
        return bmd;
    }

    forEachPixel(pixel) {
        var gray = (pixel.r + pixel.g + pixel.b) / 3; //average
        //var gray = (pixel.r * 0.2126  + pixel.g * 0.7152 + pixel.b * 0.0722); //luma
        //var gray = (Math.max(pixel.r,pixel.g,pixel.b) + Math.min(pixel.r,pixel.g,pixel.b))/2;//desaturate
        pixel.r = gray;
        pixel.g = gray;
        pixel.b = gray;

        return pixel;
    }





}
