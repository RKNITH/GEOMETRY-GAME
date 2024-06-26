var playerTimeConstant = 1;
var jumpAmount = 9;

var frameWidth = 60;
var frameHeight = 82;

// Initialize sprite sheet data:
var data = {
	framerate: 2,
    images: ["assets/FinalSpriteSheetMathBot.png"],
    frames: {
    	width:frameWidth,
    	height:frameHeight,
    	count:4},
    animations: {
    	idle:[0],
    	jump:[2],
    	moveLeft:[1],
    	moveRight:[3]}
};


var spriteSheet = new createjs.SpriteSheet(data);

var jumpSound = new Audio("assets/sound/jump.wav");

function Player() { };

Player.prototype = new createjs.Sprite(spriteSheet, "idle");

Player.prototype.reset = function () {
	playerHasWon = false;

	this.name = "robot player";
	this.snapToPixel = false;
	this.regX = frameWidth/2;
	this.regY = frameHeight;
	this.width = frameWidth;
	this.height = frameHeight;

	this.x = 30;
	this.y = 30;

	this.xDirection = 0;
	this.xSpeed = 8;

	this.yVelocity = 0;
	this.gravity = 0.3;
	this.isJumping = true;

	this.isOnUpperLine = true;

};

Player.prototype.initialize = Player.prototype.reset;

Player.prototype.resolvePhysics = function (ListOfLineObjects) {

	// Update x-position
	this.x = this.x + this.xDirection * this.xSpeed;

	// Update y-position
	this.yVelocity = this.yVelocity + this.gravity * playerTimeConstant;
	this.y = this.y + this.yVelocity * playerTimeConstant;

	/////
	// Next, line collisions. Step 1 is to determine which line is on top...
	var LineObject1 = ListOfLineObjects[0];
	var LineObject2 = ListOfLineObjects[1];
	var upperLineY = 0;
	var lowerLineY = 0;

	Line1Y = canvas.height - (LineObject1.slope * (this.x) + LineObject1.yIntercept*cellSize);
	Line2Y = canvas.height - (LineObject2.slope * (this.x) + LineObject2.yIntercept*cellSize);

	if (Line1Y <= Line2Y) {
		upperLineY = Line1Y;
		lowerLineY = Line2Y;
	}
	else {
		upperLineY = Line2Y;
		lowerLineY = Line1Y;
	}

	if (this.y < (upperLineY-0.5)) {
		this.isOnUpperLine = true;
	}

	// Check collisions ("testLine" only)
	if (this.isOnUpperLine) {
		if (this.y > upperLineY) {
			this.y = upperLineY;
			this.isJumping = false;
		}
	}
	else {
		if (this.y > lowerLineY) {
			this.y = lowerLineY;
			this.isJumping = false;
		}
	}

	/////
	// Check that the player stays on the canvas...
	if (this.x > gridRight) {
		this.x = gridRight;
		this.vx = 0;
	}

	if (this.x < gridLeft) {
		this.x = gridLeft;
		this.vx = 0;
	}

	if (this.y < gridTop) {
		this.y = gridTop;
		this.yVelocity = 0;
	}

	if (this.y > gridBottom) {
		//this.y = gridBottom;
		//this.yVelocity = 0;
		//this.isJumping = false;
		currentTextId = "lose";
	}
}

Player.prototype.renderLeft  = function () {
	if (!this.isJumping) {
		this.gotoAndPlay("moveLeft");
	}
};

Player.prototype.renderRight = function () { 
	if (!this.isJumping) {
		this.gotoAndPlay("moveRight");
	} 
};

Player.prototype.jump = function () {
	if (!this.isJumping) {
		this.gotoAndPlay("jump");
		this.yVelocity -= jumpAmount;
		jumpSound.play();
	}
};
