var hbs = require('handlebars');

module.exports = function(url) {
	return new hbs.SafeString(encodeURIComponent(url));
};
