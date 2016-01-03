module.exports = {
	attributes: {
		date: {
			type: 'date',
			required: true
		},
		results: {
			collection: 'result',
			via: 'date'
		}
	}
};
