import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageUserService } from './local-storage-user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {
  private url = 'https://jsonplaceholder.typicode.com/users'
  constructor(private http:HttpClient,
              private LocalStorageUserService:LocalStorageUserService){}

  getUsers():Observable<any[]> {
    return this.http.get<any[]>(this.url)
  }
  getItem(): User[]| null {
    return this.LocalStorageUserService.getItem();
  }
  removeItem(): boolean {
    this.LocalStorageUserService.removeItem();
    return true;
  }
}

