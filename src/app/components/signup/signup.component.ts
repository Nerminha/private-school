import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MustMatch } from 'src/app/validators/mustMatch';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title: string = "Signup"
  signupForm: FormGroup;
  imagePreview: string;
  cvPreview: string;
  errorMsg: string;
  path: string;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
       
        firstName: ["", [Validators.required, Validators.minLength(8)]],
        adresse: ["", [Validators.required,]],
        mail: ["", [Validators.required, Validators.email]],
        pwd: [
          "",
          [
            Validators.required,
            Validators.pattern,
            Validators.minLength(5),
            Validators.maxLength(10),
            Validators.pattern(/.*[0-9].*/),
            Validators.pattern(/.*[A-Z].*/),
            Validators.pattern(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/),
          ],
        ],
        confPwd: [""],
        img: [""],
        cv: [""],
        speciality: ["", [Validators.required,]],
        age: ['', [Validators.required , Validators.min(5)]],
        tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        childrenArray: this.formBuilder.array([]),
        numberOfChildren: [0, [Validators.required, Validators.min(1)]],

      },
      {
        validators: MustMatch("pwd", "confPwd"),
      }

    );
   
    this.path = this.router.url;
   
  }
  onImageSelected(event: Event,fileType: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      // Vérifiez si le contrôle existe avant de mettre à jour sa valeur
      const control = this.signupForm.get(fileType);
      if (control) {
        control.setValue(file);
        control.updateValueAndValidity();
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (fileType === 'cv') {
          this.cvPreview = reader.result as string;
        } else if (fileType === 'img') {
          this.imagePreview = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  addChildrenFields() {
    const numberOfChildren = this.signupForm.get('numberOfChildren').value;
    const childrenArray = this.signupForm.get('childrenArray') as FormArray;

    // Effacez les champs précédents (s'il y en a)
    childrenArray.clear();

    // Ajoutez les champs pour les enfants en fonction du nombre spécifié
    for (let i = 0; i < numberOfChildren; i++) {
      const childFormGroup = this.formBuilder.group({

        childPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]]
      });
      childrenArray.push(childFormGroup);
    }
  }




  signup() {
    console.log("here object ", this.signupForm.value);
    console.log("Children Data:", this.signupForm.get('childrenArray').value);
    
    this.signupForm.value.role = (this.path == "/signup") ? "user" : "admin";
    this.signupForm.value.role = (this.path == "/signupTeacher") ? "teacher" :
     (this.path == "/signupStudent") ? "student" :
      (this.path == "/signupParent") ? "parent" : 
      "admin";
      this.signupForm.value.status=(this.path == "/signupTeacher")?"NotOK" :"";
    this.userService.signup(this.signupForm.value, this.signupForm.value.img,this.signupForm.value.cv,this.signupForm.value.role,this.signupForm.value.role).subscribe(
      (response) => {
        console.log("here response", response);
        if (!response.msg) {
          this.errorMsg = "Acount Exists";
        }
        else {
          this.router.navigate(["login"]);
        }
      }
    );
  }

}
