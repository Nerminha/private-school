import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  @Input() pageSize: number;
  students:any;
  pageOfItems: Array<any>;
  constructor(private userService:UserService , 
    private router:Router ,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.userService.displayAllStudents().subscribe((response) => {
      console.log("Here response from BE", response);
      this.students = response.students;}
      )
    
  }

  goToAssignmentStudent(id) {
    this.router.navigate([`apply/${id}`]);
  }
  deleteStudent(id) {
    this.userService.deleteUserById(id).subscribe((response) => {
      if (response.isDeleted) {
        this.userService.displayAllStudents().subscribe((response) => {
          this.students = response.students;
        });
      }
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }
}
