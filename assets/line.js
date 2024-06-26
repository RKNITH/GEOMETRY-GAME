function Line(stage, initialYIntercept, initialSlope) {
    var self = this;

    createjs.Shape.call(self);

    self.picked = false;
    self.editor = new Editor(initialYIntercept, initialSlope);

    self.render = function () {
        self.graphics.clear();

        // The following var's are in "player space" (referenced to visible grid, not canvas):
        var xFrom = 0;
        var xTo = gridWidth;
        var yFrom = self.yIntercept;
        var yTo = self.slope * xTo + self.yIntercept;

        var lineColour = self.picked ? "red" : "black";
        var lineWidth = self.picked ? 3 : 2;

        // Set graphics
        self.graphics.beginStroke(lineColour);
        self.graphics.setStrokeStyle(lineWidth);
        self.graphics.moveTo(xFrom * cellSize, canvas.height - yFrom * cellSize);
        self.graphics.lineTo(xTo * cellSize, canvas.height - yTo * cellSize);
    };

    self.loadValuesFromForm = function () {
        var yIntercept = self.editor.getYIntercept();
        var slope = self.editor.getSlope();
        self.move(yIntercept, slope);
	    self.picked = false;
	    self.editor.setPicked(false);
    };

    self.move = function (yIntercept, slope) {
        self.yIntercept = yIntercept;
        self.slope = slope;

        self.editor.move(canvas.height - self.yIntercept * cellSize, self.slope);
    };

    self.reset = function () {
        self.picked = false;
        self.editor.reset();
        self.move(initialYIntercept, initialSlope);
    };

    function distanceToPoint(x, y) { // in player coordinates
        // xP, yP are in player coordinates
        var xP = x / cellSize;
        var yP = (canvas.height - y) / cellSize;
        return Math.abs(-self.slope * xP + yP + -self.yIntercept) / Math.sqrt(self.slope * self.slope + 1);
    }

    function onStageMouseDown(e) {
        self.picked = distanceToPoint(e.stageX, e.stageY) < 0.67;
        self.editor.setPicked(self.picked);
	    if (self.picked) {
		    self.editor.move(canvas.height - self.yIntercept * cellSize, initialSlope);
	    }
	    return self.picked;
    }

    stage.on("stagemousedown", onStageMouseDown);

    stage.addChild(self);
    self.move(initialYIntercept, initialSlope);
}

Line.prototype = new createjs.Shape();
