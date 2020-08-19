var rack = null;
var currentTube = 0;
var direction = "RIGHT";

var render = function () {
	var html = "";
	for (var tube = 0; tube < 9; tube += 1) {
		html += "<div class=\"tube\">";
		if (tube == currentTube) {
			var ball = "<div class=\"ball " + getBackground(tube) + "\"></div>";
		} else {
			var ball = "<ball></ball>";
		}
		html += ball.repeat(4);
		html += "</div>";
	}
	rack.innerHTML = html;
	if (direction == "RIGHT") {
		if (currentTube == 8) {
			currentTube -= 1;
			direction = "LEFT";
		} else {
			currentTube += 1;
		}
	} else {
		if (currentTube == 0) {
			currentTube += 1;
			direction = "RIGHT";
		} else {
			currentTube -= 1;
		}
	}
};

var load = function () {
	rack = document.querySelector("#rack");
	render();
	setInterval(render, 250);
};

window.addEventListener("load", load);
