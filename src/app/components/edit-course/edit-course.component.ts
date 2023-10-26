import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CoursService } from 'src/app/services/cours.service';
import { validateDate } from 'src/app/validators/validateDate';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  title: string = "Add Course";
  editForm: FormGroup;
  teacherId: any;
  user:any;
  teacherName:string;
  imagePreview:any;
  id:string;
  course:any={};
  btnTitle:string="Edit Course"
  constructor(private formBuilder: FormBuilder,
    private courseService: CoursService,
    private router:Router) { }

  ngOnInit() {
  
      let sessionToken = sessionStorage.getItem("token");
      if (sessionToken) {
        this.user = this.decodeToken(sessionToken); 
        console.log("here information user", this.user);
        this.teacherId = this.user.id;
        this.teacherName=this.user.firstName
      }
      this.editForm = this.formBuilder.group({
        name: ["",[Validators.required]],
        description: ["",[Validators.required]],
        duree: ["",[Validators.required]],
        date: ['',[Validators.required]],
        price: ["",[Validators.required,,Validators.min(0)]],
        img:[""],
        nbLess:["",[Validators.required,Validators.min(3)]],
      },
      {
        validators: validateDate("duree", "date"),
      }
      );
      const fullPath = this.router.url
      const segments = fullPath.split('/'); // Divise la chaîne en segments
      const studentId = segments[segments.length - 1];
      this.id = studentId
      console.log("CourseId", this.id);
     if (this.id) {
      this.courseService.getCourseById(this.id).subscribe((response)=>{
        console.log("Here response from BE", response.courses);
        this.course = response.courses;
      })
     }
    
    
 
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  addCours() {
    console.log("this ", this.editForm.value);
    this.editForm.value.teacherId = this.teacherId;
    this.editForm.value. teacherName = this.teacherName;

      this.courseService.editCourse(this.id,this.editForm.value,this.editForm.value.img).subscribe((respons)=>{
        console.log(respons.isUpdated);
        this.btnTitle='Edit Course'
      })
  
   
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this. editForm.patchValue({ img: file });
    this. editForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
    
}
