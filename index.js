const Server = require('logux-server').Server;
const path = require('path');
const fs = require('fs');
const pathToData = path.resolve('data.json');
const loguxEventsHandler = require('./src/utils/loguxEventsHandler');

const storage = require('./src/utils/storage');

const app = new Server({
	subprotocol: '1.0.0',
	supports: '1.x',
	root: __dirname
});

function senInitialData() {
	setTimeout(function () {
		const initalData = JSON.parse(fs.readFileSync(pathToData));
		app.log.add({
			type: 'setState',
			payload: initalData
		});
	}, 50);
}

app.auth((token) => {
	senInitialData();
	return Promise.resolve(true);
});

loguxEventsHandler(app, storage, (storage) => {
	fs.writeFileSync(pathToData, JSON.stringify(storage.getState()));
});

app.listen({port: 1337});
