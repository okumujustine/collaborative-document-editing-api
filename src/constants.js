require('dotenv').config()

const port = process.env.PORT || 3001
const mongoDBURL = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/docs'
const socketOrigin = process.env.SOCKET_ORIGIN || 'http://localhost:3000'

module.exports = {
    port,
    mongoDBURL,
    socketOrigin
}