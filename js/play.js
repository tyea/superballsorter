var queryString = {};
var level = 0;
var incomplete = true;
var rack = null;
var tubes = [];
var selectedTube = -1;
var modal = null;

var parseQueryString = function () {
	var fields = location.search.substr(1).split("&");
	for (var field = 0; field < fields.length; field += 1) {
		var parts = fields[field].split("=");
		queryString[parts[0]] = parts[1];
	}
};

var loadLevel = function (level, callback) {
	var request = new XMLHttpRequest();
	request.open("GET", "data/" + level + ".json");
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status === 200) {
				tubes = JSON.parse(request.responseText);
				callback();
			}
		}
	};
	request.send();
};

var renderRack = function () {
	var rackHtml = "";
	for (var tube = 0; tube < tubes.length; tube += 1) {
		var ballsHtml = "";
		var difference = 4 - tubes[tube].length;
		for (var i = 0; i < difference; i += 1) {
			ballsHtml += "<div class=\"ball\"></div>";
		}
		for (var ball = 0; ball < tubes[tube].length; ball += 1) {
			var classes = "ball " + getBackground(tubes[tube][ball]);
			if (tube == selectedTube && ball == 0) {
				classes += " selected";
			}
			ballsHtml += "<div class=\"" + classes + "\"></div>";
		}
		var tubeHtml = "<div class=\"tube\">" + ballsHtml + "</div>";
		rackHtml += tubeHtml;
	}
	rack.innerHTML = rackHtml;
};

var unlockLink = function () {
	if (localStorage.getItem("level_" + (level + 1) + "_unlocked")) {
		var next = document.querySelector("#next");
		next.parentElement.classList.replace("bg6", "bg0");
		next.href = "play.html?level=" + (level + 1);
	}
};

var getSiblingIndex = function (element) {
	var index = tubes.length;
	while (element) {
		index -= 1;
		element = element.nextElementSibling;
	}
	return index;
};

var moveBall = function (targetTube) {
	if (selectedTube > -1) {
		if (selectedTube == targetTube) {
			selectedTube = -1;
		} else {
			if (tubes[targetTube].length == 0) {
				tubes[targetTube].unshift(tubes[selectedTube].shift());
				selectedTube = -1;
			} else {
				if (tubes[targetTube].length < 4) {
					if (tubes[targetTube][0] == tubes[selectedTube][0]) {
						tubes[targetTube].unshift(tubes[selectedTube].shift());
						selectedTube = -1;
					}
				}
			}
		}
	} else {
		if (tubes[targetTube].length > 0) {
			selectedTube = targetTube;
		}
	}
};

var checkGameState = function () {
	var complete = true;
	for (var tube = 0; tube < tubes.length; tube += 1) {
		switch (tubes[tube].length) {
			case 0:
				break;
			case 1:
			case 2:
			case 3:
				complete = false;
				break;
			case 4:
				var filtered = tubes[tube].filter(function (ball, index, that) {
					return that.indexOf(ball) == index;
				});
				if (filtered.length > 1) {
					complete = false;
				}
				break;
		}
	}
	if (complete) {
		localStorage.setItem("level_" + level + "_complete", "true");
		if (level < totalLevels) {
			localStorage.setItem("level_" + (level + 1) + "_unlocked", "true");
		}
		renderModal();
	}
	incomplete = !complete;
};

var renderModal = function () {
	modal = document.querySelector("#modal");
	modal.classList.remove("inv");
	setInterval(animateModal, 1000);
};

var animateModal = function () {
	if (modal.classList.contains("fg11")) {
		modal.classList.remove("fg11");
		modal.classList.add("fg6");
	} else {
		modal.classList.remove("fg6");
		modal.classList.add("fg11");
	}
};

var dispatch = function (event) {
	if (incomplete) {
		var target = event.target;
		var isBall = target.classList.contains("ball");
		var isTube = target.classList.contains("tube");
		if (isBall || isTube) {
			if (isBall) {
				var targetTube = getSiblingIndex(target.parentElement);
			} else {
				var targetTube = getSiblingIndex(target);
			}
			moveBall(targetTube);
			checkGameState();
			renderRack();
			unlockLink();
		}
	}
};

var populate = function () {
	document.querySelector("#title").innerHTML = "Level " + level;
	document.querySelector("#reset").href = "play.html?level=" + level;
	rack = document.querySelector("#rack");
	rack.addEventListener("click", dispatch);
	renderRack();
	unlockLink();
};

var load = function () {
	parseQueryString();
	level = parseInt(queryString.level);
	loadLevel(level, populate);
};

addEventListener("load", load);
