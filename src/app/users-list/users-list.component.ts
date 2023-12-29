import { Component,OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from "../user-card/user-card.component";


@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    imports: [UserCardComponent,]
})
export class UsersListComponent implements OnInit {
 users: any[]=[];

  constructor(
    private UsersApiService:UsersApiService){}
  
  ngOnInit()  {
      this.getUsers();
  }
  
  getUsers() {
    this.UsersApiService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }
}


