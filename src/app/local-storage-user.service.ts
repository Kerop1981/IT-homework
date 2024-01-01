import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/User';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageUserService {

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsersFromLocalStorage();
  }

  loadUsersFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      this.usersSubject.next(parsedUsers);
    } else {
      this.fetchUsersFromBackend();
    }
  }

  fetchUsersFromBackend(): void {
    this.http.get<User[]>('your_backend_url').subscribe((users: User[]) => {
      this.updateUsers(users);
      localStorage.setItem('users', JSON.stringify(users));
     });
  }

  updateUsers(updatedUsers: User[]): void {
    this.usersSubject.next(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  updateUser(updatedUser: User): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    this.updateUsers(updatedUsers);
  }
}

