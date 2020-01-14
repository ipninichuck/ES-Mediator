//required Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');

//create connection to elasticsearch createServer
const client = new elasticsearch.Client({
   host: ['localhost:9200']
 });

//routes are set to point to appropriate handlers
const aggsTermsRoutes = require('./routes/aggs_terms');


//handles the logging of errors
app.use(morgan('dev'));

//handles the parsing of request bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Fix CORS Errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
);

//Handles an OPTIONS requests
  if (req.method == "OPTIONS") {
  res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE', 'GET');
  return res.status(200).json({});
}
 //move on to routes after CORS Handling
 next();
});

//designates which routes the app should use
app.use('/aggs_terms', aggsTermsRoutes);


//error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

//returns errors that are 500
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
     error: {
       message: error.message
     }
   });
});

//exposes app for use within the application
module.exports = app;
