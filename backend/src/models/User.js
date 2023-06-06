const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RefreshToken'
    }],
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);