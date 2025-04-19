const Student = require('../models/Student.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



module.exports.courses = async (req , res)=>{
    try {
        let studentInfo = await Student.find();
        res.send(studentInfo);
    } catch (error) {
        res.status(500).json({error : "Some error occur while getting Cars Data"})
    }
}


module.exports.signup = async (req , res)=>{
    let info = req.body;
    try {
        let ack = await Student.create({
            name: info.name,
            phone: carData.phone,
            cnic: carData.cnic,
            email: email.color,
            password: password,
            enrollments:[],
        });
        const {accessToken} = await Student.generateAccessToken();

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


module.exports.courses = async(req , res)=>{
    try{
        let accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({error : 'Not logged IN'})
        }
        let stdInfo = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
        if(!stdInfo){
            return res.status(403).json({error : 'Unauthorized Access'})
        }
        console.log(stdInfo)
        const allCourses = await Student.findById(stdInfo._id).populate('enrollments:');
        res.status(200).json(allCourses.enrollments)
    } catch(error){
        res.status(500).json({ error: "An error occurred during insertion." });

    }
}


module.exports.oneCourse = async(req , res)=>{
    try{
        let accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({error : 'Not logged IN'})
        }
        let instInfo = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
        if(!instInfo){
            return res.status(403).json({error : 'Unauthorized Access'})
        }
        console.log(userInfo)
        let {id} = req.params
        const oneCourse = await Course.findById(id).populate('videos');
        res.status(200).json(oneCourse)
    } catch(error){
        res.status(500).json({ error: "An error occurred during insertion." });

    }
}

module.exports.enrolled = async(req , res)=>{
    try{

        let {cu_id} = req.params;
        let stu_id = req.body;
        let stu = await Student.findById(stu_id.id);
        stu.enrollments.push(cu_id);
        await stu.save()
        res.status(200).json({success: "Enrolled!!!"})
    } catch(error){
        
        res.status(500).json({error: "Something went wrong!!!"})
    }


}



module.exports.allCourses = async(req , res)=>{
    
}