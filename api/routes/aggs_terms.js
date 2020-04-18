//required Dependencies
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var client = require('./connection.js');


//Use json data from request
router.use(bodyParser.json());

//uses the router method from express to provide a json response to a get request to /products
router.get('/', (req, res, next) => {

  //create aggregation of protocols
  client.search({
    index: req.body.index,
    body: {

      "query": {
      "range" : {
          "@timestamp": {
              "gte" : req.body.gte,
              "lt" :  req.body.lt
          }
      }
  },

        "aggs": {
            "aggregation": {
                "terms": {
                    "field": req.body.field,
                    "size" : req.body.size,

                }

            }
        }



    }
//Set answer variable to the array storing the bucket values
}).then(results => {
  let answer = results.aggregations.aggregation;
  res.status(200).json({
    message: answer
  });
})
});



//exposes the router method for the entire application
module.exports = router;
