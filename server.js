// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const messageRoutes = require('./server/routes/messages')
const contactRoutes = require('./server/routes/contacts')
const documentRoutes = require('./server/routes/documents')

var mongoose = require('mongoose');


// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const { error } = require('console');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/messages', messageRoutes)
app.use('/contacts', contactRoutes)
app.use('/documents', documentRoutes)

// Tell express to map all other non-defined routes back to the index page
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

// establish a connection to the mongo database
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Connection failed: ' + err);
  });
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
