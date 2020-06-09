var express = require('express');
var bodyParser = require('body-parser')
const ipfsAPI = require('ipfs-api');
require('dotenv').config();

var port = process.env.PORT || 8080;
var ipfshost = process.env.IPFSHOST;
var host = process.env.DBHOST;
var ipfsport1 = process.env.IPFSPORT1;
var ipfsport2 = process.env.IPFSPORT2;


console.log(process.env.PORT)

var app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static('.'));
app.use(express.static('../node_modules'));
app.post('/', async (req, res) => {
	var uri
	const ipfs = ipfsAPI(ipfshost, ipfsport1, {protocol: 'http'})

	var buffer = Buffer.from(req.body.data)
	ipfs.files.add(buffer, function (err, file) 
	{
		if (err) 
		{
			console.log(err)
			res.render('index');
		}
		console.log(file[0].hash)
        res.render('index', {uri: file[0].hash, host: host, port: ipfsport2, filename: req.body.filename});
	})

	// if(uri)
	// 	res.render('index', {uri: uri, host: host, port: ipfsport2});
	// else
	// 	res.render('index');
}) 

app.get('/', (req, res) => {
	res.render('index')
  })
app.listen(port, () => {
	console.log(`App: listening on port ${port}`);
});
