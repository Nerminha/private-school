import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  specialty:string;
  teachers:any;
  @ViewChild('specialtyForm', { static: false }) specialtyForm: NgForm;
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  searchTeachers() {
    this.userService.searchTeachers(this.specialty).subscribe(response => {
      console.log('Here response from BE', response.teachers);
      this.teachers = response.teachers;
    });
  }
}
