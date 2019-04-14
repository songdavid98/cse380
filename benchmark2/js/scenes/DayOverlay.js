import {SCENES} from "../constants/SceneNames.js";
export class DayOverlayScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.DAY_OVERLAY
        })
    }
    init(data){
        console.log(data);
        this.hero = data["hero"];
        this.hearts = [];
        console.log("entered help") ;
    }
    create(){

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        for(var i = 0; i < this.hero.health; i++){
            this.hearts.push(this.add.image(50 + i*75,100, "heart").setScale(2,2));
        }
        this.health = this.hero.health;

        //add button events
        
        //add keyboard keys
    }
    update(time, delta){
        if(this.hero.health > this.health){
            this.hearts.push(this.add.image(50 + this.health*75,100, "heart").setScale(2,2));
            this.health++;
        }else if(this.hero.health < this.health){
            while(this.health > this.hero.health){
                this.hearts.pop().destroy();
                this.health--;    
            }
        }
    }
}