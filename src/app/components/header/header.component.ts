import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService.services';
import { NgFor, NgIf } from '@angular/common';
import { CartSessionService } from '../../services/cartSession.service';
import { ElementRef, AfterViewInit } from '@angular/core';
import { RefreshService } from '../../services/refresh.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(private router: Router, private cartService: CartService, private cartSession: CartSessionService,
  private elRef: ElementRef, private refreshService: RefreshService  ) {}

   ngOnInit(): void {
    this.refreshService.refresh$.subscribe(()=>{
      this.updateCartCount();
      console.log(this.cartCount)
    })
  }

  updateCartCount() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      console.log("No ID")
      this.cartCount = 0;
      return;
    }

    this.cartService.getItemCount(cartId).subscribe({
        next: res => {
          this.cartCount = res.count;
          console.log("Zaktualizowano cartCount:", this.cartCount);
        },
        error: () => this.cartCount = 0
    });
  }

  ngAfterViewInit(): void {
  this.elRef.nativeElement.addEventListener('update-cart-count', () => {
    this.updateCartCount();
  });
}

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToHome() {
    this.refreshService.triggerRefresh();
    this.router.navigate(['/']);
  }
}
