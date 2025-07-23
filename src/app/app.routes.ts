import { Routes } from '@angular/router';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { SuccessComponent } from './components/success/success.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
    {path: '', component: ProductListComponent},
    {path: 'cart', component: CartPageComponent},
    { path: 'success', component: SuccessComponent },
    { path: 'cancel', component: CancelComponent },
];
