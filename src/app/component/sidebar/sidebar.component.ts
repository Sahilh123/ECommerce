import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() products: Product[] = [];

  constructor(private productService: ProductService) {}

  get categories(): string[] {
    const categories = Array.from(
      new Set(this.products.map((product) => product.category))
    );
    console.log('Categories:', categories);
    return categories;
  }

  get brands(): string[] {
    const brands = Array.from(
      new Set(this.products.map((product) => product.brand))
    );
    console.log('Brands:', brands);
    return brands;
  }

  selectCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.productService.setCategoryFilter(category);
  }
}
