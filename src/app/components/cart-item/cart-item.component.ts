import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../services/cartService.services';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() remove = new EventEmitter<string>();

  onRemoveClick(){
    this.remove.emit(this.cartItem.id);
  }
}
