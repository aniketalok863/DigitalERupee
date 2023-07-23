const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

// GET route to fetch all users
router.get('/users', UserController.getAllUsers);

// POST route to create a new user
router.post('/register', UserController.createUser);

module.exports = router;
