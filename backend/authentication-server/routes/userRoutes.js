const express = require('express');
const userController = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');

const { signup, login, logout } = userController; 

const router = express.Router()

router.post('/signup', userAuth.saveUser, signup)
router.post('/login', login)
router.post('/logout', logout);

module.exports = router
