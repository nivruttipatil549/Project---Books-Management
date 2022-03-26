const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookControoler = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');

router.post('/register', userController.createUser);
router.post('/login', userController.userLogin);
router.post('/books', bookControoler.createBook);

module.exports = router;