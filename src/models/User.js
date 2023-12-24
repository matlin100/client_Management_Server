const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    url: {
        type: String
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    tags: [String],
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    phone: String,
    website: String,
    summary: {
        satisfaction: Number,
        importance: Number,
        subject: String,
        category: String,
        content: String
    },
    communication: [{
        date: Date,
        customerName: [String],
        email: [String],
        urgency: Number,
        importance: Number,
        customerSatisfaction: Number,
        customerStrength: Number,
        hour: String
    }],
    recommend: [{
        type: String
    }],
    omryRecommend: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }]
});

userSchema.methods.generateURL = function() {
    const baseURL = process.env.USER_URL; // Ensure USER_URL is defined in your .env file
    return `${baseURL}/${this._id}`;
};

module.exports = mongoose.model('User', userSchema);
