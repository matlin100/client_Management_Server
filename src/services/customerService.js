const User = require('../models/User');
const Customer = require('../models/Customer');
const GPTGeneratorService = require('./GPTgeneratorService');
const customerController = require('../controllers/GPTgeneratorController')

const customerService = {

    async createChatEntry(chat, customer) {
        const [
            urgency,
            importance,
            customerSatisfaction,
            customerStrength,
            satisfaction,
            friendly,
            subject,
            category,
            content,
            personalResponse,
            recommend
        ] = await Promise.all([
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.urgency),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.importance),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.customerSatisfaction),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.customerStrength),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.satisfaction),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.friendly),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.subject),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.category),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.content),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.Personal_response),
            GPTGeneratorService.generateChat(chat, GPTGeneratorService.recommend)
        ]);
    
        const chatEntry = {
            message: chat,
            urgency,
            importance,
            customerSatisfaction,
            customerStrength,
            satisfaction,
            friendly,
            subject,
            category,
            content,
            Personal_response: personalResponse,
            recommend,
            date: new Date()
        };
    
        customer.chat.push(chatEntry);
        await customer.save();  // Save the customer with the new chat entry
    },
    
    async handleCustomerSubmission({ name, email, chat, userId }) {
        let user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
    
        let customer = await Customer.findOne({ email, userId: user._id });
        if (!customer) {
            customer = new Customer({ name, email, userId: user._id });
            user.users.push(customer._id);
        }
    
        this.createChatEntry(chat, customer);  // Pass the customer object to the function
    
        user.save();
        return GPTGeneratorService.generateAnswer(chat, user.description);
    },
    
    async fetchCustomerDetails(customerIds) {
        try {
            const customerDetails = await Promise.all(
                customerIds.map(async (customerId) => {
                    return await Customer.findById(customerId);
                })
            );
            return customerDetails;
        } catch (error) {
            console.error("Error fetching customer details", error);
            throw error; // You can handle this error as needed in the calling function
        }
    },
    
    async getCustomerById(CustomerId){
        return await Customer.findById(CustomerId)
    }
};

module.exports = customerService;
