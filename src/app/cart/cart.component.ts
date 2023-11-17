import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalCost: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCartItems().subscribe(
      (cartProducts: Product[]) => {
        this.cartItems = cartProducts.map((item) => {
          item.quantity = 1;
          return item;
        });
        this.calculateTotalCost();
      },
      (error) => {
        console.error('Error fetching cart items: ', error);
      }
    );
  }

  increaseQuantity(item: Product) {
    item.quantity = item.quantity ? item.quantity + 1 : 1;
    this.calculateTotalCost();
  }

  decreaseQuantity(item: Product) {
    if (item.quantity && item.quantity > 0) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.removeItemFromCart(item);
      }
      this.calculateTotalCost();
    }
  }

  removeItemFromCart(item: Product) {
    const index = this.cartItems.findIndex((p) => p.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.calculateTotalCost();
    }
  }

  checkout() {
    const currentCart = localStorage.getItem('cartItemsIds');
    if (currentCart !== null) {
      const cartData = JSON.parse(currentCart);
      localStorage.setItem('pastOrders', JSON.stringify(cartData));
    }

    console.log('Checkout Successful! Thank you for your purchase.');
    window.alert('Your order has been placed. Thank you for your purchase!');

    this.cartItems = [];
    this.calculateTotalCost();
    localStorage.removeItem('cartItemsIds');
  }

  getTypesOfItemsCount(): number {
    const uniqueItemIds = new Set<number>();
    this.cartItems.forEach((item) => {
      uniqueItemIds.add(item.id);
    });
    return uniqueItemIds.size;
  }

  calculateTotalCost() {
    this.totalCost = this.cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  }
}
