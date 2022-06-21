const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');

const hostName = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
	let fileName = path.join(__dirname, 'resources', req.url == '/' ? 'home.html' : req.url);
	let contentType = 'text.html';

	if (!path.extname(fileName)) {
		fileName += '.html';
	}

	switch (path.extname(fileName)) {
		case '.css':
			contentType = 'text/css';
			break;
		case '.js':
			contentType = 'text/js';
			break;
		case '.ico':
			contentType = 'image/ico';
			break;
	}

	fs.readFile(fileName, (err, data) => {
		if (err) {
			fs.readFile(path.join(__dirname, 'resources', 'error.html'), (err, data) => {
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});

				res.end(data);
			});
		} else {
			res.writeHead(200, {
				'Content-Type': contentType
			});

			res.end(data);
		}
	});
});

server.listen(port, hostName, () => {
	console.log('Server has been started at port: ' + port)
});