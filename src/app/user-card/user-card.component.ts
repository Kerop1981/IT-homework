import { Component, Input,} from '@angular/core';
import { User } from '../models/User';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports:  [BrowserModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent{
  @Input() users:User;


  constructor(){
    this.users = { id: 1, name: '', email: '' ,phone:''}; 
  }
}

