import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../rest.service';
import { Product } from '../../../../models/Product';
import { SharedService } from '../../../../shared/shared.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private rs: RestService, private shared: SharedService) { 
  }


  cartProducts:  Product[] = [
  ];
  cartProductsQuantity: number[] = [    
  ];

  ngOnInit(): void 
  {
    if(this.shared.getProductsArray().length) {
      this.cartProducts = this.shared.getProductsArray();
      this.cartProductsQuantity = this.shared.getQuantityArray();
    }
  }

  confirmOrder(): void 
  {
    for(let i=0; i < this.cartProducts.length; i++) {
      this.rs.updateProductQuantity(this.cartProducts[i], this.cartProductsQuantity[i]).subscribe(
        (Response) => {
          console.log(Response);
        }, (error) => {
          console.log("Eroare!");
        }
      );
    }

    window.setTimeout(function(){location.reload()},3000)
  }
}
