import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageUserService } from './local-storage-user.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {

   private url = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http:HttpClient,
    private dialog: MatDialog,
    private LocalStorageUserService:LocalStorageUserService){}

    getUsers():Observable<any[]> {
    const url = this.url;
    return this.http.get<any[]>(this.url)
  }
  getItem(): User[]| null {
    return this.LocalStorageUserService.getItem();
  }

  setItem(data: User[]): void {
    this.LocalStorageUserService.setItem ('user',data);
  }

  removeItem(): boolean {
    this.LocalStorageUserService.removeItem();
    return true;
  }
}


