const { Phaser } = require("./lib/phaser");

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
