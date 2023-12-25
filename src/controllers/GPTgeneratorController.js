const User = require('../models/User');
const GPTGeneratorService = require('../services/GPTgeneratorService');
const CustomerService = require('../services/customerService');
const userService = require('../services/userService')

const GPTGeneratorController = {
    async generateRecommendationForCustomer(customerId , userId) {
        try {
            // Fetch customer data
            const customer = await CustomerService.getCustomerById(customerId);
            if (!customer) {throw new Error('Customer not found') }

            const user = await userService.getUserById(userId)
            if (!user) {throw new Error('user not found') }

            // Call the GPTGeneratorService to generate recommendation
            const recommendation = await GPTGeneratorService.generateRecommendForcustomer(customer.chat, customer.description);
            customer.Recommend.push(recommendation);
            await customer.save();
            return recommendation;
        } catch (error) {
            console.error('Error in generateRecommendationForCustomer:', error);
            throw error;
        }
    }

};

module.exports = GPTGeneratorController;
