import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-rating-student',
  templateUrl: './rating-student.component.html',
  styleUrls: ['./rating-student.component.css']
})
export class RatingStudentComponent implements OnInit {
ratingForm:FormGroup;
rating:string;
studentId:any;
teacherId:any;
coursId:any;
teacher:any;
  constructor(private formBuilder:FormBuilder,
    private CourseService:CoursService,
    private UserService: UserService,
    private router: Router) { }

  ngOnInit() {
    const fullPath = this.router.url
    const segments = fullPath.split('/'); // Divise la chaîne en segments
    const studentId = segments[3];
    const coursId = segments[2];
    this.coursId=coursId;
    this.studentId = studentId; 
    console.log('cours id ',coursId);
    console.log('student id',studentId);
    
    console.log(this.studentId);
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.teacher = this.decodeToken(sessionToken); 
      console.log("here information Teachers", this.teacher);
      this.teacherId = this.teacher.id;
     
    }
    this.ratingForm=this.formBuilder.group({
      rating:[""],
      note:["",[Validators.required,Validators.min(0),Validators.max(20)]]
    })
    
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  selectRatingValue(event){
    console.log("here rating form" , event.target.value);
    this.rating=event.target.value;
  }
  postForStudent() {
    const rating = {
      rating: this.ratingForm.value.rating,
      note: this.ratingForm.value.note,
    };
    this.UserService.addRating(this.studentId, this.teacherId, this.coursId, rating).subscribe((res) => {
      if (res.msg) {
        console.log("rating applied.");
       
      }
    });
    
}

postForTeacher(){
  const rating = {
    rating: this.ratingForm.value.rating,
    note: this.ratingForm.value.note,
  };
  this.UserService.addRatingTeacher(this.studentId, this.teacherId, this.coursId, rating).subscribe((res) => {
    if (res.msg) {
      console.log("rating applied.");
      
    }
  });
}
postForCourse() {
  const rating = {
    rating: this.ratingForm.value.rating,
    note: this.ratingForm.value.note,
  };
  this.CourseService.addRating(this.studentId, this.teacherId, this.coursId, rating).subscribe((res) => {
    if (res.msg) {
      console.log("rating applied.");
      this.router.navigate([`display/${this.coursId}`]);
    }
  });
}

}
