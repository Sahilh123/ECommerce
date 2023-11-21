// Import necessary modules and classes
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Define private variables to manage data
  private apiUrl = 'https://dummyjson.com/products';
  private cartItemsIds: number[] = [];
  private categoryFilter: string = 'all';
  private brandFilter: string = 'all';
  private pastOrdersIds: number[] = [];

  // Subjects and Observables for category, brand, cart items, and search
  private categoryFilterSubject = new BehaviorSubject<string>('all'); // Subject for category filter
  categoryFilter$ = this.categoryFilterSubject.asObservable(); // Observable for category filter changes

  private brandFilterSubject = new BehaviorSubject<string>('all'); // Subject for brand filter
  brandFilter$ = this.brandFilterSubject.asObservable(); // Observable for brand filter changes

  private cartItemsSubject = new BehaviorSubject<Product[]>([]); // Subject for cart items
  cartItems$ = this.cartItemsSubject.asObservable(); // Observable for cart items changes

  private searchQuerySubject = new BehaviorSubject<string>(''); // Subject for search query
  searchQuery$ = this.searchQuerySubject.asObservable(); // Observable for search query changes

  // Constructor to initialize HttpClient and retrieve data from local storage
  constructor(private http: HttpClient) {
    const storedIds = localStorage.getItem('cartItemsIds');
    if (storedIds) {
      this.cartItemsIds = JSON.parse(storedIds);
    }
    const storedIds2 = localStorage.getItem('pastOrders');
    if (storedIds2) {
      this.pastOrdersIds = JSON.parse(storedIds2);
    }
  }

  // Fetch products from the API
  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching products: ', error);
        return of({ products: [], total: 0, skip: 0, limit: 0 });
      })
    );
  }

  // Set search query
  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  // Set category filter
  setCategoryFilter(category: string) {
    this.categoryFilterSubject.next(category);
  }

  // Set brand filter
  setBrandFilter(brand: string) {
    this.brandFilterSubject.next(brand);
  }

  // Get the current brand filter value
  getCurrentBrandFilter(): string {
    return this.brandFilter;
  }

  // Add product to cart
  addToCart(productId: number) {
    if (!this.cartItemsIds.includes(productId)) {
      this.cartItemsIds.push(productId);
      localStorage.setItem('cartItemsIds', JSON.stringify(this.cartItemsIds));
      console.log('Item added to cart. Updated cart items:', this.cartItemsIds);

      this.emitCartItems();
    }
  }

  // Get items in the cart
  getCartItems(): Observable<Product[]> {
    return this.getProducts().pipe(
      map((response) => {
        const products = response.products;
        if (Array.isArray(products)) {
          return products.filter((product) =>
            this.cartItemsIds.includes(product.id)
          );
        } else {
          return [];
        }
      })
    );
  }

  // Get past orders
  getPastOrders(): Observable<Product[]> {
    return this.getProducts().pipe(
      map((response) => {
        const products = response.products;
        if (Array.isArray(products)) {
          return products.filter((product) =>
            this.pastOrdersIds.includes(product.id)
          );
        } else {
          return [];
        }
      })
    );
  }

  // Search products based on query
  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map((response) => {
        const products = response.products;
        if (Array.isArray(products)) {
          return products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
        } else {
          return [];
        }
      })
    );
  }

  // Helper function to emit updated cart items
  private emitCartItems() {
    this.getCartItems().subscribe((cartProducts: Product[]) => {
      this.cartItemsSubject.next(cartProducts);
    });
  }
}
