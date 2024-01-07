import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../services/users-api.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { User } from '../models/User';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LocalStorageUserService } from '../services/local-storage-user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [UserCardComponent, CommonModule, MatButtonModule],
  providers: [UsersApiService],
})
export class UsersListComponent implements OnInit {
  user: User[];

  constructor(
    private LocalStorageUserService: LocalStorageUserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const storedUsers: User[] = this.LocalStorageUserService.getItem();
    if (storedUsers && storedUsers.length > 0) {
      this.user = storedUsers;
    } else {
      this.getUsers();
    }
  }

  getUsers() {
    this.LocalStorageUserService.users$.subscribe((data) => {
      this.user = data;
    });
    const data: User[] = this.LocalStorageUserService.getItem();
    if (data) {
      this.user = data;
    } else {
      this.LocalStorageUserService.users$.subscribe(
        (data: User[]) => (this.user = data),
      );
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe((result: User | string) => {
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        result.id = this.user.length + 1;
        this.user.push(result);
        this.LocalStorageUserService.setItem('user', this.user);
      }
    });
  }

}
