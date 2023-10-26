import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userId: any;
  userProfile: any[];
  image:any;
  constructor(private userService: UserService , 
    private router:Router) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      console.log("here information user", this.user);
      this.userId = this.user.id;
    }
    this.userService.getUserById(this.userId).subscribe((res) => {
      console.log("user information", res.user);
      this.userProfile = [res.user];
    });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

}
