module.exports = function *() {
	return {
		user: this.passport.user || false,
		path: this.path
	};
};
