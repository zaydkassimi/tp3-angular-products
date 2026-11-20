import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  productFormGroup!: FormGroup;
  productId: number = 0;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: [0, [Validators.required, Validators.min(100)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.productService.getProduct(this.productId).subscribe({
        next: (data) => {
          this.productFormGroup.patchValue(data);
        }
      });
    }
  }

  handleSaveProduct() {
    if (this.productFormGroup.invalid) return;
    let product = this.productFormGroup.value;
    if (this.isEdit) {
      this.productService.updateProduct(this.productId, product).subscribe({
        next: () => {
          this.router.navigateByUrl('/products');
        }
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: () => {
          this.router.navigateByUrl('/products');
        }
      });
    }
  }
}
