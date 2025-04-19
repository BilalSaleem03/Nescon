const express = require("express");
const route = express.Router();
const multer = require("multer")
const {storage , videoStorage} = require("../middleware/cloudanaryConfig.js")
const upload = multer({ storage });
const uploadVid = multer({videoStorage })


const instructorController = require('../controllers/Instructor.js')



route.post("/add-course/:id" , upload.single("coverImage") , instructorController.addCourse)
route.post("/signup"  , instructorController.signup)
route.post("/add-course-video/:course_id" , uploadVid.single("video") , instructorController.addVideoToCourse)





module.exports = route;