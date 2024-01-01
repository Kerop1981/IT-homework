import { Component,OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from "../user-card/user-card.component";
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/User';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
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
    private UsersApiService:UsersApiService,
    private dialog:MatDialog){}
  
  ngOnInit():void{
      this.getUsers();
  }
  
  getUsers() {
    this.UsersApiService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  deleteUser(users: number): void {
    this.users = this.users.filter(users => users !== users);
  }

  openDialog(): void {
    const dialogRef = this.UsersApiService.openDialog();

    dialogRef.afterClosed().subscribe((result: User | string) => {
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        result.id = this.users.length + 1;
        this.users.push(result);
    
        
      }
    });
  }
}
