import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CartService, CartItemCreateRequest, CartItem } from '../../services/cartService.services';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartSessionService } from '../../services/cartSession.service';
import { FormsModule } from '@angular/forms';
import { PaymentReq, PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgFor, NgIf, CartItemComponent, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = false;
  total = 0;
  email= '';

  deliveryType: 'delivery' | 'pickup' = 'pickup';

  address = {
    street: '',
    number: '',
    city: '',
    zip: ''
  };


  constructor(
    private cartService: CartService,
    private cartSession: CartSessionService,
    private paymentService: PaymentService
    ) {}

    private PayCliced = false;

async proceedToPayment() {
  console.log("payment start");
  const cartId = this.cartSession.getCartId();
  console.log(cartId);
  
  if(this.PayCliced){
    alert('Płatność Przetważana')
    return;
  }
  
  this.PayCliced = true;
  if (!cartId) {
    alert('Brak koszyka.');
    return;
  }

  if (this.deliveryType === 'delivery') {
    const { street, number, city, zip } = this.address;
    if (!street || !number || !city || !zip || !this.email) {
      alert('Uzupełnij wszystkie dane adresowe i email.');
      return;
    }
  }

  const addressString =
    this.deliveryType === 'delivery'
      ? `ul. ${this.address.street} ${this.address.number},${this.address.zip} ${this.address.city}, Polska`
      : '';
  console.log(addressString);

  const paymentRequest: PaymentReq = {
    cartId: cartId,
    email: this.email,
    address: addressString
  };

  try {
    await this.paymentService.startPayment(paymentRequest);
  } catch (err: any) {
    if (err.status === 400) {
      console.error('Błąd 400 – zła składnia zapytania:', err.error);
      alert(`Nieprawidłowe dane. Proszę sprawdź adres i spróbuj ponownie. ${err.error}`);
      this.PayCliced = false;
    } else {
      console.error('Inny błąd:', err);
      alert('Wystąpił nieoczekiwany błąd.');
      this.PayCliced = false;
    }
  }
}


  loadCart() {
    const cartId = this.cartSession.getCartId();
    if (cartId) {
      this.cartService.getCart(cartId).subscribe({
        next: (cart) => {
          this.cartItems = cart.cartItems;
          this.total = cart.total;
          this.isLoading = false;
        },
        error: (err) =>{
          console.error("Błąd pobierania koszyka: ", err);
          this.isLoading = false;
        }
      });
    } else {
      this.cartItems = [];
      this.total = 0;
      this.isLoading = false;
    }
  }

  onRemoveItem(itemId: string){
    this.cartService.deleteItem(itemId).subscribe({
      next: () => this.loadCart(),
      error: err => console.error("Błąd usuwania", err)
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }
}
