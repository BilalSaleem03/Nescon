const express = require("express");
const route = express.Router();

const studentController = require('../controllers/Student.js')


// route.get("/courses" , studentController.courses)
route.post("/signup" , studentController.signup)
route.get("/courses" , studentController.courses)
route.get("/onecourse" , studentController.oneCourse)
route.get("/enrolled/:cu-id" , studentController.enrolled)
// route.get("/all-courses" , studentController.allCourses)




module.exports = route;