var express = require('express');
require('dotenv').config();

var port = process.env.process.env.npm_package_config_port || process.env.PORT || 8080;

var app = express();

app.use(express.static('.'));
app.use(express.static('../node_modules'));
app.listen(port, () => {
	console.log(`App: listening on port ${port}`);
});
