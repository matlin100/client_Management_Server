const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    url:{
        type:String,
    },
    description:{
        type: String,
    },
    logo: {
        type: String,
        required: false
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
        customerName: [String], // Array of customer names
        email: [String], // Array of emails
        urgency: Number,
        importance: Number,
        customerSatisfaction: Number,
        customerStrength: Number,
        hour: String // Time of communication
    }],
    recommend: [{
        type: String,
        required: false
    }],
    omryRecommend: [{
        type: String,
        required: false
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
    return `${baseURL}/${this._id}`.toString();
};
module.exports = mongoose.model('User', userSchema);