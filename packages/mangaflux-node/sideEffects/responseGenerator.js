const { send } = require('micro')

const responseGenerator = (response, data) => send(response, 200, data)

module.exports = responseGenerator
