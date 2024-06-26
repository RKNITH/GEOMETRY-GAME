var gameFPS = 30;
var animationFrameRate = 350; // number of ms that passes between each animation update

// Listen for 'keydown' and 'keyup' events
window.addEventListener("keydown", dealWithKeyDown, false);
window.addEventListener("keyup", dealWithKeyUp, false);

//create stage
var canvas = document.getElementById("geoworld-canvas");
var stage = new createjs.Stage(canvas);

// determine grid parameters
var gridWidth = 30;
var gridHeight = gridWidth;
var cellSize = canvas.width / gridWidth;
var gridLeft = 0;
var gridRight = canvas.width;
var gridTop = 0;
var gridBottom = canvas.height;

var currentLevel = 0;
var currentTextId = undefined; // blech

// draw the background
renderBackground(stage, gridWidth, gridLeft, gridRight, gridTop, gridBottom, cellSize);

// line objects
var testLine = new Line(stage, 0, 0.5);
var secondLine = new Line(stage, 15, -0.5);
var listOfLines = [testLine, secondLine];
var cardController = new CardController(testLine, secondLine); // this is not the right interface design

// Create player character
var playerCharacter = new Player();
playerCharacter.initialize();
stage.addChild(playerCharacter);

// Define parameters for the "message box"
// (x, y) coords are located at top left corner of box; all measurements in pixels
textBoxPositionX = 20;
textBoxPositionY = 20;
textBoxWidth = 760;
textBoxHeight = 80;
textBoxBuffer = 15;
textBoxAlpha = 0.7;

// Set up level/win conditions:
var goalRadius = 35;
var playerHasWon = false;
levelGoal = new LevelGoal();
levelGoal.initialize(stage, goalRadius);

function resetCards() {
    function addCard(value) {
        var card = $('<div class="card"><span class="card">' + value + '</span></div>');
        $('#inventoryPane').append(card);
    }

    $('#inventoryPane').empty();

    // Use strings to avoid floating point problems
    addCard("0");
    addCard("1");    
    addCard("-1");
    addCard("5");
    addCard("25");
    addCard("0.2");
}

function resetGame() {
	currentLevel = 0;
	currentTextId = "level0";
    playerCharacter.reset();
    levelGoal.reset(currentLevel);
    testLine.reset();
    secondLine.reset();
    resetCards();
    cardController.reset();
}

// Game loop
var frameClock = 0;
createjs.Ticker.setFPS(gameFPS);
createjs.Ticker.addEventListener("tick", function (tick) {

    // Functions that run every tick (physics logic):
    testLine.render();
    secondLine.render();
    passKeyInfoToPlayerController(playerCharacter);
    playerCharacter.resolvePhysics(listOfLines);
    processLevelState(playerCharacter);

    frameClock += tick.delta / animationFrameRate;
    while(frameClock >= 1) {

        // Functions that run less frequently (graphics/animations)
        levelGoal.animate();

        renderText(stage, currentTextId); // NOTE: will probably replace this with a more general text box/method

        frameClock -= 1;
    }

    stage.update();

});


function startGame() {
    $('#startPane').hide();
    $('#splashPane').hide();
    $('#gamePane').show();
    resetGame();
}

function showCredits() {
    $('#splashPane').show();
}

function hideCredits() {
    $('#splashPane').hide();
}
