import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageUserService } from './local-storage-user.service';
import { User } from '../models/User';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersStateService {
  openDialog() {
    throw new Error('Method not implemented.');
  }
  
  private usersStateSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersStateSubject.asObservable();

  constructor(
    private localStorageUserService:LocalStorageUserService,
    private UsersApiService : UsersApiService
  ) {
    this.read();
  }

  get local(): User[] {
    return this.usersStateSubject.getValue();
  }

  read() {
    const storedData = localStorage.getItem('users');

    if (storedData) {
      this.usersStateSubject.next(JSON.parse(storedData));
    } else {
      this.UsersApiService.getUsers()
        .subscribe(
          {
            next: (res) => {
              this.usersStateSubject.next(res);
              localStorage.setItem('users', JSON.stringify(res));
            },
            error: (error) => {
              console.error('Error', error);
            }
          }
        );
    }
  }
}

//   deleteTodo(id: number) {
    
//   }

//   updateTodo(user:User) {

//   }

//   createTodo(Users:User) {

//   }

// }

