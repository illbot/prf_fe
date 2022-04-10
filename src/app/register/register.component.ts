import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private service: LoginService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  hide = true;
  username = '';
  password = '';
  password2 = '';
  error = false

  ngOnInit(): void {
  }

  register(): void {
    this.error = this.password !== this.password2
    if(!this.error){
      this.service.register(this.username,this.password).subscribe( data =>{
        this.snackbar.open("Sikeres regisztráció!", "Close");
        this.router.navigateByUrl('/login');
      },
      err => {
        this.snackbar.open(err.error.message,"Close")
      })
    }
  }
}
