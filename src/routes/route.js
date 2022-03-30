const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');
const { mid1 } = require('../middleware/auth');


// User Api
router.post('/register', userController.createUser);
router.post('/login', userController.userLogin);
// Book Api
router.post('/books',  mid1, bookController.createBook);
router.get('/books',mid1, bookController.getBooksDetails);
router.get('/books/:bookId',mid1, bookController.getBooksById);
router.put('/books/:bookId', mid1,bookController.updateBook);
router.delete('/books/:bookId',mid1, bookController.deletedById);
// Review Api
router.post('/books/:bookId/review', reviewController.addReview);
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview);
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview);

module.exports = router;