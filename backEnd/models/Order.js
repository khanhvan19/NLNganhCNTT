const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
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
    }],
    payer: String,
    phone: String,
    address: String,
    payment: String,
    total: Number,
    status: String,
}, {timestamps: true})

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;