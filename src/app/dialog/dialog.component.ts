import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {LocalStorageUserService} from "../services/local-storage-user.service"; // Импортируйте ваш сервис

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
    private localStorageUserService: LocalStorageUserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data?.user){
      this.newUser = data.user
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if(this.newUser?.id){
      this.localStorageUserService.updateUser(this.newUser);
      this.dialogRef.close(true);
      return
    }
    this.localStorageUserService.createUser({...this.newUser, id: this.data.id});
    this.dialogRef.close(true);
  }

}
