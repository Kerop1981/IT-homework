import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { UsersApiService } from '../services/users-api.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user: User;
  @Output() delete: EventEmitter<User> = new EventEmitter<User>();
  @Output() edit: EventEmitter<User> = new EventEmitter<User>();

  constructor(private UsersApiService: UsersApiService) {
    this.user = { id: 1, name: '', email: '', phone: '' };
  }

  deleteUser() {
    this.delete.emit(this.user);
  }

  editUser() {
    this.edit.emit(this.user);
  }
}
