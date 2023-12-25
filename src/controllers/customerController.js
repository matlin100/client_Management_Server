const customerService = require('../services/customerService');

const customerController = {
    async handleCustomerSubmission(req, res) {
        try {
            const customer = await customerService.handleCustomerSubmission(req.body);
            res.status(200).json(customer);
        } catch (err) {
            if (err.message === 'User not found') {
                res.status(404).send('User not found');
            } else {
                res.status(500).send(err.message);
            }
        }
    }
};

module.exports = customerController;


    


