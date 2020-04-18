//server.js acts as the main script of the application
//required Dependencies
const http = require('http');
const app = require('./api/routes/app');

//sets the port that the RestAPI will listen on
const port = 3030;

//creates an http server that utilizes the app.js script
const server = http.createServer(app);

//sets up the listener on the designated port
server.listen(port);
