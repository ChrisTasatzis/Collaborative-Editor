// Module requirements 
var http = require('http'); // Used to serve the database
var WebSocket = require('ws'); // Used to serve the database
var WebSocketJSONStream = require('websocket-json-stream'); // Used to serve the database
var ShareDB = require('sharedb'); // Used to create the ShareDB database

// Read the environment variables
var port = process.env.PORT;

// Create the ShareDB database 
var sharedb = new ShareDB();
var connection = sharedb.connect();
connection.get('docs', 'doc1').create({content: 'Type something ...'});

// Create the server that servers the ShareDB database
var server = http.createServer();
var wss = new WebSocket.Server({server: server});
wss.on('connection', (ws, req) => {
	var stream = new WebSocketJSONStream(ws);
	sharedb.listen(stream);
});

// Start listeing on the right port 
server.listen(port, () => {
	console.log(`ShareDB: listening on port ${port}`);
});
