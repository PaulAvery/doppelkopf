var _ = require('lodash');

module.exports = function *() {
	var player;
	var orm = yield services.orm;
	var date = yield orm.Date.create({date: new Date(this.request.body.date)});
	var data = _(this.request.body)
		.map(function(points, name) {
			return {
				name: name,
				points: points
			};
		})
		.filter(function(el) {
			return el.name !== 'date';
		})
		.sortBy('points')
		.forEach(function(el, i, obj) {
			if(i > 0 && obj[i - 1].points === el.points) {
				el.position = obj[i - 1].position;
			} else {
				el.position = i + 1;
			}

			el.money = Math.ceil((1000 + (el.position - 1) * 200 + el.points * 5) / 50) * 50;
		})
		.value();

	for(var x = 0; x < data.length; x++) {
		player = yield orm.User.findOne({name: data[x].name});
		date.results.add(yield orm.Result.create({user: player, points: data[x].points, position: data[x].position, money: data[x].money}));
	}

	yield date.save();
	this.redirect('/dates/' + date.id);
};
