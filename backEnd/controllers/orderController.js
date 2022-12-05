const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.createOneOrder = async (req, res, next) => {
    try{
        var message = '';
        const cart = await Cart.findOne({user: req.body.user})
        if(cart.product.length != 0) {
            const order = await Order.create({
                ...req.body,
                product:[]
            });
            cart.product.forEach(async (e)=>{
                await Order.findOneAndUpdate({
                    _id: order._id
                },
                {
                    $push: {
                        product: {
                            id: e.id,
                            quantity: e.quantity
                        }
                    }
                });
                await Cart.findOneAndUpdate({
                    user: req.body.user
                }, {
                    $pull: { product: { id: e.id } }
                })
            })
            message = "Đặt hàng thành công!!!"
        } else {
            message = "Đặt hàng không thành công"
        }
        

        res.status(200).json({
            status: 'success',
            message: message
        })
    }catch (error) {
        next(error)
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate({
                path: 'product',
                populate: {path: 'id'}
            })
        res.status(200).send(orders)
    } catch (error) {
        res.json(error)
    }
}

exports.getOrderByStatus = async (req, res, next) => {
    try {
        const orders = await Order.find({
            status: req.query.status
        })
        res.status(200).send(orders)
    } catch (err) {
        res.json(err)
    }
}

exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate({
                path: 'product',
                populate: {path: 'id'}
            })
            console.log(order);
        res.status(200).send(order)
    } catch (err) {
        res.json(err)
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {...req.body}, {new: true});
        res.status(200).json({
            message : `Cập nhật trạng thái ${order.status} thành công`
        })
    } catch (error) {
        next(error)
    }
}
