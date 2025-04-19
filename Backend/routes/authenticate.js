const express = require("express");
const route = express.Router();

const studentAuthController = require('../controllers/studentAuth.js')
const instructorAuthController = require('../controllers/instructorAuth.js')


route.get("/student-auth/login" , studentAuthController.login)
route.get("/student-auth/logout" , studentAuthController.logout)
route.get("/instructor-auth/login" , instructorAuthController.login)
route.get("/instructor-auth/logout" , instructorAuthController.logout)




module.exports = route;