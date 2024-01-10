import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
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
  newUser: any = {  name: '', email: '', phone: '' };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private usersApiService: UsersApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
    if(data?.user){
      this.newUser = data.user
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if(this.newUser?.id){
      this.usersApiService.updateUser(this.newUser).subscribe((updateUser) => {
        this.dialogRef.close(updateUser);
    });
      return
    }
    this.usersApiService.createUser(this.newUser).subscribe((createUser) => {
      console.log(createUser)
      this.dialogRef.close(createUser);
    });
  }

}
