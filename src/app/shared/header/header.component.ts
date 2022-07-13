import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart-service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  
  totalItems = 0;
  cartService = null;
  constructor(private router: Router,private cart: CartService) { }

  ngOnInit() {
    // this.totalItems = this.cartService.cartUpdate.value.len;
    this.cartService = this.cart.cartUpdate.subscribe(res=>{
      this.totalItems = res.length;
    })
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }
  ngOnDestroy(){
    this.cartService.unsubscribe();
  }
}
