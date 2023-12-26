// controllers/userController.js
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');
const customerService = require('../services/customerService');
const GPTGeneratorService = require('../services/GPTgeneratorService');

const userController = {
 
    async register(req, res) {
        try {
          const emailExist = await UserService.findUserByEmail(req.body.email);
          if (emailExist) return res.status(400).send('Email already exists');
      
          const savedUser = await UserService.saveUser(req.body.name, req.body.email, req.body.password);
          
          // Generate a JWT token for the registered user
          const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
          
          // Return a success message along with the user and token in the response
          res.header('Authorization', token).json({ message: 'Registration successful',token });
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
          const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        
          const improveRecommend = await GPTGeneratorService.generateRecommendForUser(user.users, user.description)
          
          if (!user.recommend) { user.recommend = [] }
          user.recommend[0] = improveRecommend
          user.save()
      
          // Return a success message along with the user, customerDetails, and token in the response
          res.header('Authorization', token).json({ message: 'Login successful', token });
        } catch (err) {
          res.status(500).send(err);
        }
      },
      
    async updateUser(req, res) {
        try {
            const userId = req.user._id;
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
            const improveRecommend = await GPTGeneratorService.generateRecommendForUser(user.users, user.description)
            if (! user.recommend) { user.recommend = []}
            user.recommend[0] = improveRecommend
            user.save()
            res.json({ user, customerDetails });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async getUserByToken(req, res) {
        try {
            const authorizationHeader = req.header('Authorization');
            if (!authorizationHeader) return res.status(401).send('Access Denied');
            const token = authorizationHeader.split(' ')[1];
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await UserService.getUserById(verified._id);
            if (!user) return res.status(404).send('User not found');
            const customerDetails =await  customerService.fetchCustomerDetails(user.users,  user.description)
            const improveRecommend = await GPTGeneratorService.generateRecommendForUser(user.users, user.description)
            if (! user.recommend) { user.recommend = []}
            user.recommend.push(improveRecommend)
            await user.save()
            res.json({ user, customerDetails });
        } catch (err) {
            res.status(400).send('Invalid token');
        }
    },
};

module.exports = userController;
