module.exports = function *() {
	var orm = yield services.orm;
	var users = yield orm.User.find().populate('results');

	return {
		users: users.map(function(user) {
			return user.results.reduce(function(sum, result) {
				sum.points = sum.points + result.points;
				sum.position = Math.round((sum.position + result.position / user.results.length) * 100) / 100;
				sum.money = sum.money + result.money / 100;
				return sum;
			}, {
				name: user.name,
				points: 0,
				position: 0,
				money: 0
			});
		})
	};
};
