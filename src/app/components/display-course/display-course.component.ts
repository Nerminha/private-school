import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.css']
})
export class DisplayCourseComponent implements OnInit {
  title="Display Cours"
  courseId: any;
  studentTab: any;
  pageOfItems: Array<any>;
  courseTab: any;
  coursesWithRating: any[] = [];
  studentId: any;
  evaluationAdded: boolean = false;
  constructor(private router: Router,
    private userService: UserService,
    private coursService: CoursService) { }

  ngOnInit() {
    const fullPath = this.router.url
    const segments = fullPath.split('/'); // Divise la chaîne en segments
    const courseId = segments[segments.length - 1];
    this.courseId = courseId
    console.log(this.courseId);
    this.userService.getStudentByIDCourse(this.courseId).subscribe((response) => {
      console.log("Here response from BE", response.students);
      this.studentTab = response.students;
      this.studentTab.forEach((student => {
        this.studentId = student._id;
        console.log("this is students id",this.studentId);
        this.userService.getRatingByStudentAndCourseId(this.studentId, this.courseId).subscribe((ratingResponse) => {
          console.log('this response get rate',ratingResponse.rate);
          
            if (ratingResponse.rate && ratingResponse.rate.length > 0 ) {
              const rating = ratingResponse.rate[0].rating;
              const note = ratingResponse.rate[0].note;
              const courseWithRating = {
                student,
                rating,
                note
              };
              this.coursesWithRating.push(courseWithRating);
              console.log(" this is courses with rating ",this.coursesWithRating);
              

            }
          else {
            // Ajoutez un message ou un objet pour indiquer l'absence d'évaluation
            const courseWithoutRating = {
              student,
              rating: 'Not available yet',
              note: 'Not available yet'
            };
            this.updateRating(student, 'Not available yet', 'Not available yet')
          }
  })
})
)
})


}
goToAddRating(id) {
  this.router.navigate([`rating/${this.courseId}/${id}`]);
}
updateRating(student, rating, note) {
  const existingCourseIndex = this.coursesWithRating.findIndex(courseWithRating => courseWithRating.student._id === student._id);

  if (existingCourseIndex !== -1) {
    // L'étudiant existe déjà, mettez à jour sa notation
    this.coursesWithRating[existingCourseIndex].rating = rating;
    this.coursesWithRating[existingCourseIndex].note = note;
  } else {
    // L'étudiant n'existe pas encore, ajoutez-le avec la notation
    const courseWithRating = {
      student,
      rating,
      note
    };
    this.coursesWithRating.push(courseWithRating);
  }
}
}
