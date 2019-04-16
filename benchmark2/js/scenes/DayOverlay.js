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
        this.timer = 10;
        this.initTime = 0; 
        console.log("entered help");
    }
    create(){
        //add images
        //let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height*.35, "logo").setDepth(1).setScale(.5,.5);
        for(var i = 0; i < this.hero.health; i++){
            this.hearts.push(this.add.image(50 + i*75,100, "heart").setScale(2,2).setDepth(1));
        }
        this.add.image(1300,100,"coin").setScale(1.2,1.2).setDepth(1);
        
        //add timer
        let seconds = this.timer % 60;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        this.timerText = this.add.text(20, 150, Math.floor(this.timer/60) + ':' + seconds, { fontSize: '70px', fill: '#fff', strokeThickness: 10, stroke:"#000000"});

        //variables
        this.health = this.hero.health;

        //Initialize text stuff
        this.moneyText = this.add.text(1335, 68, ':' + this.hero.money, { fontSize: '70px', fill: '#fff', strokeThickness: 10, stroke:"#000000"});
        this.deathText = null;
        
        //add button events
        
        //add keyboard keys
    }
    update(time, delta){
        if(this.initTime == 0){
            this.initTime = this.time.now;
        }
        console.log(this.hero.health);
        if(this.hero.health > this.health){
            this.hearts.push(this.add.image(50 + this.health*75,100, "heart").setScale(2,2).setDepth(1));
            this.health++;
        }
        else if(this.hero.health < this.health){
            while(this.health > this.hero.health){
                this.hearts.pop().destroy();
                this.health--;    
            }
        } 

        if(this.hero.health <= 0 && this.deathText == null){
            this.deathText = this.add.text(600, 400, 'You are dead', { fontSize: '70px', fill: '#a700ff', strokeThickness: 10, stroke:"#ffffff"});
        }


        if(this.checkIfMoneyIsSame != this.hero.money){    
            this.moneyText.setText(':' + this.hero.money);
            this.checkIfMoneyIsSame = this.hero.money;
        }
        else{

        }
        //console.log(this.time.now);
        //console.log(time);
        let timeRemaining = this.timer - (Math.floor(time/1000)-Math.floor(this.initTime/1000));
        let seconds = timeRemaining % 60;
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        this.timerText.setText(Math.floor(timeRemaining/60) + ":" + seconds);
        if(timeRemaining <= 0){
            this.scene.stop(SCENES.DAY);
            this.scene.start(SCENES.NIGHT,{"level":1,"money":this.hero.money+200});
            this.scene.stop();
        }
    }


}