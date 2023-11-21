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
  searchQuery: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    console.log('Total products:', this.products.length); // Check the length of products array

    // subscription for the category filter
    this.subscription = this.productService.categoryFilter$.subscribe(
      (category: string) => {
        this.filterProducts(category);
      }
    );

    // subscription for the brand filter
    this.subscription.add(
      this.productService.brandFilter$.subscribe((brand: string) => {
        this.filterProductsByBrand(brand);
      })
    );

    // Subscription for search query filter

    this.subscription.add(
      this.productService.searchQuery$.subscribe((query: string) => {
        this.searchQuery = query;
        this.searchProducts(); // Trigger search when query changes
      })
    );

    // Trigger initial search
    this.searchProducts();

    // Initially, show all products
    this.filterProducts('all');
    this.filterProductsByBrand('all');
  }

  // function to filter products by brand
  filterProductsByBrand(brand: string) {
    if (brand === 'all') {
      this.filteredProducts = this.filteredProducts; // No brand filter, use current filtered products
    } else {
      this.filteredProducts = this.filteredProducts.filter(
        (product) => product.brand === brand
      );
    }
  }

  // filter the produucts on the basis of category
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

  // to interact with service setBrandFilter
  setBrandFilter(brand: string) {
    this.productService.setBrandFilter(brand);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // function to add an item to cart
  addToCart(item: Product) {
    this.productService.addToCart(item.id);
    console.log(this.productService.getCartItems());
  }

  // function to see the details of a product
  viewProductDetails(product: Product) {
    this.router.navigate(['/product-details'], { state: { product } }); // Updated the route
  }

  // function to filter the products on the search
  searchProducts() {
    console.log('Search Query:', this.searchQuery); // Track the search query

    this.productService.searchProducts(this.searchQuery).subscribe(
      (products: Product[]) => {
        console.log('Received Products:', products); // Log the received products
        this.filteredProducts = products;
      },
      (error) => {
        console.error('Error fetching products:', error); // Handle error if needed
      }
    );
  }
}
