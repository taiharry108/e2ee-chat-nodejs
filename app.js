const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/p2p-message-app')
const cors = require('cors')

const users = require('./routes/users')
const messages = require('./routes/messages')

const app = express()
app.use(express.static(path.join(__dirname, 'message-app-client/build')))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/users', users)
app.use('/api/message', messages)

module.exports = app
