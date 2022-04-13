import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';

const ADMIN_ROLE = 'admin'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'beadando';
  loggedIn = false;
  isAdmin = false;
  cartCounter = 0;

  constructor(
    private storage: StorageService,
    private loginService: LoginService,
    private snackbar: MatSnackBar,
    private cartService: CartService,
    private router:Router
  ){
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn.valueOf();
      if (this.storage.getUser())
        this.isAdmin = this.storage.getUser().accessLevel == ADMIN_ROLE;
    })

    this.cartService.cart$.subscribe(cart =>{
      this.cartCounter = cart.length;
    })
  }
  ngOnInit(): void {
    this.loggedIn = this.storage.isLoggedIn();
  }
  
  logout(){
    this.storage.deleteUser()
    this.loginService.logout();
    this.loginService.isLoggedIn$.next(false);
    this.router.navigate(['/login'])
    this.snackbar.open("Sikeres kijelentkezés!", "Close");

    //this.loginService.logout().subscribe(data => {
    //  this.storage.deleteUser()
    //  this.loginService.isLoggedIn$.next(false);
    //  this.snackbar.open("Sikeres kijelentkezés!", "Close");
    //});
  }

}
