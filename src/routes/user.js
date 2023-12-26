const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth'); 

// Login User
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/user',verifyToken ,userController.updateUser);
router.delete('/user/:id',verifyToken ,userController.deleteUser);
router.get('/user',verifyToken , userController.getUserByToken);
module.exports = router;