
const mongoose = require('mongoose');

const StudioSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    foundationDate: {
        type: Date,
        default: Date.now()
    },
    animes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
    }]
});

module.exports = mongoose.model('Studio', StudioSchema);