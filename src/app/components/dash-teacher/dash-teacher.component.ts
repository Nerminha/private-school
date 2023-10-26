import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-teacher',
  templateUrl: './dash-teacher.component.html',
  styleUrls: ['./dash-teacher.component.css']
})
export class DashTeacherComponent implements OnInit {
title:string='Your dashboard'
  constructor() { }

  ngOnInit() {
  }

}
