import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GridInputComponent } from './grid-input/grid-input.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'past-orders', component: PastOrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'grid-input', component: GridInputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
