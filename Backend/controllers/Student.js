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

