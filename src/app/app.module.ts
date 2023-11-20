import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AllProductsComponent } from './component/all-products/all-products.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { GridInputComponent } from './grid-input/grid-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CartComponent,
    PastOrdersComponent,
    HomeComponent,
    FooterComponent,
    AllProductsComponent,
    SidebarComponent,
    ProductDetailsComponent,
    GridInputComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
