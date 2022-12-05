const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: [8, 'Password must be 8 characters']},
    avt: {type: String}
}, { timestamps: true })

//ma hoa password
adminSchema.pre('save', function (next) {
    let admin = this;
    bcrypt.hash(admin.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        } else {
            admin.password = hash;
            next();
        }
    })
})

const Admin = mongoose.model('admins', adminSchema)

module.exports = Admin;