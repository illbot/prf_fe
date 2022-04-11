import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { WebshopItem } from '../models/models';
import { LoginService } from './login.service';
import { StorageService } from './storage.service';

interface CartIem {
  id:any,
}

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  private isLoggedIn = false;

  private _cart: BehaviorSubject<WebshopItem[]> = new BehaviorSubject<WebshopItem[]>([]);
  readonly cart$ = this._cart.asObservable();

  private cart: WebshopItem[] = []

  addToCart(item: WebshopItem){
    if(this.isLoggedIn){
      this.cart.push(item)
      this._cart.next(Object.assign([], this.cart))
    } 
  }

  removeFromCart(item:WebshopItem){
    this.cart = this.cart.filter(data => data.id !== item.id);
    this._cart.next(Object.assign([], this.cart))
  }

  constructor(
    private loginService:LoginService,
    private storageService: StorageService
  ) {
    this.loginService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn.valueOf();
      if(!this.isLoggedIn){
        this.cart = []
        this._cart.next(Object.assign([], this.cart))
      }
    })
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }
}
