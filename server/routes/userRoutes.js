const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authenticate');


userRoutes.get('/me', authenticate, userController.getUser);
userRoutes.post('/', userController.createUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.delete('/me/token', authenticate, userController.deleteUser);

module.exports = {
    userRoutes,
};
