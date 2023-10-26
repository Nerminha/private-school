import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.css']
})
export class CoursesTabComponent implements OnInit {
coursesTab:any;
teacherId:number;
teacher:any;
  constructor(  private courseService:CoursService, private router:Router) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.teacher = this.decodeToken(sessionToken); 
      console.log("here information Teachers", this.teacher);
      this.teacherId = this.teacher.id;
     
    }
   
 this.courseService.getCoursesByidTeacher(this.teacherId).subscribe((response) => {
      console.log("Here response from BE", response);
      this.coursesTab = response.teacherCourses;}
      )
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  deleteCourse(id) {
    this.courseService.deleteCourseById(id).subscribe((response) => {
      if (response.isDeleted) {
        this.courseService.displayAllCourses().subscribe((response) => {
          this.coursesTab = response.courses;
        
        });
      }
    });
  }
  goToDisplayCourse(id) {
    this.router.navigate([`display/${id}`]);
  }
  goToEditCourse(id) {
    this.router.navigate([`editCourse/${id}`]);
  }
 
}
