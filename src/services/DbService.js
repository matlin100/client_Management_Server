// services/DbService.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

const DbService = {
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
    }
};

module.exports = DbService;
