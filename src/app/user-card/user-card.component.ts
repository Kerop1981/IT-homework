import { Component, Input,} from '@angular/core';
import { User } from '../models/User';
import { UsersApiService } from '../services/users-api.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports:  [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent{
  @Input() user:User;

  constructor(private UsersApiService:UsersApiService){
    this.user = { id: 1, name: '', email: '' ,phone:''}; 
  }

}

