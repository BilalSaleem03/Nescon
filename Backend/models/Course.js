const mongoose = require('mongoose')
const Student = require('./Student.js')
const Video = require('./Video.js')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    coverImage: {
        url: {
            type: String,
            required: true 
        },
        filename: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    enrolledStudents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
    }],
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
        
    }]
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;