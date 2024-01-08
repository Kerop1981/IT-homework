import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { User } from '../models/User';
import { UsersApiService } from '../services/users-api.service';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button"; // Импортируйте ваш сервис

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  newUser: User = { id: 0, name: '', email: '', phone: '' };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private usersApiService: UsersApiService,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.usersApiService.createUser(this.newUser).subscribe((createdUser) => {
      this.dialogRef.close(createdUser);
    });
  }
}
