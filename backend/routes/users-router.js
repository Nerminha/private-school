// import express module
const express = require('express');
//
const fs = require('fs')
//secret key
const secretKey = 'school';
//import bcrypt module
const bcrypt = require('bcrypt');
//import jsonwebtoken module
const jwt = require('jsonwebtoken');
//import multer module
const multer = require('multer');
// import path module (interne)
const path = require('path');
// import user Model
const User = require("../models/users");
//import course Model
const Cours = require('../models/cours');
const router = express.Router();
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'routerlication/pdf': 'pdf',
}
// Multer confi : FileName and Destination
const storageConfig = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    // Spécifiez le répertoire de destination pour chaque type de fichier
    if (file.fieldname === "cv") {
      cb(null, "backend/images/cv");
    } else if (file.fieldname === "img") {
      cb(null, "backend/images/img");
    }
  },
  filename: function (req, file, cb) {
    // Définissez le nom de fichier pour chaque fichier téléchargé
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName =
      name + "-" + Date.now() + "-themeEducation-" + "." + extension;
    cb(null, imgName);
  },
});
const upload = multer({ storage: storageConfig });
router.post(
  "/signup",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  (req, res) => {
    if (req.body.role === "teacher") {
      try {
        // Vérifiez si les fichiers 'cv' et 'img' existent dans req.files
        if (req.files["cv"] && req.files["img"]) {
          // Récupérez les extensions des fichiers
          const cvExtension = path
            .extname(req.files["cv"][0].originalname)
            .toLowerCase();
          const imgExtension = path
            .extname(req.files["img"][0].originalname)
            .toLowerCase();

          if (
            cvExtension === ".pdf" &&
            [".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
              req.body.pwd = cryptedPwd;

              if (req.files["cv"] && req.files["img"]) {
                const cvFileName = req.files["cv"][0].filename;
                const imgFileName = req.files["img"][0].filename;

                req.body.cv = `http://localhost:3000/images/cv/${cvFileName}`;
                req.body.img = `http://localhost:3000/images/img/${imgFileName}`;

                let user = new User(req.body);
                user.save((err, doc) => {
                  if (err) {
                    if (err.errors.mail && !err.errors.tel) {
                      // only tel exist
                      res.json({ message: "00" });
                    } else if (err.errors.tel && !err.errors.mail) {
                      // only mail exist
                      res.json({ message: "01" });
                    } else if (err.errors.tel && err.errors.mail) {
                      // mail and tel exists
                      res.json({ message: "02" });
                    }
                  } else {
                    // success : create object
                    res.json({ message: "1" });
                  }
                });
              }
            });
          } else if (
            cvExtension != ".pdf" &&
            [".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            // response cv != pdf and img =.png,jpg and jbeg
            res.json({ message: "2" });
          } else if (
            cvExtension === ".pdf" &&
            ![".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            // response cv = pdf and img !=png,jpg and jbeg
            res.json({ message: "3" });
          } else if (
            cvExtension != ".pdf" &&
            ![".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            // response cv != pdf and img !=png,jpg and jbeg
            res.json({ message: "4" });
          }
        }
      } catch (error) {
        res.json({ message: "6" });
      }
    } else if (req.body.role === "parent") {
      const parentData = req.body;
      parentData.childrenArray = JSON.parse(parentData.childrenArray);
      const childPhoneNumbers = parentData.childrenArray.map(
        (child) => child.childPhone
      );
      // Vérifiez si les numéros de téléphone des enfants existent déjà dans la base de données
      User.find({ tel: { $in: childPhoneNumbers } }).then(
        (existingChildren) => {
          if (existingChildren.length !== childPhoneNumbers.length) {
            // Certains numéros de téléphone d'enfants n'existent pas dans la base de données
            return res.json({ message: "05" });
          }
          // Créez le parent
          const parent = new User(parentData);
          // Ajoutez les _id des enfants à l'attribut "childrens" du parent
          parent.childrens = existingChildren.map((child) => child._id);
          bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
            req.body.pwd = cryptedPwd;
            const parent = new User(parentData);
            parent.save((err, doc) => {
              if (err) {
                if (err.errors.mail && !err.errors.tel) {
                  // only tel exist
                  res.json({ message: "00" });
                } else if (err.errors.tel && !err.errors.mail) {
                  // only mail exist
                  res.json({ message: "01" });
                } else if (err.errors.tel && err.errors.mail) {
                  // mail and tel exists
                  res.json({ message: "02" });
                }
              } else {
                res.json({ message: "1" });
              }
            });
          });
        }
      );
    } else if (req.body.role === "student") {
      const imgExtension = path
        .extname(req.files["img"][0].originalname)
        .toLowerCase();
      if (
        imgExtension === ".png" ||
        imgExtension === ".jpg" ||
        imgExtension === ".jpeg"
      ) {
        console.log("Here into BL : Add Student ", req.body);
        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
          req.body.pwd = cryptedPwd;
          req.body.img = `http://localhost:3000/avatars/${req.files["img"][0].filename}`;
          let user = new User(req.body);
          user.save((err, doc) => {
            if (err) {
              if (err.errors.mail && !err.errors.tel) {
                // only tel exist
                res.json({ message: "00" });
              } else if (err.errors.tel && !err.errors.mail) {
                // only mail exist
                res.json({ message: "01" });
              } else if (err.errors.tel && err.errors.mail) {
                // mail and tel exists
                res.json({ message: "02" });
              }
            } else {
              res.json({ message: "1" });
            }
          });
        });
      } else {
        // msg img Student Invalid
        res.json({ message: "04" });
      }
    } else if (req.body.role === "admin") {
      bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        req.body.pwd = cryptedPwd;
        let user = new User(req.body);
        user.save((err, doc) => {
          if (err) {
            if (err.errors.mail && !err.errors.tel) {
              // only phone exist
              res.json({ message: "00" });
            } else if (err.errors.tel && !err.errors.mail) {
              // only mail exist
              res.json({ message: "01" });
            } else if (err.errors.tel && err.errors.mail) {
              // mail and tel exists
              res.json({ message: "02" });
            }
          } else {
            res.json({ message: "1" });
          }
        });
      });
    }
  }
);
// Business Logic : Login (Login for 4 Acteurs)
router.post("/login", (req, res) => {
  let user;
  User.findOne({ tel: req.body.tel })
    .then((doc) => {
      //
      if (!doc) {
        // send response "0" : check your tel
        // send response "1" : check your pwd
        // send response "2" : Welcome
        res.json({ msg: "0" });
        // User is founded by tel
      } else {
        user = doc;
        if (doc.role == "teacher") {
          if (doc.status == "NotOK") {
            res.json({ msg: "3" });
          }
          else {
            return bcrypt.compare(req.body.pwd, doc.pwd);
          }
        } else {
          // compare crypted pwd and req.body.pwd
          return bcrypt.compare(req.body.pwd, doc.pwd);
        }
      }
    })
    // get the result of bCrypt.compare
    .then((pwdResult) => {
      // pwd and cryptedPwd are  equals
      if (pwdResult) {
        let UserToSend = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
          role: user.role,
        };
        const token = jwt.sign(UserToSend, secretKey, { expiresIn: "6h" });
        // send response 2 : Welcome to Our Site
        res.json({ msg: "2", token: token });
        // pwd and cryptedPwd are  NOT equals
      } else {
        // send response 3 : Please check your pwd
        res.json({ msg: "1" });
      }
    });
});
////Business Logic : get all students
router.get("/students", (req, res) => {
  User.find({ role: 'student' }).then((docs) => {
    res.json({ students: docs });
  })
});
//Business Logic :get all teachers
router.get("/teachers", (req, res) => {
  User.find({ role: 'teacher' }).then((docs) => {
    res.json({ teachers: docs });
  })
});
//Business Logic : get all parents
router.get("/parents", (req, res) => {
  User.find({ role: 'parent' }).then((docs) => {
    res.json({ parents: docs });
  })
});
//Business Logic :delete users
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  User.deleteOne({ _id: id }).then((deleteResponse) => {
    deleteResponse.deletedCount ?
      res.json({ isDeleted: true }) :
      res.json({ isDeleted: false });
  });
});
router.get("/proile/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id).then((doc) => {
    res.json({ user: doc })
  })
}
)

//Busniss logic validate teacher
router.put("/validateteacher/:id", (req, res) => {
  User.updateOne({ _id: req.params._id }, req.body).then((updateResult) => {
    console.log(req.body);
    updateResult.nModified
      ? res.json({ StudentIsUpdated: true })
      : res.json({ StudentIsUpdated: false });
  });
});
// Business Logic : Edit status Teacher By Admin
router.put("/:id", (req, res) => {
  teacherId = req.params.id;
  newStatus = "OK";
  User.findById(teacherId, (err, teacher) => {
    if (!teacher) {
      // L'utilisateur avec cet ID n'a pas été trouvé, renvoyez une réponse routerropriée
      return res.json({ success: false, message: 'Utilisateur non trouvé.' });
    }

    teacher.status = newStatus;
    teacher.save((err, doc) => {

      res.json({ teacherAfterValidate: doc });
    });
  });
});
router.get("/students/:id", (req, res) => {
  // find teacher by ID
  User.findById(req.params.id)
    //find all students in this teacher
    .populate("studentes")
    // teacher is not found
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json({ teacherStudent: teacher.studentes });
    });
});
router.get("/course/students/:id", (req, res) => {
  const courseId = req.params.id;

  Cours.findById(courseId)
    .populate("students")
    .then((course) => {
      const studentIds = course.students.map((student) => student._id);
      return User.find({ _id: { $in: studentIds } });
    })
    .then((students) => {
      res.json({ students });
    })
    .catch((error) => {
      console.log(error);
      res.json({ students: "Error" });
    });
});
router.post("/rating/:studentId/:teacherId/:courseId", (req, res) => {
  const studentId = req.params.studentId;
  const teacherId = req.params.teacherId;
  const courseId = req.params.courseId;
  console.log(studentId);
  console.log(teacherId);
  console.log(courseId);
  User.findById(studentId).then((student) => {
    if (!student) {
      res.json({ msg: "0" });
    } else {
      const rating = {
        IdCourse: courseId,
        teacherId: teacherId,
        rating: req.body.rating,
        note: req.body.note,
      };
      student.rateStudent.push(rating);
      student.save((err, doc) => {
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
//Busniss logiue : add the reating for teacher
router.post("/rating/teacher/:studentId/:teacherId/:courseId", (req, res) => {
  const studentId = req.params.studentId;
  const teacherId = req.params.teacherId;
  const courseId = req.params.courseId;
  console.log(studentId);
  console.log(teacherId);
  console.log(courseId);
  User.findById(teacherId).then((teacher) => {
    if (!teacher) {
      res.json({ msg: "0" });
    } else {
      const rating = {
        IdCourse: courseId,
        studentId: studentId,
        rating: req.body.rating,
        note: req.body.note,
      };
      teacher.rateTeacher.push(rating);
      teacher.save((err, doc) => {
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
router.get("/ratingCourses/:studentId/:courseId", (req, res) => {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  User.findById(studentId)
    .populate({
      path: "rateStudent",
      match: { IdCourse: courseId } // Filter ratings by course ID
    })
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const ratings = student.rateStudent.filter((rating) => rating.IdCourse && rating.IdCourse.equals(courseId));

      res.json({ rate: ratings });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
});
//Busniss logic : search teacher by specialty 
router.get("/searchTeachers/:query", (req, res) => {
  const speciality = req.params.query;
  console.log('here speciality', speciality);
  User.find({ speciality: speciality }).then((teacher) => {
    if (!teacher) {
      return res.json({ message: "Speciality not found" });
    }
    else {
      console.log(teacher);
      return res.json({ teachers: teacher });
    }
  })
}
)
router.get("/child/:tel", (req, res) => {
  let tel = req.params.tel
  User.findOne({ tel: tel }).then((child) => {
    console.log(child);
    if (child.role === 'student') {
      res.json({ child: child })
    }
    else {
      res.json({ child: "undifiend" })
    }
  })

})
// Business Logic: Delete Teacher by Id
router.delete("/deleteTeacher/:id", (req, res) => {
  const teacherId = req.params.id;
  console.log(teacherId);
  Cours.deleteMany({ teacherId: teacherId }, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to delete teacher's courses" });
    }
    // Récupérer les étudiants qui ont l'enseignant dans leur tableau teachers
    User.find({ teachers: teacherId }, (err, students) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to find students with teacher" });
      }

      // Supprimer les références de l'enseignant dans les étudiants
      User.updateMany(
        { teachers: teacherId },
        {
          $pull: {
            teachers: teacherId,
            coursesStudent: { $in: students.map((student) => student.courses) },
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Failed to remove teacher from students" });
          }

          // Supprimer les notes de l'enseignant dans les étudiants
          User.updateMany(
            { "rateStudent.teacherId": teacherId },
            { $pull: { rateStudent: { teacherId: teacherId } } },

            (err) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({
                    error: "Failed to remove teacher's notes from students",
                  });
              }

              // Supprimer les évaluations de l'enseignant dans les étudiants
              User.updateMany(
                { "rateStudent.idTeacher": teacherId },
                { $pull: { rateStudent: { idTeacher: teacherId } } },
                (err) => {
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json({
                        error:
                          "Failed to remove teacher's evaluations from students",
                      });
                  }
                }
              );
            }
          );
        }
      );
    });
  });
});
// Business Logic : Delete Student by Id
router.delete('/deleteStudent/:id', (req, res) => {
  const studentId = req.params.id;

  // Étape 1: Supprimer le fichier image de l'étudiant
  User.findById(studentId, (err, student) => {
    if (err) {
      return res.json({ message: 'Error deleting student' });
    }

    const imgFileName = path.basename(student.img);
    const imgFilePath = path.join(__dirname, '..', 'images', 'img', imgFileName);

    fs.unlink(imgFilePath, (err) => {
      if (err) {
        return res.json({ message: 'Error deleting student image' });
      }

      // Étape 2: Supprimer l'étudiant et ses données connexes
      User.updateMany(
        { _id: { $in: student.teacherId } },
        { $pull: { studentes: studentId } },
        (err) => {
          if (err) {
            return res.json({ message: 'Error deleting student' });
          }

          Cours.updateMany(
            { _id: { $in: student.students } },
            { $pull: { students: studentId } },
            (err) => {
              if (err) {
                return res.json({ message: 'Error deleting student' });
              }

              User.updateMany(
                { _id: { $in: student.teacherId } },
                { $pull: { rateTeacher: { idStudent: studentId } } },
                (err) => {
                  if (err) {
                    return res.json({ message: 'Error deleting student' });
                  }

                  Cours.updateMany(
                    { _id: { $in: student.coursesStudent } },
                    { $pull: { rating: { idStudent: studentId } } },
                    (err) => {
                      if (err) {
                        return res.json({ message: 'Error deleting student' });
                      }

                      User.updateMany(
                        { _id: { $in: student.rateTeacher } },
                        { $pull: { rateTeacher: { idStudent: studentId } } },
                        (err) => {
                          if (err) {
                            return res.json({ message: 'Error deleting student' });
                          }

                          User.updateMany(
                            { _id: { $in: student.teachers } },
                            { $pull: { globalEvaluationsTeacher: { idStudent: studentId } } },
                            (err) => {
                              if (err) {
                                return res.json({ message: 'Error deleting student' });
                              }

                              Cours.updateMany(
                                { _id: { $in: student.rating } },
                                { $pull: { rating: { idStudent: studentId } } },
                                (err) => {
                                  if (err) {
                                    return res.json({ message: 'Error deleting student' });
                                  }

                                  User.updateMany(
                                    { _id: { $in: student.parents } },
                                    { $pull: { childrenArray: studentId } },
                                    (err) => {
                                      if (err) {
                                        return res.json({ message: 'Error deleting student' });
                                      }

                                      User.findByIdAndRemove(studentId, (err) => {
                                        if (err) {
                                          return res.json({ message: 'Error deleting student' });
                                        }

                                        // L'étudiant et ses données connexes ont été supprimés avec succès
                                        return res.json({ message: '1' });
                                      });
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
});
module.exports = router;