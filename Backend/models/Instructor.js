const mongoose = require('mongoose')
const Course = require('./Course.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const instructorSchema = new mongoose.Schema({
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
    cources: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
});



//mongoose pluggin to encrypt password before saving it to database
instructorSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    try{
        this.password =await bcrypt.hash(this.password , 10);
        next();
    } catch(error){
        next(error)
    }
})

//adding additional method(custom) to check the password is correct or not
instructorSchema.methods.isPasswordCorrect = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword , this.password);
}

//adding a function in userschema to generate Access token
instructorSchema.methods.generateAccessToken = function(){
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

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;

