import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../shared/services/http-service/http.service';
import { CartService } from '../shared/services/cart-service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  products
  productDetails:any;
  isProductLoad:boolean=false;
  constructor( private router: Router,private httpService: HttpService,private cartService: CartService) { 
    const index = parseInt(this.router.url.split('/')[2].split('-')[1]);
    this.httpService.getData("assets/products.json").subscribe(res=>{
      this.products = res;
      this.productDetails = this.products[index-1];
      this.isProductLoad = true;
    })
  }
  ngOnInit(): void {
    
  }
  addToCart(product){
    this.cartService.addItem(product);
  }
  goToCart(){
    this.router.navigate(['/cart']);
  }
}
