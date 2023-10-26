import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dash-parent',
  templateUrl: './dash-parent.component.html',
  styleUrls: ['./dash-parent.component.css']
})
export class DashParentComponent implements OnInit {
  telChild: Number;
  title:string="Child's Evaluation Search"
  child: any;
  @ViewChild('specialtyForm', { static: false }) telChildForm: NgForm;
  showTable: boolean = false;
  rate: string;
  note: number;
  childId: any;
  courseTab: any;
  coursesWithRating: any[] = [];
  constructor(private userService: UserService,
    private courseService: CoursService) { }

  ngOnInit() {

  }
  msgColor(msg:string) {
    if (msg=='Not available yet') {
      return ["red"];
    }
  }
  search() {
    this.userService.getStudentByTel(this.telChild).subscribe((res) => {
      this.childId = res.child._id;
      this.courseService.getCourseByIDStudent(this.childId).subscribe((response) => {
        this.courseTab = response.courses;
        this.courseTab.forEach(course => {
          const courseId = course._id;
          this.userService.getRatingByStudentAndCourseId(this.childId, courseId).subscribe((ratingResponse) => {
            if (ratingResponse.rate && ratingResponse.rate.length > 0) {
              const rating = ratingResponse.rate[0].rating;
              const note = ratingResponse.rate[0].note;
  
              const courseWithRating = {
                course,
                rating,
                note
              };
              this.coursesWithRating.push(courseWithRating);
              this.showTable = true;
            }
            else {
              // Ajoutez un message ou un objet pour indiquer l'absence d'évaluation
              const courseWithoutRating = {
                course,
                rating: 'Not available yet', 
                note: 'Not available yet'
              };
              this.coursesWithRating.push(courseWithoutRating);
              this.showTable = true;
            }
          });
        });
      });
    });
  }
  
}
