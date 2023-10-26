import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = "Login";
  loginForm: FormGroup;
  userLogin: any = {};
  errorMsg: string;
  
  constructor( private userService:UserService ,
    private router:Router) { }

  ngOnInit() {
  }
 
  login() {
    this.userService.login(this.userLogin).subscribe((response) => {
      if (response.msg == "3") {
        this. errorMsg = "Your Account is not Available";
      }
      else if (response.msg == "0" ) {
        this. errorMsg = "Please check Your Tel/PWD";
      } 
      else if (response.msg == "1" ) {
        this. errorMsg = "Please check Your Tel/PWD";
      } else {
        sessionStorage.setItem("token", response.token);
        this.router.navigate([""]);
      }

    })
  }

}
