const { MongoClient } = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
  const mongoClient = await new MongoClient('mongodb://127.0.0.1:27017').connect()
  db = mongoClient.db('Transaction')
  
  req.db = db
  
  next()
}

module.exports = databaseMiddleware