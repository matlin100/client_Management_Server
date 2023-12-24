const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    message: String,
    urgency: Number,
    importance: Number,
    customerSatisfaction: Number,
    customerStrength: Number,
    satisfaction: Number,
    friendly: Number,
    subject: String,
    category: String,
    content: String,
    Personal_response: Number,
    date: { type: Date, default: Date.now }
});


const CustomerSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: false,
        minlength: 6,
        maxlength: 1024
    },
   chat: [ChatSchema],
    omryRecommend: [{
        type: String,
        required: false
    }],
    date: {
        type: Date,
        default: Date.now
    },
    
    userId:{
        type: String,
        required: true
    }
    // For example, role, date of account creation, etc.
});

module.exports = mongoose.model('Customer', CustomerSchema);