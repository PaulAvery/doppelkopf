module.exports = function *(id) {
	var orm = yield services.orm;
	yield orm.Result.destroy({date: id});
	yield orm.Date.destroy(id);

	this.redirect('/dates');
};
