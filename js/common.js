var reset = function () {
	for (var i = 1; i <= 1400; i += 1) {
		localStorage.removeItem("level_" + i + "_complete");
		localStorage.removeItem("level_" + i + "_unlocked");
	}
};

var getBackground = function (integer) {
	var colours = [
		"bg8",
		"bg10",
		"bg11",
		"bg12",
		"bg14",
		"bg2",	
		"bg1",
		"bg13",
		"bg4"
	];
	return colours[integer];
};
