import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoursService } from 'src/app/services/cours.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
title:string='Our Courses';
courses:any;
pageOfItems: Array<any>;
  constructor( private courseService:CoursService ) { }

  ngOnInit() {
    this.courseService.displayAllCourses().subscribe ((response) => {
      console.log("Here response from BE", response);
      this.courses = response.courses;
  
    })
 
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }
}

  