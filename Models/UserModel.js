const mongoose = require('mongoose');
const Task = require('./TaskModel');




const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tasks: [Task.schema] // Use Task.schema em vez de Task.Schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;