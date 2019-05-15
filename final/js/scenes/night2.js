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

export class Night2 extends NightScene {
    constructor() {
        super({
            key: SCENES.NIGHT2
        });
    }
    
    init(data) {
        super.init(data);
        this.numEnemySpawns = 30;
        this.spawnX = 1600;
        this.spawnY = 170;
    }
    
    preload() {
        super.preload();
        this.load.tilemapTiledJSON("night-map3", "./assets/tilemaps/nightMap3.json");
        this.mapLevel = "night-map3";
    }
    
    create() {
        
        super.create();
        startwave.on("pointerdown", () => {
            console.log("startwave pressed");
            if (this.startWavePressed)
                return;
            this.startWavePressed = true;
            startwave.alpha = 0.5;
            
            this.enemiesToSpawn = [
                [10, ENEMIES.SLIME, 1000], //10 slimes, 1000milliseconds apart.
                [20, ENEMIES.GOBLIN, 1000],
                [10, ENEMIES.GOLEM, 1000]
            ]
            this.numEnemySpawns = 40;
        });
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