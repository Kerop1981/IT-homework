import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUserService {
  
  getItem(): string | null {
    return localStorage.getItem('userToken') || null;
  }

  setItem(data: string): string {
    localStorage.setItem('userToken', data);
    return data;
  }

  removeItem(): boolean {
    localStorage.removeItem('userToken');
    return true;
  }
}