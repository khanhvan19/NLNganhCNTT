const express = require('express');
const cart = require('../controllers/cartController');
const router = express.Router();

router.route('/')
    .post(cart.addCart)
    .put(cart.deleteCart)
    .get(cart.getCartByUser);

module.exports = router