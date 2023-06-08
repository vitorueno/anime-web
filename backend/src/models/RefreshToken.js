const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true
    }
});

module.exports = mongoose.model('RefreshToken', TokenSchema);