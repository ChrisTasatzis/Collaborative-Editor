var http = require('http');
var express = require('express');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
var ShareDB = require('sharedb');

var port = 8112;

var sharedb = new ShareDB();
var connection = sharedb.connect();
connection.get('docs', 'doc1').create({content: 'Type something ...'});

var server = http.createServer();
var wss = new WebSocket.Server({server: server});
wss.on('connection', (ws, req) => {
	var stream = new WebSocketJSONStream(ws);
	sharedb.listen(stream);
});
server.listen(port, () => {
	console.log(`ShareDB: listening on port ${port}`);
});
