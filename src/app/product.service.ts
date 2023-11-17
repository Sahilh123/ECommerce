import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';
  private cartItemsIds: number[] = [];
  private categoryFilter: string = 'all';
  private brandFilter: string = 'all';
  private pastOrdersIds: number[] = [];

  private categoryFilterSubject = new BehaviorSubject<string>('all');
  categoryFilter$ = this.categoryFilterSubject.asObservable();

  private brandFilterSubject = new BehaviorSubject<string>('all');
  brandFilter$ = this.brandFilterSubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

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

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching products: ', error);
        return of({ products: [], total: 0, skip: 0, limit: 0 });
      })
    );
  }

  setCategoryFilter(category: string) {
    this.categoryFilterSubject.next(category);
  }

  setBrandFilter(brand: string) {
    this.brandFilterSubject.next(brand);
  }

  getCurrentBrandFilter(): string {
    return this.brandFilter;
  }

  addToCart(productId: number) {
    if (!this.cartItemsIds.includes(productId)) {
      this.cartItemsIds.push(productId);
      localStorage.setItem('cartItemsIds', JSON.stringify(this.cartItemsIds));
      console.log('Item added to cart. Updated cart items:', this.cartItemsIds);

      this.emitCartItems();
    }
  }

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

  private emitCartItems() {
    this.getCartItems().subscribe((cartProducts: Product[]) => {
      this.cartItemsSubject.next(cartProducts);
    });
  }
}
