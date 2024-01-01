import { Component, Input,} from '@angular/core';
import { User } from '../models/User';
import { UsersApiService } from '../users-api.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports:  [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent{
  @Input() users:User;

  constructor(private UsersApiService:UsersApiService){
    this.users = { id: 1, name: '', email: '' ,phone:''}; 
  }

}

