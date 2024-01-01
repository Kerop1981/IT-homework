import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUserService {
  
  getItem(): string | null {
    return localStorage.getItem('user') || null;
  }

  setItem(data: string): string {
    localStorage.setItem('user', data);
    return data;
  }

  removeItem(): boolean {
    localStorage.removeItem('user');
    return true;
  }
}