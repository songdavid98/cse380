import {
    SCENES
} from "../constants/SceneNames.js";
import {
    ENEMIES
} from "../constants/EnemyTypes.js";
import {
    DEFSTR
} from "../constants/DefenseStructureTypes.js";
import {
    NightDefenseStructure
} from "../gamePlay/NightDefenseStructure.js";

import {
    Slime
} from "../gamePlay/Monsters/Slime.js";

import {
    Goblin
} from "../gamePlay/Monsters/Goblin.js";

import {
    Golem
} from "../gamePlay/Monsters/Golem.js";

import {
    Cannon
} from "../gamePlay/Towers/Cannon.js";

import {
    Ice
} from "../gamePlay/Towers/Ice.js";

import {
    Projectile
} from "../gamePlay/Towers/Projectile.js"

import {
    NightScene
} from "./nightScene.js"

export class Night1 extends NightScene {
    constructor() {
        super({
            key: SCENES.NIGHT1
        });
    }
    
    init(data) {
        super.init(data);
        this.spawnY = 235;
        this.enemiesToSpawn = [
            [10, ENEMIES.SLIME, 1000], //10 slimes, 1000milliseconds apart.
            [10, ENEMIES.GOBLIN, 2000]
        ]
        this.numEnemySpawns = 20;
    }
    
    preload() {
        super.preload();
        this.load.tilemapTiledJSON("night-map2", "./assets/tilemaps/nightMap2.json");
        this.mapLevel = "night-map2";
    }
    
    create() {
        super.create();
    }
    
    update(time, delta) {
        super.update(time, delta);
    }
    
    spawnEnemy(enemyType) {
        super.spawnEnemy(enemyType);   
    }
    
    spawnMultipleEnemies(numberOfEnemies, enemyType, msInterval) {
        super.spawnMultipleEnemies(numberOfEnemies, enemyType, msInterval);
    }
}