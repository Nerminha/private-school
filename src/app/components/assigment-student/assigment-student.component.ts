import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assigment-student',
  templateUrl: './assigment-student.component.html',
  styleUrls: ['./assigment-student.component.css']
})
export class AssigmentStudentComponent implements OnInit {
  title: string = 'Apply for Course';
  assig: any = {};
  teacherId: any;
  courseId: any;
  teachersTab: any;
  applyForm: FormGroup;
  coursesTab: any;
  studentId: any;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private coursService: CoursService,
    private router: Router,) { }

  ngOnInit() {
    this.userService.displayAllTeachers().subscribe((response) => {
      this.teachersTab = response.teachers;
      this.loadCourses();
    })
    this.applyForm = this.formBuilder.group({
      tId: [""],
      cId: [""]
    })
    const fullPath = this.router.url
    const segments = fullPath.split('/'); // Divise la chaîne en segments
    const studentId = segments[segments.length - 1];
    this.studentId = studentId
    console.log("studentId", this.studentId);

  }

  loadCourses() {
    this.coursService.displayAllCourses().subscribe((courseResponse) => {
      const courses = courseResponse.courses;
      const selectedTeacherId = this.teacherId;
      // Filtrer les cours en fonction de l'ID de l'enseignant.
      this.coursesTab = courses.filter(course => course.teacherId._id === selectedTeacherId);
    });
  }




  selectTeacherId(event) {
    this.teacherId = event.target.value;
  }
  selectCourseId(event) {
    if (this.teacherId) {
      this.coursService.getCoursesByTeacher(this.teacherId).subscribe((response) => {
        this.coursesTab = response.courses;
        this.courseId = event.target.value;

      });
    }
  }
  apply() {
    this.applyForm.value.tId = this.teacherId;
    this.applyForm.value.cId = this.courseId;
    this.coursService.applyForCourse(this.courseId, this.teacherId, this.studentId).subscribe((response) => {
      if (response.isAdd) {
        // Application réussie
        console.log("Student applied to course.");
        this.router.navigate(["admin"])
      }
    });
}

}

