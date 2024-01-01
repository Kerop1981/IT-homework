import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {

   private url = 'https://jsonplaceholder.typicode.com/users'
  
  constructor(private http:HttpClient,
    private dialog: MatDialog){}

    getUsers():Observable<any[]> {
    const url = this.url;
    return this.http.get<any[]>(this.url)
  }

  openDialog() {
    return this.dialog.open(DialogComponent, {
      width: '300px',
    });
  }

  getItem(): string | null {
    return localStorage.getItem('users') || null;
  }

  setItem(data: string): string {
    localStorage.setItem('users', data);
    return data;
  }

  removeItem(): boolean {
    localStorage.removeItem('users');
    return true;
  }
}


