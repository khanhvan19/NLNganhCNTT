const { Types } = require('mongoose');

const Book = require('../models/Book')
const Cart = require('../models/Cart');

exports.addCart = async (req, res, next) => {
    console.log(req.body.quantity);
    try {
        const cartOfUser = await Cart.findOne({
            user: req.body.idUser
        });

        if (cartOfUser == null) {
            var cart = await Cart.create({
                user: req.body.idUser,
                product: [{
                    id: req.body.idProduct,
                    quantity: req.body.quantity
                }]
            })
        } else {
            const productOfCart = await Cart.aggregate([{ $match: 
                { $and: [
                    {user: Types.ObjectId(req.body.idUser)},
                    {"product.id": Types.ObjectId(req.body.idProduct)},
                ]} 
            }]).unwind('product');
            if (productOfCart.length == 0) {
                var cart = await Cart.findOneAndUpdate({
                    user: req.body.idUser
                },
                {
                    $push: {
                        product: {
                            id: req.body.idProduct,
                            quantity: req.body.quantity
                        }
                    }
                })
            } else {
                const productCurrent = productOfCart.filter(e => e.product.id == req.body.idProduct)[0];

                const book = await Book.findById(req.body.idProduct)
                const count = parseInt(req.body.quantity) + parseInt(productCurrent.product.quantity)

                if( count > book.quantity ) {
                    res.status(200).json({
                        message : "Vượt quá số lượng cho phép"
                    })
                    return;
                } else if( count <= 0) {
                    this.deleteCart(req, res, next)
                }

                var cart = await Cart.findOneAndUpdate({
                    user: Types.ObjectId(req.body.idUser)
                }, {
                    "$set": {
                        ["product.$[element].quantity"] : count
                    }
                }, {
                    "arrayFilters": [{
                        "element.id": Types.ObjectId(req.body.idProduct)
                    }]
                })
            }
        }
        res.status(200).json({
            data: { cart }
        })
    } catch (error) {
        next(error)
    }
}

exports.updateQuantity = async (req, res, next) => {
    try {
        const productOfCart = await Cart.aggregate([{ $match: 
            { $and: [
                {user: Types.ObjectId(req.body.idUser)},
                {"product.id": Types.ObjectId(req.body.idProduct)},
            ]}
        }]).unwind('product');
        const productCurrent = productOfCart.filter(e => e.product.id == req.body.idProduct)[0]
        
        var count = parseInt(req.body.quantity) + parseInt(productCurrent.product.quantity)

        var cart = await Cart.findOneAndUpdate({
            user: Types.ObjectId(req.body.idUser)
        }, {
            "$set": {
                ["product.$[element].quantity"] : count
            }
        }, {
            "arrayFilters": [{
                "element.id": Types.ObjectId(req.body.idProduct)
            }]
        })
        
        res.status(200).json({
            data: { cart }
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        await Cart.findOneAndUpdate({
            user: Types.ObjectId(req.body.idUser)
        }, {
            $pull: { product: { id: Types.ObjectId(req.body.idProduct) } }
        })
        res.status(200).json({
            message : "Sản phẩm đã được xóa khỏi giỏ hàng"
        })
    } catch (error) {
        next(error)
    }
}

exports.getCartByUser = async (req, res, next) => {
    try {
        var total = 0;
        var isFreeShip = false;
        const cart = await Cart.findOne({
            user: Types.ObjectId(req.query.user)
        }) 
            .populate('user')
            .populate({
                path: 'product',
                populate: {path: 'id'}
            })
        cart.product.forEach(item => {
            var finalPrice = item.id.price - (item.id.price * (item.id.discount / 100))
            total += finalPrice * item.quantity
            if(item.id.freeShip === false || item.id.freeShip == null) isFreeShip = true;
        });
        res.status(200).json({
            products: cart.product,
            totalPrice: total,
            isFreeShip: isFreeShip,
        })
    } catch (error) {
        res.json(error)
    }
}




