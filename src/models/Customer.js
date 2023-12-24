const mongoose = require('mongoose');

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
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    customerServiceLink: {
        type: String,
        required: false
    },
   chat: [{
    type: String,
    required: false,
    urgency: Number,
    importance: Number,
    customerSatisfaction: Number,
    customerStrength: Number,
    satisfaction: Number,
    subject: String,
    category: String,
    content: String,
    date: Date,
    tyme: String,  
    urgency: Number,
    recommend: [{
        type: String,
        required: false
    }],
}],
    omryRecommend: [{
        type: String,
        required: false
    }],
    date: {
        type: Date,
        default: Date.now
    },
    

    // For example, role, date of account creation, etc.
});

module.exports = mongoose.model('Customer', CustomerSchema);