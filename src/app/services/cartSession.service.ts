import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartSessionService {

  private key = 'cartId';

  getCartId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.key);
  }

  setCartId(cartId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.key, cartId);
  }

  clearCartId(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.key);
  }
}
