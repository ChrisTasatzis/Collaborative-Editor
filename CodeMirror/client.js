// Module requirements 
var WebSocket = require('reconnecting-websocket'); // Used for ShareDB connection
var ShareDB = require('sharedb/lib/client'); // Used for ShareDB connection
var CodeMirror = require('codemirror'); // CodeMirror
var ShareDBCodeMirror = require('./sharedb-codemirror'); // Used to attach ShareDB Database to the editor
var domEventListener = require('dom-event-listener'); // Used for form submission

// Read the environment variables
var port = process.env.DBPORT;
var host = process.env.DBHOST;

// Initialize variables
var ws, connection, codeMirror, shareDBCodeMirror;

// Actions that happen when the page loads
window.onload = (event) => 
{
	// Establish connection to the ShareDB database
	ws = new WebSocket(`ws://${host}:${port}`);
	connection = new ShareDB.Connection(ws);

	// Create CodeMirror from textarea
	codeMirror = new CodeMirror(document.getElementById('textarea'));

	// Set CodeMirror preferences
	codeMirror.setOption('lineNumbers', true);
	codeMirror.setSize(1600, 700);
	
	// Create the object that ties CodeMirror with the ShareDB database
	shareDBCodeMirror = new ShareDBCodeMirror(codeMirror, {verbose: false, key: 'content'});

	// Get a connection from the ShareDB database
	doc = connection.get('docs', 'doc1');
	
	// Attach CodeMirror to the connection
	shareDBCodeMirror.attachDoc(doc, (error) => 
	{
		if (error) {
			console.error(error);
			return;
		}
	});

	// Actions to do before submiting the form 
	function logSubmit(event) 
	{
		// Load a hiddent input with the data contained in the CodeMirror editor
		data = document.getElementById('data');
		data.value = codeMirror.getValue();
	}
	  

	// Get the form element
	const form = document.getElementById('form');
	
	// Make the form call logSubmit before submiting the form 
	domEventListener.add(form, 'submit', logSubmit);
	
}




