import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchFormGroup!: FormGroup;
  errorMessage: string = '';

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: ['']
    });
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  handleSearch() {
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  handleDeleteProduct(product: Product) {
    if (confirm('Etes vous sure?')) {
      this.productService.deleteProduct(product.id!).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id != product.id);
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }

  handleNewProduct() {
    this.router.navigateByUrl('/new-product');
  }
}
