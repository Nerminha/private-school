// import express module
const express = require('express');
//import multer module
const multer = require('multer');
// import path module (interne)
const path = require('path');
//
const fs=require("fs")
// import cours Model
const Cours = require('../models/cours');
//import user Model
const User = require("../models/users");
const router=express.Router();
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}
// Multer confi : FileName and Destination
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
          error = null;
      }
      //cb:: callback
      cb(null, 'backend/images/imgCourse')
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPE[file.mimetype];
      const imgName = name + '-' + Date.now() + '-course-' + '.' +
          extension;
      cb(null, imgName);
  }
});
const upload = multer({ storage: storageConfig });
router.post("/",  multer({ storage: storageConfig }).single("img"), (req, res) => {
    try {
      console.log(req.body);
      User.findById(req.body.teacherId).then((teacher) => {
        if (!teacher) {
          return res.json({ message: "teacher not found" });
        }
        else{ const cours = new Cours({
            name: req.body.name,
            description: req.body.description,
            nbLess: req.body.nbLes,
            duree: req.body.duree,
            date: req.body.date,
            img: req.body.img = `http://localhost:3000/images/imgCourse/${req.file.filename}`,
            price: req.body.price,
            teacherId: teacher._id,
            teacherName: teacher.firstName,
          });
          cours.save((err, doc) => {
            teacher.courses.push(cours);
            teacher.save();
            res.json({ message: "cours is Saved" });
          });
}
         
      });
    } catch (error) {
      res.json({ message: `Catched error: ${error}` });
    }
  });
  //Business Logic : display Courses
  router.get("", (req, res) => {
    Cours.find().then((docs) => {
      res.json({ courses: docs });
    })
  });
  //Business Logic :delete course
  router.delete("/:id", (req, res) => {
    let id = req.params.id;
    Cours.deleteOne({ _id: id }).then((deleteResponse) => {
      deleteResponse.deletedCount ?
        res.json({ isDeleted: true }) :
        res.json({ isDeleted: false });
    });
  });
  //busniss Logic : get Courses by teacher
  router.get('/teacher/:id', (req, res) => {
    const teacherId = req.params.id;
    Cours.find({ teacherId: teacherId }).then((docs) => {
  
      if (!teacherId) {
        res.json({ courses: 'Erreur lors de la récupération des cours.' });
      } else {
        res.json({ courses: docs });
  
      }
    });
  });
  //Busniss Logic :??
  router.post('/apply', (req, res) => {
    const studentId = req.body.studentId;
    const teacherId = req.body.teacherId;
    const courseId = req.body.courseId;
  
    console.log(courseId);
    console.log(studentId);
  
    Cours.findByIdAndUpdate(courseId)
      .then((course) => {
        if (course) {
          course.save((err, doc) => {
            course.students.push(studentId);
            course.save();
          })
          console.log(course);
          User.findByIdAndUpdate(
            teacherId).then((teachers) => {
              if (teachers) {
                teachers.save((err, doc) => {
                  teachers.studentes.push(studentId);
                  teachers.save();
                })
                console.log(teachers);
                console.log("Course updated successfully");
                User.findByIdAndUpdate(
                  studentId).then((students) => {
                    if (students) {
                      students.save((err, doc) => {
                        students.courses.push(courseId);
                        students.teachers.push(teacherId)
                        students.save();
                      })
                      console.log(students);
                      console.log("Course updated successfully");
                      res.json({ isAdd: true });
                    }
  
                    else {
                      console.error("Failed to update course");
                      res.json({ isAdd: false });
                    }
                  })
  
              }
  
              else {
                console.error("Failed to update course");
                res.json({ isAdd: false });
              }
            })
  
        }
  
      })
      .catch((err) => {
        console.error("Error while updating course", err);
        res.json({ isAdd: false });
      });
  });
  //Busniss Logic :get course by id teacher
  router.get("/teacherCourses/:id", (req, res) => {
    // find teacher by ID
    User.findById(req.params.id)
      //find all students in this teacher
      .populate("courses")
      // teacher is not found
      .then((teacher) => {
        if (!teacher) {
          return res.status(404).json({ message: "teacher not found" });
        }
        res.json({ teacherCourses: teacher.courses });
      });
  });
  //Busniss logiue : add the reating for course
  router.post("/rating/:studentId/:teacherId/:courseId", (req, res) => {
    const studentId = req.params.studentId;
    const teacherId = req.params.teacherId;
    const courseId = req.params.courseId;
    console.log(studentId);
    console.log(teacherId);
    console.log(courseId);
    Cours.findById(courseId).then((cours) => {
      if (!cours) {
        res.json({ msg: "0" });
      } else {
        const rating = {
          studentId: studentId,
          teacherId: teacherId,
          rating: req.body.rating,
          note: req.body.note,
        };
        cours.rating.push(rating);
        cours.save((err, doc) => {
          if (err) {
            console.log("Erreur lors de l'enregistrement de la note :", err);
            res.json({ msg: "0" });
          } else {
            console.log("Note enregistrée :", rating);
            res.json({ msg: "1" });
          }
        });
      }
    });
  });
  //Busniss logic : get course by id
  router.get("/courseById/:id", (req, res) => {
    Cours.findById(req.params.id).then((course) => {
      res.json({courses:course});
    });
  });
  //Busniss logic: edit course
  router.put("/update/:id", multer({ storage: storageConfig }).single("img"),(req, res) => {
    console.log("Here into BL: Update course", req.body);
    const coursUpdate = {
      name: req.body.name,
      description: req.body.description,
      nbLess: req.body.nbLes,
      duree: req.body.duree,
      date: req.body.date,
      img: req.body.img = `http://localhost:3000/images/imgCourse/${req.file.filename}`,
      price: req.body.price,
    };
    Cours.updateOne({ _id: req.params.id },coursUpdate).then((updateResponse) => {
      console.log("Here response after update", updateResponse);
      updateResponse.nModified ?
          res.json({ isUpdated: true }) :
          res.json({ isUpdated: false });
  });
 
   
  });
  //Busniss logic : get courses by id student
  router.get("/studentCourses/:id",(req,res)=>{
    const studentId = req.params.id;
    User.findById(studentId)
      .populate("courses")
      .then((student) => {
          if (!student) {
            return res.status(404).json({ message: "Teacher not found" });
          }
          res.json({ courses: student.courses });
        });
  })
  // 
 // Business Logic : Delete Course by Id
router.delete("/deleteCourse/:id", (req, res) => {
  const courseId = req.params.id;

  // Retrieve the course data to get the file name
  Cours.findById(courseId, (err, course) => {
    const fileName = path.basename(course.img);
    const filePath = path.join(__dirname, "..", "images", "imgCourse", fileName);

    // Delete the course file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete course file" });
      }

      // Delete the course
      Cours.findByIdAndRemove(courseId, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete course" });
        }

        // Delete the course references in user documents
        User.updateMany(
          { $or: [{ courses: courseId }, { courses: courseId }] },
          { $pull: { courses: courseId, courses: courseId } },
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Failed to delete course references in user documents" });
            }

            // Delete the course references in notesStudent and notesTeacher arrays
            User.updateMany(
              { $or: [{ "rateStudent.idCourse": courseId }, { "rateTeacher.idCourse": courseId }] },
              { $pull: { rateTeacher: { idCourse: courseId }, rateTeacher: { idCourse: courseId } } },
              (err) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: "Failed to delete course references in notes arrays" });
                }

                // Delete the course references in evaluationsStudent and evaluationsTeacher arrays
                // User.updateMany(
                //   { $or: [{ "evaluationsStudent.idCourse": courseId }, { "evaluationsTeacher.idCourse": courseId }] },
                //   { $pull: { evaluationsStudent: { idCourse: courseId }, evaluationsTeacher: { idCourse: courseId } } },
                //   (err) => {
                //     if (err) {
                //       console.error(err);
                //       return res.status(500).json({ error: "Failed to delete course references in evaluations arrays" });
                //     }

                //     // Delete the course references in globalEvaluationsStudent and globalEvaluationsTeacher arrays
                //     User.updateMany(
                //       { $or: [{ "globalEvaluationsStudent.idCourse": courseId }, { "globalEvaluationsTeacher.idCourse": courseId }] },
                //       { $pull: { globalEvaluationsStudent: { idCourse: courseId }, globalEvaluationsTeacher: { idCourse: courseId } } },
                //       (err) => {
                //         if (err) {
                //           console.error(err);
                //           return res.status(500).json({ error: "Failed to delete course references in global evaluations arrays" });
                //         }

                //         // Course and related data successfully deleted
                //         return res.json({ message: "1" });
                //       }
                //     );
                //   }
                // );
              }
            );
          }
        );
      });
    });
  });
});
module.exports=router;