// import mongoose
const mongoose = require("mongoose");
// cours Schema
const coursSchema = mongoose.Schema({
    img:String,
    name: String,
    nbLess:Number,
    description:String,
    duree:Date,
    date:Date,
    price:Number,
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teacherName:String,
    students: [
      {
         studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
          
      }
  ],
  
  rating:[
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: String,
      note:Number,
    }
  ]
});



// affect coursSchema to cours model

const cours = mongoose.model("Cours", coursSchema);
// exports cours
module.exports = cours;