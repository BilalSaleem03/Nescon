const jwt = require('jsonwebtoken');
const Student = require('../models/Student.js')



// module.exports.signup = async (req, res) => {
//     const { username , email, password } = req.body;
//     //check if fields are empty or not
//     if ([username, email, password].some((field) => !field?.trim())) {
//         return res.status(401).json({ error: "All fields are required" });
//     }    
//     try {
//         const newUser = new User({ username, email , password });
//         const user = await User.create(newUser);
//         res.status(200).json({ success: "Signed up successfully" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Failed to sign up" });
//     }
// }

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
        const studentFromDatabase = await Student.findOne({email : email});
        if(!studentFromDatabase){
            return res.status(401).json({error : "Invalid Username or Password"})
        }
        const isValidPAssword = await studentFromDatabase.isPasswordCorrect(password);
        if(!isValidPAssword){
            return res.status(401).json({error : "Invalid Password"})
        }

        const {accessToken} = await Student.generateAccessToken();

        const options = {httpOnly : true , secure: false, maxAge: 24 * 60 * 60 * 1000};   
        return res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .json({role : "Student"});

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