module.exports = (logux, storage, handler = Function.prototype) => {
	logux.log.on('event', (event) => {
		const {type, payload} = event;
		if (type === 'setState') {
			storage.setState(payload);
		}
		handler(storage)
	});
};
