const connectDB = require('../promises/connectDB')
const { mongoURL } = require('./urls')

const connectMiddleware = async () => {
  global.db = await connectDB(mongoURL)
}

module.exports = connectMiddleware
