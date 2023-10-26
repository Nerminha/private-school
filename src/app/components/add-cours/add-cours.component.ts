import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateDate } from 'src/app/validators/validateDate';
import { CoursService } from 'src/app/services/cours.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  title: string = "Add Course";
  coursForm: FormGroup;
  teacherId: any;
  user:any;
  teacherName:string;
  imagePreview:any;
  id:string;
  course:any={};
  btnTitle:string="Add Course"
  constructor(private formBuilder: FormBuilder,
    private courseService: CoursService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

    ngOnInit() {
      let sessionToken = sessionStorage.getItem("token");
      if (sessionToken) {
        this.user = this.decodeToken(sessionToken); 
        console.log("here information user", this.user);
        this.teacherId = this.user.id;
        this.teacherName=this.user.firstName
      }
      this.coursForm = this.formBuilder.group({
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
     
     
    }
    
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  addCours() {
    console.log("this ", this.coursForm.value);
    this.coursForm.value.teacherId = this.teacherId;
    this.coursForm.value. teacherName = this.teacherName;

       this.courseService.addCourse(this.coursForm.value,this.coursForm.value.img).subscribe((response) => {
      console.log(this.coursForm.value);
      console.log("here response add Cours from BE", response.message);
    });
    
   
  }
 
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this. coursForm.patchValue({ img: file });
    this. coursForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}
