const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please, Enter the Question!']
    },
    answer: {
        type: String,
        required: [true, 'Please, Enter the Answer!']
    },
    // subject: {
    //     enum: ['cs','maths'],
    //     required: true,
    //     default: 'cs' 
    // }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;


