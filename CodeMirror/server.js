// Module requirements 
var express = require('express'); // Serves the web app
var bodyParser = require('body-parser') // Used to read data from the form
const ipfsAPI = require('ipfs-api'); // Connect to the ipfs server

// Read the environment variables
var port = process.env.PORT || 8080;
var ipfshost = process.env.IPFSHOST;
var ipfsport1 = process.env.IPFSPORT1;
var ipfsport2 = process.env.IPFSPORT2;

// Initialize express
var app = express();

// Set view type and location
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Enable body parsing
app.use(bodyParser.urlencoded({ extended: false }))

// Serve the needed static flies
app.use(express.static('.'));
app.use(express.static('../node_modules'));

// Post method that is called on form submit
app.post('/', async (req, res) => {
	// Get ipfs connection
	const ipfs = ipfsAPI(ipfshost, ipfsport1, {protocol: 'http'})

	// Create a buffer from the string that contains the CodeMirror data
	var buffer = Buffer.from(req.body.data)
	
	// Upload data to the ipfs server
	ipfs.files.add(buffer, function (err, file) 
	{
		if (err) 
		{
			// On error rerender the static page
			console.log(err)
			res.render('index');
		}
		// On success rerender the page with the neeeded info to download the file 
        res.render('index', {uri: file[0].hash, host: ipfshost, port: ipfsport2, filename: req.body.filename});
	})
}) 

// Serve the static page
app.get('/', (req, res) => {
	res.render('index')
})

// Start listening to the given port for requests
app.listen(port, () => {
	console.log(`App: listening on port ${port}`);
});
