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
  users: User[] ;

  constructor(
    private UsersApiService: UsersApiService,
    private LocalStorageUserService: LocalStorageUserService,
    private dialog: MatDialog,
  ) {}



  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe((result: User | string) => {
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        this.users.push(result);
        this.LocalStorageUserService.setItem('users', this.users);
      }
    });
  }

  editUser(userEdit: User) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { user: { ...userEdit }, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: User | string) => {
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        Object.assign(userEdit, result);
        this.LocalStorageUserService.setItem('users', this.users);
      }
    });
  }

  loadUsers() {
    this.users = this.LocalStorageUserService.getItem() || [];
    if (this.users.length === 0) {
      this.UsersApiService.getUsers().subscribe((value) => {
        this.users = value.map(user => ({ ...user }));
        this.LocalStorageUserService.setItem('users', this.users);
      });
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  deleteUser(userDelete: User): void {
    const index = this.users.findIndex((user) => user.id === userDelete.id);

    if (index !== -1) {
      this.users.splice(index, 1);
      this.LocalStorageUserService.setItem('users', this.users);
    }
  }
}
