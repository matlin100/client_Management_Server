// customerController.js

const Business = require('../models/Business');
const Customer = require('../models/Customer');

const customerController = {
    async submitInfo(req, res) {
        try {
            const businessId = req.query.businessId;
            const { customerName, email, ...otherDetails } = req.body;

            const newCustomer = new Customer({
                name: customerName,
                email,
                // ... other customer details ...
            });

            // Optionally, link this customer to the business
            // Assuming Business schema has a reference field for customers

            await newCustomer.save();
            res.send('Customer information saved');
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async updateCustomer(req, res) {
        try {
            const customerId = req.params.id;
            const updateData = req.body;

            const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updateData, { new: true });
            if (!updatedCustomer) return res.status(404).send('Customer not found.');

            res.json(updatedCustomer);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    async deleteCustomer(req, res) {
        try {
            const customerId = req.params.id;

            const deletedCustomer = await Customer.findByIdAndDelete(customerId);
            if (!deletedCustomer) return res.status(404).send('Customer not found.');

            res.send('Customer deleted successfully.');
        } catch (err) {
            res.status(500).send(err);
        }
    }
};

module.exports = customerController;
