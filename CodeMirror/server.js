var express = require('express');

var port = 8080;

var app = express();
app.use(express.static('.'));
app.use(express.static('../node_modules'));
app.listen(port, () => {
	console.log(`App: listening on port ${port}`);
});
