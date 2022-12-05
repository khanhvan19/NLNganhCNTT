const express = require('express');
const book = require('../controllers/bookController');
const router = express.Router();

router.route('/')
    .get(book.getOnePage)
    .put(book.createOneBook);

router.route('/all')
    .get(book.getAllBooks)

router.route('/:bookId')
    .put(book.updateOneBook)
    .delete(book.deleteOneBook);

router.route('/detail/:bookId')
    .get(book.getBookById);

router.route('/search')
    .get(book.getBooksBySearch);

router.route('/same')
    .get(book.getBooksSame);

router.route('/review')
    .get(book.getAllReviewsBook)
    .post(book.createOneReviewBook);

module.exports = router

