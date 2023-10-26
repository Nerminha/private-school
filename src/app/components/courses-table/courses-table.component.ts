import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
courses:any;
pageOfItems: Array<any>;
  constructor( private coursService:CoursService) { }

  ngOnInit() {
    this.coursService.displayAllCourses().subscribe((response) => {
      console.log("Here response from BE", response);
      this.courses = response.courses;}
      ) 
  }
  deleteCourse(id) {
    this.coursService.deleteCourseById(id).subscribe((response) => {
      if (response.isDeleted) {
        this.coursService.displayAllCourses().subscribe((response) => {
          this.courses = response.courses;
        });
      }
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }
}
