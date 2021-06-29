//John Sanli, 6/29/2021 5 Hours

// Finishing Tutorial: 20 Points
// Simultaneous Two Player: 30 Points
// New Spaceship Type: 20 Points
// Scoring Mechanism that Adds Time: 20 Points
// Music: 5 Points
// Control Rocket After Being Fired: 5 Points
// Total: 100 Points

//If you go into the Rocket and Rocket 2 files it is very easy to comment out the code that lets the rocket move after being fired, I think it's more fun when you cannot move the rocket

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyW;