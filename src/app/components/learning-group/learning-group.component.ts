import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-learning-group',
  templateUrl: './learning-group.component.html',
  styleUrls: ['./learning-group.component.css']
})
export class LearningGroupComponent implements OnInit {
  teacher: any;
  teacherId: any;
  studentsTab: any;
  evolution: FormGroup;
  evol: any = {};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.teacher = this.decodeToken(sessionToken);
      console.log("here information Teachers", this.teacher);
      this.teacherId = this.teacher.id;

    }
    this.userService.getStudentByIDT(this.teacherId).subscribe((response) => {
      console.log("Here response from BE", response);
      this.studentsTab = response.teacherStudent;
      this.filterUniqueStudents();
    }
    )
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  goToRating(id) {
    this.router.navigate([`rating/${id}`]);
  }
  filterUniqueStudents() {
    const uniqueTelSet = new Set();
    this.studentsTab = this.studentsTab.filter((student) => {
      if (uniqueTelSet.has(student.tel)) {
        return false;
      } else {
        uniqueTelSet.add(student.tel);
        return true;
      }
    });
  }
}
