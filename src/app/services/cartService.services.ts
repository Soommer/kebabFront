import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItemCreateRequest {
  menuItemId: string;
  souceId: string;
  meatTypeId: string;
  extraIngredientIds: string[];
  size: string;
  cartId?: string;
}

export interface CartItem {
  id: string,
  menuItemName: string;
  meatName: string;
  souceName: string;
  extraNames: string[];
  size: string;
  totalPrice: number;
}

export interface CartResponse {
  id: string;
  total: number;
  cartItems: CartItem[];
}



@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  private api = 'https://sklep-api.wonderfulsand-657cf16a.polandcentral.azurecontainerapps.io/api';


  addItem(request: CartItemCreateRequest): Observable<{ cartId: string }> {
    return this.http.post<{ cartId: string }>(`${api}/addToCart`, request );
  }

  getCart(cartId: string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${api}/Cart/${cartId}`);
  }

  deleteItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`${api}/CartItem/${itemId}`)
  }

  getItemCount(cartId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${api}/cart/${cartId}/count`);
  }
}