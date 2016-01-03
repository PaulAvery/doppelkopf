var _ = require('lodash');
var hbs = require('handlebars');
var colors = ['#4d4d4d', '#5da5da', '#faa43a', '#60bd68', '#f17cb0', '#b2912f', '#b276b2', '#decf3f', '#f15854'];

function slice(name, last, arc, color, size) {
	var large = arc > Math.PI ? 1 : 0;
	var radius = [size / 2, size / 2];
	var start = [size / 2 + Math.sin(last + Math.PI) * size / 2, size / 2 + Math.cos(last + Math.PI) * size / 2];
	var target = [size / 2 + Math.sin(last + arc + Math.PI) * size / 2, size / 2 + Math.cos(last + arc + Math.PI) * size / 2];
	var text = [size / 2 + Math.sin(last + arc / 2 + Math.PI) * size / 4, size / 2 + Math.cos(last + arc / 2 + Math.PI) * size / 4];

	var d = 'M ' + radius.join(' ') + ' L ' + start.join(' ') + ' A ' + radius.join(' ') + ' 0 ' + large + ' 0 ' + target.join(' ') + ' Z';
	return '<g><path d="' + d + '" fill="' + color + '"></path><text text-anchor="middle" x="' + text[0] + '" y="' + text[1] + '">' + name + '</text></g>';
}

module.exports = function(mapping, size) {
	var total = _.reduce(mapping, function(sum, value) {
		return sum + value;
	}, 0);

	var factor = 2 * Math.PI / total;

	var last = 0;
	var i = 0;
	return new hbs.SafeString('<svg class="pie" width="' + size + '" height="' + size + '">' +
		_.reduce(mapping, function(sum, value, key) {
			last += value * factor;
			return sum + slice(key, last - value * factor, value * factor, colors[i++], size);
		}, '') +
		'</svg>');
};
