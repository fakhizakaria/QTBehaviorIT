const mongoose = require('mongoose');

const targetSchema = mongoose.Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true}
});

module.exports = mongoose.model('Target', targetSchema);