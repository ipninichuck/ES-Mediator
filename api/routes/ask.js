//Library of functions used to build Elasticsearch queries

//required Dependencies
const express = require('express');
const router = express.Router();
const elasticsearch = require('elasticsearch');
const bodyParser = require('body-parser');
const agg = require('./agg_terms');
//Use json data from request
router.use(bodyParser.json());

//Parse search body
router.get('/', (req, res, next) => {

		 var type = req.body.type;
		 var field = req.body.field;
		 var metric = req.body.metric;

     if(type == 'aggs'){
       agg(field);
     }

		 else{
       console.log(nope);
     }
});

//Choose search function to perform




//exposes the router method for the entire application
module.exports = router;
