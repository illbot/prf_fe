import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebshopItem } from 'src/app/models/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-webshop-item',
  templateUrl: './webshop-item.component.html',
  styleUrls: ['./webshop-item.component.scss']
})
export class WebshopItemComponent implements OnInit {

  constructor(
    private cartService:CartService
  ) { }

  @Input() item:WebshopItem | undefined;
  @Input() userIsAdmin: boolean = false;
  @Output() onDelete = new EventEmitter<WebshopItem>();
  @Output() onEdit = new EventEmitter<WebshopItem>();

  ngOnInit(): void {
  }

  onShoppingCartClick(){
    this.cartService.addToCart(this.item!);
  }

  onDeleteBtn(){
    this.onDelete.emit(this.item)
  }

  onEditBtn(){
    this.onEdit.emit(this.item)
  }
}
