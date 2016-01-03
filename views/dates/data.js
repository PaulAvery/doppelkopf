module.exports = function *() {
	var orm = yield services.orm;
	var dates = yield orm.Date.find().sort('date DESC').populate('results');
	var players = yield orm.User.find();
	var playerIds = players.map(function(player) {
		return player.id;
	});

	var result = {
		sums: players.map(function() {
			return {
				points: 0,
				money: 0,
				position: 0
			};
		})
	};
	result.sum = 0;

	result.players = players.map(function(player) {
		return player.name;
	});

	result.dates = dates.map(function(date) {
		var resDate = {
			date: date.date,
			id: date.id,
			results: [],
			sum: 0
		};

		date.results.forEach(function(res) {
			resDate.results[playerIds.indexOf(res.user)] = {
				points: res.points,
				money: res.money / 100,
				position: res.position
			};
			resDate.sum += res.money / 100;
			result.sum += res.money / 100;

			result.sums[playerIds.indexOf(res.user)].money += res.money / 100;
			result.sums[playerIds.indexOf(res.user)].points += res.points;
			result.sums[playerIds.indexOf(res.user)].position += res.position / dates.length;

			for(var x = 0; x < players.length; x++) {
				resDate.results[x] = resDate.results[x] || false;
			}
		});

		return resDate;
	});

	result.piePoints = result.sums.reduce(function(sum, user, i) {
		sum[players[i].name] = user.points;
		return sum;
	}, {});

	result.pieMoney = result.sums.reduce(function(sum, user, i) {
		sum[players[i].name] = user.money;
		return sum;
	}, {});

	result.sums.forEach(function(total) {
		total.position = Math.round(total.position * 100) / 100;
	});

	return result;
};
