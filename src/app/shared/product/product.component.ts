import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart-service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product){
    this.cartService.addItem(product);
  }
}
