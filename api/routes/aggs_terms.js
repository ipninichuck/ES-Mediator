//required Dependencies
const express = require('express');
const router = express.Router();
const elasticsearch = require('elasticsearch');
//const app = require('../app')
//uses the router method from express to provide a json response to a get request to /products
const client = new elasticsearch.Client({
   host: ['localhost:9200']
 });

router.get('/', (req, res, next) => {
  //create aggregation of protocols
    client.search({
    index: 'packetbeat-7.5.1',
    body: {
        "aggs": {
            "protocols": {
                "terms": {
                    "field": "network.protocol",

                }

            }
        }
    }
//Set answer variable to the array storing the bucket values
}).then(results => {
  let answer = results.aggregations.protocols.buckets;
  res.status(200).json({
    message: answer
  });
})
});



//exposes the router method for the entire application
module.exports = router;
