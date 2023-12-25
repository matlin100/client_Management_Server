// controllers/userController.js
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');
const customerService = require('../services/customerService')

const userController = {
 
    async register(req, res) {
        try {
            const emailExist = await UserService.findUserByEmail(req.body.email);
            if (emailExist) return res.status(400).send('Email already exists');

            const savedUser = await UserService.saveUser(req.body.name, req.body.email, req.body.password);
            res.send({ user: savedUser._id });
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async login(req, res) {
        try {
            const user = await UserService.findUserByEmail(req.body.email);
         
            if (!user) return res.status(400).send('Email not found');
            const validPass = await UserService.comparePassword(req.body.password, user.password);
          
            if (!validPass) return res.status(400).send('Invalid password');
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
          
            const customerDetails = await customerService.fetchCustomerDetails(user.users, user.description)

            res.header('auth-token', token).json({'user': user,"customerDetails":customerDetails , 'token': token});
        } catch (err) {
            res.status(500).send(err);
        }
   
    },
    
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
             
            const updatedUser = await UserService.updateUser(userId, updateData);
            if (!updatedUser) return res.status(404).send('Customer not found.');
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
    
            const deletedUser = await UserService.deleteUser(userId);
            if (!deletedUser) return res.status(404).send('Customer not found.');
    
            res.send('user  deleted successfully.');
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    async getUserByEmail(req, res) {
        try {
            const email = req.body.email;
            if (!email) {
                return res.status(400).send('Email is required');
            }

            const user = await UserService.findUserByEmail(email);
            if (!user) {
                return res.status(404).send('User not found');
            }
            
            const customerDetails = await customerService.fetchCustomerDetails(user.users,  user.description)
            console.log('customerDetails in controller ' + customerDetails)
            res.json({ user, customerDetails });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async getUserByToken(req, res) {
        try {
            const token = req.headers['auth-token'];
            if (!token) return res.status(401).send('Access denied. No token provided.');
           
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await UserService.getUserById(decoded._id);
            
            const customerDetails =await  customerService.fetchCustomerDetails(user.users,  user.description)
            if (!user) return res.status(404).send('User not found');
            res.json({ user, customerDetails });
        } catch (err) {
            res.status(400).send('Invalid token');
        }
    },
};

module.exports = userController;
