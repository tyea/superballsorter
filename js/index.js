var roundTo = function (number, precision) {
	var power = 1;
	while (precision > 0) {
		power = power * 10;
		precision -= 1;
	}
	return Math.round(number * power) / power;
};

var getWidth = function () {
	var primaryWidth = 
		typeof document.documentElement.clientWidth == "number" ?
		document.documentElement.clientWidth :
		0;
	var secondaryWidth = 
		typeof innerWidth == "number" ?
		innerWidth :
		0;
	return Math.max(primaryWidth, secondaryWidth);
};

var getHeight = function () {
	var primaryHeight = 
		typeof document.documentElement.clientHeight == "number" ?
		document.documentElement.clientHeight :
		0;
	var secondaryHeight = 
		typeof innerHeight == "number" ?
		innerHeight :
		0;
	return Math.max(primaryHeight, secondaryHeight);
};

var getDimensions = function () {
	return [getWidth(), getHeight()];
};

var getGreaterDimension = function (dimensions) {
	var targetHeight = roundTo((dimensions[0] / 16) * 9, 0);
	if (dimensions[1] > targetHeight) {
		return "HEIGHT";
	} else if (dimensions[1] == targetHeight) {
		return null;
	} else {
		return "WIDTH";
	}
};

var proportionDimensions = function (dimensions) {
	var greaterDimension = getGreaterDimension(dimensions);
	switch (greaterDimension) {
		case "HEIGHT":
			var newHeight = roundTo((dimensions[0] / 16) * 9, 0);
			return [dimensions[0], newHeight];
		case "WIDTH":
			var newWidth = roundTo((dimensions[1] / 9) * 16, 0);
			return [newWidth, dimensions[1]];
		default:
			return [dimensions[0], dimensions[1]];
	}
};

var scaleDimensions = function (proportionedDimensions) {
	var scaledDimensions = [0, 0];
	while (scaledDimensions[0] < proportionedDimensions[0]) {
		scaledDimensions[0] += 16;
		scaledDimensions[1] += 9;
	}
	scaledDimensions[0] -= 16;
	scaledDimensions[1] -= 9;
	return scaledDimensions;
};

var positionDimensions = function (dimensions, scaledDimensions) {
	return [
		roundTo((dimensions[0] - scaledDimensions[0]) / 2, 0),
		roundTo((dimensions[1] - scaledDimensions[1]) / 2, 0)
	]
};

var setDimensions = function () {
	var dimensions = getDimensions();
	var proportionedDimensions = proportionDimensions(dimensions);
	var scaledDimensions = scaleDimensions(proportionedDimensions);
	localStorage.setItem("width", scaledDimensions[0]);
	localStorage.setItem("height", scaledDimensions[1]);
	var positionedDimensions = positionDimensions(dimensions, scaledDimensions);
	localStorage.setItem("left", positionedDimensions[0]);
	localStorage.setItem("top", positionedDimensions[1]);
	var rem = scaledDimensions[0] / 16;
	localStorage.setItem("rem", rem);
};

var measureAndRedirect = function () {
	setDimensions();
	location = "menu.html";
};

var load = function () {
	setTimeout(measureAndRedirect, 1500);
};

addEventListener("load", load);
