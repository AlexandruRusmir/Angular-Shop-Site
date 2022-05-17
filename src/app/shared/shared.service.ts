import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  cartProducts:  Product[] = [
  ];
  cartProductsQuantity: number[] = [    
  ];

  constructor() { }
  
  setArrays(productArray: Product[], quantityArray: number[])
  {
    this.cartProducts = productArray;
    this.cartProductsQuantity = quantityArray;
  }

  getProductsArray()
  {
    return this.cartProducts;
  }

  getQuantityArray()
  {
    return this.cartProductsQuantity;
  }
}
