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
