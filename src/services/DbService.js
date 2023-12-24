// services/DbService.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Customer = require('../models/Customer'); // Adjust the path as per your project structure
const  GPTGeneratorService = require('./GPTgeneratorService')

const DbService = {
    async getUserById(userId) {
        return await User.findById(userId);
    },

    async findUserByEmail(email) {
        return await User.findOne({ email });
    },

    async saveUser(name, email, password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({ name, email, password: hashedPassword });

        // Save the user first to generate an _id
        await user.save();

        // Now generate the URL with the available _id
        user.url = user.generateURL();

        // Optionally, save the user again if you want to store the URL in the database
        return await user.save();
    },

    async comparePassword(inputPassword, userPassword) {
        return await bcrypt.compare(inputPassword, userPassword);
    },

    async updateUser(userId, updateData) {
        try {
            const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
    
            // Generate URL with the available _id
            user.url = user.generateURL();
    
            // Since we're modifying the document after findByIdAndUpdate, we need to save it
            await user.save();
    
            return user;
        } catch (err) {
            console.error(err);
            throw err; // Propagate the error to be handled in the controller
        }
    },
    
    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    },
   
    
    
        async  handleCustomerSubmission({ name, email, chat, userId }) {
            let user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
        
            let customer = await Customer.findOne({ email, userId: user._id });
            if (!customer) {
                customer = new Customer({ name, email, userId: user._id });
                user.users.push(customer._id);
            }
        
            // TODO: Replace the following 'undefined' with actual values or logic
            
            
            const chatEntry = {
                message: chat,
                urgency: await (GPTGeneratorService.generateChat(chat , GPTGeneratorService.urgency)), // Replace with actual urgency value
                importance: await (GPTGeneratorService.generateChat(chat , GPTGeneratorService.importance)),
                customerSatisfaction: await (GPTGeneratorService.generateChat(chat , GPTGeneratorService.customerSatisfaction)),
                customerStrength: await (GPTGeneratorService.generateChat(chat , GPTGeneratorService.customerStrength)),
                satisfaction: await (GPTGeneratorService.generateChat(chat , GPTGeneratorService.satisfaction)),
                friendly: await (GPTGeneratorService.generateChat(chat , GPTGeneratorService.friendly)),
                subject: await GPTGeneratorService.generateChat(chat , GPTGeneratorService.subject),
                category:await GPTGeneratorService.generateChat(chat , GPTGeneratorService.category),
                content: await GPTGeneratorService.generateChat(chat , GPTGeneratorService.content),
                Personal_response:await ( GPTGeneratorService.generateChat(chat , GPTGeneratorService.Personal_response)),
                date: new Date() // Date now
            };
           
            customer.chat.push(chatEntry);
        
            await customer.save();
            await user.save();
            console.log("description :" +  user.description )
            return {'customer':customer , 'Answer':GPTGeneratorService.generateAnswer(chat , user.description)}
        }
        
    
  


     
};

module.exports = DbService;
