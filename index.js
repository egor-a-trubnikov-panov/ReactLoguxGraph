const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const pathToData = path.resolve('data.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/build"));
app.engine('html', require('uinexpress').__express);
app.set('view engine', 'html');

app.get('/', (req, res) => {
	res.render('index.html');
});

app.get('/api', (req, res) => {
	res.json(JSON.parse(fs.readFileSync(pathToData)));
});

app.post('/api', (req, res) => {
	fs.writeFileSync(pathToData, JSON.stringify(req.body));
	res.json({complete: true});
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.status(404);
	res.json({
		error: 'Not found'
	});
	return;
});

// error handlers
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: err.message
	});
	return;
});

const port = process.env.PORT || 3000;
app.listen(port);
