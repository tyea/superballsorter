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

var load = function () {
	var dimensions = getDimensions();
	applyDimensions(dimensions);
};

addEventListener("load", load);
