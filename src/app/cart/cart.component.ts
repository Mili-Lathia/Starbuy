import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../shared/services/cart-service/cart.service';
import { HttpService } from '../shared/services/http-service/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy {
  isitemsLoad:boolean = false;
  cartItems:any;
  subTotal = 0;
  total = 0;
  shippingPrice;
  shippngMethods:any
  cartService=null;
  httpService = null ;
  constructor(private cart: CartService,private http: HttpService) { 
  }
  ngOnInit(): void {
    this.cartService = this.cart.cartUpdate.subscribe(res=>{
      this.subTotal=0;
      this.cartItems = res;
      this.cartItems.forEach((item) => {
        this.subTotal = this.subTotal + item.Price * item.qty;
      });
      this.total = this.shippingPrice + this.subTotal;
    });
    this.httpService = this.http.getData("assets/shipping.json").subscribe(res=>{
      this.shippngMethods = res;
      this.shippingPrice = parseInt(res[0]['Price']);
      this.total = this.shippingPrice + this.subTotal;
      this.isitemsLoad = true;
    });
  }
  selectedMethod(Price){
    this.shippingPrice = parseInt(Price);
    this.total = parseInt(Price) + this.subTotal;
  }
  removeItem(index) {
    this.cart.deleteItem(this.cartItems[index]);
    // this.cartItems.splice(index, 1);
  }
  addToCart(product){
    this.cart.addItem(product);
  }
  removeQty(product){
    if(product['qty'] > 1){
      this.cart.reduceQuantity(product);
    }
  }
  ngOnDestroy(){
    this.cartService.unsubscribe();
    this.httpService.unsubscribe();
  }
}
