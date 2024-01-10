//local-storage-user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageUserService {

  private usersStateSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersStateSubject.asObservable();

  constructor() {}

  getItem(): any {
    const data = localStorage.getItem('users');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  setItem(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public createUser(user: User): void {
    const users = this.getItem();
    const updatedUsers = [...users, user];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  public updateUser(user: User): void {
    const users = this.getItem();
    const updatedUsers = users.map((u: any) => u.id !== user.id ? u : user);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }
}
