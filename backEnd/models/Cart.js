const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    product: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'books'
        },
        quantity: Number
    }]
}, {timestamps: true})

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;