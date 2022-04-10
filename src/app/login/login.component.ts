import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: LoginService,
    private storage: StorageService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  hide = true;
  username = '';
  password = '';

  ngOnInit(): void {
  }

  login(): void {
    this.service.login(this.username,this.password).subscribe((data:any)=>{
      console.log(data)
      this.storage.saveUser(data.user);
      this.router.navigateByUrl('/home');
      this.service.isLoggedIn$.next(true);
      this.snackBar.open("Sikeres bejelentkezés!", "Close")
    }, err =>{
      this.snackBar.open(err.error.message, "Close")
    })
  }

}
