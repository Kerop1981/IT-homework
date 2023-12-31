//local-storage-user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from '../models/User';
import { UsersApiService } from './users-api.service';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageUserService {

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
    const storedData = this.localStorageUserService.getItem();

    if (storedData) {
      this.usersStateSubject.next((storedData));
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

  deleteTodo(id: number) {
    const currentUsers = this.usersStateSubject.value;
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.usersStateSubject.next(updatedUsers);
    this.UsersApiService.getItem();
  }

  updateTodo(updatedUser: User) {
    const currentUsers = this.usersStateSubject.value;
    const updatedUsers = currentUsers.map(user => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user));
    this.usersStateSubject.next(updatedUsers);
    this.UsersApiService.getItem();
  }

  createTodo(newUser: User) {
    const currentUsers = this.usersStateSubject.value;
    const updatedUsers = [...currentUsers, newUser];
    this.usersStateSubject.next(updatedUsers);
    this.UsersApiService.getItem();
  }

  getItem(): any {
    const data = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  setItem(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(): boolean {
    localStorage.removeItem('user');
    return true;
  }

}
