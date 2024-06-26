// Use booleans to keep track of which keys are currently pressed:
var leftKeyIsPressed = false;
var rightKeyIsPressed = false;
var upKeyIsPressed = false;
var downKeyIsPressed = false;

// shortcuts for useful key codes
var keyCodeLeftArrow = "37";
var keyCodeUpArrow = "38";
var keyCodeRightArrow = "39";
var keyCodeDownArrow = "40";

// Functions add/remove from 'keysCurrentlyHeldDown' list, as necessary
var dealWithKeyDown = function (event) {
    if (event.keyCode == keyCodeLeftArrow)
    	{ leftKeyIsPressed = true; }
    if (event.keyCode == keyCodeRightArrow)
    	{ rightKeyIsPressed = true; }
    if (event.keyCode == keyCodeUpArrow)
    	{ upKeyIsPressed = true; }
    if (event.keyCode == keyCodeDownArrow)
        { downKeyIsPressed = true; }
}

var dealWithKeyUp = function (event) {
    if (event.keyCode == keyCodeLeftArrow)
    	{ leftKeyIsPressed = false; }
    if (event.keyCode == keyCodeRightArrow)
    	{ rightKeyIsPressed = false; }
    if (event.keyCode == keyCodeUpArrow)
    	{ upKeyIsPressed = false; }
    if (event.keyCode == keyCodeDownArrow)
        { downKeyIsPressed = false; }
}

var passKeyInfoToPlayerController = function (playerObject) {
	// this function is intended to be called every tick in order to update player kinematics
	var playerDirection = 0;
	if (leftKeyIsPressed)  {
        playerDirection -= 1;
        playerObject.renderLeft();
    }
	if (rightKeyIsPressed) {
        playerDirection += 1;
        playerObject.renderRight();
    }

	playerObject.xDirection = playerDirection;

	if (upKeyIsPressed) { 
		playerObject.jump();
		playerObject.isJumping = true;
	}

    if (downKeyIsPressed) {
        playerObject.isOnUpperLine = false;
    }

}
