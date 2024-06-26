
function renderBackground (stageParent, gridWidth, gridLeft, gridRight, gridTop, gridBottom, cellSize) {

	var gridColour = "rgba(30,144,255,0.6)";

	// create grid object
	var gridLines = new createjs.Shape();
	stageParent.addChild(gridLines);

	// draw the grid
	gridLines.graphics.beginStroke(gridColour);

	for(var i = 1; i < gridWidth; ++i) { // Rows
	    gridLines.graphics.moveTo(gridLeft, gridTop + i * cellSize);
	    gridLines.graphics.lineTo(gridRight, gridTop + i * cellSize);
//	    var newTextBox = new createjs.Text(i, "15px Arial", gridColour);
//	    newTextBox.x = i*cellSize;
//	    newTextBox.y = canvas.height - 15;
//	    stageParent.addChild(newTextBox);
	}

	for(var i = 1; i < gridHeight; ++i) { //Cols
	    gridLines.graphics.moveTo(gridLeft + i * cellSize, gridTop);
	    gridLines.graphics.lineTo(gridLeft + i * cellSize, gridBottom);
//	    var newTextBox = new createjs.Text(i, "15px Arial", gridColour);
//	    newTextBox.y = i*cellSize;
//	    newTextBox.x = 15;
//	    stageParent.addChild(newTextBox);
	}


	// next, add various background doodles.
	var backgroundDataCloud = {
	    images: ["assets/backgrounds/cloud.png"],
	    frames: {
	    	width:374,
	    	height:282,
	    	count:1
	    },
	    animations: { main: [0] }
	};

	var backgroundDataFlower = {
	    images: ["assets/backgrounds/flower.png"],
	    frames: {
	    	width:233,
	    	height:362,
	    	count:1
	    },
	    animations: { main: [0] }
	};

	var backgroundDataSmile = {
	    images: ["assets/backgrounds/smile.png"],
	    frames: {
	    	width:336,
	    	height:255,
	    	count:1
	    },
	    animations: { main: [0] }
	};

	var spriteSheetCloudBG = new createjs.SpriteSheet(backgroundDataCloud);
	var spriteSheetFlowerBG = new createjs.SpriteSheet(backgroundDataFlower);
	var spriteSheetSmileBG = new createjs.SpriteSheet(backgroundDataSmile);

	var backgroundCloud = new createjs.Sprite(spriteSheetCloudBG);
		stageParent.addChild(backgroundCloud);
		backgroundCloud.x = 60;
		backgroundCloud.y = 105;
		backgroundCloud.alpha = 0.8;

	var backgroundFlower = new createjs.Sprite(spriteSheetFlowerBG);
		stageParent.addChild(backgroundFlower);
		backgroundFlower.x = 700;
		backgroundFlower.y = 500;
		backgroundFlower.scaleX = -0.8;
		backgroundFlower.scaleY = -backgroundFlower.scaleX;
		backgroundFlower.alpha = 0.85;

	var backgroundSmile = new createjs.Sprite(spriteSheetSmileBG);
		stageParent.addChild(backgroundSmile);
		backgroundSmile.x = 200;
		backgroundSmile.y = 200;
		backgroundSmile.scaleX = backgroundSmile.scaleY = 0.3;
		backgroundSmile.alpha = 0.6;

	stageParent.update();
}