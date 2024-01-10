import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private url = 'https://jsonplaceholder.typicode.com/users/';

  constructor(
    private http: HttpClient,
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  updateUser(user:User):Observable<User> {
    return this.http.put<User>(this.url + user.id, user)
  }

  createUser(user:User):Observable<User>{
    return this.http.post<User>(this.url,user)
  }
}
