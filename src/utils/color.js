const getColor = function (percentage) {
	if (percentage <= 20) {
		return "red";
	} else if (percentage <= 50) {
		return "orange";
	} else {
		return "green";
	}
};

module.exports = getColor;
