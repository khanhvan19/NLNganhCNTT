const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true},
    email: { type: String, required: true},
    account: {type: String, unique: true, required: true},
    password: { type: String, required: true, minlength: [8, 'Password must be 8 characters']},
    avt: {type: String, trim: true},
    phone: {type: String, trim: true}
}, { timestamps: true })

//ma hoa password
userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    })
})

const User = mongoose.model('users', userSchema)

module.exports = User;