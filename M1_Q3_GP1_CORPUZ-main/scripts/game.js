const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

// Game Variables
let dog, bone, doghouse, cursors, textScore;
let score = 0; // Initialize score outside function
let hasBone = false; // Flag to track bone collection
let lastBoneAlertTime = 0; // Timestamp for last bone alert
let background; // Background image variable

// Load Game Assets
function preload() {
    this.load
        .image("dog", "/assets/character/dog.gif")
        .image("bone", "/assets/objects/bone.png.png")
        .image("background", "/assets/background/31499.jpg")
        .image("doghouse", "/assets/doghouse/doghouse.png");
}

// Create Game Objects and Settings
function create() {
    //Background Image
    background = this.add.image(0, 0, "background").setOrigin(0, 0);

    // Scale Background Image to Fit Screen
    resizeBackground();

    // Sprites with Physics
    dog = this.physics.add.sprite(0, 500, "dog").setBounce(0).setCollideWorldBounds(true).setScale(2.5);
    bone = this.physics.add.sprite(500, 500, "bone").setScale(3);
    
    // Dog House
    doghouse = this.add.image(1100, 500, "doghouse").setScale(2); 

    // Score Text
    const style = { font: "50px Courier New", fill: "#FFFB03" };
    textScore = this.add.text(50, 30, "Bones Collected: " + score, style);

    cursors = this.input.keyboard.createCursorKeys();

    this.scale.on('resize', resizeBackground, this);
}

function resizeBackground() {
    const { width, height } = game.scale.gameSize;
    const scaleX = width / background.width;
    const scaleY = height / background.height;
    background.setScale(scaleX, scaleY);
}

function update() {
    // Handle Dog Movement
    if (cursors.left.isDown) {
        dog.setVelocityX(-160);
        dog.flipX = true;
    } else if (cursors.right.isDown) {
        dog.setVelocityX(160);
        dog.flipX = false;
    } else {
        dog.setVelocityX(0);
    }

    // Handle Bone Collection
    this.physics.add.overlap(dog, bone, () => {
        if (!hasBone) {
            hasBone = true;
            bone.disableBody(true, true);
            alert("Bone collected! Time to bring it back to the dog house!");
        }
    });

    // Handle Returning Bone to Dog House
    if (hasBone && dog.x > 1000) {
        score += 1000;
        textScore.setText("Bones Collected: " + score);
        dog.disableBody(true, true);
        alert("GOOD JOB!\nYou have found all the bones!\nYou are the best dog in the park!");
        hasBone = false;
        }
    }
