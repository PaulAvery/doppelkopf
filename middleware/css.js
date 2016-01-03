var watch = require('node-watch');
var sass = require('node-sass');
var path = require('path');
var prefixer = require('autoprefixer');
var log = logger.child({module: 'assets', asset: 'css'});

module.exports = function(src, dest) {
	var cache = '', time = new Date();

	//Render our file and run the prefixer on success. Also update the timestamp for caching
	function render() {
		sass.render({
			file: src
		}, function(err, result) {
			if(err) {
				log.error('Failed to compile sass', err);
			} else {
				cache = prefixer.process(result.css).css;
				time = new Date();
				log.info('Recompiled sass (and added prefixes)');
			}
		});
	}

	//Render initially and watch our directory for updates.
	render();
	watch(path.dirname(src), function() {
		render();
	});

	//Return our middleware which returns our styles when requested with the fitting path
	return function *(next) {
		if(this.path === dest) {
			this.body = cache;
			this.lastModified = time;
			this.type = 'text/css';
		} else {
			yield next;
		}
	};
};
