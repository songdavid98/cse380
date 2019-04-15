import {SCENES} from "../constants/SceneNames.js";
import {ENEMIES} from "../constants/EnemyTypes.js";

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
        this.moneyText;
        this.checkIfMoneyIsSame = 0;
        console.log("entered help");
    }
    create(){

        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        for(var i = 0; i < this.hero.health; i++){
            this.hearts.push(this.add.image(50 + i*75,100, "heart").setScale(2,2));
        }
        this.health = this.hero.health;

        this.moneyText = this.add.text(900, 32, 'score: 0', { fontSize: '75px', fill: '#ffffff' });

        //add button events
        
        //add keyboard keys
    }
    update(time, delta){
        if(this.hero.health > this.health){
            this.hearts.push(this.add.image(50 + this.health*75,100, "heart").setScale(2,2));
            this.health++;
        }
        else if(this.hero.health < this.health){
            while(this.health > this.hero.health){
                this.hearts.pop().destroy();
                this.health--;    
            }
        } 
        if(this.checkIfMoneyIsSame != this.hero.money){    
            this.moneyText.setText('MONEY: ' + this.hero.money);
            this.checkIfMoneyIsSame = this.hero.money;
        }
        else{

        }
    }


}