import { Component,OnInit } from '@angular/core';
import { UsersApiService } from '../services/users-api.service';
import { UserCardComponent } from "../user-card/user-card.component";
import { User } from '../models/User';
import { CommonModule } from '@angular/common';
import { UsersStateService } from '../services/UsersState.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    imports: [UserCardComponent,CommonModule,],
    providers:[UsersApiService]
})

export class UsersListComponent implements OnInit {

 users: any[];

  constructor(
    private dialog: MatDialog,
    private UsersApiService:UsersApiService,
    private UsersStateService :UsersStateService
    ){console.log('UserStateService')}
  
  ngOnInit():void{
      this.getUsers();
  }
  
  getUsers() {
    console.log('getUsers')
    this.UsersStateService.users$
      .subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(users: number): void {
    this.users = this.users.filter(users => users !== users);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
       width: '300px',
     });
     dialogRef.afterClosed().subscribe((result: User | string) => {
       if (result && typeof result === 'object' && !Array.isArray(result)) {
         result.id = this.users.length + 1;
         this.users.push(result);
     
         
       }
     });
   }
  }