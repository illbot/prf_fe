import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  USER_DATA = 'userData';

  constructor() { }

  saveUser(data:any){
    localStorage.setItem(this.USER_DATA, JSON.stringify(data));
  }

  getUser(): any {
    const user = window.localStorage.getItem(this.USER_DATA);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  isLoggedIn(){
    return window.localStorage.getItem(this.USER_DATA) ? true : false;
  }

  deleteUser(){
    window.localStorage.removeItem(this.USER_DATA);
  }
}
