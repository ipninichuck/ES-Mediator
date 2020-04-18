const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: 'localhost:9200',
  auth: {
  username: 'username',
  password: 'password'
}

 })

module.exports = client;
