import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { LocalStorageUserService } from "../services/local-storage-user.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true
})
export class UserCardComponent {
  @Input() user: User[]
  @Output() delete: EventEmitter<User> = new EventEmitter<User>();
  @Output() edit: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private localStorageUserService: LocalStorageUserService,
    private dialog: MatDialog
  ) {
    // this.user = { id: '', name: '', email: '', phone: '' };
  }

  editUser(userEdit: User) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { user: userEdit, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: User | string) => {
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        const updatedUser = { ...userEdit, ...result };
        const index = this.user.findIndex((user) => user.id === userEdit.id);

        if (index !== -1) {
          this.user[index] = updatedUser;
          this.localStorageUserService.setItem('user', this.user);
        }
      }
    });
  }

  deleteUser(userToDelete: User): void {
    const index = this.user.findIndex((user) => user === userToDelete);

    if (index !== -1) {
      this.user.splice(index, 1);
      this.localStorageUserService.setItem('user', this.user);
    }
  }
}

