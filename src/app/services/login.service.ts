import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  isLoggedIn$ = new BehaviorSubject<Boolean>(false);

  login(email:String, password:String) {
    return this.http.post(environment.API_URL + environment.LOGIN, {
      username: email,
      password: password
    });
  }

  register(email:String, password:String){
    return this.http.post(environment.API_URL + environment.USER, {
      email: email,
      password: password
    })
  }

  logout(){
    return this.http.post(environment.API_URL + environment.LOGOUT, {}, {withCredentials:true})
  }

  getStatus(){
    return this.http.get(environment.API_URL + environment.AUTH_TEST);
  }
}
