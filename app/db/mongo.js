const { MongoClient } = require('mongodb');
const { MONGO_DB } = require('../config')

let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(MONGO_DB);
    console.log('Trying to connect to mongodb')
    await client.connect();
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
}

function getDatabase() {
  return client.db('travel_diary');
}

module.exports = {
  connectToDatabase,
  getDatabase,
};
