var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: {['localhost:9200']}
  auth: {
    username: 'username',
    password: 'password'
}
 });

module.exports = client;
