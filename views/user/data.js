module.exports = function *(name) {
	var orm = yield services.orm;
	var player = yield orm.User.findOne({name: name}).populate('results');
	var dates = yield orm.Date.find();

	var result = {
		dates: [],
		name: player.name,
		position: 0,
		points: 0,
		money: 0
	};

	result.dates = player.results.sort(function(a, b) {
		var c = dates.find(function(el) {
			return el.id === a.date;
		});

		var d = dates.find(function(el) {
			return el.id === b.date;
		});

		return c.date > d.date ? -1 : c.date < d.date ? 1 : 0;
	}).map(function(res) {
		var date = dates.find(function(el) {
			return el.id === res.date;
		});
		result.position += res.position / player.results.length;
		result.points += res.points;
		result.money += res.money / 100;

		return {
			date: date.date,
			id: date.id,
			position: res.position,
			points: res.points,
			money: res.money / 100
		};
	});

	result.position = Math.round(result.position * 100) / 100;

	return result;
};
