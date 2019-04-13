import {
    SCENES
} from "../constants/SceneNames.js";
export class NightScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.NIGHT
        })
    }
    init(data) {
        console.log(data);
        console.log("entered night");
        this.time;
        this.map;
        this.monsterArray;
        this.level = data.level;
        this.mapLevel;

        this.buttonYinc = 100;
        this.buttonX = 200;
    }

    preload() {
        this.load.image("terrain", "assets/images/tiles.png");

        this.load.image("buyarrow", "assets/images/buttons/buyarrowturret.JPG");
        this.load.image("buycannon", "assets/images/buttons/buycannonturret.JPG");
        this.load.image("buywall", "assets/images/buttons/buywall.JPG");
        this.load.image("startwave", "assets/images/buttons/startwave.JPG");

        this.load.tilemapTiledJSON("map1", "assets/tilemaps/nightmap.json");
        this.mapLevel = "map1";
        console.log("Welcome to level " + this.level);


    }

    create() {
        //Generate map
        this.map = this.add.tilemap(this.mapLevel);
        let terrain = this.map.addTilesetImage("tiles", "terrain");
        this.groundLayer = this.map.createStaticLayer("background ground", [terrain], 0, 0).setScale(2, 2);
        this.plantLayer = this.map.createStaticLayer("background plants", [terrain], 1, 0).setScale(2, 2);
        this.wallLayer = this.map.createStaticLayer("background wall", [terrain], 2, 0).setScale(2, 2);

        //create buttons
        let startwave = this.add.image(this.buttonX, this.buttonYinc * 2, "startwave").setDepth(3).setScale(.5, .5);

        let buywall = this.add.image(this.buttonX, this.buttonYinc * 3, "buywall").setDepth(3).setScale(.5, .5);

        let buyarrow = this.add.image(this.buttonX, this.buttonYinc * 4, "buyarrow").setDepth(3).setScale(.5, .5);

        let buycannon = this.add.image(this.buttonX, this.buttonYinc * 5, "buycannon").setDepth(3).setScale(.5, .5);



        //add button events
        startwave.setInteractive();
        startwave.on("pointerdown", () => {
            console.log("startwave pressed")
        });

        buywall.setInteractive();
        buywall.on("pointerdown", () => {
            console.log("buywall pressed")
        });

        buyarrow.setInteractive();
        buyarrow.on("pointerdown", () => {
            console.log("buyarray pressed")
        });

        buycannon.setInteractive();
        buycannon.on("pointerdown", () => {
            console.log("buycannon pressed")
        });
    }

}
