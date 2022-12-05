const mongoose = require('mongoose')

const reviewBookSchema = new mongoose.Schema({
    star: Number,
    comment: String, 
    idBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true})

const reviewBook = mongoose.model('reviewbooks', reviewBookSchema);

module.exports = reviewBook;