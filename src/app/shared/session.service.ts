import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setObj(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getObj(key) {
    const data =localStorage.getItem(key)
    return data ? JSON.parse(data) : null;
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  removeAll() {
    localStorage.clear();
  }
}
