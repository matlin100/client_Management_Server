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
    recommend:String,
    date: { type: Date, default: Date.now },
    chatId: { type: Number}
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
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
        minlength: 6,
        maxlength: 1024
    },


    date: {
        type: Date,
        default: Date.now
    },
    
    
    chat: [ChatSchema],

    somryRecommend:[ {
        type: String,
        required: false
    }],
    
    Recommend:[ {
        type: String,
        required: false
    }],
    
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming userId is an ObjectId
        required: true
    },
});
CustomerSchema.pre('save', function(next) {
    this.chat.forEach((chat, index, array) => {
            chat.chatId = array.length - index - 1; // This will set the chatId starting from 0 for the newest chat and incrementing by 1 for each older chat.
    });
    next();
});
module.exports = mongoose.model('Customer', CustomerSchema);