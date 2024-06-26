function Editor(initialYIntercept, initialSlope) {
    var self = this;

    // TODO Level controller should remove all children of #editorPane during initialization
    var formBoxHtml =
        '<div class="editor">' +
            '<span class="equation">' +
                'y = <span class="card">' + initialSlope + '</span> x + <span class="card">' + initialYIntercept + '</span>' +
            '</span>' +
        '</div>';
    var formBox = $(formBoxHtml);
    $('#editorPane').append(formBox);

    self.setPicked = function (picked) {
        if (picked) {
            formBox.show();
        } else {
            formBox.hide();
        }
    };

    self.getYIntercept = function () {
        return parseFloat(formBox.find("span.card:eq(1)").text());
    };

    self.getSlope = function () {
        return parseFloat(formBox.find("span.card:eq(0)").text());
    };

    self.move = function (y, slope) {
	    var x = 0;
        var canvasOffset = $("#geoworld-canvas").offset();
        var formBoxHeight = formBox.height() + 50;

	    if (playerCharacter && playerCharacter.x < 150) {
			x = 200;
	    }

	    if (slope < 0) {
            // Position box above: Move top up by height of form box
            y = y - formBoxHeight;
        }

        // Clamp formBox to screen
        if (y < 70) {
            y = 70;
        } else if (y > canvas.height - formBoxHeight) {
            y = canvas.height - formBoxHeight;
        }

        formBox.css({ position: "absolute", left: canvasOffset.left + x, top: canvasOffset.top + y });
    };

    self.reset = function () {
        formBox.hide();
        formBox.find("span.card:eq(1)").text(initialYIntercept);
        formBox.find("span.card:eq(0)").text(initialSlope);
    };
}
