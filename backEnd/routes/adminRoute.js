const express = require('express');
const admin = require('../controllers/adminController');
const router = express.Router();

router.route('/register')
    .post(admin.register);
 
router.route('/login')
    .post(admin.login);

module.exports = router