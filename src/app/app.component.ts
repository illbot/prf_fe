import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private cartService: CartService
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
    this.loginService.isLoggedIn$.next(false);
    this.snackbar.open("Sikeres kijelentkezés!", "Close");
  }

}
