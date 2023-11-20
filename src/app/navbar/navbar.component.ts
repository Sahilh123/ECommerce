import { ProductService } from 'src/app/product.service';
import { Component } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: boolean = true;
  searchQuery: string = '';

  constructor(private productService: ProductService) {}

  searchProducts() {
    console.log('Search Query:', this.searchQuery);
    this.productService.setSearchQuery(this.searchQuery);
  }
}
