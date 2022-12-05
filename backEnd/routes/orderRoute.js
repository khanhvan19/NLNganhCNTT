const express = require('express');
const order = require('../controllers/orderController');
const router = express.Router();

router.route('/')
    .get(order.getAllOrders)
    .post(order.createOneOrder);

router.route('/status')
    .get(order.getOrderByStatus)

router.route('/:id')
    .get(order.getOrderById)
    .put(order.updateStatus)
    
module.exports = router

