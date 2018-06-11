var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var message = new Schema({
    textContent: String,
    senderId: String
});

module.exports = mongoose.model('Message', message);
