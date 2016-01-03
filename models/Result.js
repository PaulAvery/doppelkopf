module.exports = {
	attributes: {
		date: {
			model: 'date'
		},
		user: {
			model: 'user',
			required: true
		},
		points: {
			type: 'integer',
			required: true
		},
		position: {
			type: 'integer',
			required: true
		},
		money: {
			type: 'integer',
			required: true
		}
	}
};
