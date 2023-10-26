// import express module
const express = require('express');
// import body-parser module
const bodyParser = require('body-parser');
// import mongoose module
const mongoose = require('mongoose');
//import express-session module
const session = require('express-session');
// import path module (interne)
const path = require('path');
// import axios
//const axios = require('axios')
// connect app to DB
mongoose.connect("mongodb://127.0.0.1:27017/privateSchoolDB", {
  useFindAndModify: false, // Pour éviter les dépréciations
});
// create express application
const app = express();
// Configuration
//send json response
app.use(bodyParser.json());
//get object from req
app.use(bodyParser.urlencoded({ extended: true }));
// config files
app.use('/images', express.static(path.join('backend/images')));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
//Session Configuration
const secretKey = 'school';
app.use(
  session({
    secret: secretKey,
  }));
//import routes
const userRouter=require("./routes/users-router");
const CourseRouter=require("./routes/course-router");
app.use("/users",userRouter);
app.use("/api/course",CourseRouter);
// make app importable from another files
module.exports = app;