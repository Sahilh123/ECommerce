import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];
  filteredProducts: Product[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    console.log('Total products:', this.products.length); // Check the length of products array

    this.subscription = this.productService.categoryFilter$.subscribe(
      (category: string) => {
        this.filterProducts(category);
      }
    );
    this.subscription.add(
      this.productService.brandFilter$.subscribe((brand: string) => {
        this.filterProductsByBrand(brand);
      })
    );

    // Initially, show all products
    this.filterProducts('all');
    this.filterProductsByBrand('all');
  }

  filterProductsByBrand(brand: string) {
    if (brand === 'all') {
      this.filteredProducts = this.filteredProducts; // No brand filter, use current filtered products
    } else {
      this.filteredProducts = this.filteredProducts.filter(
        (product) => product.brand === brand
      );
    }
  }

  filterProducts(category: string) {
    if (category === 'all') {
      this.filteredProducts = this.products; // Show all products if 'All Categories' selected
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === category
      );
    }

    const brandFilter = this.productService.getCurrentBrandFilter();
    this.filterProductsByBrand(brandFilter);
  }

  setBrandFilter(brand: string) {
    this.productService.setBrandFilter(brand);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(item: Product) {
    this.productService.addToCart(item.id);
    console.log(this.productService.getCartItems());
  }

  viewProductDetails(product: Product) {
    this.router.navigate(['/product-details'], { state: { product } }); // Updated the route
  }
}
