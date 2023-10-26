import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parent-table',
  templateUrl: './parent-table.component.html',
  styleUrls: ['./parent-table.component.css']
})
export class ParentTableComponent implements OnInit {
parents:any;
pageOfItems: Array<any>;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.displayAllParents().subscribe((response) => {
      console.log("Here response from BE", response);
      this.parents = response.parents;
    }
      )
  }
  deleteParent(id) {
    this.userService.deleteUserById(id).subscribe((response) => {
      if (response.isDeleted) {
        this.userService.displayAllParents().subscribe((response) => {
          this.parents = response.parents;
        });
      }
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }
}
