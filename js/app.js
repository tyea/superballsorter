var getDimensions = function () {
	return [
		localStorage.getItem("left"),
		localStorage.getItem("top"),
		localStorage.getItem("width"),
		localStorage.getItem("height"),
		localStorage.getItem("rem")
	];
};

var applyDimensions = function (dimensions) {
	var main = document.querySelector("main");
	main.style.left = dimensions[0] + "px";
	main.style.top = dimensions[1] + "px";
	main.style.width = dimensions[2] + "px";
	main.style.height = dimensions[3] + "px";
	var html = document.querySelector("html");
	html.style.fontSize = dimensions[4] + "px";
};

var openExternalLinks = function (event) {
	var target = event.target;
	if (target.tagName == "A") {
		if (typeof target.attributes.href != "undefined") {
			var href = target.attributes.href.value.toLowerCase();
			if (href.substr(0, 8) == "https://" || href.substr(0, 7) == "http://") {
				event.preventDefault();
				window.open(href, "_system");
			}
		}
	}
}

var stopBackButton = function (event) {
	event.preventDefault();
};

var registerBackButton = function () {
	document.addEventListener("backbutton", stopBackButton, false);
};

var load = function () {
	var dimensions = getDimensions();
	applyDimensions(dimensions);
	document.addEventListener("click", openExternalLinks);
	setTimeout(registerBackButton, 500);
};

addEventListener("load", load);

var totalPages = 8;
var levelsPerPage = 48;
var totalLevels = totalPages * levelsPerPage;

var reset = function () {
	for (var i = 1; i <= totalLevels; i += 1) {
		localStorage.removeItem("level_" + i + "_complete");
		localStorage.removeItem("level_" + i + "_unlocked");
	}
	location.reload();
};

var getBackground = function (integer) {
	var colours = [
		"bg8",
		"bg10",
		"bg11",
		"bg12",
		"bg1",
		"bg2",	
		"bg4"
	];
	return colours[integer];
};
