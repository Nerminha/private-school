import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
course:any;
courseId:any;
title:string="Course Details"
  constructor(private courseService:CoursService,
    private router:Router) { }

  ngOnInit() {
    const fullPath = this.router.url
    const segments = fullPath.split('/'); // Divise la chaîne en segments
    const courseId = segments[segments.length - 1];
    this.courseId = courseId
    console.log(this.courseId);
    this.courseService.getCourseById(this.courseId).subscribe((response) => {
      console.log("Here response from BE", response.courses);
      this.course = response.courses;}
      )
  }

}
