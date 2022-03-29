const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookControoler = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');

router.post('/register', userController.createUser);
router.post('/login', userController.userLogin);
router.post('/books', bookControoler.createBook);
router.get('/books', bookControoler.getBooksDetails);
router.get('/books/:bookId', bookControoler.getBooksById);
router.put('/books/:bookId', bookControoler.updateBook)
router.delete('/books/:bookId', bookControoler.deletedById)

module.exports = router;