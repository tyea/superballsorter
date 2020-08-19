var currentPage = 0;
var totalPages = 20;
var levelsPerPage = 48;
var totalLevels = totalPages * levelsPerPage;

var previousLink = null;
var nextLink = null;

var getLevelStatus = function (level) {
	if (localStorage.getItem("level_" + level + "_complete")) {
		return 2;
	} else if (localStorage.getItem("level_" + level + "_unlocked")) {
		return 1;
	} else {
		return 0;
	}
};

var setCurrentPage = function () {
	for (var level = totalLevels; level >= 1; level -= 1) {
		if (getLevelStatus(level) > 0) {
			currentPage = Math.ceil(level / levelsPerPage);
			break;
		}
	}
};

var render = function () {
	renderLevels();
	renderLinks();
};

var renderLevels = function () {
	var first = ((currentPage - 1) * levelsPerPage) + 1;
	var last = first + (levelsPerPage - 1);
	var html = "";
	for (var level = first; level <= last; level += 1) {
		var status = getLevelStatus(level);
		switch (status) {
			case 2:
				var background = "bg11";
				break;
			case 1:
				var background = "bg0";
				break;
			default:
				var background = "bg6"
				break;
		}
		html += "<div class=\"w0.75 h0.75 mr0.5 mb0.5 t0.75 tc " + background + " fg7\">";
		if (status > 0) {
			html += "<a href=\"play.html?level=" + level + "\">" + level + "</a>";
		} else {
			html += "<a>" + level + "</a>";
		}
		html += "</div>";
	}
	document.querySelector("#levels").innerHTML = html;
};

var renderLinks = function () {
	if (currentPage == 1) {
		previousLink.parentElement.classList.replace("bg0", "bg6");
	} else if (currentPage == totalPages) {
		nextLink.parentElement.classList.replace("bg0", "bg6");
	} else {
		previousLink.parentElement.classList.replace("bg6", "bg0");
		nextLink.parentElement.classList.replace("bg6", "bg0");
	}
};

var previousPage = function (event) {
	event.preventDefault();
	if (currentPage > 1) {
		currentPage -= 1;
		render();
	}
};

var nextPage = function (event) {
	event.preventDefault();
	if (currentPage < totalPages) {
		currentPage += 1;
		render();
	}
};

var load = function () {
	localStorage.setItem("level_1_unlocked", "true");
	setCurrentPage();
	previousLink = document.querySelector("#previous");
	nextLink = document.querySelector("#next");
	render();
	previousLink.addEventListener("click", previousPage);
	nextLink.addEventListener("click", nextPage);
};

window.addEventListener("load", load);
