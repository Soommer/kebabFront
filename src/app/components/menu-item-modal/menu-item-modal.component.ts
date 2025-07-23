import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { menuItem } from '../../models/menuItem';
import { SauceService, Sauce } from '../../services/sauceService.services';
import { Meat, MeatService } from '../../services/meatServices.services';
import { Extras, ExtrasService } from '../../services/extrasServices.services';
import { CartService } from '../../services/cartService.services'; 
import { ToastService } from '../../services/toast.service';
import { CartSessionService } from '../../services/cartSession.service';
import { RefreshService } from '../../services/refresh.service';

@Component({
  selector: 'app-menu-item-modal',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.css']
})
export class MenuItemModalComponent implements OnInit {
  @Input() item!: menuItem;
  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  sauces: Sauce[] = [];
  meats: Meat[] = [];
  extras:Extras[] = [];
  sizes = ['mały', 'średni', 'duży'];

  selectedSauces: { [id: string]: boolean } = {};
  selectedMeats: { [id: string]: boolean } = {};
  selectedExtras: { [key: string]: boolean } = {};
  selectedSizes: { [key: string]: boolean } = {};

  formInvalid = false;
  private _retryAttempted = false;


  constructor(
    private sauceService: SauceService,
    private meatService: MeatService,
    private extrasService: ExtrasService,
    private cartService: CartService,
    private toastService: ToastService,
    private cartSession: CartSessionService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    // Inicjalizuj sizes
    for (let size of this.sizes) {
      this.selectedSizes[size] = false;
    }

    // Pobierz sosy z serwera
    this.sauceService.getAll().subscribe({
      next: (data) => {
        this.sauces = data;
        for (let sauce of this.sauces) {
          this.selectedSauces[sauce.id] = false;
        }
      },
      error: (err) => {
        console.error('Błąd pobierania sosów', err);
      }
    });

    // Pobierz mięso z serwera
    this.meatService.getAll().subscribe({
      next: (data) => {
        this.meats = data;
        for (let meat of this.meats) {
          this.selectedMeats[meat.id] = false;
        }
      },
      error: (err) => {
        console.error('Błąd pobierania mięsów', err);
      }
    });

    // Pobierz extra z serwera
    this.extrasService.getAll().subscribe({
      next: (data) => {
        this.extras = data;
        for (let extra of this.extras) {
          this.selectedExtras[extra.id] = false;
        }
      },
      error: (err) => {
        console.error('Błąd pobierania extra', err);
      }
    });
  }

  

  isValid(): boolean {
    const oneSauceSelected = Object.values(this.selectedSauces).filter(v => v).length === 1;
    const oneMeatSelected = Object.values(this.selectedMeats).filter(v => v).length === 1;
    const oneSizeSelected = Object.values(this.selectedSizes).filter(v => v).length === 1;
    return oneSauceSelected && oneSizeSelected && oneMeatSelected;
  }

  confirmAdd() {
    if (!this.isValid()) {
      this.formInvalid = true;
      return;
    }
  
    this.formInvalid = false;
  
    const selected = (map: { [key: string]: boolean }) =>
      Object.entries(map).filter(([_, v]) => v).map(([k]) => k);
  
    const sauceId = selected(this.selectedSauces)[0];
    const meatId = selected(this.selectedMeats)[0];
    const size = selected(this.selectedSizes)[0];
    const extras = selected(this.selectedExtras);
  
    const cartId = localStorage.getItem('cartId') ?? undefined;
  
    const request = {
      menuItemId: this.item.id,
      souceId: sauceId,
      meatTypeId: meatId,
      extraIngredientIds: extras,
      size: size,
      cartId: cartId
    };
  
    this.cartService.addItem(request).subscribe({
    next: (response) => {
      console.log(response);
      if (response.cartId) {
        this.cartSession.setCartId(response.cartId);
        const header = document.querySelector('app-header');
        header?.dispatchEvent(new CustomEvent('update-cart-count'));
      }
      this.toastService.show("Produkt dodany do koszyka!");
      this.refreshService.triggerRefresh();
      this.confirm.emit(request);
    },
    error: (err) => {
      console.error('Błąd wysyłania do backendu:', err);
      
      // Jeśli 400 - spróbuj raz jeszcze
      if (err.status === 400 && !this._retryAttempted) {
        this._retryAttempted = true;
        this.cartSession.clearCartId();
        console.log('Ponawiam zapytanie po błędzie 400...');
        this.cartService.addItem(request).subscribe({
          next: (response) => {
            if (response.cartId) {
              this.cartSession.setCartId(response.cartId);
              const header = document.querySelector('app-header');
              header?.dispatchEvent(new CustomEvent('update-cart-count'));
            }
            this.toastService.show("Produkt dodany do koszyka (2. próba)!");
            this.refreshService.triggerRefresh();
            this.confirm.emit(request);
          },
          error: (err2) => {
            console.error('Błąd przy 2. próbie:', err2);
            this.formInvalid = true;
          }
      });
    } else {
      this.formInvalid = true;
    }
  }
});
  }

  cancelAdd() {
    this.cancel.emit();
  }
}
