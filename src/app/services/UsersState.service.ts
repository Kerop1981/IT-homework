import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageUserService } from './local-storage-user.service';
import { User } from '../models/User';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersStateService {
  
  private usersStateSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersStateSubject.asObservable();

  constructor(
    private UsersApiService : UsersApiService
  ) {
    this.read();
  }

  get local(): User[] {
    return this.usersStateSubject.getValue();
  }

  read() {
    this.UsersApiService.getUsers()
      .subscribe(
        {
          next: (res) => {
            this.usersStateSubject.next(res);
          },
          error: (error) => {
            console.error('Error', error)
          }
        }
      );
  }

  deleteTodo(id: number) {
    console.log('delete todo in state')
    this.UsersApiService.getUsers()
      .subscribe({
        next: (res) => {
          console.log('todoService.deleteTodo', res);
          const newTodos = this.local.filter(todo => todo.id !== id);
          this.usersStateSubject.next(newTodos);
        },
        error: (err) => console.error('Error', err)
      })
  }

  updateTodo(user:User) {
    console.log('update todo in state')
    this.UsersApiService.getUsers()
      .subscribe({
        next: (res => {
          const updatedTodos = this.local.map(item => {
            if (item.id === user.id) {
              return user;
            } else {
              return item;
            }
          });
          this.usersStateSubject.next(updatedTodos);
        }),
        error: err => console.error('Update error', err)
      })
  }

  createTodo(Users:User) {

  }

}

