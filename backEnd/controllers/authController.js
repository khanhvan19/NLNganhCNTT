const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: 'success',
            data: { user }
        })
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ account: req.body.account });
        if (!user) {
            const err = new Error('Account or Password is not correct');
            err.statusCode = 400;    
            return next(err);
        }
        else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send(user)
            } else {
                const err = new Error('Account or Password is not correct');
                err.statusCode = 400;    
                return next(err);
            }
            
        }
    } catch (error) {
        res.json(error);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.json(error)
    }
}
exports.updateUser = async (req, res, next) => {
    try {
        const users = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).send(users)
    } catch (error) {
        res.json(error)
    }
}

