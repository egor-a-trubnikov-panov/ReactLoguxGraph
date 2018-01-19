const {defaultState} = require('../constants');
const storage = {
	state: defaultState,
	setState(state) {
		this.state = state;
	},
	getState() {
		return this.state;
	}
};

module.exports = storage;
