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

export class Night3 extends NightScene {
    constructor() {
        super({
            key: SCENES.NIGHT3
        });
    }
    
    init(data) {
        super.init(data);
        this.spawnY = 375;
        this.enemiesToSpawn = [
            [10, ENEMIES.GOLEM, 1000],
            [20, ENEMIES.SLIME, 500],        
            [20, ENEMIES.GOBLIN, 500]
        ]
        this.numEnemySpawns = 50;
        this.money += 1500;
    }
    
    preload() {
        super.preload();
        this.load.tilemapTiledJSON("night-map4", "./assets/tilemaps/nightMap4.json");
        this.mapLevel = "night-map4";
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