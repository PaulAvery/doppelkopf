module.exports = function* () {
	if(this.isAuthenticated()) {
		this.redirect('/dates');
	}
};
