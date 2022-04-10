import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ignoreElements } from 'rxjs';
import { WebshopItem } from '../models/models';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';
import { WebshopService } from '../services/webshop.service';
import { AddItemComponent } from './add-item/add-item.component';

const ADMIN_ROLE = 'admin'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAdmin = false

  constructor(
    private storage: StorageService,
    private loginService: LoginService,
    private cartService: CartService,
    private webshopService: WebshopService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { 
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      if (this.storage.getUser())
        this.isAdmin = this.storage.getUser().accessLevel == ADMIN_ROLE;
    })
  }

  searchInput: String = '';
  items:WebshopItem[] = []
  displayItems: WebshopItem[] = [];
  
  ngOnInit(): void {
    this.getData();
  }

  searchInputChange(event:any): void {
    if(this.searchInput !== '')
      this.displayItems = this.items.filter((actual)=> {
        let title = actual.title.toLowerCase();
        if(title.includes(this.searchInput.toLowerCase())) return actual;
        return;
      })
    else
      this.displayItems = this.items;
  }

  onShoppingCart(title:WebshopItem){
    console.log(this.cartService)
    this.cartService.addToCart(title);
  }

  getData(){
    this.webshopService.getWebshopItems().subscribe((data:any)=>{
      let list:WebshopItem[] = []
      data.webshopItems.forEach( (i:any) => {
        let item:WebshopItem = {
          id: i._id,
          title: i.title,
          description:i.description
        } 
        list.push(item);
      });
      this.items = list
      this.displayItems = this.items;
    },
    err =>{
      this.snackbar.open(err.error.message, "Close");
    })
  }

  onAddClick(){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onEdit(item:WebshopItem){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width:'500px',
      data: item
    })

    dialogRef.afterClosed().subscribe(data =>{
      this.getData();
    });
  }

  onDelete(item:WebshopItem){
    this.webshopService.deleteWebshopItem(item.id).subscribe(data => {
      this.items = this.items.filter(data => data.id !== item.id);
      this.displayItems = this.items;
      this.snackbar.open("Törlés sikerült!", "Close")
    }, err => {
      console.log(err.error.message)
    })

  }
}
