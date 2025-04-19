const jwt = require('jsonwebtoken');
const Instructor = require('../models/Instructor.js')





module.exports.login = async (req , res)=>{
    let accessToken = req.cookies.accessToken;
    if(accessToken){
        return res.status(403).json({error : 'Already logged IN'})
    }
    const {email , password} = req.body;
    try{
        if(!email || !password){
            return res.status(401).json({error : "No Cradentials Provided"})
        }
        const instructorFromDatabase = await Instructor.findOne({email : email});
        if(!instructorFromDatabase){
            return res.status(401).json({error : "Invalid Username or Password"})
        }
        const isValidPAssword = await instructorFromDatabase.isPasswordCorrect(password);
        if(!isValidPAssword){
            return res.status(401).json({error : "Invalid Password"})
        }

        const {accessToken} = await Instructor.generateAccessToken();

        const options = {httpOnly : true , secure: false, maxAge: 24 * 60 * 60 * 1000};   
        return res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .json({role : "Instructor"});

    } catch(error){
        console.log(error);       
        res.status(500).json({error : "something went wrong"})
    }
}

module.exports.logout = async (req , res)=>{
    const options = {httpOnly : true , secure: false};
    return res 
    .status(200)
    .clearCookie("accessToken" , options)
    .json({success : "Logged Out"})
}