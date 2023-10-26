import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {
  teachers: any;
  pageOfItems: Array<any>;
  constructor(private userService:UserService ) { }

  ngOnInit() {
     this.userService.displayAllTeachers().subscribe((response) => {
    console.log("Here response from BE", response);
    this.teachers = response.teachers;}
    )
  }
  deleteTeacher(id) {
    this.userService.deleteTeacher(id).subscribe((response) => {
      if (response.message) {
        this.userService.displayAllTeachers().subscribe((response) => {
          this.teachers = response.teachers;
        });
      }
    });
  }
  updateStatus(id) {
    this.userService.validateTeacher(id,this.teachers).subscribe(
      (response) => {
        console.log(response);
        if (response.teacherAfterValidate) {
          this.userService.displayAllTeachers().subscribe((response)=>{
            this.teachers = response.teachers;
          })
        } 
      }
    );
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }
}

