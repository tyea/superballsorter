var load = function () {
	var now = Math.floor(Date.now() / 1000);
	if (now >= 1648771200) {
		var noun = "wife";
	} else {
		var noun = "girlfriend";
	}
	document.querySelector("#noun").innerHTML = noun;
};

addEventListener("load", load);
