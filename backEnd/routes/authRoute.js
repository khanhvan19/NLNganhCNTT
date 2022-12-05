const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();

router.route('/register')
    .post(auth.register);
 
router.route('/login')
    .post(auth.login);

router.route('/')
    .get(auth.getAllUsers);
router.route('/:id')
    .put(auth.updateUser);


        
module.exports = router