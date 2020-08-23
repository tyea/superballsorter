var rack = null;
var currentTube = 0;
var direction = "RIGHT";
var totalTubes = 7;

var render = function () {
	var html = "";
	for (var tube = 0; tube < totalTubes; tube += 1) {
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
};

var move = function () {
	if (direction == "RIGHT") {
		if (currentTube == (totalTubes - 1)) {
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

var animate = function () {
	render();
	move();
};
var load = function () {
	rack = document.querySelector("#rack");
	animate();
	setInterval(animate, 250);
};

addEventListener("load", load);
