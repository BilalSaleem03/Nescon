const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));         
app.use(cookieParser()); 
app.use((req, res, next) => {
    console.log("req", req.cookies);
    next();
});


app.use(cors({
    origin: true,
    credentials: true,
}));

//connection with mongooDB
async function Main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/LMS");
}
Main().then(()=>{console.log("Database connected")}).catch((err)=>{console.log(err)});



//routes calling
const instructorRoute = require('./routes/Instructor.js')
const studentRoute = require('./routes/Student.js')
const authenticateRoute = require('./routes/authenticate.js')



app.use("/instructor" , instructorRoute)
app.use("/student" , studentRoute)
app.use("/authenticate" , authenticateRoute)










app.listen('3000' , ()=>{
    console.log("server starts .....")
})