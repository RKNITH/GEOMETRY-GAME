var winSound = new Audio("assets/sound/win.wav");

function LevelGoal() { }
LevelGoal.prototype = new createjs.Shape();
LevelGoal.prototype.initialize = function (stageParent, rad) {
// (this should be called once, when the level is first initialized)

	stageParent.addChild(this);

	this.visible = false;
    this.radius = rad;

    this.graphics.clear();
    this.currentAnimationStep = 0;

}

LevelGoal.prototype.reset = function (level) {
	var xPos = levelData[level].goalPosition.x;
	var yPos = levelData[level].goalPosition.y;
    this.x = xPos / 2; // need to add this factor b/c Shape()s have weird coord spaces
    this.y = yPos / 2;
	this.visible = true;
};

LevelGoal.prototype.vanish = function () {
	this.visible = false;
};

LevelGoal.prototype.animate = function() {
	if (this.currentAnimationStep == 0) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("orange").setStrokeStyle(3).drawPolyStar( this.x, this.y, this.radius, 5, 2, 30 );
	    this.currentAnimationStep = 1;
	}
	else if (this.currentAnimationStep == 1) {
	    this.graphics.clear();
	    this.graphics.beginFill("yellow").beginStroke("orange").setStrokeStyle(3).drawPolyStar( this.x, this.y, this.radius, 5, 2.5, 30 );
	    this.currentAnimationStep = 0;
	}
}

var checkWinConditions = function (playerObject, currentLevel) {
	// Note: player's x, y coords are defined to be located at the bottom, center of the sprite animation.
	// i.e. as follows (x, y coords are located at the 'x'):
	//  ___
	// |   |
	// |   |
	// |_x_| 
	//
	var goalPositionX = levelData[currentLevel].goalPosition.x;
	var goalPositionY = levelData[currentLevel].goalPosition.y;
	var upperBoundPlayer = playerObject.y - playerObject.height;
	var lowerBoundPlayer = playerObject.y;
	var rightBoundPlayer = playerObject.x + playerObject.width / 2;
	var leftBoundPlayer  = playerObject.x - playerObject.width / 2;

	var touchingGoal = (
		   (leftBoundPlayer < goalPositionX && rightBoundPlayer > goalPositionX)
		&& (upperBoundPlayer < goalPositionY && lowerBoundPlayer > goalPositionY)
	);

	return touchingGoal;
};

function processLevelState(playerObject) { // a perfectly good name for having three hours left
	if (playerHasWon) {
		return;
	}

	if (checkWinConditions(playerObject, currentLevel)) {
		console.log("TRIGGER (" + currentLevel + ")");
		winSound.play();

		if (currentLevel >= levelData.length-1) {
			currentTextId = "win";
			playerHasWon = true;
			levelGoal.vanish();
			console.log("No more levels");
			return;
		}

		currentLevel += 1;
		currentTextId = "level" + currentLevel;
		levelGoal.reset(currentLevel);
	}
}


var renderTextBoxGraphic;
var renderTextText;

function renderText(stageParent, currentTextId) {
	// Hacks
	if (typeof renderTextBoxGraphic == "undefined") {
		renderTextBoxGraphic = new createjs.Shape();
		stageParent.addChild(renderTextBoxGraphic);
	}
	if (typeof renderTextText == "undefined") {
		renderTextText = new createjs.Text("no text", "20px Arial", "black");
		stageParent.addChild(renderTextText);
	}

	var currentTextData = textData[currentTextId];
	var visible = typeof currentTextData != "undefined";

	renderTextBoxGraphic.visible = visible;
	renderTextText.visible = visible;

	if (visible) {
		renderTextText.text = currentTextData.textContent;

		renderTextText.x = textBoxPositionX + textBoxWidth / 2;
		renderTextText.y = textBoxPositionY + textBoxBuffer;
		renderTextText.lineWidth = textBoxWidth;
		renderTextText.textAlign = "center";
	//		renderTextText.maxWidth =

		renderTextBoxGraphic.graphics.clear();
		renderTextBoxGraphic.graphics.beginFill("rgba(255,255,130,0.75)").beginStroke("orange").setStrokeStyle(1).drawRect(textBoxPositionX, textBoxPositionY, textBoxWidth, textBoxHeight);
	}
}

var levelData = [
	{ goalPosition: {x: 740, y: 360} },
	{ goalPosition: {x: 70, y: 690} },
	{ goalPosition: {x: 540, y: 160} },
	{ goalPosition: {x: 440, y: 720} },
	{ goalPosition: {x: 60, y: 150} },
	{ goalPosition: {x: 740, y: 550} },
];

var textData = {
	"level0": {
		textContent: "\n Ooh! That star looks so shiny!"
	},
	"level1": {
		textContent: "Sometimes I get the sense that there is more to this world than meets the eye... \n \n Like there is something my sensory input cannot access."
	},
	"level2": {
		textContent: "Something that makes the world tick. Some kind of rules, some underlying logic. \n \n [Use your mouse to click on a line!]"
	},
	"level3": {
		textContent: "The world is so complicated and vast. \n \n If only I knew why things are the way they are."
	},
	"level4": {
		textContent: "I can write down a guess, an equation. But I know they are only my \nhumble approximations of something so much bigger than myself."
	},
	"level5": {
		textContent: "I wish I could see the structure of reality. But I am just a little robot. \n I can only measure, and graph, and model, and imagine."
	},
	"win": {
		textContent: "\nFIN."
	},
	"lose": {
		textContent: "Oh no! I fell out of the notebook!! :( \n \n [press 'reset' to try again]"
	}
};
