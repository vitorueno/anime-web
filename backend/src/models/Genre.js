const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Genre', GenreSchema);