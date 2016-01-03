var dateFormat = require('dateformat');

module.exports = function(date) {
	return dateFormat(new Date(date), 'mmmm dS, yyyy');
};
