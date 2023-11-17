import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css'],
})
export class PastOrdersComponent implements OnInit {
  pastOrders: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getPastOrders().subscribe(
      (cartProducts: Product[]) => {
        this.pastOrders = cartProducts.map((item) => {
          item.quantity = 1;
          return item;
        });
      },
      (error) => {
        console.error('Error fetching cart items: ', error);
      }
    );
  }
}
