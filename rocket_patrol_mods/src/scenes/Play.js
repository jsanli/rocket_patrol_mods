//John Sanli, 6/29/2021 5 Hours

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
        this.load.image('starfield', './assets/starfield.png');     
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('rocket2', './assets/rocket2.png');
        this.sound.play('music');
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        this.littleShip = new Spaceship2(this, game.config.width, borderUISize*1.5 + borderPadding*5, 'spaceship2', 0, 35).setOrigin(0,0);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        if(game.settings.two == 1){
            console.log("hey");
            this.p2Rocket = new Rocket2(this, game.config.width/2 - 10, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
            keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

            this.p2Score = 0;

            let scoreConfig2 = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 100
            }
            this.scoreCenter = this.add.text(borderUISize + borderPadding + 230, borderUISize + borderPadding*2, this.p2Score, scoreConfig2);
        }

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = game.settings.gameTimer / 1000;
        this.scoreRight = this.add.text(borderUISize + borderPadding + 453, borderUISize + borderPadding*2, this.timeLeft, timeConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;

        let x =0;

        while(x < this.timeLeft){
           this.clock = this.time.delayedCall(1000 + (x * 1000) , () => {
                  this.timeLeft--;
                  this.scoreRight.text = this.timeLeft; 
                  if(this.timeLeft == 0){
                        if(game.settings.two == 1){
                            if(this.p1Score > this.p2Score){
                                this.add.text(game.config.width/2, game.config.height/2, 'WHITE WINS', scoreConfig).setOrigin(0.5);
                            }
                            else if(this.p2Score > this.p1Score){
                                this.add.text(game.config.width/2, game.config.height/2, 'RED WINS', scoreConfig).setOrigin(0.5);
                            }
                            else{
                                this.add.text(game.config.width/2, game.config.height/2, 'TIE', scoreConfig).setOrigin(0.5);
                            }
                        }
                        else{ 
                            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                        }
                       this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
                       this.gameOver = true;
                  }
           }, null, this);
           x++;
        }
    }

    update() {

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.stopAll();
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.stopAll();
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if(!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.littleShip.update();
            if(game.settings.two == 1){
                this.p2Rocket.update();
            }
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.timeLeft += 5;
            this.addTime(5);

            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) { 
            this.timeLeft += 5;
            this.addTime(5);
 
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.timeLeft += 5;
            this.addTime(5);
 
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
        }

        if (this.checkCollision(this.p1Rocket, this.littleShip)) {
            this.timeLeft += 6;
            this.addTime(6);
 
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.littleShip);
        }

        if(game.settings.two == 1){
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.timeLeft += 5;
                this.addTime(5);

                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship03);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) { 
                this.timeLeft += 5;
                this.addTime(5);
            
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship02);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.timeLeft += 5;
                this.addTime(5);
            
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.ship01);
            }

            if (this.checkCollision(this.p2Rocket, this.littleShip)) {
                this.timeLeft += 6;
                this.addTime(6);
            
                this.p2Rocket.reset();
                this.shipExplode(this.p2Rocket, this.littleShip);
            }
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(rocket, ship) {
        ship.alpha = 0;                         
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); 
        boom.on('animationcomplete', () => { 
            ship.reset(); 
            ship.alpha = 1;
            boom.destroy();
        });
        if(rocket == this.p1Rocket){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score; 
        }
        else if(rocket == this.p2Rocket){
            this.p2Score += ship.points;
            this.scoreCenter.text = this.p2Score; 

        }
        
        this.sound.play('sfx_explosion');
      }

    addTime(seconds){
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(((this.timeLeft - seconds) * 1000), () => {
            let c = 0;
            while(c < seconds){
                this.clock = this.time.delayedCall((c * 1000) , () => {
                    this.timeLeft--;
                    this.scoreRight.text = this.timeLeft; 
                    if(this.timeLeft == 0){
                        if(game.settings.two == 1){
                            if(this.p1Score > this.p2Score){
                                this.add.text(game.config.width/2, game.config.height/2, 'WHITE WINS', scoreConfig).setOrigin(0.5);
                            }
                            else if(this.p2Score > this.p1Score){
                                this.add.text(game.config.width/2, game.config.height/2, 'RED WINS', scoreConfig).setOrigin(0.5);
                            }
                            else{
                                this.add.text(game.config.width/2, game.config.height/2, 'TIE', scoreConfig).setOrigin(0.5);
                            }
                        }
                        else{ 
                            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                        }
                        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
                        this.gameOver = true;
                    }
                }, null, this);
                c++;
            }
        }, null, this);
    }     
}