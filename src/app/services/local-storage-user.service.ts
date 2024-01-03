import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUserService {

  
  constructor(){ }
  
  getItem(): any {
    const data = localStorage.getItem('user')
    if(data) {
    return JSON.parse(data)}
    else{return null}
  }

  setItem( key:string ,data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
  
  }

  removeItem(): boolean {
    localStorage.removeItem('user');
    return true;
  }
}