const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Genre', genreSchema);