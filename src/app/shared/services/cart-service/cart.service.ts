import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '../../session.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  _cartUpdate = new BehaviorSubject(this.sessionService.getObj('cart'));
  cartUpdate = this._cartUpdate.asObservable();

  constructor(private sessionService: SessionService) { }

  items() {
    return this.sessionService.getObj('cart') || [];
  }
  addItem(item) {
    let store = this.sessionService.getObj('cart');
    if (store) {
      if (!store.some(e => e.slug === item.slug)) {
        item = {...item, 'qty' : 1}
        store.push(item);
      }
      else{
        store.some(e => {
          if(e.slug === item.slug){
            e['qty'] = e['qty'] + 1;
            item = {e}
          }
        })
      }
    } else {
      store = [];
      store.push(item);
    }
    this.sessionService.setObj('cart', store);
    this._cartUpdate.next(store);
  }
  reduceQuantity(item){
    let store = this.sessionService.getObj('cart');
    store.some(e => {
      if(e.slug === item.slug){
        e['qty'] = e['qty'] - 1;
        item = {e}
        console.log(e);
      }
    })
    this.sessionService.setObj('cart', store);
    this._cartUpdate.next(store);
  }
  deleteItem(item) {
    let store = this.sessionService.getObj('cart');
    store = store.filter(obj => obj.slug !== item.slug);
    this.sessionService.setObj('cart', store);
    this._cartUpdate.next(store);
  }
  clear() {
    this.sessionService.remove('cart');
    this._cartUpdate.next([]);
  }
}
