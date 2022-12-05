const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');

const adminRoute = require('./routes/adminRoute')
const authRoute = require('./routes/authRoute')
const menuRoute = require('./routes/menuRoute')
const bookRoute = require('./routes/bookRoute')
const cartRoute = require('./routes/cartRouter')
const orderRoute = require('./routes/orderRoute')

const {errorHandler} = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api/admin', adminRoute);
app.use('/api/auth', authRoute);
app.use('/api/menu', menuRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/book', bookRoute);

app.all('*', (req, res, next) => {
    const err = new Error('The route can be not found');
    err.statusCode = 404;
    next(err);
})// Route Error(1)

app.use(errorHandler);

module.exports = app;
