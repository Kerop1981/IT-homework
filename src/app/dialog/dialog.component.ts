import { Component } from '@angular/core';
import {DialogModule} from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/User';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersApiService } from '../services/users-api.service';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule,MatInputModule,FormsModule,MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  providers:[{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }]
})
export class DialogComponent {
  newUser: User = {id: 0, name:'',email: '', phone: ''}

 constructor(public dialogRef:MatDialogRef<DialogComponent>,
  private UsersApiService:UsersApiService){}

 onCancelClick(): void {
  this.dialogRef.close();
  }

 onCreateClick():void{
  this.dialogRef.close(this.newUser.name);
  }

 updateUser(updatedUser: User): void {
  this.UsersApiService.getUsers();
  }
}
