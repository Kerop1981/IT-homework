import {Component, EventEmitter, Input, Output} from '@angular/core';
import { User } from '../models/User';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  imports: [],
  standalone: true
})
export class UserCardComponent {
  @Input() user: User;
  @Output() editUserClick = new EventEmitter<User>();
  @Output() deleteUserClick = new EventEmitter<User>();

  editUser() {
    this.editUserClick.emit(this.user);
  }

  deleteUser() {
    this.deleteUserClick.emit(this.user);
  }
}


