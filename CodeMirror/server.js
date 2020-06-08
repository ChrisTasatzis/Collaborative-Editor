var express = require('express');
const ipfsClient = require('ipfs-http-client');
const { urlSource } = ipfsClient
require('dotenv').config();

var port = process.env.PORT || 8080;
var host = process.env.IPFSHOST;
var ipfsport = process.env.IPFSPORT;


console.log(process.env.PORT)

var app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('.'));
app.use(express.static('../node_modules'));
app.post('/', async (req, res) => {
	var uri
	const ipfs = ipfsClient({ host: '83.212.77.11', port: '5002', protocol: 'http' })

	for await (const file of ipfs.add(urlSource('https://ipfs.io/images/ipfs-logo.svg'))) 
	{
		uri = file.cid.toString();
	}
	if(uri)
		res.render('index', {uri: uri, host: host, port: ipfsport});
	else
		res.render('index');
}) 

app.get('/', (req, res) => {
	res.render('index')
  })
app.listen(port, () => {
	console.log(`App: listening on port ${port}`);
});
