const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(200).json({
            status: 'success',
            data: { admin }
        })
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;    
            return next(err);
        }
        else {
            if (bcrypt.compareSync(req.body.password, admin.password)) {
                res.status(200).send(admin)
            } else {//field is not correct (5)
                const err = new Error('Email or Password is not correct');
                err.statusCode = 400;    
                return next(err);
            }
        }
    } catch (error) {
        res.json(error);
    }
}