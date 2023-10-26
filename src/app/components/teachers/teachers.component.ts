import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
title:string="Our Teachers"
teachers:any=[];
pageOfItems: Array<any>;
  constructor( private userService:UserService) { }

  ngOnInit() {
    this.userService.displayAllTeachers().subscribe ((response) => {
      console.log("Here response from BE", response);
      this.teachers = response.teachers;

      
    })
      
      
    }
    onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
      }

}
