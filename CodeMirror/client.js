var WebSocket = require('reconnecting-websocket');
var ShareDB = require('sharedb/lib/client');
var CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
var ShareDBCodeMirror = require('./sharedb-codemirror');
var domEventListener = require('dom-event-listener');
var domready = require("domready");


var port = process.env.DBPORT;
var host = process.env.DBHOST;

var download = window.download || {};

var debug = false;

var ws, connection, codeMirror, shareDBCodeMirror;



window.onload = (event) => 
{
	ws = new WebSocket(`ws://${host}:${port}`);
	connection = new ShareDB.Connection(ws);
	codeMirror = new CodeMirror(document.getElementById('textarea'));
	shareDBCodeMirror = new ShareDBCodeMirror(codeMirror, {verbose: debug, key: 'content'});

	codeMirror.setOption('mode', 'javascript');
	codeMirror.setOption('lineNumbers', true);
	codeMirror.setSize(1600, 700);
	//codeMirror.setOption('theme', 'darcula');
	
	doc = connection.get('docs', 'doc1');
	
	shareDBCodeMirror.attachDoc(doc, (error) => 
	{
		if (error) {
			console.error(error);
			return;
		}
	});

	var element = document.getElementById('downloadButton');
	domEventListener.add(element, 'click',  function(event) 
	{
		data = codeMirror.getValue();
	});

	function logSubmit(event) {
		data = document.getElementById('data');
		data.value = codeMirror.getValue();
	}
	  
	const form = document.getElementById('form');
	
	domEventListener.add(form, 'submit', logSubmit)
	form.addEventListener('submit', logSubmit);
	

}




