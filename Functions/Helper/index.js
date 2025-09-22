const moment = require("moment");

//Timestamp
const getFormattedDate = () => {
	const now = moment().format("DD MMMM YYYY - hh.mm.ss A");
	return now;
}

module.exports = { getFormattedDate }