const mongoose = require('mongoose')


const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    transcript: {
        type: String,
    },
    cloudLink:{
        url: {
            type: String,
            required: true 
        },
        filename: {
            type: String,
            required: true
        }
    },
    length:{
        type: String
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;

