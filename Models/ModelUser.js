const mongoose = require('mongoose');



const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pendente', 'em andamento', 'concluida'],
        default: 'pendente'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
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
    tasks: [taskSchema] // Use Task.schema em vez de Task.Schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;