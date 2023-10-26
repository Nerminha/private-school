// import mongoose
const mongoose = require("mongoose");
// import mongoose-unique-validator
var uniqueValidator = require('mongoose-unique-validator');
// user Schema
const userSchema = mongoose.Schema({
    img: String, //file path 
    firstName: String,
    adresse: String,
    mail: { type: String, unique: true },
    pwd: String,
    confPwd: String,
    speciality: String,
    cv: String,
    tel: { type: Number, unique: true },
    childrenArray: Array,
    numberOfChildren: Number,
    role: String,
    age: Number,
    status: String,
    IdCourse:{ type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cours" }],
      teachers:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
     studentes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
      rateStudent:[      
          {
            IdCourse:{ type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
            teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: String,
             note:Number,
          }
        ],
        rateTeacher:[      
          {
            IdCourse:{ type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: String,
             note:Number,
          }
        ]
});
userSchema.plugin(uniqueValidator);
// affect userSchema to user model
const user = mongoose.model("User", userSchema);
// exports user
module.exports = user;