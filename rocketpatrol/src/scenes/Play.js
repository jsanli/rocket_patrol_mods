const Phaser = require("../../lib/phaser");

class Play extends Phaser.Scene{
    constructor(){
            super("playScene")
    }

    preload(){
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
    }



    create(){
        this.add.text(20,20 "Rocket Patrol Play")
        
        this.starfield = this.add.tileSprite(0,0,640, 480, 'starfield')




        //change ships
        this.ship01 = new Spaceship(this.game.config.width + borderUISize * 6,
        borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this.game.config.width + borderUISize * 6,
        borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship01 = new Spaceship(this.game.config.width + borderUISize * 6,
        borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            
        //wrong
        this.anims.create(
            {key: 'explode',
        frames:this.anims.generateFrameNumebrs('explosion', {start: 0, end: 9, 
            first: 0, frameRate: 30})}
    }

    update(){
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        //check collisions

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && rocket.x +rocket.wdith > ship.x&& rocket.y < ship.y + ship.height && rocket.height+ rocket.y > ship.y) {
            return true;
        }
        return false;
    }

    shipExplode(ship) {
        ship.alpha = 0; //hide the ship
        let boom = this.add.sprite(ship.x, ship,y, 'expolsion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
    }
}