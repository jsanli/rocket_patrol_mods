const { Game } = require("../../lib/phaser");
const Phaser = require("../../lib/phaser");

class Rocket extends Phaser.GameObjects.Sprite{
        constructor(scene, x,y,textue, frame){
            super(scene, x, y, texture, frame);

            scene.add.existing(this);
            this.isFiring = false;
            this.movespeed = 2;
        }

        update(){
            if(!this.isFiring){
                if(keyLeft,isDown && this.x >= borderUISize + this.width){
                    this.x -= this.moveSpeed;
                }else if(keyRight.isDown && this.x <= game.config.width - (borderUISize + borderPadding)){
                        this.x += this.move
                }

            }

            if(Phaser.Input.KeyBoard.JustDown(keyF)){
                this.isFiring = true;
            }
            if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
                this.y = this.moveSpeed;
            }
            //reset on miss
            if(this.y <= borderUISize * 3 + borderPadding){
                this.reset();
            }

        }

        reset(){
            this.isFiring = false;
            this.y = game.config.height - (borderUISize+ borderPadding);
        }
}