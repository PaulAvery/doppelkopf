module.exports = function *(id) {
	var orm = yield services.orm;
	var date = yield orm.Date.findOne(id).populate('results');
	var players = yield orm.User.find();
	var playerIds = players.map(function(player) {
		return player.id;
	});

	var result = {
		date: date.date,
		users: [],
		points: 0,
		money: 0
	};

	date.results.forEach(function(res) {
		result.users.push({
			name: players[playerIds.indexOf(res.user)].name,
			position: res.position,
			points: res.points,
			money: res.money / 100
		});

		result.points += res.points;
		result.money += res.money / 100;
	});

	result.piePoints = date.results.reduce(function(sum, res) {
		sum[players[playerIds.indexOf(res.user)].name] = res.points;
		return sum;
	}, {});

	result.pieMoney = date.results.reduce(function(sum, res) {
		sum[players[playerIds.indexOf(res.user)].name] = res.money / 100;
		return sum;
	}, {});

	return result;
};
