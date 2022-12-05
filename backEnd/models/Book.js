const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    images: Array,
    author: String,
    publisher: String,
    price: Number,
    priceEntry: Number,
    discount: Number,
    quantity: Number,
    sold: Number,
    star: Number,
    freeShip: Boolean,
    active: Boolean,
    menu: String,
    type: String,
    info: {
        publishYear: Number,
        language: String,
        weight: Number,
        size: String,
        page: Number,
        formality: String,
        description: String,
    },
}, {timestamps: true})

const Book = mongoose.model('books', bookSchema);

module.exports = Book;

