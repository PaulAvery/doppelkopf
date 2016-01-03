module.exports = function *() {
	var orm = yield services.orm;
	var players = yield orm.User.find();

	return {
		users: players.map(function(player) {return player.name;})
	};
};
