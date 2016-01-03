module.exports = function *() {
	var self = this;
	var orm = yield services.orm;
	yield orm.User.create({name: this.request.body.name, password: this.request.body.pass}).then(function(player) {
		self.redirect('/users/' + encodeURIComponent(player.name));
	}, function() {
		self.body = 'An Error Occured';
	});
};
