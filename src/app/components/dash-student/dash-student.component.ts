import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dash-student',
  templateUrl: './dash-student.component.html',
  styleUrls: ['./dash-student.component.css']
})
export class DashStudentComponent implements OnInit {
  title: string = "Welcome to your personalized Dashboard ";
  student: any;
  studentId: string;
  coursesTab: any;
  note:number;
  rate:string;
  pageOfItems: Array<any>;
  constructor(private coursService: CoursService, private userService: UserService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.student = this.decodeToken(sessionToken);
      console.log("here information Student", this.student);
      this.studentId = this.student.id;
    }
    this.coursService.getCourseByIDStudent(this.studentId).subscribe((response) => {
      console.log("here your courses", response.courses);
      this.coursesTab = response.courses;

    })
    
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  displayRate(id) {
    this.userService.getRatingByStudentAndCourseId(this.studentId, id).subscribe((response) => {
      console.log("Rating:", response.rate);
        this.rate=response.rate[0].rating;
      this.note=response.rate[0].note;
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }
}
