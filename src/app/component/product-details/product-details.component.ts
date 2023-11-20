import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  selectedImage: string = ''; // Define selectedImage property

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.product = history.state.product;
    console.log(this.product); // Just for debugging
    // Set the first image as the selectedImage initially
    if (this.product && this.product.images && this.product.images.length > 0) {
      this.selectedImage = this.product.images[0];
    }
  }

  changePreview(image: string) {
    this.selectedImage = image; // Update selectedImage on thumbnail hover
  }
}
