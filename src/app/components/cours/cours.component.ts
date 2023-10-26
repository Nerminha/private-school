import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  @Input() course:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToDisplayCourse(id) {
    this.router.navigate([`${id}`]);
  }
}
