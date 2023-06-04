const mongoose = require('mongoose');

const animeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: String,
    studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
    },
    genres: [String],
    numEpisodes: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        default: Date.now()
    },
    source: String,
    demographic: String
});

module.exports = mongoose.model('Anime', animeSchema);