const MongoClient = require('mongodb').MongoClient

const connectDB = (url) => (
  new Promise((resolve, reject) => (
    MongoClient.connect(url, (err, db) => {
      console.log("connected")
      resolve(db)
    })
  ))
)

module.exports = connectDB
