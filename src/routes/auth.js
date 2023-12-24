const router = require('express').Router();
const userController = require('../controllers/userController');

// Login User
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user', userController.getUserByEmail);
module.exports = router;