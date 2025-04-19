const mongoose = require('mongoose')
const Course = require('./Course.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    enrollments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
});


//mongoose pluggin to encrypt password before saving it to database
studentSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    try{
        this.password =await bcrypt.hash(this.password , 10);
        next();
    } catch(error){
        next(error)
    }
})

//adding additional method(custom) to check the password is correct or not
studentSchema.methods.isPasswordCorrect = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword , this.password);
}

//adding a function in userschema to generate Access token
studentSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIERY
        }
    )
}


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

