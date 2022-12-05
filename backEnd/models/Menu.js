const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: String,
    show: Boolean,
    sub: [{
        name: String,
        show: Boolean
    }]
}, {timestamps: true})

const Menu = mongoose.model('menus', menuSchema);

module.exports = Menu;