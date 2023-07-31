const mongoose = require('mongoose');
const connection = require('../libs/connection');

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
    },
    status: {
        type: String
    }
}, {
    timestamps: true,
});


module.exports = connection.model('Task', taskSchema);