var R = require('koa-route');

function view(name, noredirect) {
	return function* () {
		if(!noredirect && !this.isAuthenticated()) {
			this.redirect('/');
		} else {
			yield this.view.call(this, name, Array.prototype.slice.call(arguments));
		}
	};
}

function action(vw, name) {
	return function* () {
		if(this.isAuthenticated() && this.passport.user.admin) {
			yield require('../views/' + vw + '/' + name).apply(this, Array.prototype.slice.call(arguments));
		} else {
			this.status = 401;
			this.body = 'Unauthorized';
		}
	};
}

module.exports = function(app) {
	//Passport routes
	app.use(R.post('/',
		services.passport.authenticate('local', {
			successRedirect: '/dates',
			failureRedirect: '/'
		})
	));
	app.use(R.get('/logout', function *() {
		this.logout();
		this.redirect('/');
	}));

	//Views
	app.use(R.get('/', view('login', true)));
	app.use(R.get('/dates', view('dates')));
	app.use(R.get('/users', view('users')));
	app.use(R.get('/users/:name', view('user')));
	app.use(R.get('/dates/:id', view('date')));
	app.use(R.get('/addUser', view('addUser')));
	app.use(R.post('/addUser', action('addUser', 'create')));
	app.use(R.get('/addDate', view('addDate')));
	app.use(R.post('/addDate', action('addDate', 'create')));
	app.use(R.get('/removeDate/:id', action('date', 'remove')));
};
