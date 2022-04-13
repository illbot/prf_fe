import { Component, OnInit } from '@angular/core';
import { WebshopItem } from '../models/models';
import { CartService } from '../services/cart.service';
import { WebshopService } from '../services/webshop.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['title','actions'];
  dataSource:WebshopItem[] = [];
  selectedWebshopItem: WebshopItem | undefined;

  constructor(
    private service: CartService,
    private wsService: WebshopService
  ) { 
    this.service.cart$.subscribe(data => {
      this.dataSource = data
    })
  }
  
  ngOnInit(): void {
  }

  deleteItem(item:WebshopItem){
    this.service.removeFromCart(item);
    if( item === this.selectedWebshopItem){
      this.selectedWebshopItem = undefined;
    }
  }
}
