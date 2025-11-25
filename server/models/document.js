const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  id: String,
  name: String,
  url: String
});

const messageSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    url: {type: String, required: true},
    children: [childSchema]
})

module.exports = mongoose.model('Document', messageSchema);