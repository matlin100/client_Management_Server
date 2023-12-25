// controllers/userController.js
const jwt = require('jsonwebtoken');
const DbService = require('../services/DbService');


const userController = {
 
    async register(req, res) {
        try {
            const emailExist = await DbService.findUserByEmail(req.body.email);
            if (emailExist) return res.status(400).send('Email already exists');

            const savedUser = await DbService.saveUser(req.body.name, req.body.email, req.body.password);
            res.send({ user: savedUser._id });
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async login(req, res) {
        try {
            const user = await DbService.findUserByEmail(req.body.email);
         
            if (!user) return res.status(400).send('Email not found');
            const validPass = await DbService.comparePassword(req.body.password, user.password);
          
            if (!validPass) return res.status(400).send('Invalid password');
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
          
            const customerDetails = await DbService.fetchCustomerDetails(user.users)

            res.header('auth-token', token).json({'user': user,"customerDetails":customerDetails , 'token': token});
        } catch (err) {
            res.status(500).send(err);
        }
   
    },
    
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
             
            const updatedUser = await DbService.updateUser(userId, updateData);
            if (!updatedUser) return res.status(404).send('Customer not found.');
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
    
            const deletedUser = await DbService.deleteUser(userId);
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

            const user = await DbService.findUserByEmail(email);
            if (!user) {
                return res.status(404).send('User not found');
            }
            
            const customerDetails = await DbService.fetchCustomerDetails(user.users)
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
            const user = await DbService.getUserById(decoded._id);
            
            const customerDetails =await  DbService.fetchCustomerDetails(user.users)
            if (!user) return res.status(404).send('User not found');
            res.json({ user, customerDetails });
        } catch (err) {
            res.status(400).send('Invalid token');
        }
    },
};

module.exports = userController;
