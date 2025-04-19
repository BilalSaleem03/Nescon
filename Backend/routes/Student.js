const express = require("express");
const route = express.Router();

const studentController = require('../controllers/Student.js')


route.get("/courses" , studentController.courses)




module.exports = route;