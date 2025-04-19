const Instructor = require('../models/Instructor.js')
const Course = require('../models/Course.js')
const Video = require('../models/Video.js')




module.exports.courses = async (req , res)=>{
    try {
        let instructorInfo = await Instructor.find();
        res.send(instructorInfo);
    } catch (error) {
        res.status(500).json({error : "Some error occur while getting Cars Data"})
    }
}


module.exports.signup = async (req , res)=>{
    let info = req.body;
    try {
        let ack = await Instructor.create({
            name: info.name,
            phone: info.phone,
            cnic: info.cnic,
            email: info.email,
            password: info.password,
            courses:[],
        });
        const {accessToken} = await Instructor.generateAccessToken();

        const options = {httpOnly : true , secure: false, maxAge: 24 * 60 * 60 * 1000};   
        return res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .json({success : "Logged IN"});

    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
}
module.exports.addCourse = async (req , res)=>{
    let info = req.body;
    let imageURL = req.file.path;
    let imageFileName = req.file.filename;
    let {ins_id} = req.params
    try {
        let ack = await Course.create({
            coverImage: {
                url: imageURL, // Store image path in DB
                filename: imageFileName
            },
            title: info.title,
            description: info.description,
            enrolledStudents:[],
            videos:[],
        });
        let ins = await Instructor.findById(ins_id);
        ins.cources.push(ack._id);
        await ins.save();
    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
}
module.exports.addVideoToCourse = async (req , res)=>{
    let info = req.body;
    let imageURL = req.file.path;
    let imageFileName = req.file.filename;
    let {course_id} = req.params
    try {
        let ack = await Video.create({
            cloudLink: {
                url: imageURL, // Store image path in DB
                filename: imageFileName
            },
            title: info.title,
            description: info.description,
            thumbnail : info.thumbnail,
            transcript : info.transcript,
            length:info.length
        });
        let course = await Course.findById(course_id);
        course.videos.push(ack._id);
        await course.save();
    } catch (error) {
        res.status(500).json({ error: "An error occurred during insertion." });
        return;
    }
}