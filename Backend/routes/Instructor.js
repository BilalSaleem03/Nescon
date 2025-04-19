const express = require("express");
const route = express.Router();
const multer = require("multer")
const {storage} = require("../middleware/cloudanaryConfig.js")
const upload = multer({ storage });


const instructorController = require('../controllers/Instructor.js')



route.get("/add-course/:id" , upload.single("coverImage") , instructorController.addCourse)
route.get("/signup"  , instructorController.signup)




module.exports = route;