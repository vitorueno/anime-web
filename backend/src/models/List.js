const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    animes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
    }]
});

module.exports = mongoose.model('List', ListSchema);